'use strict';

/* ================== Utilities ================== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const enc = new TextEncoder();
const dec = new TextDecoder();

const toB64 = (u8) => btoa(String.fromCharCode(...u8));
const fromB64 = (b64) => new Uint8Array(atob(b64).split('').map(c => c.charCodeAt(0)));
const toHex = (u8) => [...u8].map(b=>b.toString(16).padStart(2,'0')).join('');

function toast(msg, ms=2400){
  const el = $('#toast');
  el.textContent = msg; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), ms);
}

/* ================== IndexedDB Wrapper ================== */
const DB_NAME = 'nsaSecureDB';
const DB_VER = 1;

function openDB(){
  return new Promise((resolve, reject)=>{
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = (e)=>{
      const db = req.result;
      if(!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
      if(!db.objectStoreNames.contains('blocks')) db.createObjectStore('blocks', {keyPath:'index'});
      if(!db.objectStoreNames.contains('audit')) db.createObjectStore('audit', {keyPath:'id'});
      if(!db.objectStoreNames.contains('mempool')) db.createObjectStore('mempool', {keyPath:'id'});
      if(!db.objectStoreNames.contains('patients')) db.createObjectStore('patients', {keyPath:'id'});
    };
    req.onsuccess = ()=> resolve(req.result);
    req.onerror = ()=> reject(req.error);
  });
}

function idbGet(db, store, key){
  return new Promise((resolve,reject)=>{
    const tx = db.transaction(store,'readonly');
    const st = tx.objectStore(store);
    const req = st.get(key);
    req.onsuccess = ()=> resolve(req.result);
    req.onerror = ()=> reject(req.error);
  });
}
function idbSet(db, store, val){
  return new Promise((resolve,reject)=>{
    const tx = db.transaction(store,'readwrite');
    const st = tx.objectStore(store);
    const req = st.put(val);
    req.onsuccess = ()=> resolve(true);
    req.onerror = ()=> reject(req.error);
  });
}
function idbDelete(db, store, key){
  return new Promise((resolve,reject)=>{
    const tx = db.transaction(store,'readwrite');
    const st = tx.objectStore(store);
    const req = st.delete(key);
    req.onsuccess = ()=> resolve(true);
    req.onerror = ()=> reject(req.error);
  });
}
function idbGetAll(db, store){
  return new Promise((resolve,reject)=>{
    const tx = db.transaction(store,'readonly');
    const st = tx.objectStore(store);
    const req = st.getAll();
    req.onsuccess = ()=> resolve(req.result || []);
    req.onerror = ()=> reject(req.error);
  });
}

/* ================== Crypto Engine ================== */
const CryptoEngine = {
  async randomBytes(len=32){
    const u8 = new Uint8Array(len);
    crypto.getRandomValues(u8);
    return u8;
  },
  async sha256(data){
    const buf = typeof data==='string' ? enc.encode(data) : data;
    const h = await crypto.subtle.digest('SHA-256', buf);
    return new Uint8Array(h);
  },
  async sha256hex(data){ return toHex(await this.sha256(data)); },
  async genAesKey(){
    return crypto.subtle.generateKey({name:'AES-GCM', length:256}, true, ['encrypt','decrypt']);
  },
  async aesEncrypt(plain, key){
    const iv = await this.randomBytes(12);
    const data = typeof plain==='string' ? enc.encode(plain) : plain;
    const ct = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, data);
    return { iv: toB64(iv), ct: toB64(new Uint8Array(ct)) };
  },
  async aesDecrypt(payload, key){
    const iv = fromB64(payload.iv);
    const ct = fromB64(payload.ct);
    const pt = await crypto.subtle.decrypt({name:'AES-GCM', iv}, key, ct);
    return new Uint8Array(pt);
  },
  async exportRawKey(key){
    const raw = new Uint8Array(await crypto.subtle.exportKey('raw', key));
    return toB64(raw);
  },
  async importRawKey(b64){
    const raw = fromB64(b64);
    return crypto.subtle.importKey('raw', raw, {name:'AES-GCM'}, true, ['encrypt','decrypt']);
  },
  async deriveWrapKeyFromPassphrase(pass, saltB64){
    const passKey = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']);
    const salt = saltB64 ? fromB64(saltB64) : await this.randomBytes(16);
    const key = await crypto.subtle.deriveKey(
      {name:'PBKDF2', salt, iterations:250000, hash:'SHA-256'},
      passKey,
      {name:'AES-GCM', length:256},
      false,
      ['encrypt','decrypt']
    );
    return {key, salt: toB64(salt)};
  },
  async wrapWithPassphrase(b64Key, pass, saltB64){
    const {key, salt} = await this.deriveWrapKeyFromPassphrase(pass, saltB64);
    const payload = await this.aesEncrypt(b64Key, key);
    return { salt, payload };
  },
  async unwrapWithPassphrase(wrapped, pass){
    const {key} = await this.deriveWrapKeyFromPassphrase(pass, wrapped.salt);
    const u8 = await this.aesDecrypt(wrapped.payload, key);
    return new TextDecoder().decode(u8);
  },
  /* ECDSA P-256 */
  async genECDSA(){
    const kp = await crypto.subtle.generateKey(
      {name:'ECDSA', namedCurve:'P-256'},
      true,
      ['sign','verify']
    );
    return kp;
  },
  async signECDSA(privateKey, data){
    const buf = typeof data==='string' ? enc.encode(data) : data;
    const sig = await crypto.subtle.sign({name:'ECDSA', hash:'SHA-256'}, privateKey, buf);
    return toB64(new Uint8Array(sig));
  },
  async verifyECDSA(publicKey, sigB64, data){
    const buf = typeof data==='string' ? enc.encode(data) : data;
    const sig = fromB64(sigB64);
    return crypto.subtle.verify({name:'ECDSA', hash:'SHA-256'}, publicKey, sig, buf);
  },
  async exportJwk(key){ return await crypto.subtle.exportKey('jwk', key); },
  async importJwk(jwk, usage){
    const alg = jwk.kty==='EC' ? {name:'ECDSA', namedCurve:'P-256'} : {name:'AES-GCM'};
    const keyUsages = usage;
    return crypto.subtle.importKey('jwk', jwk, alg, true, keyUsages);
  },
  /* XOR rotation (ofuscação) */
  xorRotate(u8, seed=13, rounds=1){
    const out = new Uint8Array(u8.length);
    for(let r=0;r<rounds;r++){
      for(let i=0;i<u8.length;i++){
        const k = (seed + i + r) & 0xff;
        out[i] = (u8[i] ^ k);
      }
    }
    out.fill(0, 0, 0); // no-op para GC hint
    return out; // retorno ilustrativo; não usar para dados sensíveis
  },
  async secureId(prefix='id'){
    const now = Date.now().toString();
    const rnd = toB64(await this.randomBytes(16));
    const h = await this.sha256hex(now + ':' + rnd);
    return `${prefix}_${now}_${h.slice(0,16)}`;
  }
};

