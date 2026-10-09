/* BUILD 323 — failure paths, durable consumption, bounded match media and state validation. */
(()=>{'use strict';
 function mark(){
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-323-TRANSITION-STATE-AUDIT');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content','323');
  const badge=document.getElementById('buildBadge025');if(badge)badge.textContent='BUILD 323';
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 323'));
  try{sessionStorage.setItem('almajlis_build_seen','323');sessionStorage.setItem('almajlis_active_build','323')}catch(_){ }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mark,{once:true});else mark();
 window.addEventListener('pageshow',mark,{passive:true});
})();
