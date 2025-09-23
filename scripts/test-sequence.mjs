#!/usr/bin/env node
/*
  Simple sequence smoke: call /api/v1/prescriptions/print twice with different items
  and ensure numbers are monotonic increasing (requires patient exists).
*/
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
  // Create a new patient for this test
  const patientName = `Test Sequence ${Date.now()}`;
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
  const pid = pBody.patient.id;

  const a = await post("/api/prescricoes/print", {
    pacienteId: pid,
    formato: "A4",
    items: [{ nome: "Item A" }],
  });
  const b = await post("/api/prescricoes/print", {
    pacienteId: pid,
    formato: "A4",
    items: [{ nome: "Item B" }],
  });
  const pa = JSON.parse(a.body || "{}");
  const pb = JSON.parse(b.body || "{}");
  if (!(pa.item && pb.item)) {
    console.error("Missing items in responses", {
      a: a.status,
      b: b.status,
      pa,
      pb,
    });
    process.exit(1);
  }
  const n1 = pa.item.numero;
  const n2 = pb.item.numero;
  if (!(Number.isInteger(n1) && Number.isInteger(n2) && n2 > n1)) {
    console.error("Sequence test FAIL", { n1, n2 });
    process.exit(1);
  }
  console.log("Sequence test PASS", { n1, n2 });
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
