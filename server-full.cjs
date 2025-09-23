const http = require("http"),
  fs = require("fs"),
  path = require("path");
const { URL } = require("url");
const port = process.env.PORT || 3030;
const pub = path.resolve("public");
const appDir = path.join(pub, "app");
const venDir = path.join(pub, "vendor");
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
const csp =
  "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net; connect-src 'self'; worker-src 'self' blob:; frame-ancestors 'none'; base-uri 'self'; object-src 'none'";
function baseHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin",
    "Content-Security-Policy": csp,
  };
}
function send(res, code, h, b) {
  res.writeHead(code, h);
  res.end(b);
}
function serveFile(res, fp) {
  fs.stat(fp, (e, s) => {
    if (e || !s.isFile()) return send(res, 404, baseHeaders(), "not found");
    const ext = path.extname(fp).toLowerCase();
    const h = baseHeaders();
    h["Content-Type"] = mime[ext] || "application/octet-stream";
    res.writeHead(200, h);
    fs.createReadStream(fp).pipe(res);
  });
}
const server = http.createServer((req, res) => {
  try {
    const u = new URL(req.url, "http://localhost");
    const p = decodeURIComponent(u.pathname);
    if (p === "/api/health") {
      const h = baseHeaders();
      h["Content-Type"] = "application/json";
      return send(
        res,
        200,
        h,
        JSON.stringify({ ok: true, time: new Date().toISOString() }),
      );
    }
    if (p === "/api/auth/login" && req.method === "POST") {
      let b = "";
      req.on("data", (ch) => (b += ch));
      req.on("end", () => {
        try {
          const { email, password } = JSON.parse(b || "{}");
          if (email === "MATHEUS" && password === "a8hadTCy") {
            const token = "dev-" + Date.now();
            const h = baseHeaders();
            h["Content-Type"] = "application/json";
            send(
              res,
              200,
              h,
              JSON.stringify({
                ok: true,
                token,
                user: {
                  id: "1",
                  email: "MATHEUS",
                  name: "Matheus",
                  role: "admin",
                },
              }),
            );
          } else {
            const h = baseHeaders();
            h["Content-Type"] = "application/json";
            send(
              res,
              401,
              h,
              JSON.stringify({ ok: false, error: "credenciais" }),
            );
          }
        } catch (e) {
          const h = baseHeaders();
          h["Content-Type"] = "application/json";
          send(res, 400, h, JSON.stringify({ ok: false, error: "badjson" }));
        }
      });
      return;
    }
    if (p.startsWith("/api") && !p.startsWith("/api/auth")) {
      const h = baseHeaders();
      h["Content-Type"] = "application/json";
      if (!/^Bearer\s+/i.test(req.headers["authorization"] || ""))
        return send(res, 401, h, JSON.stringify({ ok: false, error: "token" }));
      return send(res, 200, h, JSON.stringify({ ok: true }));
    }
    if (p === "/") {
      const h = baseHeaders();
      h["Location"] = "/app/";
      return send(res, 302, h, "");
    }
    if (p.startsWith("/app")) {
      let rel = p.replace(/^\/app/, "");
      if (!rel || rel === "/") rel = "/index.html";
      const fp = path.join(appDir, rel);
      return fs.stat(fp, (e, s) => {
        if (!e && s.isFile()) serveFile(res, fp);
        else serveFile(res, path.join(appDir, "index.html"));
      });
    }
    const fp = path.join(pub, p.replace(/^\//, ""));
    fs.stat(fp, (e, s) => {
      if (!e && s.isFile()) serveFile(res, fp);
      else send(res, 404, baseHeaders(), "not found");
    });
  } catch (e) {
    send(res, 500, baseHeaders(), "server error");
  }
});
server.listen(port, () =>
  console.log("Server FULL -> http://127.0.0.1:" + port + "/app/login"),
);
