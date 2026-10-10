/* BUILD 286: bundled AI football art, all-image pinch viewer. Source images are copied byte-for-byte. */
(()=>{'use strict';
 // BUILD 325: preserve zoom behavior; never insert bundled questions.

 function installPinch(modal,img,surface){
  if(!modal||!img||!surface||surface.dataset.pinch286)return;
  surface.dataset.pinch286='1';surface.style.touchAction='none';
  const fingers=new Map(),view={scale:1,x:0,y:0,startScale:1,startDistance:1,startX:0,startY:0,lastX:0,lastY:0};
  function paint(){
   const bx=Math.max(0,(img.offsetWidth*view.scale-surface.clientWidth)/2),by=Math.max(0,(img.offsetHeight*view.scale-surface.clientHeight)/2);
   view.x=Math.max(-bx,Math.min(bx,view.x));view.y=Math.max(-by,Math.min(by,view.y));
   img.style.transform='translate('+view.x+'px,'+view.y+'px) scale('+view.scale+')';
  }
  function reset(){fingers.clear();view.scale=1;view.x=view.y=0;paint()}
  function distance(){const pts=[...fingers.values()];return Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y)||1}
  function midpoint(){const pts=[...fingers.values()];return {x:(pts[0].x+pts[1].x)/2,y:(pts[0].y+pts[1].y)/2}}
  surface.addEventListener('pointerdown',event=>{
   if(event.pointerType==='mouse'&&event.button!==0)return;
   event.preventDefault();event.stopPropagation();surface.setPointerCapture?.(event.pointerId);
   fingers.set(event.pointerId,{x:event.clientX,y:event.clientY});
   if(fingers.size===1){view.lastX=event.clientX;view.lastY=event.clientY}
   if(fingers.size===2){view.startDistance=distance();view.startScale=view.scale;view.startX=view.x;view.startY=view.y;const mid=midpoint();view.lastX=mid.x;view.lastY=mid.y}
  });
  surface.addEventListener('pointermove',event=>{
   if(!fingers.has(event.pointerId))return;
   event.preventDefault();fingers.set(event.pointerId,{x:event.clientX,y:event.clientY});
   if(fingers.size===2){const mid=midpoint();view.scale=Math.max(1,Math.min(6,view.startScale*distance()/view.startDistance));view.x=view.startX+(mid.x-view.lastX);view.y=view.startY+(mid.y-view.lastY)}
   else if(fingers.size===1&&view.scale>1){view.x+=event.clientX-view.lastX;view.y+=event.clientY-view.lastY;view.lastX=event.clientX;view.lastY=event.clientY}
   paint();
  });
  const end=event=>{if(!fingers.has(event.pointerId))return;fingers.delete(event.pointerId);if(fingers.size===1){const p=[...fingers.values()][0];view.lastX=p.x;view.lastY=p.y}if(!fingers.size)paint()};
  surface.addEventListener('pointerup',end);surface.addEventListener('pointercancel',end);
  surface.addEventListener('wheel',event=>{event.preventDefault();view.scale=Math.max(1,Math.min(6,view.scale*(event.deltaY<0?1.18:1/1.18)));paint()},{passive:false});
  surface.addEventListener('dblclick',event=>{event.preventDefault();view.scale=view.scale>1?1:2;view.x=view.y=0;paint()});
  surface.addEventListener('click',event=>event.stopPropagation());
  new MutationObserver(()=>{if(!modal.classList.contains('show'))reset()}).observe(modal,{attributes:true,attributeFilter:['class']});
  img.addEventListener('load',reset);
 }
 const css=document.createElement('style');css.textContent=`
  #mjMediaModal260 .zoomSurface286,#mediaLightbox .zoomSurface286{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden;touch-action:none;user-select:none}
  #mjMediaModal260 .zoomSurface286 img,#mediaLightbox .zoomSurface286 img{max-width:96vw!important;max-height:90dvh!important;width:auto!important;height:auto!important;object-fit:contain!important;transform-origin:center center;pointer-events:none;-webkit-user-drag:none}
  #mjMediaClose260,#mediaLightbox .closeZoom{z-index:3!important;position:absolute!important}
 `;document.head.appendChild(css);
 for(const [id,imgId] of [['mjMediaModal260','mjMediaImage260'],['mediaLightbox','mediaLightboxImg']]){
  const modal=document.getElementById(id),img=document.getElementById(imgId);if(!modal||!img)continue;
  const surface=document.createElement('div');surface.className='zoomSurface286';img.parentNode.insertBefore(surface,img);surface.appendChild(img);installPinch(modal,img,surface);
 }
 const host=document.getElementById('mjStableQuestion272'),root=host?.shadowRoot;
 if(root){const modal=root.querySelector('.media-modal');installPinch(modal,modal?.querySelector('img'),modal?.querySelector('.zoom-surface'));
  root.querySelector('.answer')?.addEventListener('click',event=>{
   const image=event.target.closest('img.ai-answer-photo');if(!image||!image.complete||!image.naturalWidth)return;
   modal.querySelector('img').src=image.currentSrc||image.src;modal.classList.add('show');
  });
 }
 document.addEventListener('click',event=>{
  const image=event.target.closest?.('#mjAnswerScreen img,#answerArea img,#result img');
  if(!image||!image.complete||!image.naturalWidth)return;
  const modal=document.getElementById('mjMediaModal260'),large=document.getElementById('mjMediaImage260');if(!modal||!large)return;
  large.src=image.currentSrc||image.src;large.alt=image.alt||'صورة مكبرة';modal.hidden=false;modal.classList.add('show');document.documentElement.classList.add('mjMediaOpen260');
 },true);
 const mark=()=>{document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-286-AI-FOOTBALL-ZOOM-20260924');document.querySelector('meta[name="build-number"]')?.setAttribute('content','286');document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 286'));try{sessionStorage.setItem('almajlis_build_seen','286');sessionStorage.setItem('almajlis_active_build','286')}catch(_){}};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mark,{once:true});else mark();window.addEventListener('pageshow',mark,{passive:true});
})();