/* ================== SecureMap ================== */
class SecureMap {
  constructor(db, masterKey){
    this.db = db;
    this.masterKey = masterKey; // CryptoKey AES-GCM
    this.saltKey = 'smSalt';
    this.store = 'kv';
    this.salt = null;
  }
  async ensureSalt(){
    if(this.salt) return;
    let s = await idbGet(this.db, this.store, this.saltKey);
    if(!s){
      const u = await CryptoEngine.randomBytes(16);
      s = toB64(u);
      await idbSet(this.db, this.store, { id: this.saltKey, value: s });
    }else{
      s = s.value;
    }
    this.salt = s;
  }
  async keyHash(key){
    await this.ensureSalt();
    return 'sm_' + await CryptoEngine.sha256hex(this.salt + ':' + key);
  }
  async set(key, value){
    const keyH = await this.keyHash(key);
    const payload = await CryptoEngine.aesEncrypt(JSON.stringify(value), this.masterKey);
    await idbSet(this.db, this.store, { id:keyH, value: payload });
  }
  async get(key){
    const keyH = await this.keyHash(key);
    const row = await idbGet(this.db, this.store, keyH);
    if(!row) return null;
    const u8 = await CryptoEngine.aesDecrypt(row.value, this.masterKey);
    return JSON.parse(dec.decode(u8));
  }
  async del(key){
    const keyH = await this.keyHash(key);
    await idbDelete(this.db, this.store, keyH);
  }
}

