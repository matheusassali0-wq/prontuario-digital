"use strict";
let sdk = null;
function start() {
  if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    try {
      const { NodeSDK } = require("@opentelemetry/sdk-node");
      const {
        getNodeAutoInstrumentations,
      } = require("@opentelemetry/auto-instrumentations-node");
      const {
        OTLPTraceExporter,
      } = require("@opentelemetry/exporter-trace-otlp-http");
      const { PrismaInstrumentation } = require("@prisma/instrumentation");
      const exporter = new OTLPTraceExporter({
        url:
          String(process.env.OTEL_EXPORTER_OTLP_ENDPOINT).replace(/\/+$/, "") +
          "/v1/traces",
        headers: process.env.OTEL_EXPORTER_OTLP_HEADERS || undefined,
      });
      sdk = new NodeSDK({
        traceExporter: exporter,
        instrumentations: [
          getNodeAutoInstrumentations(),
          new PrismaInstrumentation(),
        ],
      });
      sdk.start().catch(() => {});
      return true;
    } catch {
      return false;
    }
  }
  return false;
}
function shutdown() {
  if (sdk && sdk.shutdown) return sdk.shutdown();
}
function status() {
  console.log(
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT
      ? "otel: enabled"
      : "otel: disabled (no endpoint)",
  );
}
module.exports = { start, shutdown, status };
