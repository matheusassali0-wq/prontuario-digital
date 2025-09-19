export function startDictation(onText:(t:string)=>void){
  const w:any=window; const SR=(w.SpeechRecognition||w.webkitSpeechRecognition); if(!SR){ alert('Seu navegador não suporta Web Speech API'); return null; }
  const r=new SR(); r.lang='pt-BR'; r.continuous=true; r.interimResults=true;
  r.onresult=(e:any)=>{ let txt=''; for(let i=e.resultIndex;i<e.results.length;i++){ txt+=e.results[i][0].transcript; } onText(txt) };
  r.start(); return r;
}
export function stopDictation(r:any){ try{ r&&r.stop&&r.stop(); }catch{} }

type Sug={label:string,score:number,why:string};
function match(rx:RegExp,t:string){ const m=t.match(rx); return m? m[0]:null }

// CKD-EPI 2021 simplificado (sem raça). Precisa sexo, idade e creatinina (mg/dL).
export function eGFR_CKDEPI_2021(creat:number, age:number, sex:'M'|'F'){
  const k = sex==='F' ? 0.7 : 0.9;
  const a = sex==='F' ? -0.241 : -0.302;
  const alpha = Math.min(creat/k,1)**a;
  const beta  = Math.max(creat/k,1)**(-1.2);
  return 142 * alpha * beta * (0.9938**age);
}

export function analisarTexto(texto:string){
  const t=texto.toLowerCase();
  const sugs:Sug[]=[];
  if(/doen[cç]a renal cr[oô]nica|drc|n18/.test(t)) sugs.push({label:'N18 Doença renal crônica',score:0.9,why:'menção direta (DRC/N18)'});
  if(/hemodi[aá]lise|trs|kt\/?v/.test(t)) sugs.push({label:'Z49.2 Hemodiálise',score:0.7,why:'menção de TRS/HD/Kt/V'});
  if(/hipertens[aã]o|has|pa [1-2]?\d{2}\/\d{2}/.test(t)) sugs.push({label:'I10 Hipertensão essencial',score:0.6,why:'pressão/termo HAS'});
  if(/diabetes|dm2|dm 2|dm tipo 2/.test(t)) sugs.push({label:'E11 Diabetes mellitus tipo 2',score:0.5,why:'termo DM'});
  // extrair creatinina, idade e sexo se constar
  const creatStr=match(/creat(inina)?\s*[:=]?\s*(\d+(\.\d+)?)/,t); let creat=creatStr? parseFloat(creatStr.replace(/[^\d\.]/g,'')):null;
  const idadeStr=match(/(\b\d{2})\s*anos\b/,t); const idade=idadeStr? parseInt(idadeStr):null;
  const sexo = /sexo:\s*f|feminino/.test(t)?'F':(/sexo:\s*m|masculino/.test(t)?'M':null);
  let egfr=null as null|number; if(creat&&idade!=null&&sexo){ egfr=eGFR_CKDEPI_2021(creat,idade,sexo as any) }
  const alertas:string[]=[];
  if(egfr!==null){ if(egfr<15) alertas.push('eGFR <15 (DRC G5)'); else if(egfr<30) alertas.push('eGFR <30 (G4)'); else if(egfr<60) alertas.push('eGFR <60 (G3)'); }
  if(/k[tf]\s*\/?\s*v\s*[:=]?\s*(\d+(\.\d+)?)/.test(t)){ const v=parseFloat(RegExp.); if(v<1.2) alertas.push('Kt/V abaixo da meta'); }
  return {sugs, egfr, alertas};
}

export const templates={
  primeiraNefro:
    'ANAMNESE (S)\\nMotivo: ...\\nHistória: ...\\nComorbidades: HAS/DM/...\\nMedicações: ...\\n\\nEXAME (O)\\nPA: __/__ mmHg  FC: __ bpm  Peso: __ kg\\n\\nAVALIAÇÃO (A)\\nDRC estágio __ (eGFR __ mL/min/1,73m²).\\n\\nCONDUTA (P)\\nExames: ... | Ajustes: ... | Retorno: ...',
  hemodialise:
    'HD crônica. Kt/V alvo ≥1,2. Intercorrências: ...\\nPressões: ... UF: ... Ganho interdialítico: ...\\nCondutas: ...',
  intercorrencia:
    'Intercorrência: ...\\nSinais vitais: ...\\nConduta imediata: ... | Reavaliação: ...'
};


