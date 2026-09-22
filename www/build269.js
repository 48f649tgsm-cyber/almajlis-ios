/* BUILD 269 — single authoritative question launcher */
(()=>{'use strict';
 const byId=id=>document.getElementById(id);
 const safeCall=(name,...args)=>{try{const fn=window[name];if(typeof fn==='function')return fn(...args)}catch(error){console.warn('BUILD 269 helper',name,error)}};

 function renderPrompt(q){
  const host=byId('qText'),raw=String(q?.question||'');if(!host)return;
  const marker='[[AYAH]]',at=raw.indexOf(marker);host.replaceChildren();
  if(at>=0){
   const prompt=document.createElement('span'),ayah=document.createElement('span');
   prompt.className='quranPrompt';prompt.textContent=raw.slice(0,at).trim();
   ayah.className='quranAyah';ayah.lang='ar';ayah.textContent=raw.slice(at+marker.length).trim();
   host.append(prompt,ayah);host.classList.add('hasSeparatedAyah');
  }else{
   host.classList.remove('hasSeparatedAyah');
   if(q?.question_html)host.innerHTML=q.question_html;else host.textContent=raw;
  }
  const length=(host.textContent||'').length;
  host.classList.toggle('qLong',length>150);host.classList.toggle('qShort',length<70);
 }

 function syncVisibleQuestion(){
  const values={
   qv2Turn:'دور فريق: '+(currentTurn===1?(team1||'الفريق الأول'):(team2||'الفريق الثاني')),
   qv2Points:(current?.pts||100)+' نقطة',qv2Category:current?.cat||'',
   qv2Team1:team1||'الفريق الأول',qv2Team2:team2||'الفريق الثاني',
   qv2Score1:Number(score1||0),qv2Score2:Number(score2||0),qv2Timer:'00:30'
  };
  for(const [id,value] of Object.entries(values)){const node=byId(id);if(node)node.textContent=value}
  const bar=byId('qv2TimeBar');if(bar){bar.style.setProperty('--mj-time-progress','1');bar.classList.remove('urgent','expired')}
  document.querySelector('#mjQuestionV2 .qv2-team.one')?.classList.toggle('is-current',currentTurn===1);
  document.querySelector('#mjQuestionV2 .qv2-team.two')?.classList.toggle('is-current',currentTurn===2);
 }

 window.ALMAJLIS_DIRECT_OPEN_269=async function(cat,pts,btn){
  if(!btn||btn.dataset.used==='1')return false;
  const pool=gameQuestions?.[cat]?.[Number(pts)];
  if(!Array.isArray(pool)||!pool.length){safeCall('showGameToast','لا يوجد سؤال متاح في هذا المستوى');return false}
  const q=pool.shift();
  try{
   clearInterval(timerId);current={cat,pts:Number(pts),btn,q};btn.dataset.loading='0';
   const screen=byId('questionScreen');
   screen?.classList.toggle('careerMode',cat==='مسيرة لاعب');
   screen?.classList.toggle('silentMode',cat==='من غير كلام');
   screen?.classList.toggle('iqMode',cat==='ألغاز');
   screen?.classList.toggle('quranMode',['القرآن الكريم','قصص الأنبياء','قصص القرآن'].includes(cat));
   screen?.classList.remove('answerShown','challenge500');

   if(byId('qCat'))byId('qCat').textContent=cat;
   if(byId('qPts'))byId('qPts').textContent=pts+' نقطة';
   if(byId('qPointHero'))byId('qPointHero').textContent=pts;
   renderPrompt(q);
   if(byId('answer'))byId('answer').textContent=q.answer||'';
   const media=byId('qMedia');if(media)media.innerHTML=(cat==='من غير كلام'&&q.mime&&typeof window.renderMimeQR==='function')?window.renderMimeQR(q):(typeof window.renderQuestionMedia==='function'?window.renderQuestionMedia(q):'');
   safeCall('applyCareerQuestionVisual',cat,q);

   byId('answerArea')?.classList.add('hidden');
   byId('answerBtn')?.classList.remove('hidden');if(byId('answerBtn'))byId('answerBtn').disabled=false;
   steal=false;time=cat==='من غير كلام'?60:30;
   byId('timer')?.classList.remove('steal','lastFive');
   if(byId('timer'))byId('timer').textContent='00:'+String(time).padStart(2,'0');
   const activeName=currentTurn===1?team1:team2;
   if(byId('turnText'))byId('turnText').textContent=cat==='من غير كلام'?'بانتظار مسح الرمز — '+activeName:'دور '+activeName;
   if(byId('phaseLabel'))byId('phaseLabel').textContent=cat==='من غير كلام'?activeName+' — امسح الرمز ثم ابدأ':activeName+' — 30 ثانية';

   /* Change screen before any optional visual/audio work. */
   show('questionScreen');syncVisibleQuestion();
   requestAnimationFrame(()=>{syncVisibleQuestion();safeCall('dynamicQuestionLayout',cat,q);safeCall('respectSacredContent',cat);safeCall('decorateMedia265',document)});
   if(cat!=='من غير كلام')safeCall('runTimer');else safeCall('paintTimer');
   safeCall('gameTone','question');
   return true;
  }catch(error){
   pool.unshift(q);current=null;btn.dataset.loading='0';console.error('BUILD 269 direct question failure',error);
   safeCall('show','boardScreen');safeCall('showGameToast','تعذر فتح السؤال؛ تمت إعادته إلى اللوحة');return false;
  }
 };

 document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-269-DIRECT-QUESTION-20260922');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content','269');
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 269'));
  try{sessionStorage.setItem('almajlis_build_seen','269');sessionStorage.setItem('almajlis_active_build','269')}catch(_){ }
 },{once:true});
})();
