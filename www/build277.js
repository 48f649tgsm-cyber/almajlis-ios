/* BUILD 277 — single-window mirroring release */
(()=>{'use strict';
 const BUILD='277';
 function mark(){
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-277-MIRRORING-SINGLE-WINDOW-20260922');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content',BUILD);
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD '+BUILD));
  try{sessionStorage.setItem('almajlis_build_seen',BUILD);sessionStorage.setItem('almajlis_active_build',BUILD)}catch(_){ }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mark,{once:true});else mark();
 window.addEventListener('pageshow',mark,{passive:true});
})();
