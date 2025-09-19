const http=require("http"), url=require("url");
const PORT=process.env.PORT||3030;
function send(res,code,obj,headers){res.writeHead(code,Object.assign({"content-type":"application/json","access-control-allow-origin":"*","access-control-allow-headers":"authorization, content-type","access-control-allow-methods":"GET,POST,OPTIONS"},headers||{})); res.end(JSON.stringify(obj));}
function parseBody(req,cb){ let b=""; req.on("data",c=>b+=c); req.on("end",()=>{ try{cb(JSON.parse(b||"{}"))}catch{cb({})} }); }
const srv=http.createServer((req,res)=>{
  const u=url.parse(req.url,true); const p=u.pathname||"/"; if(req.method==="OPTIONS"){ return send(res,200,{ok:true}) }
  if(p==="/api/health" && req.method==="GET"){ return send(res,200,{ok:true,time:new Date().toISOString()}) }
  if(p==="/api/auth/login" && req.method==="POST"){
    return parseBody(req,body=>{
      if(body&&body.email==="MATHEUS"&&body.password==="a8hadTCy"){
        const token=Buffer.from(Date.now().toString()).toString("base64");
        return send(res,200,{ok:true,token,user:{id:"1",email:"MATHEUS",name:"Matheus",role:"admin"}});
      }
      return send(res,401,{ok:false,error:"credenciais"});
    });
  }
  if(p.startsWith("/api/") && p!=="/api/auth/login"){ const h=(req.headers["authorization"]||""); if(!/^Bearer\s+/i.test(h)){ return send(res,401,{ok:false,error:"token"}) } }
  if(p==="/api/pacientes" && req.method==="GET"){ return send(res,200,{ok:true,items:[]}) }
  return send(res,404,{ok:false,error:"not_found"});
});
srv.listen(PORT,()=>console.log("API-lite http://127.0.0.1:"+PORT));
