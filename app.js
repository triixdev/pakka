const $=s=>document.querySelector(s);
const h=(t,a={},...k)=>{const e=document.createElement(t);for(const x in a)x in e?e[x]=a[x]:e.setAttribute(x,a[x]);e.append(...k);return e};
const enc=new TextEncoder(),dec=new TextDecoder();
const b64=b=>{let s='';new Uint8Array(b).forEach(c=>s+=String.fromCharCode(c));return btoa(s)};
const unb=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const today=()=>new Date().toISOString().slice(0,10);
const fmt=d=>new Date(d+'T00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const NAME={term:'Told to me',photo:'Room photo',payment:'Payment'};
let items=[],pass=null;
const idb=()=>new Promise((r,j)=>{const q=indexedDB.open('pakka',1);q.onupgradeneeded=()=>q.result.createObjectStore('s');q.onsuccess=()=>r(q.result);q.onerror=()=>j(q.error)});
const op=async(m,v)=>{const d=await idb();return new Promise((r,j)=>{const t=d.transaction('s',m==='get'?'readonly':'readwrite'),s=t.objectStore('s'),q=m==='get'?s.get('v'):m==='put'?s.put(v,'v'):s.delete('v');t.oncomplete=()=>r(q.result);t.onerror=t.onabort=()=>j(t.error||q.error||new Error('Storage failed'))})};
const key=async(p,salt)=>crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:250000,hash:'SHA-256'},await crypto.subtle.importKey('raw',enc.encode(p),'PBKDF2',false,['deriveKey']),{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
async function save(){const j=JSON.stringify(items);if(!pass)return op('put',{plain:j});
const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12));
const c=await crypto.subtle.encrypt({name:'AES-GCM',iv},await key(pass,salt),enc.encode(j));
return op('put',{salt:b64(salt),iv:b64(iv),data:b64(c)})}
async function load(){const v=await op('get');if(!v)return;if(v.plain){items=JSON.parse(v.plain);return}
$('#lock').hidden=false;$('main').hidden=true;
await new Promise(res=>{$('#unlock').onsubmit=async e=>{e.preventDefault();const p=$('#up').value;
try{const d=await crypto.subtle.decrypt({name:'AES-GCM',iv:unb(v.iv)},await key(p,unb(v.salt)),unb(v.data));
items=JSON.parse(dec.decode(d));pass=p;$('#lock').hidden=true;$('main').hidden=false;res()}catch{$('#lerr').textContent='Wrong passphrase. Try again.'}}})}
async function sha(buf){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',buf))].map(x=>x.toString(16).padStart(2,'0')).join('')}
const shrink=f=>new Promise(r=>{const i=new Image();i.onload=()=>{const s=Math.min(1,800/i.width),c=h('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);URL.revokeObjectURL(i.src);r(c.toDataURL('image/jpeg',.7))};i.src=URL.createObjectURL(f)});
function confirmLink(i){const t=`Hi. Confirming what you told me on ${fmt(i.date)}: ${i.what}${i.note?' ('+i.note+')':''}. Please reply to confirm. Thank you.`;
const send=h('a',{href:'https://wa.me/?text='+encodeURIComponent(t),target:'_blank',rel:'noopener'},'Send as written confirmation');
const copy=h('button',{type:'button',className:'quiet noprint',onclick:async e=>{try{await navigator.clipboard.writeText(t);e.currentTarget.textContent='Copied'}catch{e.currentTarget.textContent='Copy failed'}}},'Copy text');
return h('div',{className:'confirmation'},h('p',{},t),send,' ',copy)}
function render(){const t=$('#tl');t.replaceChildren();
if(!items.length)t.append(h('p',{},'Nothing logged yet. Start with one thing your landlord told you.'));
items.slice().sort((a,b)=>a.date.localeCompare(b.date)).forEach(i=>{
const b=h('div',{},h('div',{className:'kind'},NAME[i.type]),h('div',{},i.what));
if(i.note)b.append(h('div',{},i.note));
if(i.days)b.append(h('div',{},`Notice period: ${i.days} days`));
if(i.img)b.append(h('img',{src:i.img,alt:i.what}));
if(i.hash)b.append(h('div',{className:'hash'},'Fingerprint '+i.hash));
if(i.type==='term')b.append(confirmLink(i),' ');
b.append(h('button',{className:'quiet noprint',onclick:async()=>{items=items.filter(x=>x.id!==i.id);await save();render();notice()}},'Remove'));
t.append(h('div',{className:'entry'},h('div',{className:'stamp'},fmt(i.date)),b))});notice()}
function notice(){const d=$('#mv').value,n=Math.max(0,...items.map(i=>i.days||0));
$('#nt').textContent=!n?'Log a notice period to see your date.':!d?`Longest notice period logged: ${n} days.`:
`Give notice by ${fmt(new Date(new Date(d+'T00:00').getTime()-n*864e5).toISOString().slice(0,10))}.`}
$('#mv').onchange=notice;
$('#f').onsubmit=async e=>{e.preventDefault();const f=e.target;$('#busy').hidden=false;$('#saveError').textContent='';let o;
try{o={id:crypto.randomUUID(),type:f.kind.value,date:f.date.value,what:f.what.value.trim(),note:f.note.value.trim(),days:+f.days.value||0};
const p=f.pic.files[0];if(p){o.hash=await sha(await p.arrayBuffer());o.img=await shrink(p)}
items.push(o);await save()}
catch(error){if(o&&items[items.length-1]===o)items.pop();$('#saveError').textContent='Could not save this entry. It was not added. Try again.';$('#busy').hidden=true;return}
f.reset();f.date.value=today();render();$('#busy').hidden=true};
$('#mk').onclick=async()=>{const p=$('#pack');p.replaceChildren(h('div',{className:'sk'}),h('div',{className:'sk'}),h('div',{className:'sk'}));
await new Promise(r=>setTimeout(r,500));
const s=items.slice().sort((a,b)=>a.date.localeCompare(b.date)),mv=$('#mv').value;
const L=s.map(i=>`${fmt(i.date)}  ${NAME[i.type]}: ${i.what}${i.note?' ('+i.note+')':''}${i.hash?'\n    Fingerprint '+i.hash:''}`).join('\n');
p.replaceChildren(h('h2',{},'Deposit refund request'),h('div',{className:'letter'},
`To the owner,\n\nI am moving out${mv?' on '+fmt(mv):''}. Please return my security deposit. This is my record of what we agreed and what I paid.\n\n${L||'No entries yet.'}\n\nPlease reply in writing with the date I will receive my deposit.\n\nThank you.`));
 p.append(h('p',{},'A fingerprint shows a file has not changed since it was added and is not legal proof.'));
$('#pr').hidden=false};
$('#pr').onclick=()=>print();
$('#lk').onclick=async()=>{const p=prompt('Choose a passphrase. It cannot be recovered if you forget it. Export first and keep that unencrypted file somewhere safe.');if(p){pass=p;await save()}};
$('#ex').onclick=()=>{alert('This export file is not encrypted. Keep it somewhere safe.');const a=h('a',{href:URL.createObjectURL(new Blob([JSON.stringify(items)],{type:'application/json'})),download:'pakka-export.json'});a.click()};
const wipe=async()=>{if(confirm('Delete every entry on this device? This cannot be undone.')){await op('del');items=[];pass=null;location.reload()}};
$('#wipe').onclick=$('#wipe2').onclick=wipe;
(async()=>{$('#date').value=today();await load();render()})();
