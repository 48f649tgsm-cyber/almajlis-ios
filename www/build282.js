/* BUILD 315 — bounded preparation, retryable failures and original answers. */
(()=>{'use strict';
 const ready=new Set(),pending=new Map();
 function load(src,type){return new Promise(resolve=>{
  const image=type==='image',target=image?new Image():document.createElement(type==='video'?'video':'audio');
  const events=image?['load']:['loadeddata','canplaythrough'];let settled=false;
  const finish=ok=>{if(settled)return;settled=true;clearTimeout(timer);events.forEach(name=>target.removeEventListener(name,onload));target.removeEventListener('error',onerror);if(!image)try{target.pause();target.removeAttribute('src');target.load()}catch(_){};resolve(ok)};
  const onload=()=>finish(true),onerror=()=>finish(false),timer=setTimeout(()=>finish(false),12000);
  events.forEach(name=>target.addEventListener(name,onload));target.addEventListener('error',onerror);
  if(image){target.decoding='async';target.loading='eager'}else{target.preload='auto';target.muted=true;target.playsInline=true}
  try{target.src=src;if(image){if(target.complete&&target.naturalWidth)finish(true)}else target.load()}catch(_){finish(false)}
 })}
 async function preloadUrl(src,type='image'){
  if(!src||ready.has(src))return true;if(pending.has(src))return pending.get(src);
  const promise=load(src,type).then(ok=>{if(ok){ready.add(src);if(ready.size>256)ready.delete(ready.values().next().value)}return ok},()=>false).finally(()=>pending.delete(src));pending.set(src,promise);return promise;
 }
 function questions(source){const out=[];for(const levels of Object.values(source||{}))for(const list of Object.values(levels||{}))for(const q of list||[])if(q)out.push(q);return out}
 function bounded(task){return new Promise(resolve=>{const timer=setTimeout(()=>resolve(''),8000);Promise.resolve().then(task).then(value=>{clearTimeout(timer);resolve(value||'')},()=>{clearTimeout(timer);resolve('')})})}
 async function resolveDynamic(q){
  const m=q?.media;if(!m||typeof window.fetchWikiPlayerImage!=='function')return;
  if(m.type==='wiki_player'&&!m.resolvedSrc)m.resolvedSrc=await bounded(()=>window.fetchWikiPlayerImage(String(m.wiki||q.answer||'').trim()));
  if(m.type==='player_gallery')await Promise.all((m.players||[]).map(async p=>{if(!p.resolvedSrc)p.resolvedSrc=await bounded(()=>window.fetchWikiPlayerImage(String(p.wiki||p.name||'').trim()))}));
 }
 async function preloadMatch(source,button,valid=()=>true){
  const items=questions(source);if(!items.length)return;
  const old=button?.textContent||'جاري تجهيز المباراة…';let completed=0,cursor=0;
  async function worker(){while(cursor<items.length&&valid()){
   const q=items[cursor++];await resolveDynamic(q);if(!valid())return;const m=q.media;
   if(q.answerPhotoSrc)await preloadUrl(q.answerPhotoSrc,'image');
   if(m?.src)await preloadUrl(m.src,m.type);if(m?.resolvedSrc)await preloadUrl(m.resolvedSrc,'image');
   if(!valid())return;
   if(q.answerMedia?.src)await preloadUrl(q.answerMedia.src,q.answerMedia.type);
   for(const p of m?.players||[])if(p.resolvedSrc)await preloadUrl(p.resolvedSrc,'image');
   completed++;if(button&&valid())button.textContent='جاري تجهيز الصور… '+completed+'/'+items.length;
  }}
  try{await Promise.all(Array.from({length:Math.min(6,items.length)},worker))}finally{if(button&&valid())button.textContent=old}
 }
 window.ALMAJLIS_PRELOAD_MATCH=preloadMatch;
})();
