/* BUILD 270 — WebView memory guard and deterministic screen transition */
(()=>{'use strict';
 const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1;
 if(isIOS)document.body.classList.add('lowPerf','mjIosStable270');

 /* Do not mutate the legacy backdrop classes here. BUILD 261 observes those
    classes and restores them; removing them from another observer creates an
    endless mutation/repaint loop. build270.css neutralizes the layers without
    touching the DOM, so the old observer settles after one update. */

 /* Mark the exact transition. If iOS terminates the content process, the next
    launch records that fact rather than silently blaming the question bank. */
 document.addEventListener('pointerdown',event=>{
  const point=event.composedPath?.().find(node=>node?.classList?.contains?.('point'));
  if(point)try{sessionStorage.setItem('almajlis_opening_question_270',String(Date.now()))}catch(_){ }
 },true);
 const screen=document.getElementById('questionScreen');
 if(screen)new MutationObserver(()=>{
  if(screen.classList.contains('active'))try{sessionStorage.removeItem('almajlis_opening_question_270')}catch(_){ }
 }).observe(screen,{attributes:true,attributeFilter:['class']});

 window.addEventListener('error',event=>{
  try{localStorage.setItem('almajlis_last_runtime_error_270',JSON.stringify({message:String(event.message||'error'),source:String(event.filename||''),line:event.lineno||0,at:Date.now()}))}catch(_){ }
 });
 window.addEventListener('unhandledrejection',event=>{
  try{localStorage.setItem('almajlis_last_runtime_error_270',JSON.stringify({message:String(event.reason?.message||event.reason||'promise'),at:Date.now()}))}catch(_){ }
 });
 document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-270-WEBVIEW-STABILITY-20260922');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content','270');
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 270'));
  try{sessionStorage.setItem('almajlis_build_seen','270');sessionStorage.setItem('almajlis_active_build','270')}catch(_){ }
 },{once:true});
})();
