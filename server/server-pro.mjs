import express from "express"; import cors from "cors";
import fs from "fs/promises"; import path from "path"; import { fileURLToPath } from "url";
const __filename=fileURLToPath(import.meta.url); const __dirname=path.dirname(__filename);
const root=path.resolve(path.join(__dirname,"..")); const pub=path.join(root,"public"); const dataDir=path.join(root,"data");

async function readJson(f,def){ try{ return JSON.parse(await fs.readFile(f,"utf8")||"null") ?? def }catch{ return def } }
async function writeJson(f,obj){ const tmp=f+".tmp"; await fs.writeFile(tmp,JSON.stringify(obj,null,2)); await fs.rename(tmp,f) }
function genId(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,8) }

const app=express(); app.use(cors()); app.use(express.json({limit:"4mb"}));
app.get("/api/health",(req,res)=>res.json({ok:true,time:new Date().toISOString()}));

// login demo
app.post("/api/auth/login",(req,res)=>{ const {email,password}=req.body||{};
  if(email==="MATHEUS"&&password==="a8hadTCy"){
    return res.json({ok:true,token:Buffer.from(Date.now().toString()).toString("base64"),user:{id:"1",email:"MATHEUS",name:"Matheus",role:"admin"}});
  }
  res.status(401).json({ok:false,error:"credenciais"});
});

// pacientes + autocomplete
app.get("/api/pacientes", async (req,res)=>{ const q=(req.query.search||"").toString().trim().toLowerCase();
  const items=await readJson(path.join(dataDir,"pacientes.json"),[]);
  const filtered=q?items.filter(p=>(p.nome||"").toLowerCase().includes(q)||(p.doc||"").toLowerCase().includes(q)):items;
  res.json({ok:true,items:filtered});
});
app.post("/api/pacientes", async (req,res)=>{
  const b=req.body||{}; if(!(b.nome&&b.nascimento)) return res.status(400).json({ok:false,error:"nome/nascimento"});
  await fs.mkdir(dataDir,{recursive:true});
  const items=await readJson(path.join(dataDir,"pacientes.json"),[]);
  const id=genId(); const novo={id,criadoEm:new Date().toISOString(),...b}; items.push(novo);
  await writeJson(path.join(dataDir,"pacientes.json"),items); res.json({ok:true,item:novo});
});
app.get("/api/pacientes/quick", async (req,res)=>{
  const t=(req.query.term||"").toString().trim().toLowerCase();
  const items=await readJson(path.join(dataDir,"pacientes.json"),[]);
  let list=t?items.filter(p=>(p.nome||"").toLowerCase().includes(t)||(p.doc||"").toLowerCase().includes(t)):items;
  list=list.sort((a,b)=>(a.nome||"").localeCompare(b.nome||"")).slice(0,12);
  res.json({ok:true,items:list.map(p=>({id:p.id,nome:p.nome,nascimento:p.nascimento,doc:p.doc}))});
});

// evoluções
app.get("/api/pacientes/:id/evolucoes", async (req,res)=>{ const all=await readJson(path.join(dataDir,"evolucoes.json"),[]);
  const list=all.filter(e=>e.pacienteId===req.params.id).sort((a,b)=>b.data.localeCompare(a.data));
  res.json({ok:true,items:list});
});
app.get("/api/pacientes/:id/evolucoes/last", async (req,res)=>{ const all=await readJson(path.join(dataDir,"evolucoes.json"),[]);
  const list=all.filter(e=>e.pacienteId===req.params.id).sort((a,b)=>b.data.localeCompare(a.data));
  res.json({ok:true,item:list[0]||null});
});
app.post("/api/pacientes/:id/evolucoes", async (req,res)=>{
  const {texto,tipo,data}=req.body||{}; if(!texto) return res.status(400).json({ok:false,error:"texto vazio"});
  const all=await readJson(path.join(dataDir,"evolucoes.json"),[]);
  const evo={ id:genId(), pacienteId:req.params.id, tipo:tipo||"Evolução", data:data||new Date().toISOString(), texto };
  all.push(evo); await writeJson(path.join(dataDir,"evolucoes.json"),all); res.json({ok:true,item:evo});
});

// stats
app.get("/api/stats", async (req,res)=>{ const pac=await readJson(path.join(dataDir,"pacientes.json"),[]); const evo=await readJson(path.join(dataDir,"evolucoes.json"),[]);
  res.json({ok:true,pacientes:pac.length,evolucoes:evo.length,prescricoes:0,consultasHoje:0});
});

// estáticos e SPA
app.use("/app/assets", express.static(path.join(pub,"app","assets")));
app.use("/assets", express.static(path.join(pub,"assets")));
app.get(["/","/app"], (req,res)=> res.redirect("/app/"));
app.get("/app/*", (req,res)=> res.sendFile(path.join(pub,"app","index.html")));

const PORT=3030; app.listen(PORT,()=>console.log("OK http://127.0.0.1:"+PORT+"/app/"));