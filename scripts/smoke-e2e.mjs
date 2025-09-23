import { spawn } from "node:child_process";

const BASE = "http://127.0.0.1:3030";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForHealth(timeoutMs = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${BASE}/api/v1/health`);
      if (res.ok) return true;
    } catch {}
    await sleep(300);
  }
  return false;
}

async function ensureServer() {
  // Try health first; if not available, spawn server
  const ok = await waitForHealth(500);
  if (ok) return { proc: null };
  const proc = spawn(process.execPath, ["server/server-pro.cjs"], {
    stdio: "ignore",
    detached: true,
  });
  const ready = await waitForHealth(10000);
  if (!ready) {
    try {
      process.kill(-proc.pid);
    } catch {}
    throw new Error("Server did not become ready");
  }
  return { proc };
}

async function createPatient() {
  const payload = {
    name: "Paciente Smoke Test",
    document: "SMK-0001",
    birthDate: "1990-01-01",
    contact: { phone: "11999990000", email: "paciente@example.com" },
    payer: "Particular",
    allergies: ["poeira"],
    tags: ["teste"],
  };
  const res = await fetch(`${BASE}/api/v1/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Create failed: ${res.status}`);
  const { patient } = await res.json();
  return patient;
}

async function listPatients(query) {
  const res = await fetch(
    `${BASE}/api/v1/patients?query=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error(`List failed: ${res.status}`);
  return res.json();
}

async function getEvents(patientId) {
  const res = await fetch(
    `${BASE}/api/v1/patients/${encodeURIComponent(patientId)}/events`,
  );
  if (!res.ok) throw new Error(`Events failed: ${res.status}`);
  return res.json();
}

async function removePatient(patientId) {
  const res = await fetch(
    `${BASE}/api/v1/patients/${encodeURIComponent(patientId)}`,
    { method: "DELETE" },
  );
  if (!res.ok && res.status !== 204)
    throw new Error(`Delete failed: ${res.status}`);
}

async function main() {
  const { proc } = await ensureServer();
  let created = null;
  try {
    created = await createPatient();
    console.log("Created patient:", created.id);
    const list = await listPatients("Smoke Test");
    console.log("List total:", list.total);
    const events = await getEvents(created.id);
    console.log(
      "Events for patient:",
      Array.isArray(events.items) ? events.items.length : 0,
    );
  } finally {
    if (created?.id) {
      await removePatient(created.id).catch(() => undefined);
      console.log("Removed patient:", created.id);
    }
    if (proc) {
      try {
        process.kill(-proc.pid);
      } catch {}
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