/* ================== Blockchain ================== */
class MedicalBlockchain {
  constructor(db){
    this.db = db;
    this.diff = 3;
    this.genesisKey = 'bc_genesis';
    this.blocksStore = 'blocks';
    this.mempoolStore = 'mempool';
  }
  async init(){
    const blocks = await idbGetAll(this.db, this.blocksStore);
    if(blocks.length===0){
      const genesis = await this.createBlock(0, '0'.repeat(64), [{type:'genesis', ts: Date.now()}]);
      await idbSet(this.db, this.blocksStore, genesis);
    }
  }
  async setDifficulty(n){ this.diff = Math.max(1, Math.min(6, n|0)); }
  async lastBlock(){
    const all = await idbGetAll(this.db, this.blocksStore);
    if(all.length===0) return null;
    return all.sort((a,b)=>a.index-b.index)[all.length-1];
  }
  async addTx(tx){
    const id = await CryptoEngine.secureId('tx');
    const payload = JSON.stringify(tx);
    const hash = await CryptoEngine.sha256hex(payload);
    await idbSet(this.db, this.mempoolStore, {id, hash, payload, ts: Date.now()});
  }
  async mempool(){ return await idbGetAll(this.db, this.mempoolStore); }
  async mine(){
    const prev = await this.lastBlock();
    const pool = await this.mempool();
    const txs = pool.map(x=>({id:x.id, hash:x.hash}));
    const block = await this.createBlock(prev.index+1, prev.hash, txs);
    await idbSet(this.db, this.blocksStore, block);
    // clear mempool
    for(const t of pool){ await idbDelete(this.db, this.mempoolStore, t.id); }
    return block;
  }
  async createBlock(index, prevHash, transactions){
    const ts = Date.now();
    let nonce = 0;
    let hash = '';
    const difficulty = this.diff;
    const dataHash = await CryptoEngine.sha256hex(JSON.stringify(transactions));
    while(true){
      const base = JSON.stringify({index, ts, prevHash, nonce, dataHash});
      hash = await CryptoEngine.sha256hex(base);
      if(hash.startsWith('0'.repeat(difficulty))) break;
      nonce++;
    }
    return { index, ts, prevHash, nonce, dataHash, hash, difficulty };
  }
  async validate(){
    const blocks = (await idbGetAll(this.db, this.blocksStore)).sort((a,b)=>a.index-b.index);
    for(let i=0;i<blocks.length;i++){
      const b = blocks[i];
      // recompute
      const base = JSON.stringify({index:b.index, ts:b.ts, prevHash:b.prevHash, nonce:b.nonce, dataHash:b.dataHash});
      const hash = await CryptoEngine.sha256hex(base);
      if(hash!==b.hash || !b.hash.startsWith('0'.repeat(b.difficulty))) return false;
      if(i>0 && b.prevHash!==blocks[i-1].hash) return false;
    }
    return true;
  }
  async stats(){
    const blocks = await idbGetAll(this.db, this.blocksStore);
    const pool = await this.mempool();
    return { blocks: blocks.length, mempool: pool.length, diff: this.diff };
  }
  async allBlocks(){ return (await idbGetAll(this.db, this.blocksStore)).sort((a,b)=>b.index-a.index); }
}

