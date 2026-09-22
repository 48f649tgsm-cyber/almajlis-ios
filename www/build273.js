/* BUILD 273 — full-www stability audit, navigation authority and cleanup */
(()=>{'use strict';
 const BUILD='273';
 let navigating=false;

 function installStabilityStyle(){
  if(document.getElementById('MAJLIS_BUILD_273_STABILITY_STYLE'))return;
  const style=document.createElement('style');style.id='MAJLIS_BUILD_273_STABILITY_STYLE';
  style.textContent=`
   .screen:not(.active){pointer-events:none!important}
   #mjStableQuestion272[style*="display: none"]{pointer-events:none!important;visibility:hidden!important}
   html.lowPerf #cats .mjv2-rail,html.lowPerf #result #finalScores,
   body.lowPerf #cats .mjv2-rail,body.lowPerf #result #finalScores{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
   @media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
  `;
  document.head.appendChild(style);
 }

 function stopLegacyActivity(){
  try{if(typeof timerId!=='undefined')clearInterval(timerId)}catch(_){ }
  try{if(typeof tieTimerId!=='undefined')clearInterval(tieTimerId)}catch(_){ }
  try{if(typeof introInterval!=='undefined')clearInterval(introInterval)}catch(_){ }
  try{window.ALMAJLIS_STABLE_QUESTION_272?.hide?.()}catch(_){ }
  try{window.stopWinnerCelebration263?.()}catch(_){ }
  try{window.stopBroadcastMusic?.()}catch(_){ }
  try{window.stopActionMusic?.()}catch(_){ }
  try{window.stopTheme?.()}catch(_){ }
  document.querySelectorAll('.qv2-modal.show,.qv2-media-modal.show,#tieBreakOverlay.show,#matchIntro.show,#categorySplash.show,#mjMediaModal260.show').forEach(node=>node.classList.remove('show'));
  document.querySelectorAll('[data-loading="1"]').forEach(node=>{node.dataset.loading='0';node.classList.remove('launching')});
  document.documentElement.classList.remove('mjModalOpen');
  document.body.style.removeProperty('overflow');
 }

 function activate(id){
  const target=document.getElementById(id);if(!target)return false;
  document.querySelectorAll('.screen.active').forEach(node=>node.classList.remove('active'));
  target.classList.add('active');
  try{target.scrollTo(0,0)}catch(_){ }
  try{window.scrollTo(0,0)}catch(_){ }
  document.dispatchEvent(new CustomEvent('almajlis:navigate',{detail:{screen:id}}));
  return true;
 }

 function goHome(){
  if(navigating)return;
  navigating=true;
  try{stopLegacyActivity();try{current=null}catch(_){ }activate('home')}
  finally{requestAnimationFrame(()=>{navigating=false})}
 }

 const previousShow=window.show;
 window.show=function(id){
  if(id==='home'){goHome();return}
  try{window.ALMAJLIS_STABLE_QUESTION_272?.hide?.()}catch(_){ }
  document.querySelectorAll('.qv2-modal.show,.qv2-media-modal.show,#mjMediaModal260.show').forEach(node=>node.classList.remove('show'));
  const out=typeof previousShow==='function'?previousShow.call(this,id):activate(id);
  document.dispatchEvent(new CustomEvent('almajlis:navigate',{detail:{screen:id}}));
  return out;
 };

 function wireStableQuestion(){
  const root=document.getElementById('mjStableQuestion272')?.shadowRoot;
  if(!root||root.host.dataset.build273==='1')return;
  root.host.dataset.build273='1';
  const exit=root.querySelector('.exit');
  if(exit)exit.onclick=()=>{if(confirm('هل تريد الخروج إلى الصفحة الرئيسية؟'))goHome()};
 }

 function wireBoardExit(){
  const root=document.getElementById('mjBoardV5')?.shadowRoot;
  if(!root||root.host.dataset.build273==='1')return;
  root.host.dataset.build273='1';
  const yes=root.getElementById('yes242');
  if(yes)yes.onclick=()=>{root.getElementById('modal242')?.classList.remove('show');goHome()};
 }

 function wireLegacyExits(){
  const qYes=document.getElementById('qv2ExitYes');
  if(qYes)qYes.onclick=()=>{document.getElementById('qv2ExitModal')?.classList.remove('show');goHome()};
  document.querySelectorAll('.mjHeaderExit').forEach(button=>button.onclick=()=>{if(confirm('هل تريد الخروج إلى الصفحة الرئيسية؟'))goHome()});
  const resultHome=document.getElementById('resultHomeBtn263');if(resultHome)resultHome.onclick=goHome;
 }

 function install(){
  installStabilityStyle();wireStableQuestion();wireBoardExit();wireLegacyExits();
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-273-FULL-STABILITY-AUDIT-20260922');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content',BUILD);
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD '+BUILD));
  try{sessionStorage.setItem('almajlis_build_seen',BUILD);sessionStorage.setItem('almajlis_active_build',BUILD)}catch(_){ }
 }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
  window.addEventListener('pageshow',install,{passive:true});
  window.addEventListener('pagehide',stopLegacyActivity,{passive:true});
  window.ALMAJLIS_STABILITY_273={goHome,stopLegacyActivity,install};
})();
