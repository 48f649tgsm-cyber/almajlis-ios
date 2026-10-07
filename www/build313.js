/* BUILD 313 — live-bank authority, navigation/media cleanup, single-screen stability */
(()=>{'use strict';
 const BUILD='313';
 function pauseOutside(activeId){
  document.querySelectorAll('audio,video').forEach(media=>{
   const screen=media.closest('.screen');
   if(!screen||screen.id!==activeId){try{media.pause()}catch(_){}}
  });
 }
 function closeTransient(activeId){
  document.querySelectorAll('.screen.active').forEach(node=>{if(node.id!==activeId)node.classList.remove('active')});
  document.querySelectorAll('.qv2-modal.show,.qv2-media-modal.show,#mjMediaModal260.show,#tieBreakOverlay.show,#matchIntro.show,#categorySplash.show,#mediaLightbox.show').forEach(node=>node.classList.remove('show'));
  document.documentElement.classList.remove('mjModalOpen');
  if(activeId!=='questionScreen')document.body.style.removeProperty('overflow');
  pauseOutside(activeId);
 }
 document.addEventListener('almajlis:navigate',event=>{
  const id=String(event.detail?.screen||'');if(id)requestAnimationFrame(()=>closeTransient(id));
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('audio,video').forEach(m=>{try{m.pause()}catch(_){}})});
 window.addEventListener('pagehide',()=>{document.querySelectorAll('audio,video').forEach(m=>{try{m.pause()}catch(_){}})},{passive:true});
 async function purgeOldCaches(){
  try{localStorage.removeItem('almajlis_content_snapshot_v288');localStorage.removeItem('almajlis_content_snapshot_v312')}catch(_){ }
  if(!('caches' in window))return;
  try{for(const name of await caches.keys())if(/^almajlis-question-media-v(?!313$)/.test(name))await caches.delete(name)}catch(_){ }
 }
 function mark(){
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-313-LIVE-STABILITY-TV-MEDIA');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content',BUILD);
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 313'));
  document.querySelectorAll('video').forEach(v=>v.setAttribute('x-webkit-airplay','allow'));
  purgeOldCaches();
  try{sessionStorage.setItem('almajlis_build_seen',BUILD);sessionStorage.setItem('almajlis_active_build',BUILD)}catch(_){ }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mark,{once:true});else mark();
 window.addEventListener('pageshow',mark,{passive:true});
 window.ALMAJLIS_STABILITY_313={pauseOutside,closeTransient,purgeOldCaches};
})();
