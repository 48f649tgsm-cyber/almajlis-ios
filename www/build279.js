/* BUILD 279 — proper V-sign hand helper icon */
(()=>{'use strict';
 const BUILD='279';
 function mark(){
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-279-VICTORY-HAND-20260923');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content',BUILD);
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD '+BUILD));
  try{sessionStorage.setItem('almajlis_build_seen',BUILD);sessionStorage.setItem('almajlis_active_build',BUILD)}catch(_){ }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mark,{once:true});else mark();
 window.addEventListener('pageshow',mark,{passive:true});
})();
