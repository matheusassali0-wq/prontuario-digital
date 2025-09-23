import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const { append } = await import("../../server/audit.cjs");

test("audit append writes jsonl with hash", async () => {
  const dir = path.join(process.cwd(), "data", "audit");
  const before = fs.existsSync(dir) ? fs.readdirSync(dir).length : 0;
  append({
    ts: new Date().toISOString(),
    method: "POST",
    path: "/x",
    status: 200,
  });
  const after = fs.existsSync(dir) ? fs.readdirSync(dir).length : 0;
  assert.ok(after >= before);
  const day = new Date().toISOString().slice(0, 10) + ".jsonl";
  const file = path.join(dir, day);
  assert.ok(fs.existsSync(file));
  const lines = fs.readFileSync(file, "utf8").trim().split("\n");
  const last = JSON.parse(lines[lines.length - 1]);
  assert.ok(last.hash && typeof last.hash === "string");
});
