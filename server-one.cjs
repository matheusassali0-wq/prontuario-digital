const http = require("http"),
  fs = require("fs"),
  path = require("path"),
  url = require("url");
const root = path.resolve("public");
const port = 3030;
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};
const CSP =
  "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://unpkg.com; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'";

function send(res, code, headers, body) {
  res.writeHead(code, headers);
  res.end(body);
}
function json(res, obj, code = 200) {
  send(
    res,
    code,
    {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    JSON.stringify(obj),
  );
}

const server = http.createServer((req, res) => {
  try {
    const parsed = url.parse(req.url || "/", true);
    let p = decodeURIComponent(parsed.pathname || "/");

    // API
    if (p.startsWith("/api/")) {
      if (p === "/api/health" && req.method === "GET")
        return json(res, { ok: true, time: new Date().toISOString() });
      if (p === "/api/pacientes" && req.method === "GET")
        return json(res, { ok: true, items: [] });
      if (p === "/api/auth/login" && req.method === "POST") {
        let buf = "";
        req
          .on("data", (ch) => (buf += ch))
          .on("end", () => {
            try {
              const body = JSON.parse(buf || "{}");
              if (body.email === "MATHEUS" && body.password === "a8hadTCy") {
                const token = Buffer.from(Date.now().toString()).toString(
                  "base64",
                );
                return json(res, {
                  ok: true,
                  token,
                  user: {
                    id: "1",
                    email: "MATHEUS",
                    name: "Matheus",
                    role: "admin",
                  },
                });
              }
            } catch (_) {}
            return json(res, { ok: false, error: "credenciais" }, 401);
          });
        return;
      }
      return json(res, { ok: false, error: "not_found" }, 404);
    }

    // Static
    if (p === "/") p = "/app/index.html";
    const f = path.join(root, p);
    fs.stat(f, (e, s) => {
      if (!e && s.isFile()) {
        const ext = path.extname(f).toLowerCase();
        const headers = {
          "Content-Type": mime[ext] || "application/octet-stream",
        };
        if (ext === ".html") headers["Content-Security-Policy"] = CSP;
        res.writeHead(200, headers);
        fs.createReadStream(f).pipe(res);
      } else {
        if (p.startsWith("/app")) {
          const idx = path.join(root, "app", "index.html");
          fs.readFile(idx, (e2, b) => {
            if (e2) {
              send(res, 404, { "Content-Type": "text/plain" }, "not found");
            } else {
              send(
                res,
                200,
                { "Content-Type": "text/html", "Content-Security-Policy": CSP },
                b,
              );
            }
          });
        } else {
          send(res, 404, { "Content-Type": "text/plain" }, "not found");
        }
      }
    });
  } catch (_) {
    send(res, 500, { "Content-Type": "text/plain" }, "server error");
  }
});
server.listen(port, () =>
  console.log("server-one http://127.0.0.1:" + port + "/app/"),
);
