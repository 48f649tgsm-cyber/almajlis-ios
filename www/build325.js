/* BUILD 325 — authenticated live-bank restore and refresh failure isolation. */
(()=>{'use strict';
 function mark(){
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-325-PUBLISHED-RESTORE-AUDIT');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content','325');
  const badge=document.getElementById('buildBadge025');if(badge)badge.textContent='BUILD 325';
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 325'));
  try{sessionStorage.setItem('almajlis_build_seen','325');sessionStorage.setItem('almajlis_active_build','325')}catch(_){}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mark,{once:true});else mark();
 window.addEventListener('pageshow',mark,{passive:true});
})();
