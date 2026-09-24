/* BUILD 282 — full-frame question media and match-first preloading */
(()=>{'use strict';
 const BUILD='282',ready=new Set();
 const wait=(target,okEvents,timeout=15000)=>new Promise(resolve=>{let done=false;const finish=()=>{if(done)return;done=true;clearTimeout(timer);okEvents.forEach(name=>target.removeEventListener(name,finish));resolve()};okEvents.forEach(name=>target.addEventListener(name,finish,{once:true}));target.addEventListener('error',finish,{once:true});const timer=setTimeout(finish,timeout)});
 async function preloadUrl(src,type='image'){
  if(!src||ready.has(src))return;ready.add(src);
  if(type==='image'){
   const image=new Image();image.decoding='async';image.loading='eager';image.src=src;
   if(image.complete&&image.naturalWidth)return;
   try{if(image.decode)await Promise.race([image.decode(),new Promise(resolve=>setTimeout(resolve,15000))]);else await wait(image,['load'])}catch(_){if(!(image.complete&&image.naturalWidth))await wait(image,['load'],3000)}
   return;
  }
  const media=document.createElement(type==='video'?'video':'audio');media.preload='auto';media.muted=true;media.playsInline=true;media.src=src;media.load();await wait(media,['loadeddata','canplaythrough'],12000);
 }
 function questions(source){const out=[];for(const levels of Object.values(source||{}))for(const list of Object.values(levels||{}))for(const q of list||[])if(q)out.push(q);return out}
 async function resolveDynamic(q){
  const m=q?.media;if(!m)return;
  if(m.type==='wiki_player'&&!m.resolvedSrc&&typeof window.fetchWikiPlayerImage==='function'){
   try{m.resolvedSrc=await window.fetchWikiPlayerImage(String(m.wiki||q.answer||'').trim())}catch(_){ }
  }
  if(m.type==='player_gallery'&&typeof window.fetchWikiPlayerImage==='function'){
   await Promise.all((m.players||[]).map(async p=>{if(p.resolvedSrc)return;try{p.resolvedSrc=await window.fetchWikiPlayerImage(String(p.wiki||p.name||'').trim())}catch(_){ }}));
  }
 }
 async function preloadMatch(source,button){
  const items=questions(source);if(!items.length)return;
  const old=button?.textContent||'جاري تجهيز المباراة…';let completed=0,cursor=0;
  async function worker(){while(cursor<items.length){const q=items[cursor++];await resolveDynamic(q);const m=q.media;if(q.answerPhotoSrc)await preloadUrl(q.answerPhotoSrc,'image');if(m?.src)await preloadUrl(m.src,m.type);if(m?.resolvedSrc)await preloadUrl(m.resolvedSrc,'image');for(const p of m?.players||[])if(p.resolvedSrc)await preloadUrl(p.resolvedSrc,'image');completed++;if(button)button.textContent='جاري تجهيز الصور… '+completed+'/'+items.length}}
  await Promise.all(Array.from({length:Math.min(6,items.length)},worker));if(button)button.textContent=old;
 }
 window.ALMAJLIS_PRELOAD_MATCH=preloadMatch;
 function mark(){document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-282-INSTANT-MEDIA-20260923');document.querySelector('meta[name="build-number"]')?.setAttribute('content',BUILD);document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD '+BUILD));try{sessionStorage.setItem('almajlis_build_seen',BUILD);sessionStorage.setItem('almajlis_active_build',BUILD)}catch(_){ }}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mark,{once:true});else mark();window.addEventListener('pageshow',mark,{passive:true});
})();
