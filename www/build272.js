/* BUILD 272 — isolated question runtime; legacy question observers stay dormant */
(()=>{'use strict';
 const state={interval:0,seconds:30,steal:false,revealed:false,activeTeam:1,doubleTeam:0,twoAnswersTeam:0};
 const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

 function createHost(){
  let host=document.getElementById('mjStableQuestion272');if(host)return host;
  host=document.createElement('div');host.id='mjStableQuestion272';
  host.style.cssText='display:none;position:fixed;inset:0;z-index:2147483500;background:#fff';
  const root=host.attachShadow({mode:'open'});
  root.innerHTML=`<style>
   :host{font-family:"Tajawal Local","SF Arabic","Geeza Pro",Arial,sans-serif;direction:rtl;color:#202b35}
   *{box-sizing:border-box}button{font:inherit}.screen{width:100vw;height:100dvh;display:grid;grid-template-rows:58px minmax(0,1fr);gap:10px;padding:max(8px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(8px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left));background:#fff;overflow:hidden}
   header{position:relative;display:grid;place-items:center;border:1px solid #c66556;border-radius:999px;background:linear-gradient(90deg,#c66556,#dfa198);color:#fff}
   .turn{max-width:52%;font-size:clamp(16px,2vw,25px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.brand{position:absolute;left:22px;font-size:clamp(22px,2.8vw,35px)}
   .nav{position:absolute;top:7px;height:43px;padding:0 18px;border:2px solid #fff;border-radius:16px;background:transparent;color:#fff;font-weight:700}.exit{right:12px}.back{right:125px}
   .stage{min-height:0;display:grid;grid-template-columns:minmax(0,1fr) clamp(185px,19vw,235px);gap:13px;direction:ltr}.card{position:relative;min-width:0;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;margin:34px 3px 25px;padding:43px 18px 35px;border:1.5px solid #202b35;border-radius:27px;background:#f4f4f4;direction:rtl;overflow:visible}
   .points,.category,.timer{position:absolute;display:grid;place-items:center;font-weight:800}.points{top:-31px;right:7%;min-width:155px;height:54px;padding:0 18px;border:1px solid #a80000;border-radius:16px;background:#cf7467;color:#fff}.category{right:7%;bottom:-24px;min-width:160px;height:48px;padding:0 17px;border-radius:15px;background:#c66556;color:#fff}.timer{top:-32px;left:50%;transform:translateX(-50%);width:64px;height:64px;border:5px solid #df7568;border-radius:50%;background:#fff;color:#b40000;font:700 18px Arial}
   .question{flex:0 0 auto;width:min(1000px,96%);max-height:25dvh;padding:8px 15px;border:1.5px solid #df7568;border-radius:16px;background:#fff;font-size:clamp(18px,2.15vw,29px);font-weight:700;line-height:1.48;text-align:center;overflow:auto}.question.long{font-size:clamp(15px,1.75vw,24px)}.ayah{display:block;margin-top:7px;font-family:"Amiri Quran","Traditional Arabic",serif;font-size:1.18em;line-height:1.8}
   .media{flex:1 1 auto;display:grid;place-items:center;width:min(920px,94%);min-height:0;max-height:35dvh;padding:5px;border:1px solid #c5c5c5;border-radius:17px;background:#ededed;overflow:hidden}.media:empty{display:none}.media img,.media video{display:block;width:auto!important;height:auto!important;max-width:100%!important;max-height:33dvh!important;margin:auto!important;border-radius:11px;object-fit:contain!important}.media audio{width:min(680px,92%)}
   .reveal{position:absolute;left:4%;bottom:-24px;min-width:165px;height:48px;padding:0 20px;border:1px solid #9c3026;border-radius:15px;background:#cf7467;color:#fff;font-weight:800}.answer{display:none;width:min(900px,94%);padding:10px 16px;border:1.5px solid #df7568;border-radius:16px;background:#fff;text-align:center}.answer.show{display:block}.answer b{display:block;color:#b40000;font-size:clamp(20px,2.4vw,32px)}.award{display:flex;justify-content:center;gap:9px;margin-top:8px}.award button{min-height:40px;padding:7px 14px;border:0;border-radius:12px;color:#fff;font-weight:700}.one{background:#303fa6}.two{background:#d33327}.none{background:#6b7280}
   aside{min-height:0;display:flex;flex-direction:column;justify-content:center;gap:16px;direction:rtl}.team{display:grid;grid-template-rows:34px 58px 42px;padding:5px;border:1.5px solid #202b35;border-radius:19px;background:#fff}.name{z-index:1;display:grid;place-items:center;width:92%;margin:0 auto -4px;padding:3px;border-radius:13px 13px 6px 6px;background:#293f54;color:#fff;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.score{display:grid;place-items:center;border-radius:13px;color:#fff;font:700 clamp(24px,3vw,38px) Arial}.team:first-child .score{background:#303fa6}.team:last-child .score{background:#d33327}.helps{display:flex;align-items:center;justify-content:center;gap:7px;padding-top:5px}.help{display:grid;place-items:center;width:38px;height:34px;padding:3px;border:1.5px solid #df7568;border-radius:10px;background:#fff;color:#202b35;cursor:pointer}.help svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.help .x2{font:800 18px Arial}.help.active{background:#cf7467;color:#fff}.help:disabled,.help.used{opacity:.35;filter:grayscale(1);cursor:default}.urgent{background:#d33327!important;color:#fff;animation:pulse .55s infinite alternate}@keyframes pulse{to{transform:translateX(-50%) scale(1.08)}}
   @media(max-height:530px){.screen{grid-template-rows:50px minmax(0,1fr)}.nav{top:5px;height:39px}.card{margin:29px 2px 21px;padding:37px 14px 31px}.question{font-size:clamp(16px,3.8vh,23px);max-height:24dvh}.media{max-height:32dvh}.media img,.media video{max-height:30dvh!important}.points{top:-27px;height:48px}.timer{top:-28px;width:56px;height:56px}.category,.reveal{bottom:-21px;height:43px}}
  </style><main class="screen"><header><button class="nav exit" type="button">الخروج</button><button class="nav back" type="button">الرجوع إلى اللوحة</button><div class="turn"></div><div class="brand">المجلس</div></header><section class="stage"><article class="card"><div class="points"></div><div class="timer">00:30</div><div class="question"></div><div class="media"></div><div class="answer"><small>الإجابة الصحيحة</small><b></b><div class="award"><button class="one"></button><button class="two"></button><button class="none">لا أحد</button></div></div><div class="category"></div><button class="reveal" type="button">إظهار الجواب</button></article><aside><div class="team" data-team="1"><div class="name t1"></div><div class="score s1">0</div><div class="helps"></div></div><div class="team" data-team="2"><div class="name t2"></div><div class="score s2">0</div><div class="helps"></div></div></aside></section></main>`;
  document.body.appendChild(host);
  root.querySelector('.reveal').onclick=reveal;
  root.querySelector('.back').onclick=returnToBoard;
  root.querySelector('.exit').onclick=()=>{if(confirm('هل تريد الخروج من اللعبة؟')){stopTimer();hide();if(window.ALMAJLIS_STABILITY_273?.goHome){window.ALMAJLIS_STABILITY_273.goHome()}else{window.show?.('home')}}};
  root.querySelector('.one').onclick=()=>givePoints(1);root.querySelector('.two').onclick=()=>givePoints(2);root.querySelector('.none').onclick=()=>givePoints(0);
  installHelpButtons(root);
  return host;
 }
 function root(){return createHost().shadowRoot}
 function stopTimer(){clearInterval(state.interval);state.interval=0}
 function hide(){stopTimer();const host=document.getElementById('mjStableQuestion272');if(host)host.style.display='none'}
 function setText(selector,value){const node=root().querySelector(selector);if(node)node.textContent=value}
 function updateTimer(){const timer=root().querySelector('.timer');timer.textContent='00:'+String(Math.max(0,state.seconds)).padStart(2,'0');timer.classList.toggle('urgent',state.seconds<=5&&state.seconds>0)}
 function helperStore(){return window.ALMAJLIS_HELP_275?.state||{used:{1:{two:false,block:false,double:false},2:{two:false,block:false,double:false}}}}
 function helperIcon(type){
  if(type==='two')return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 12V4.8a1.6 1.6 0 0 1 3.2 0V10M11.7 10V3.7a1.6 1.6 0 0 1 3.2 0V10M14.9 10V6a1.6 1.6 0 0 1 3.2 0v7.2c0 4.5-2.7 7.3-6.8 7.3-3.1 0-5.2-1.7-6.4-4.2l-1.2-2.5a1.6 1.6 0 0 1 2.8-1.5l2 2.6"/></svg>';
  if(type==='block')return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/></svg>';
  return '<span class="x2">×2</span>';
 }
 function installHelpButtons(r){
  for(const team of [1,2]){
   const host=r.querySelector('.team[data-team="'+team+'"] .helps');if(!host||host.children.length)continue;
   for(const type of ['two','block','double']){const button=document.createElement('button');button.type='button';button.className='help';button.dataset.type=type;button.setAttribute('aria-label',type==='two'?'إجابتان':type==='block'?'بلوك':'دبل النقاط');button.innerHTML=helperIcon(type);button.onclick=()=>activateHelp(team,type);host.appendChild(button)}
  }
 }
 function syncHelpButtons(){
  const store=helperStore(),r=root();
  for(const button of r.querySelectorAll('.help')){const team=Number(button.closest('.team')?.dataset.team),type=button.dataset.type,used=!!store.used?.[team]?.[type],active=(type==='double'&&state.doubleTeam===team)||(type==='two'&&state.twoAnswersTeam===team);button.classList.toggle('used',used&&!active);button.classList.toggle('active',active);button.disabled=type==='double'||used||(type==='block'?team===state.activeTeam:team!==state.activeTeam)||state.revealed}
 }
 function activateHelp(team,type){
  if(!current||state.revealed)return;const store=helperStore();if(store.used?.[team]?.[type])return;
   if(type==='double')return window.showGameToast?.('دبل النقاط تُفعّل من لوحة الأسئلة قبل اختيار السؤال');
   if(type==='block'){
   if(team===state.activeTeam)return window.showGameToast?.('البلوك يستخدمه الفريق المنافس');
   store.used[team].block=true;state.activeTeam=team;state.steal=true;state.seconds=30;state.twoAnswersTeam=0;setText('.turn','البلوك — فرصة لفريق: '+(team===1?team1:team2));startTimer();
  }else{
   if(team!==state.activeTeam)return window.showGameToast?.('هذه الوسيلة متاحة للفريق صاحب الدور');
   store.used[team][type]=true;
   if(type==='two'){state.twoAnswersTeam=team;setText('.turn',(team===1?team1:team2)+' — لديه محاولتان')}
  }
  window.ALMAJLIS_HELP_275?.save?.();syncHelpButtons();window.ALMAJLIS_HELP_275?.syncBoard?.()
 }
 function startTimer(){stopTimer();updateTimer();state.interval=setInterval(()=>{state.seconds--;updateTimer();if(state.seconds>0)return;stopTimer();if(!state.steal){state.steal=true;state.activeTeam=state.activeTeam===1?2:1;state.seconds=30;setText('.turn','فرصة لفريق: '+(state.activeTeam===1?team1:team2));syncHelpButtons();startTimer()}else{setText('.turn','انتهى الوقت — يمكن إظهار الجواب')}},1000)}
 function questionMarkup(q){const raw=String(q?.question||''),marker='[[AYAH]]',at=raw.indexOf(marker);if(at>=0)return esc(raw.slice(0,at).trim())+'<span class="ayah">'+esc(raw.slice(at+marker.length).trim())+'</span>';return q?.question_html||esc(raw)}
 function mediaMarkup(cat,q){try{return cat==='من غير كلام'&&q?.mime&&typeof renderMimeQR==='function'?renderMimeQR(q):(typeof renderQuestionMedia==='function'?renderQuestionMedia(q):'')}catch(error){console.error('BUILD 272 media',error);return '<div>تعذر تجهيز الوسيط</div>'}}

 async function open(cat,pts,button){
  if(!button||button.dataset.used==='1')return false;
  const pool=gameQuestions?.[cat]?.[Number(pts)];if(!Array.isArray(pool)||!pool.length){window.showGameToast?.('لا يوجد سؤال متاح في هذا المستوى');return false}
  const q=pool.shift();stopTimer();
  try{
   const helpers=helperStore(),pendingDouble=Number(helpers.pendingDoubleTeam||0);current={cat,pts:Number(pts),basePts:Number(pts),btn:button,q};finalDecisionLocked=false;state.seconds=cat==='من غير كلام'?60:30;state.steal=false;state.revealed=false;state.activeTeam=currentTurn;state.doubleTeam=pendingDouble===currentTurn?pendingDouble:0;state.twoAnswersTeam=0;if(state.doubleTeam){helpers.pendingDoubleTeam=0;window.ALMAJLIS_HELP_275?.save?.();window.ALMAJLIS_HELP_275?.syncBoard?.()}
   document.querySelectorAll('.screen.active').forEach(screen=>screen.classList.remove('active'));
   const host=createHost(),r=root();host.style.display='block';
   try{sessionStorage.removeItem('almajlis_opening_question_270')}catch(_){ }
   setText('.turn','دور فريق: '+(currentTurn===1?team1:team2));setText('.points',pts+' نقطة');setText('.category',cat);setText('.t1',team1);setText('.t2',team2);setText('.s1',score1);setText('.s2',score2);
   const question=r.querySelector('.question');question.innerHTML=questionMarkup(q);question.classList.toggle('long',(question.textContent||'').length>135);
   r.querySelector('.media').innerHTML=mediaMarkup(cat,q);r.querySelector('.answer').classList.remove('show');r.querySelector('.answer b').textContent=q.answer||'';r.querySelector('.reveal').style.display='block';
   r.querySelector('.award .one').textContent=(team1||'الفريق الأول')+' +'+(state.doubleTeam===1?Number(pts)*2:pts);r.querySelector('.award .two').textContent=(team2||'الفريق الثاني')+' +'+(state.doubleTeam===2?Number(pts)*2:pts);
   syncHelpButtons();startTimer();return true;
  }catch(error){pool.unshift(q);current=null;hide();window.show?.('boardScreen');console.error('BUILD 272 isolated open',error);return false}
 }
 function reveal(){if(!current)return;state.revealed=true;stopTimer();const r=root();r.querySelector('.answer').classList.add('show');r.querySelector('.reveal').style.display='none';syncHelpButtons()}
 function returnToBoard(){if(current?.q&&current?.btn?.dataset.used!=='1'){const pool=gameQuestions?.[current.cat]?.[current.basePts||current.pts];if(Array.isArray(pool)&&!pool.some(q=>q?.id===current.q.id))pool.unshift(current.q)}if(state.doubleTeam){const helpers=helperStore();helpers.pendingDoubleTeam=state.doubleTeam;window.ALMAJLIS_HELP_275?.save?.();window.ALMAJLIS_HELP_275?.syncBoard?.()}current=null;hide();window.show?.('boardScreen')}
 function givePoints(team){if(!current||!state.revealed)return;if(team&&state.doubleTeam===team)current.pts=Number(current.basePts||current.pts)*2;hide();try{window.award?.(team)}catch(error){console.error('BUILD 272 award',error);window.show?.('boardScreen')}}

 createHost();window.ALMAJLIS_DIRECT_OPEN_269=open;window.ALMAJLIS_STABLE_QUESTION_272={open,hide,returnToBoard,activateHelp,syncHelpButtons};
 document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-272-ISOLATED-QUESTION-20260922');document.querySelector('meta[name="build-number"]')?.setAttribute('content','272');document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 272'));
 try{sessionStorage.setItem('almajlis_build_seen','272');sessionStorage.setItem('almajlis_active_build','272')}catch(_){ }
})();
