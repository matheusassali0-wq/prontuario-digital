"use strict";
const {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} = require("@asteasolutions/zod-to-openapi");
const { z } = require("zod");
// ensure Zod types are augmented with .openapi metadata helpers
extendZodWithOpenApi(z);
function isZodSchema(obj) {
  return !!(obj && obj._def && obj.parse && obj.safeParse);
}
function collectContracts() {
  try {
    // Prefer monorepo local contracts if available
    let all;
    try {
      all = require("@prontuario/contracts");
    } catch {
      try {
        all = require("../contracts/dist");
      } catch {
        all = require("../contracts/src");
      }
    }
    const entries = Object.entries(all).filter(([, v]) => isZodSchema(v));
    return Object.fromEntries(entries);
  } catch {
    return {};
  }
}
function buildSpec({
  title = "Prontuario API",
  version = "1.0.0",
  servers = ["/api", "/api/v1"],
} = {}) {
  const registry = new OpenAPIRegistry();
  const schemas = collectContracts();
  for (const [name, schema] of Object.entries(schemas)) {
    registry.register(name, schema);
  }
  const generator = new OpenApiGeneratorV3(registry.definitions);
  const doc = generator.generateDocument({
    openapi: "3.0.3",
    info: { title, version },
    servers: servers.map((u) => ({ url: u })),
  });
  return doc;
}
module.exports = { buildSpec };
