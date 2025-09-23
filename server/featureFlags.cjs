"use strict";
const FLAGS = {
  templates: process.env.FEATURE_TEMPLATES === "1",
  presets: process.env.FEATURE_PRESETS === "1",
  sso: process.env.FEATURE_SSO === "1",
};
function has(feature) {
  return Boolean(FLAGS[feature]);
}
function requireFeature(feature) {
  return function (req, res, next) {
    if (!has(feature)) {
      res.status(404).json({ error: "feature_disabled", feature });
      return;
    }
    next();
  };
}
module.exports = { has, requireFeature };
