#!/usr/bin/env node
/*
  Minimal runtime tests for @contracts schemas. Run with:
  node scripts/test-contracts.mjs
*/
import { PrescriptionCreateSchema } from "../contracts/dist/prescriptions.js";

const good = {
  patientId: "p1",
  formato: "A4",
  cid: "A00",
  observacoes: "Tomar com água",
  items: [
    {
      nome: "Dipirona",
      dose: "500mg",
      via: "VO",
      horario: "8/8h",
      observacao: "",
    },
  ],
};

const bad = {
  patientId: "",
  formato: "A7",
  items: [],
};

let pass = true;
try {
  const parsed = PrescriptionCreateSchema.parse(good);
  if (
    parsed.patientId !== "p1" ||
    parsed.formato !== "A4" ||
    !Array.isArray(parsed.items)
  ) {
    console.error("GOOD payload parsed to unexpected shape");
    pass = false;
  }
} catch (e) {
  console.error("GOOD payload should pass but failed:", e?.message);
  pass = false;
}

try {
  PrescriptionCreateSchema.parse(bad);
  console.error("BAD payload should fail but passed");
  pass = false;
} catch {
  // expected
}

if (!pass) {
  console.error("Contracts tests: FAIL");
  process.exit(1);
}
console.log("Contracts tests: PASS");
