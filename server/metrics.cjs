"use strict";
const buckets = new Map();
const CAP = 1000;
function isMutation(m) {
  m = (m || "GET").toUpperCase();
  return m === "POST" || m === "PUT" || m === "PATCH" || m === "DELETE";
}
function keyFor(req) {
  return `${(req.method || "GET").toUpperCase()} ${req.route?.path || req.originalUrl || req.url}`;
}
function observe(req, durMs) {
  if (!isMutation(req.method)) return;
  const k = keyFor(req);
  if (!buckets.has(k)) buckets.set(k, []);
  const arr = buckets.get(k);
  arr.push(durMs);
  if (arr.length > CAP) arr.splice(0, arr.length - CAP);
}
function percentile(arr, p = 0.99) {
  if (!arr || !arr.length) return 0;
  const s = Array.from(arr).sort((a, b) => a - b);
  const idx = Math.min(s.length - 1, Math.floor(p * (s.length - 1)));
  return s[idx];
}
function snapshot() {
  const out = {};
  for (const [k, arr] of buckets.entries()) {
    out[k] = {
      count: arr.length,
      p50: percentile(arr, 0.5),
      p90: percentile(arr, 0.9),
      p99: percentile(arr, 0.99),
    };
  }
  return out;
}
module.exports = { observe, snapshot };
