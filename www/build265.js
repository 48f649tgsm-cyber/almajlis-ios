/* BUILD 265 — unified category, media and career runtime */
(()=>{'use strict';
 const coverMap=Object.freeze({
  'عالم النباتات':'./assets/category-covers/plant-world.webp',
  'ملاعب عالمية':'./assets/category-covers/world-stadiums.webp',
  'معالم سياحية':'./assets/category-covers/tourist-landmarks.webp',
  'الفضاء':'./assets/category-covers/space.webp'
 });
 const previousCategoryImageSource=window.categoryImageSource;
 window.categoryImageSource=function(name){return coverMap[String(name||'').trim()]||(typeof previousCategoryImageSource==='function'?previousCategoryImageSource(name):'')||''};

 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const safeUrl=v=>String(v||'').replace(/\\/g,'').replace(/"/g,'%22');
 let categoryKey='',playableCache=new Map();

 function categoryShell(){return document.getElementById('mjCategoriesV2')}
 function updateFooterState(){
  const start=document.querySelector('#mjCategoriesV2 #startBtn');
  if(start)start.disabled=selected.length!==6||!document.getElementById('t1')?.value.trim()||!document.getElementById('t2')?.value.trim();
 }
 function updateRail265(){
  const rail=document.getElementById('mjv2Rail');if(!rail)return;
  rail.replaceChildren();
  for(let i=0;i<6;i++){
   const name=selected[i],slot=document.createElement('div');slot.className='mjv2-slot'+(name?'':' is-empty');
   if(name){
    const src=window.categoryImageSource(name);slot.innerHTML='<span class="mjv2-thumb">'+(src?'<img src="'+esc(src)+'" alt="" loading="lazy">':'')+'</span><span class="mjv2-slot-name">'+esc(name)+'</span><button class="mjv2-remove" type="button" aria-label="حذف '+esc(name)+'">×</button>';
    slot.querySelector('button').addEventListener('click',event=>{event.preventDefault();event.stopPropagation();selected=selected.filter(x=>x!==name);updateSelection265()});
   }
   rail.appendChild(slot);
  }
  const count=document.createElement('div');count.className='mjv2-count';count.textContent=selected.length+'/6';rail.appendChild(count);
 }
 function updateSelection265(){
  document.querySelectorAll('#mjv2Grid .mjv2-cat').forEach(button=>{
   const chosen=selected.includes(button.dataset.category);button.classList.toggle('is-selected',chosen);button.setAttribute('aria-pressed',chosen?'true':'false');
  });
  updateRail265();updateFooterState();
  const cc=document.getElementById('cc');if(cc)cc.textContent=selected.length+' / 6';
 }
 function renderCategories265(force=false){
  const grid=document.getElementById('mjv2Grid');if(!grid||!Array.isArray(categories))return;
  selected=selected.filter(name=>categories.includes(name)&&categoryPlayable(name));
  const nextKey=categories.join('\u001f');
  if(force||nextKey!==categoryKey||grid.children.length!==categories.length){
   categoryKey=nextKey;playableCache=new Map(categories.map(name=>[name,categoryPlayable(name)]));grid.replaceChildren();
   const fragment=document.createDocumentFragment();
   categories.forEach(name=>{
    const playable=playableCache.get(name),src=window.categoryImageSource(name),button=document.createElement('button');
    button.type='button';button.className='mjv2-cat';button.dataset.category=name;button.disabled=!playable;button.setAttribute('aria-disabled',playable?'false':'true');button.setAttribute('aria-pressed','false');
    button.innerHTML='<span class="mjv2-image">'+(src?'<img src="'+esc(src)+'" alt="'+esc(name)+'" loading="lazy" decoding="async">':'<span class="catAsset build258Fallback"></span>')+'</span><span class="mjv2-name">'+esc(name)+(playable?'':' — غير متاحة')+'</span>';
    fragment.appendChild(button);
   });
   grid.appendChild(fragment);
  }
  updateSelection265();
 }
 function chooseCategory265(name){
  if(!playableCache.get(name))return;
  if(selected.includes(name))selected=selected.filter(x=>x!==name);
  else if(selected.length<6)selected=[...selected,name];
  updateSelection265();
 }

 function decorateMedia265(root=document){
  root.querySelectorAll?.('#questionScreen #qMedia .mediaFrame>img,#questionScreen #qMedia .mjCareerImage260>img').forEach(img=>{
   const frame=img.parentElement;if(!frame||!img.src)return;
   frame.classList.add('hasMediaBackdrop');frame.style.setProperty('--mj265-media-bg','url("'+safeUrl(img.currentSrc||img.src)+'")');
   img.onerror=()=>{frame.classList.remove('hasMediaBackdrop');frame.innerHTML='<div class="mj265MediaError">تعذر تحميل صورة السؤال. تحقق من أن اسم الصورة ومسارها في Supabase مطابقان للسؤال.</div>'};
  });
 }

 const priorCareer=window.applyCareerQuestionVisual;
 window.applyCareerQuestionVisual=function(cat,q){
  if(cat!=='مسيرة لاعب')return typeof priorCareer==='function'?priorCareer(cat,q):undefined;
  document.getElementById('questionScreen')?.classList.add('careerMode');
  const text=document.getElementById('qText'),host=document.getElementById('qMedia'),media=q?.media;
  if(text)text.textContent='من هو اللاعب صاحب هذه المسيرة؟';
  if(media?.src&&host){
   host.innerHTML='<div class="mjCareerImage260"><img src="'+esc(media.src)+'" alt="'+esc(media.alt||'المسيرة الاحترافية الكاملة')+'" loading="eager" decoding="async"></div>';
   decorateMedia265(host);return;
  }
  if(typeof priorCareer==='function')priorCareer(cat,q);
  decorateMedia265(host||document);
 };

 const oldOpenQuestion=window.openQuestion;
 if(typeof oldOpenQuestion==='function')window.openQuestion=async function(){const out=await oldOpenQuestion.apply(this,arguments);requestAnimationFrame(()=>decorateMedia265(document));return out};

 document.addEventListener('click',event=>{
  const button=event.target.closest?.('#mjv2Grid .mjv2-cat');if(!button)return;
  event.preventDefault();event.stopImmediatePropagation();chooseCategory265(button.dataset.category);
 },true);
 document.addEventListener('input',event=>{if(event.target?.matches?.('#mjCategoriesV2 #t1,#mjCategoriesV2 #t2'))updateFooterState()},true);

 document.addEventListener('DOMContentLoaded',()=>{
  /* Media is prepared after the six-category selection, not during every tap. */
  window.ALMAJLIS_PRELOAD_CATEGORIES=()=>Promise.resolve();
  const previousRender=window.renderCats;
  window.renderCats=function(){
   /* Preserve team values and shell, but avoid reconstructing every embedded image. */
   if(!categoryShell()&&typeof previousRender==='function')previousRender.apply(this,arguments);
   renderCategories265(true);
  };
  renderCategories265(true);decorateMedia265(document);
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-265-UNIFIED-REPAIR-20260921');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content','265');
  const badge=document.getElementById('buildBadge025');if(badge)badge.textContent='BUILD 265';
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 265'));
  try{sessionStorage.setItem('almajlis_build_seen','265');sessionStorage.setItem('almajlis_active_build','265')}catch(_){ }
 },{once:true});
})();