/* ================== AI Engine (Nefro, explainable) ================== */
const MedicalAIEngine = {
  riskScore(patient){
    // Simple, explainable scoring
    let score = 1;
    const age = Number(patient.idade||0);
    const egfr = Number(patient.egfr||0);
    const k = Number(patient.k||0);
    const pas = Number(patient.pas||0);
    if(age>=65) score+=2; else if(age>=50) score+=1;
    if(patient.dm) score+=2;
    if(patient.ha) score+=1;
    if(patient.drc) score+=2;
    if(egfr<30) score+=3; else if(egfr<60) score+=1;
    if(k>=6) score+=3; else if(k>=5.5) score+=2; else if(k>=5.0) score+=1;
    if(pas>=180) score+=2; else if(pas>=160) score+=1;
    score = Math.max(1, Math.min(10, score));
    const classif = score>=8?'alto':score>=5?'moderado':'baixo';
    return {score, classif};
  },
  diagnosticSupport(patient){
    const out = [];
    const egfr = Number(patient.egfr||0);
    const k = Number(patient.k||0);
    const pas = Number(patient.pas||0);
    // AKI/DRC heuristics (didático)
    if(egfr<60) out.push('DRC possível — correlacionar com histórico');
    if(k>=5.5) out.push('Hipercalemia: confirmar e repetir K; checar ECG');
    if(pas>=160) out.push('HAS estágio 2 — avaliar ajuste terapêutico');
    if(out.length===0) out.push('Sem alertas maiores nas variáveis fornecidas.');
    return out;
  },
  analyzeRecord(text){
    const s = (text||'').toLowerCase();
    const neg = ['dor','piora','edema','dispneia','oliguria','hipercalemia','acidose','sepsis','choque'];
    const pos = ['melhora','estavel','sem dor','orientado','afebril','compensado'];
    let sp = 0, sn = 0;
    for(const w of pos) if(s.includes(w)) sp++;
    for(const w of neg) if(s.includes(w)) sn++;
    const sentiment = sn>sp ? 'negativo' : sn===sp ? 'neutro':'positivo';
    const tokens = s.replace(/[^\p{L}\p{N}]+/gu,' ').split(' ').filter(Boolean);
    const counts = Object.create(null);
    for(const t of tokens){ counts[t] = (counts[t]||0)+1; }
    const keywords = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,10).map(x=>x[0]);
    const complexity = Math.min(10, Math.ceil((new Set(tokens)).size / 20));
    return { sentiment, keywords, complexity };
  }
};

/* ================== Security Monitor ================== */
class SecurityMonitor {
  constructor(db){
    this.db = db;
    this.prevHash = '0'.repeat(64);
  }
  async log(type, data){
    const ts = Date.now();
    const base = JSON.stringify({type, data, ts, prev:this.prevHash});
    const hash = await CryptoEngine.sha256hex(base);
    const id = await CryptoEngine.secureId('log');
    await idbSet(this.db,'audit',{id, type, data, ts, prev:this.prevHash, hash});
    this.prevHash = hash;
  }
  async export(){
    const all = (await idbGetAll(this.db,'audit')).sort((a,b)=>a.ts-b.ts);
    return all;
  }
  async verify(){
    const all = (await idbGetAll(this.db,'audit')).sort((a,b)=>a.ts-b.ts);
    let prev = '0'.repeat(64);
    for(const r of all){
      const base = JSON.stringify({type:r.type, data:r.data, ts:r.ts, prev:prev});
      const h = await CryptoEngine.sha256hex(base);
      if(h!==r.hash) return false;
      prev = h;
    }
    return true;
  }
  async scan(){
    const start = performance.now();
    // Loop pesado para medir lag do event loop (heurística)
    let x = 0; for(let i=0;i<4e6;i++){ x+=i; }
    const lag = performance.now() - start;
    const threat = lag>200 ? 'elevado' : lag>120 ? 'moderado' : 'ok';
    await this.log('scan', {lag_ms: Math.round(lag), threat});
    return {lag_ms: Math.round(lag), threat};
  }
}

