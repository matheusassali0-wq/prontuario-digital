import test from "node:test";
import assert from "node:assert/strict";
import { parseTemplate } from "../../server/utils/templateParser.mjs";

test("parseTemplate replaces simple tokens", () => {
  const out = parseTemplate("Olá {{name}}", { name: "Mundo" });
  assert.equal(out, "Olá Mundo");
});

test("parseTemplate supports dot paths", () => {
  const out = parseTemplate("ID: {{user.id}} - Nome: {{user.name}}", {
    user: { id: 123, name: "Ana" },
  });
  assert.equal(out, "ID: 123 - Nome: Ana");
});

test("parseTemplate leaves unknown as empty", () => {
  const out = parseTemplate("X={{missing.value}} Y={{x}}", {});
  assert.equal(out, "X= Y=");
});
