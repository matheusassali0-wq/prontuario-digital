#!/usr/bin/env node
import http from "node:http";

const post = (path, body, headers = {}) =>
  new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: 3030,
        path,
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
      },
      (res) => {
        const chunks = [];
        res.on("data", (d) => chunks.push(d));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            body: Buffer.concat(chunks).toString("utf8"),
          }),
        );
      },
    );
    req.on("error", reject);
    req.end(JSON.stringify(body));
  });

const run = async () => {
  // Ensure we have a patient to reference
  const patientName = `Test Idempotency ${Date.now()}`;
  const pRes = await post("/api/v1/patients", {
    name: patientName,
    document: "",
    allergies: [],
    tags: [],
  });
  if (pRes.status !== 201) {
    console.error("Failed to create patient", pRes.status, pRes.body);
    process.exit(1);
  }
  const pBody = JSON.parse(pRes.body);
  const pacienteId = pBody.patient.id;

  const body = { pacienteId, formato: "A4", items: [{ nome: "Dipirona" }] };
  const hash = "deadbeef";
  const key = "abc-123";
  const a = await post("/api/prescricoes/print", body, {
    "Idempotency-Key": key,
    "X-Payload-Hash": hash,
  });
  const b = await post("/api/prescricoes/print", body, {
    "Idempotency-Key": key,
    "X-Payload-Hash": hash,
  });
  console.log("First:", a.status, a.body.slice(0, 80));
  console.log("Replay:", b.status, b.body.slice(0, 80));
  if (a.status !== b.status || a.body !== b.body) {
    console.error("Idempotency test FAIL: responses differ");
    process.exit(1);
  }
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
