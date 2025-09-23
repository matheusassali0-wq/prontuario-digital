"use strict";
const pino = require("pino");
const pinoHttp = require("pino-http");

const redact = [
  "req.headers.authorization",
  "req.headers.cookie",
  "res.headers.set-cookie",
  "req.headers.x-csrf-token",
  "req.headers.x-idempotency-key",
  "req.headers.x-payload-hash",
];

const base = pino({
  level: process.env.LOG_LEVEL || "info",
  redact,
  msgPrefix: "",
  timestamp: pino.stdTimeFunctions.isoTime,
});

const httpLogger = pinoHttp({
  logger: base,
  customLogLevel: (_req, res, err) => {
    if (err) return "error";
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  serializers: {
    req(req) {
      return { method: req.method, url: req.url };
    },
    res(res) {
      return { status: res.statusCode };
    },
  },
});

module.exports = { logger: base, httpLogger };
