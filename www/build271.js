/* BUILD 271 — flat GitHub asset layout (all images live directly in www) */
(()=>{'use strict';
 const embeddedName=/embedded-[a-f0-9]{20}\.(?:jpg|jpeg|png|gif|webp)$/i;

 /* Compatibility guard: prefer the flat www location used by the repository,
    but accept the previous assets/embedded layout when testing older bundles. */
 document.addEventListener('error',event=>{
  const image=event.target;
  if(!(image instanceof HTMLImageElement)||image.dataset.mjAssetRetry271==='1')return;
  let source=image.getAttribute('src')||'';
  const name=source.split('/').pop()?.split(/[?#]/)[0]||'';
  if(!embeddedName.test(name))return;
  image.dataset.mjAssetRetry271='1';
  image.src=source.includes('/assets/embedded/')?'./'+name:'./assets/embedded/'+name;
 },true);

 document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-271-FLAT-ASSETS-20260922');
 document.querySelector('meta[name="build-number"]')?.setAttribute('content','271');
 document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 271'));
 try{sessionStorage.setItem('almajlis_build_seen','271');sessionStorage.setItem('almajlis_active_build','271')}catch(_){ }
})();
