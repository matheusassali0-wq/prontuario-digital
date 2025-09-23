"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const state = {
  lastHash: "0000000000000000000000000000000000000000000000000000000000000000",
  day: null,
  file: null,
};

function keyForPeriod() {
  const base = process.env.AUDIT_SECRET || "dev-audit-secret";
  const now = new Date();
  const period = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  return crypto
    .createHmac("sha256", base)
    .update("rota:" + period)
    .digest();
}
function fileForToday() {
  const dir = path.join(process.cwd(), "data", "audit");
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  const day = new Date().toISOString().slice(0, 10);
  if (state.day !== day) {
    state.day = day;
    state.file = path.join(dir, `${day}.jsonl`);
    try {
      const txt = fs.existsSync(state.file)
        ? fs.readFileSync(state.file, "utf8")
        : "";
      const lines = txt.trim() ? txt.trim().split("\n") : [];
      state.lastHash = lines.length
        ? JSON.parse(lines[lines.length - 1]).hash
        : state.lastHash;
    } catch {
      /* noop */
    }
  }
  return state.file;
}
function append(record) {
  const file = fileForToday();
  const prev = state.lastHash;
  const payload = JSON.stringify(record);
  const hash = crypto
    .createHmac("sha256", keyForPeriod())
    .update(prev + "|" + payload)
    .digest("hex");
  const line = JSON.stringify({ ...record, prevHash: prev, hash }) + "\n";
  fs.appendFileSync(file, line, { mode: 0o600 });
  state.lastHash = hash;
}
module.exports = { append };
