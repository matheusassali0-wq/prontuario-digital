export function parseTemplate(tpl, vars) {
  return String(tpl || "").replace(
    /\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g,
    (_, k) => {
      const path = String(k).split(".");
      let v = vars;
      for (const key of path) v = v != null ? v[key] : undefined;
      return v == null ? "" : String(v);
    },
  );
}
export default parseTemplate;
