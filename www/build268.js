/* BUILD 268 — direct board launch + verified player-career availability */
(()=>{'use strict';
 const CAREER='مسيرة لاعب';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 /* The 60 Supabase career questions use a short shared prompt and unique stored
    artwork. Legacy semantic/content-history checks must not reject that bank. */
 const previousAvailable=window.questionAvailable;
 window.questionAvailable=function(q,cat){
  if(cat===CAREER){
   if(!q||!q.id||!q.answer||![100,300,500].includes(Number(q.points)))return false;
   if(typeof usedIds!=='undefined'&&usedIds?.has?.(q.id))return false;
   return q.media?.type==='image'&&!!q.media?.src;
  }
  return typeof previousAvailable==='function'?previousAvailable(q,cat):true;
 };

 function careerInventory(){
  const items=Array.isArray(window.bank?.[CAREER])?window.bank[CAREER]:(typeof bank!=='undefined'&&Array.isArray(bank?.[CAREER])?bank[CAREER]:[]);
  const tiers={100:0,300:0,500:0};
  for(const q of items){if(window.questionAvailable(q,CAREER)&&tiers[Number(q.points)]!==undefined)tiers[Number(q.points)]++}
  return {total:items.length,tiers,playable:tiers[100]>=2&&tiers[300]>=2&&tiers[500]>=2};
 }

 /* Open the real question directly from the visible Shadow-DOM board. This
    removes the fragile synthetic click on an old hidden board button. */
 let launching=false;
 async function launchDirect(category,points,index,visibleButton){
  if(launching||visibleButton?.disabled||visibleButton?.classList.contains('used'))return;
  const cards=[...document.querySelectorAll('#board>.categoryBox')];
  const categoryIndex=(Array.isArray(selected)?selected:[]).indexOf(category);
  const legacy=cards[categoryIndex]?.querySelectorAll('.point')?.[index]||null;
  if(!legacy||legacy.dataset.used==='1')return;
  launching=true;
  if(visibleButton){visibleButton.disabled=true;visibleButton.dataset.launching='1'}
  try{
   if(typeof window.openQuestion!=='function')throw new Error('openQuestion unavailable');
   await window.openQuestion(category,Number(points),legacy);
   if(!document.getElementById('questionScreen')?.classList.contains('active'))throw new Error('question screen did not open');
  }catch(error){
   console.error('BUILD 268 question launch failed',error);
   legacy.dataset.loading='0';
   try{showGameToast('تعذر فتح السؤال. أعد المحاولة مرة أخرى.')}catch(_){ }
  }finally{
   launching=false;
   if(visibleButton&&!visibleButton.classList.contains('used')){visibleButton.disabled=false;delete visibleButton.dataset.launching}
  }
 }

 function wireBoard(){
  const host=document.getElementById('mjBoardV5'),root=host?.shadowRoot,grid=root?.getElementById('grid242');
  if(!grid||grid.dataset.build268==='1')return;
  grid.dataset.build268='1';
  grid.addEventListener('click',event=>{
   const button=event.target.closest?.('button.point');if(!button)return;
   event.preventDefault();event.stopImmediatePropagation();
   const card=button.closest('.card'),cards=[...grid.querySelectorAll('.card')],buttons=[...card.querySelectorAll('button.point')];
   const ci=cards.indexOf(card),pi=buttons.indexOf(button),category=(selected||[])[ci];
   if(category&&pi>=0)launchDirect(category,button.textContent.trim(),pi,button);
  },true);
 }

 function refreshCareerCard(){
  const state=careerInventory();
  document.querySelectorAll('[data-category="'+CAREER+'"],#mjv2Grid .mjv2-cat').forEach(button=>{
   if(button.dataset.category!==CAREER)return;
   button.disabled=!state.playable;button.setAttribute('aria-disabled',state.playable?'false':'true');
   const name=button.querySelector('.mjv2-name,.catName');
   if(name)name.textContent=state.playable?CAREER:CAREER+' — غير متاحة';
  });
  window.ALMAJLIS_CAREER_AUDIT_268=state;
 }

 document.addEventListener('DOMContentLoaded',()=>{
  wireBoard();refreshCareerCard();
  const board=document.getElementById('board');
  if(board)new MutationObserver(()=>{wireBoard();refreshCareerCard()}).observe(board,{childList:true,subtree:true});
  const host=document.getElementById('mjBoardV5');
  if(host?.shadowRoot)new MutationObserver(wireBoard).observe(host.shadowRoot,{childList:true,subtree:true});
  const previousRender=window.renderCats;
  if(typeof previousRender==='function')window.renderCats=function(){const out=previousRender.apply(this,arguments);refreshCareerCard();return out};
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-268-BOARD-CAREER-20260922');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content','268');
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 268'));
  try{sessionStorage.setItem('almajlis_build_seen','268');sessionStorage.setItem('almajlis_active_build','268')}catch(_){ }
 },{once:true});

 window.addEventListener('pageshow',()=>{wireBoard();refreshCareerCard()});
 window.ALMAJLIS_BUILD_268={careerInventory,wireBoard,launchDirect,escape:esc};
})();