/* ================== Patient Service ================== */
class PatientService {
  constructor(db, masterKey){
    this.db = db;
    this.sec = new SecureMap(db, masterKey);
  }
  async save(p){
    if(!p.id) p.id = await CryptoEngine.secureId('pac');
    await this.sec.set('patient:'+p.id, p);
    await idbSet(this.db,'patients',{id:p.id, name:p.nome, idx: (p.nome||'').toLowerCase()});
    return p.id;
  }
  async get(id){ return await this.sec.get('patient:'+id); }
  async list(){
    const idx = await idbGetAll(this.db,'patients');
    const res = [];
    for(const it of idx){
      const p = await this.get(it.id);
      if(p) res.push(p);
    }
    return res;
  }
  async search(q){
    const s = (q||'').toLowerCase();
    const idx = await idbGetAll(this.db,'patients');
    const hits = idx.filter(it=> it.idx.includes(s));
    const res = [];
    for(const h of hits){
      const p = await this.get(h.id);
      if(p) res.push(p);
    }
    return res;
  }
}

/* ================== App State ================== */
const App = {
  db: null,
  masterKey: null,
  ecdsa: {pub:null, priv:null},
  bc: null,
  sm: null,
  secmon: null,
  patients: null,
  startedAt: Date.now(),
};

async function init(){
  App.db = await openDB();
  App.bc = new MedicalBlockchain(App.db);
  await App.bc.init();
  App.secmon = new SecurityMonitor(App.db);
  updateDashboard();
  bindUI();
  setInterval(updateUptime, 1000);
  await App.secmon.log('app_start', {ts: Date.now()});
  await refreshBlockchainUI();
  await refreshLogs();
}
document.addEventListener('DOMContentLoaded', init);

function bindUI(){
  // Tabs
  $$('.tablink').forEach(b=> b.addEventListener('click', ()=>{
    $$('.tablink').forEach(x=>x.classList.remove('active')); b.classList.add('active');
    const tab = b.dataset.tab;
    $$('.tab').forEach(s=>s.classList.remove('active'));
    $('#tab-'+tab).classList.add('active');
  }));
  // Key buttons
  $('#btnGenKeys').addEventListener('click', onGenKeys);
  $('#btnLoadKeys').addEventListener('click', onLoadKeys);
  $('#btnLock').addEventListener('click', onLock);
  // Patients
  $('#frmPaciente').addEventListener('submit', onSavePatient);
  $('#btnNovoPaciente').addEventListener('click', ()=> resetPatientForm());
  $('#pacSearch').addEventListener('input', debounce(async (e)=>{
    const q = e.target.value;
    const list = q ? await App.patients.search(q) : await App.patients.list();
    renderPatientList(list);
  }, 250));
  // EHR
  $('#btnEhrApplyTemplate').addEventListener('click', applyEhrTemplate);
  $('#btnEhrSave').addEventListener('click', saveEhr);
  $('#btnEhrSign').addEventListener('click', signEhr);
  // Blockchain
  $('#btnBcAddTx').addEventListener('click', openTxModal);
  $('#btnMine').addEventListener('click', mineBlock);
  $('#btnMine2').addEventListener('click', mineBlock);
  $('#inpDiff').addEventListener('change', async (e)=>{
    await App.bc.setDifficulty(Number(e.target.value));
    await App.secmon.log('bc_diff_set', {diff: Number(e.target.value)});
    await refreshBlockchainUI();
  });
  // Security
  $('#btnScan').addEventListener('click', doScan);
  $('#btnExportLogs').addEventListener('click', exportLogs);
  // Keyboard shortcuts
  window.addEventListener('keydown', onShortcuts);
}

function debounce(fn, ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), ms);} }

