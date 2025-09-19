const http=require("http"),fs=require("fs"),path=require("path");
const mime={".html":"text/html",".js":"application/javascript",".css":"text/css",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".svg":"image/svg+xml",".json":"application/json",".woff2":"font/woff2",".woff":"font/woff"};
const root=path.resolve("public"); const port=5173;
function setSec(res){res.setHeader("X-Content-Type-Options","nosniff");res.setHeader("Referrer-Policy","same-origin");res.setHeader("Permissions-Policy","geolocation=()");}
const server=http.createServer((req,res)=>{
  try{
    let url=decodeURIComponent((req.url||"").split("?")[0]);
    if(url==="/") url="/app/index.html";
    const f=path.join(root,url);
    fs.stat(f,(e,s)=>{
      if(!e&&s.isFile()){
        const ext=path.extname(f).toLowerCase(); setSec(res);
        if(ext===".html"){res.setHeader("Content-Security-Policy","default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'");}
        res.writeHead(200,{"Content-Type":mime[ext]||"application/octet-stream"}); fs.createReadStream(f).pipe(res);
      } else {
        if(url.startsWith("/app")){
          setSec(res);
          fs.readFile(path.join(root,"app","index.html"),(e2,b)=>{ if(e2){res.writeHead(404);res.end("not found")} else {res.setHeader("Content-Security-Policy","default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'"); res.writeHead(200,{"Content-Type":"text/html"}); res.end(b)} });
        } else { res.writeHead(404); res.end("not found") }
      }
    });
  }catch{ res.writeHead(500); res.end("server error") }
});
server.listen(port,()=>console.log("Front: http://127.0.0.1:"+port+"/app/"));
