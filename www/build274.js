/* BUILD 274 — one authoritative board-to-question path */
(()=>{'use strict';
 const BUILD='274';

 function install(){
  const runtime=window.ALMAJLIS_STABLE_QUESTION_272;
  if(!runtime||typeof runtime.open!=='function'){
   console.error('BUILD 274: isolated question runtime is unavailable');
   return;
  }

  /* Every remaining legacy caller now reaches the same isolated runtime. */
  window.ALMAJLIS_DIRECT_OPEN_269=runtime.open;
  window.openQuestion=runtime.open;

  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-274-QUESTION-PATH-FIX-20260922');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content',BUILD);
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD '+BUILD));
  try{sessionStorage.setItem('almajlis_build_seen',BUILD);sessionStorage.setItem('almajlis_active_build',BUILD)}catch(_){ }
 }

 install();
 window.addEventListener('pageshow',install,{passive:true});
 window.ALMAJLIS_BUILD_274={install};
})();
