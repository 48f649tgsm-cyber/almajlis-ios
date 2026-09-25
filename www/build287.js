/* BUILD 287 — measure and fit text-only player questions in their real panel. */
(()=>{
  'use strict';
  const id='من هو اللاعب';
  let pending=0;
  function clearTextStyle(q) {
    for(const name of ['font-size','line-height'])q.style.removeProperty(name);
  }
  function fit(){
    const screen=document.getElementById('questionScreen');
    const shell=document.getElementById('mjQuestionV2');
    const category=document.getElementById('qv2Category');
    const body=shell?.querySelector('.qv2-body');
    const q=document.getElementById('qText');
    const media=document.getElementById('qMedia');
    if(!screen||!body||!q||!media)return;
    const eligible=screen.classList.contains('active')&&
      category?.textContent.trim()===id&&media.childElementCount===0&&
      matchMedia('(orientation: landscape)').matches;
    screen.classList.toggle('whoTextOnly287',Boolean(eligible));
    if(!eligible){clearTextStyle(q);return}
    // Expand the panel first, then choose the largest font that fits every line.
    q.style.setProperty('line-height','1.29','important');
    const available=Math.max(0,body.clientHeight-2);
    let chosen=14;
    for(let size=30;size>=14;size-=0.5){
      q.style.setProperty('font-size',size+'px','important');
      if(q.scrollHeight<=available+1 && q.scrollWidth<=q.clientWidth+1){
        chosen=size;
        break;
      }
    }
    q.style.setProperty('font-size',chosen+'px','important');
    // Keep a measurable signal for a later QA pass on exceptionally small displays.
    q.dataset.whoFit287=q.scrollHeight<=available+1?'yes':'overflow';
  }
  function schedule(){
    if(pending)cancelAnimationFrame(pending);
    pending=requestAnimationFrame(()=>{pending=0;fit()});
  }
  function bind(){
    const category=document.getElementById('qv2Category');
    const q=document.getElementById('qText');
    const media=document.getElementById('qMedia');
    const body=document.querySelector('#mjQuestionV2 .qv2-body');
    if(!category||!q||!media||!body)return;
    const obs=new MutationObserver(schedule);
    obs.observe(category,{childList:true,subtree:true,characterData:true});
    obs.observe(q,{childList:true,subtree:true,characterData:true});
    obs.observe(media,{childList:true,subtree:true});
    new ResizeObserver(schedule).observe(body);
    window.addEventListener('resize',schedule,{passive:true});
    window.addEventListener('orientationchange',schedule,{passive:true});
    document.fonts?.ready.then(schedule);
    schedule();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
  const mark=()=>{
    document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-287-PLAYER-TEXT-FIT-20260925');
    document.querySelector('meta[name="build-number"]')?.setAttribute('content','287');
    document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 287'));
    try{sessionStorage.setItem('almajlis_build_seen','287');sessionStorage.setItem('almajlis_active_build','287')}catch(_){}
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mark,{once:true});
  else mark();
})();
