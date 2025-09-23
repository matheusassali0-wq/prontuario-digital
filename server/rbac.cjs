"use strict";
const ROLES = new Set(["Admin", "Medico", "Atendimento"]);
function roleFromHeaders(req) {
  const h = req.headers["x-role"] || req.headers["x-user-role"] || "";
  const r = String(h).trim();
  return ROLES.has(r) ? r : "Atendimento";
}
function attachUser(req, _res, next) {
  req.user = req.user || {};
  req.user.role = roleFromHeaders(req);
  next();
}
function requireRole(roles) {
  const allow = new Set(Array.isArray(roles) ? roles : [roles]);
  return function (req, res, next) {
    const r = (req.user && req.user.role) || "Atendimento";
    if (!allow.has(r)) {
      res
        .status(403)
        .json({ error: "forbidden", need: Array.from(allow), got: r });
      return;
    }
    next();
  };
}
module.exports = { attachUser, requireRole };