/* ================== Key Management ================== */
async function onGenKeys(){
  const pass = prompt('Defina uma passphrase forte para proteger suas chaves:');
  if(!pass){ toast('Operação cancelada'); return; }

  const masterKey = await CryptoEngine.genAesKey();
  const b64Master = await CryptoEngine.exportRawKey(masterKey);

  const wrap = await CryptoEngine.wrapWithPassphrase(b64Master, pass);
  localStorage.setItem('wrappedMasterKey', JSON.stringify(wrap));

  const ecdsa = await CryptoEngine.genECDSA();
  const jwkPriv = await CryptoEngine.exportJwk(ecdsa.privateKey);
  const jwkPub  = await CryptoEngine.exportJwk(ecdsa.publicKey);
  const wrapPriv = await CryptoEngine.wrapWithPassphrase(JSON.stringify(jwkPriv), pass);
  const wrapPub = await CryptoEngine.wrapWithPassphrase(JSON.stringify(jwkPub), pass);
  localStorage.setItem('wrappedECDSAPriv', JSON.stringify(wrapPriv));
  localStorage.setItem('wrappedECDSAPub', JSON.stringify(wrapPub));

  // mount session
  App.masterKey = masterKey;
  App.ecdsa = {priv: ecdsa.privateKey, pub: ecdsa.publicKey};
  App.sm = new SecureMap(App.db, App.masterKey);
  App.patients = new PatientService(App.db, App.masterKey);
  await App.secmon.log('keys_generated', {ts: Date.now()});
  toast('Chaves geradas e carregadas na sessão.');
}

async function onLoadKeys(){
  const pass = prompt('Informe sua passphrase para desbloquear:');
  if(!pass){ toast('Operação cancelada'); return; }
  const wrM = localStorage.getItem('wrappedMasterKey');
  const wrPriv = localStorage.getItem('wrappedECDSAPriv');
  const wrPub = localStorage.getItem('wrappedECDSAPub');
  if(!wrM || !wrPriv || !wrPub){ toast('Chaves não encontradas no navegador. Gere novas.'); return; }
  try{
    const b64Master = await CryptoEngine.unwrapWithPassphrase(JSON.parse(wrM), pass);
    App.masterKey = await CryptoEngine.importRawKey(b64Master);
    const jwkPriv = JSON.parse(await CryptoEngine.unwrapWithPassphrase(JSON.parse(wrPriv), pass));
    const jwkPub = JSON.parse(await CryptoEngine.unwrapWithPassphrase(JSON.parse(wrPub), pass));
    App.ecdsa.priv = await CryptoEngine.importJwk(jwkPriv, ['sign']);
    App.ecdsa.pub  = await CryptoEngine.importJwk(jwkPub, ['verify']);
    App.sm = new SecureMap(App.db, App.masterKey);
    App.patients = new PatientService(App.db, App.masterKey);
    await App.secmon.log('keys_unwrapped', {ts: Date.now()});
    toast('Sessão desbloqueada.');
  }catch(e){
    console.error(e);
    toast('Falha ao desbloquear (passphrase incorreta?)');
  }
}

async function onLock(){
  App.masterKey = null; App.ecdsa = {pub:null, priv:null}; App.sm=null; App.patients=null;
  await App.secmon.log('session_locked', {ts: Date.now()});
  toast('Sessão bloqueada. Recarregue chaves para continuar.');
}

/* ================== Dashboard ================== */
async function updateDashboard(){
  const st = await App.bc.stats();
  $('#bcBlocks').textContent = st.blocks;
  $('#bcMempool').textContent = st.mempool;
  $('#bcDifficulty').textContent = st.diff;
}
function updateUptime(){
  const s = Math.floor((Date.now() - App.startedAt)/1000);
  $('#uptime').textContent = s+'s';
}

/* ================== Patients UI ================== */
function resetPatientForm(){
  $('#frmPaciente').reset();
}
async function onSavePatient(e){
  e.preventDefault();
  if(!App.patients){ toast('Desbloqueie a sessão antes de salvar.'); return; }
  const p = {
    id: $('#frmPaciente').dataset.editing || null,
    nome: $('#p_nome').value.trim(),
    idade: Number($('#p_idade').value||0),
    sexo: $('#p_sexo').value,
    altura: Number($('#p_altura').value||0),
    peso: Number($('#p_peso').value||0),
    dm: $('#p_dm').checked,
    ha: $('#p_ha').checked,
    drc: $('#p_drc').checked,
    egfr: Number($('#p_egfr').value||0),
    k: Number($('#p_k').value||0),
    pas: Number($('#p_pas').value||0),
  };
  const id = await App.patients.save(p);
  $('#frmPaciente').dataset.editing = id;
  await App.secmon.log('patient_saved', {id, nome:p.nome});
  toast('Paciente salvo.');
  const list = await App.patients.list();
  renderPatientList(list);
}
function renderPatientList(list){
  const ul = $('#pacList'); ul.innerHTML='';
  if(!list || list.length===0){ ul.innerHTML='<li><span>Nenhum paciente</span></li>'; return; }
  for(const p of list){
    const {score, classif} = MedicalAIEngine.riskScore(p);
    const li = document.createElement('li');
    li.innerHTML = `<div>
      <div><strong>${p.nome}</strong> — ${p.sexo}, ${p.idade}a</div>
      <small>Risco IA: ${score}/10 (${classif}) — eGFR: ${p.egfr||'—'} | K: ${p.k||'—'} | PAS: ${p.pas||'—'}</small>
    </div>
    <div>
      <button data-id="${p.id}" class="ghost btnOpen">Abrir</button>
      <button data-id="${p.id}" class="secondary btnAI">IA</button>
    </div>`;
    ul.appendChild(li);
  }
  ul.querySelectorAll('.btnOpen').forEach(b=> b.addEventListener('click', async (ev)=>{
    const id = ev.target.dataset.id;
    const p = await App.patients.get(id);
    if(!p) return;
    $('#frmPaciente').dataset.editing = id;
    $('#p_nome').value = p.nome||'';
    $('#p_idade').value = p.idade||'';
    $('#p_sexo').value = p.sexo||'M';
    $('#p_altura').value = p.altura||'';
    $('#p_peso').value = p.peso||'';
    $('#p_dm').checked = !!p.dm;
    $('#p_ha').checked = !!p.ha;
    $('#p_drc').checked = !!p.drc;
    $('#p_egfr').value = p.egfr||'';
    $('#p_k').value = p.k||'';
    $('#p_pas').value = p.pas||'';
    $('#ehr_pid').value = id;
    toast('Paciente carregado.');
  }));
  ul.querySelectorAll('.btnAI').forEach(b=> b.addEventListener('click', async (ev)=>{
    const id = ev.target.dataset.id;
    const p = await App.patients.get(id);
    if(!p) return;
    const risk = MedicalAIEngine.riskScore(p);
    const sup = MedicalAIEngine.diagnosticSupport(p);
    alert(`Risco: ${risk.score}/10 (${risk.classif})\nSugestões:\n- ${sup.join('\n- ')}`);
  }));
}

/* ================== EHR ================== */
function applyEhrTemplate(){
  const t = $('#ehr_template').value;
  const pid = $('#ehr_pid').value.trim();
  if(!pid){ toast('Selecione/Informe um paciente.'); return; }
  if(t==='evol-nefro'){
    $('#ehr_editor').value =
`Histórico: Paciente ${pid}. Queixa principal/curso clínico atual...
Exame físico: PA ___/___, FC __, FR __, SatO2 __, t°, edema ___.
Laboratório: eGFR __, K __, Hb __, Na __, HCO3 __.
Impressão clínica: ...
Conduta: ...
`;
  } else {
    $('#ehr_editor').value =
`Prescrição (exemplo)
• Dieta ___
• Hidratação ___
• Medicações: ...
• Hemodiálise: ...
• Monitorização: ...
`;
  }
  toast('Template aplicado.');
}
async function saveEhr(){
  if(!App.sm){ toast('Desbloqueie a sessão.'); return; }
  const pid = $('#ehr_pid').value.trim();
  const txt = $('#ehr_editor').value;
  if(!pid){ toast('Informe ID de paciente.'); return; }
  await App.sm.set('ehr:'+pid, { ts: Date.now(), text: txt });
  await App.secmon.log('ehr_saved', {pid});
  toast('Prontuário salvo (criptografado).');
}
async function signEhr(){
  if(!App.ecdsa.priv){ toast('Gere/Carregue chaves primeiro.'); return; }
  const pid = $('#ehr_pid').value.trim();
  const txt = $('#ehr_editor').value;
  if(!pid || !txt){ toast('Preencha paciente e texto.'); return; }
  const hash = await CryptoEngine.sha256hex(txt);
  const sig = await CryptoEngine.signECDSA(App.ecdsa.priv, enc.encode(hash));
  $('#ehrSignInfo').textContent = `Assinado: hash=${hash.slice(0,16)}… sig=${sig.slice(0,16)}…`;
  await App.secmon.log('ehr_signed', {pid, hash: hash});
  toast('Prontuário assinado (ECDSA).');
}

/* ================== Blockchain UI ================== */
async function openTxModal(){
  $('#modalTx').showModal();
}
$('#modalTx')?.addEventListener('close', ()=>{});

$('#btnTxSave')?.addEventListener('click', async (e)=>{
  e.preventDefault();
  const pid = $('#tx_pid').value.trim();
  const tipo = $('#tx_tipo').value.trim();
  let payload = $('#tx_json').value.trim();
  try{ payload = payload ? JSON.parse(payload) : {}; }catch{ payload = {raw: $('#tx_json').value}; }
  if(!pid || !tipo){ toast('Preencha paciente e tipo.'); return; }
  const tx = { pid, tipo, payload, ts: Date.now() };
  await App.bc.addTx(tx);
  await App.secmon.log('bc_tx_add', {pid, tipo});
  $('#modalTx').close();
  await refreshBlockchainUI();
  toast('Transação adicionada.');
});

async function mineBlock(){
  const b = await App.bc.mine();
  await App.secmon.log('bc_mined', {index:b.index, hash:b.hash.slice(0,16)});
  await refreshBlockchainUI();
  toast('Bloco minerado.');
}

async function refreshBlockchainUI(){
  await updateDashboard();
  const ok = await App.bc.validate();
  $('#threatLevel').textContent = ok ? 'Ok' : 'Alerta';
  const list = $('#bcList'); list.innerHTML='';
  const blocks = await App.bc.allBlocks();
  for(const b of blocks){
    const li = document.createElement('li');
    li.innerHTML = `<div>
      <div><strong>#${b.index}</strong> — ${new Date(b.ts).toLocaleString()}</div>
      <small>hash=${b.hash.slice(0,24)}… prev=${b.prevHash.slice(0,12)}… nonce=${b.nonce} diff=${b.difficulty}</small>
    </div>
    <div><code class="mono">dataHash=${b.dataHash.slice(0,16)}…</code></div>`;
    list.appendChild(li);
  }
}

/* ================== Security ================== */
async function doScan(){
  const res = await App.secmon.scan();
  $('#scanOutput').textContent = JSON.stringify(res, null, 2);
  toast('Scan concluído.');
}
async function exportLogs(){
  const logs = await App.secmon.export();
  const ok = await App.secmon.verify();
  const blob = new Blob([JSON.stringify({ok, logs}, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'audit_logs.json';
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  toast('Logs exportados.');
}

/* ================== Shortcuts ================== */
function onShortcuts(e){
  if(e.ctrlKey && e.key.toLowerCase()==='k'){ e.preventDefault(); $('#pacSearch').focus(); }
  if(e.ctrlKey && e.shiftKey && e.key.toLowerCase()==='n'){ e.preventDefault(); resetPatientForm(); $('#p_nome').focus(); }
  if(e.ctrlKey && e.key.toLowerCase()==='s'){
    const tabActive = $$('.tab').find(t=>t.classList.contains('active'));
    if(tabActive?.id==='tab-prontuario'){ e.preventDefault(); saveEhr(); }
  }
  if(e.key==='Escape'){
    const dlg = $('#modalTx'); if(dlg && dlg.open) dlg.close();
  }
}
