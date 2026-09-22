/* BUILD 272 — isolated question runtime; legacy question observers stay dormant */
(()=>{'use strict';
 const state={interval:0,seconds:30,steal:false,revealed:false};
 const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

 function createHost(){
  let host=document.getElementById('mjStableQuestion272');if(host)return host;
  host=document.createElement('div');host.id='mjStableQuestion272';
  host.style.cssText='display:none;position:fixed;inset:0;z-index:2147483500;background:#0f172a';
  const root=host.attachShadow({mode:'open'});
  root.innerHTML=`<style>
   :host{font-family:"Tajawal Local","SF Arabic","Geeza Pro",Arial,sans-serif;direction:rtl;color:#fff}
   *{box-sizing:border-box}button{font:inherit}.screen{width:100vw;height:100dvh;display:grid;grid-template-rows:58px minmax(0,1fr);gap:10px;padding:max(8px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(8px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left));background:radial-gradient(circle at 48% 38%,#25205f 0,#111936 48%,#08111f 100%);overflow:hidden}
   header{position:relative;display:grid;place-items:center;border:1px solid #ffffff24;border-radius:25px;background:linear-gradient(90deg,#1e2952e8,#4f3691d9)}
   .turn{max-width:52%;font-size:clamp(16px,2vw,25px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.brand{position:absolute;left:22px;font-size:clamp(22px,2.8vw,35px)}
   .nav{position:absolute;top:7px;height:43px;padding:0 18px;border:1px solid #ffffff70;border-radius:14px;background:#ffffff0d;color:#fff;font-weight:700}.exit{right:12px}.back{right:125px}
   .stage{min-height:0;display:grid;grid-template-columns:minmax(0,1fr) clamp(150px,18vw,205px);gap:13px;direction:ltr}.card{position:relative;min-width:0;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;margin:34px 3px 25px;padding:43px 18px 35px;border:1px solid #818cf66b;border-radius:27px;background:#17213bea;direction:rtl;overflow:visible}
   .points,.category,.timer{position:absolute;display:grid;place-items:center;font-weight:800}.points{top:-31px;right:7%;min-width:155px;height:54px;padding:0 18px;border-radius:16px;background:linear-gradient(135deg,#7c4a08,#d48708);color:#fff3c4}.category{right:7%;bottom:-24px;min-width:160px;height:48px;padding:0 17px;border-radius:15px;background:linear-gradient(135deg,#4338ca,#7e22ce)}.timer{top:-32px;left:50%;transform:translateX(-50%);width:64px;height:64px;border:5px solid #e2e8f0;border-radius:50%;background:#1e293b;font:700 18px Arial}
   .question{flex:0 0 auto;width:min(1000px,96%);max-height:25dvh;padding:8px 15px;border:1px solid #94a3b833;border-radius:16px;background:#0206174d;font-size:clamp(18px,2.15vw,29px);font-weight:700;line-height:1.48;text-align:center;overflow:auto}.question.long{font-size:clamp(15px,1.75vw,24px)}.ayah{display:block;margin-top:7px;font-family:"Amiri Quran","Traditional Arabic",serif;font-size:1.18em;line-height:1.8}
   .media{flex:1 1 auto;display:grid;place-items:center;width:min(920px,94%);min-height:0;max-height:35dvh;padding:5px;border-radius:17px;background:#111b31;overflow:hidden}.media:empty{display:none}.media img,.media video{display:block;width:auto!important;height:auto!important;max-width:100%!important;max-height:33dvh!important;margin:auto!important;border-radius:11px;object-fit:contain!important}.media audio{width:min(680px,92%)}
   .reveal{position:absolute;left:4%;bottom:-24px;min-width:165px;height:48px;padding:0 20px;border:0;border-radius:15px;background:linear-gradient(90deg,#4f46e5,#7c3aed);color:#fff;font-weight:800}.answer{display:none;width:min(900px,94%);padding:10px 16px;border:1px solid #34d39988;border-radius:16px;background:#064e3b88;text-align:center}.answer.show{display:block}.answer b{display:block;color:#a7f3d0;font-size:clamp(20px,2.4vw,32px)}.award{display:flex;justify-content:center;gap:9px;margin-top:8px}.award button{min-height:40px;padding:7px 14px;border:0;border-radius:12px;color:#fff;font-weight:700}.one{background:#2563eb}.two{background:#db2777}.none{background:#475569}
   aside{min-height:0;display:flex;flex-direction:column;justify-content:center;gap:22px;direction:rtl}.team{display:grid;grid-template-rows:40px 66px}.name{z-index:1;display:grid;place-items:center;width:86%;margin:0 auto -5px;padding:4px;border-radius:15px 15px 7px 7px;background:#293f54;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.score{display:grid;place-items:center;border-radius:15px;font:700 clamp(25px,3vw,40px) Arial}.team:first-child .score{background:#2563eb}.team:last-child .score{background:#db2777}.urgent{background:#b91c1c;animation:pulse .55s infinite alternate}@keyframes pulse{to{transform:translateX(-50%) scale(1.08)}}
   @media(max-height:530px){.screen{grid-template-rows:50px minmax(0,1fr)}.nav{top:5px;height:39px}.card{margin:29px 2px 21px;padding:37px 14px 31px}.question{font-size:clamp(16px,3.8vh,23px);max-height:24dvh}.media{max-height:32dvh}.media img,.media video{max-height:30dvh!important}.points{top:-27px;height:48px}.timer{top:-28px;width:56px;height:56px}.category,.reveal{bottom:-21px;height:43px}}
  </style><main class="screen"><header><button class="nav exit" type="button">الخروج</button><button class="nav back" type="button">الرجوع إلى اللوحة</button><div class="turn"></div><div class="brand">المجلس</div></header><section class="stage"><article class="card"><div class="points"></div><div class="timer">00:30</div><div class="question"></div><div class="media"></div><div class="answer"><small>الإجابة الصحيحة</small><b></b><div class="award"><button class="one"></button><button class="two"></button><button class="none">لا أحد</button></div></div><div class="category"></div><button class="reveal" type="button">إظهار الجواب</button></article><aside><div class="team"><div class="name t1"></div><div class="score s1">0</div></div><div class="team"><div class="name t2"></div><div class="score s2">0</div></div></aside></section></main>`;
  document.body.appendChild(host);
  root.querySelector('.reveal').onclick=reveal;
  root.querySelector('.back').onclick=returnToBoard;
  root.querySelector('.exit').onclick=()=>{if(confirm('هل تريد الخروج من اللعبة؟')){stopTimer();hide();if(window.ALMAJLIS_STABILITY_273?.goHome){window.ALMAJLIS_STABILITY_273.goHome()}else{window.show?.('home')}}};
  root.querySelector('.one').onclick=()=>givePoints(1);root.querySelector('.two').onclick=()=>givePoints(2);root.querySelector('.none').onclick=()=>givePoints(0);
  return host;
 }
 function root(){return createHost().shadowRoot}
 function stopTimer(){clearInterval(state.interval);state.interval=0}
 function hide(){stopTimer();const host=document.getElementById('mjStableQuestion272');if(host)host.style.display='none'}
 function setText(selector,value){const node=root().querySelector(selector);if(node)node.textContent=value}
 function updateTimer(){const timer=root().querySelector('.timer');timer.textContent='00:'+String(Math.max(0,state.seconds)).padStart(2,'0');timer.classList.toggle('urgent',state.seconds<=5&&state.seconds>0)}
 function startTimer(){stopTimer();updateTimer();state.interval=setInterval(()=>{state.seconds--;updateTimer();if(state.seconds>0)return;stopTimer();if(!state.steal){state.steal=true;state.seconds=30;setText('.turn','فرصة لفريق: '+(currentTurn===1?team2:team1));startTimer()}else{setText('.turn','انتهى الوقت — يمكن إظهار الجواب')}},1000)}
 function questionMarkup(q){const raw=String(q?.question||''),marker='[[AYAH]]',at=raw.indexOf(marker);if(at>=0)return esc(raw.slice(0,at).trim())+'<span class="ayah">'+esc(raw.slice(at+marker.length).trim())+'</span>';return q?.question_html||esc(raw)}
 function mediaMarkup(cat,q){try{return cat==='من غير كلام'&&q?.mime&&typeof renderMimeQR==='function'?renderMimeQR(q):(typeof renderQuestionMedia==='function'?renderQuestionMedia(q):'')}catch(error){console.error('BUILD 272 media',error);return '<div>تعذر تجهيز الوسيط</div>'}}

 async function open(cat,pts,button){
  if(!button||button.dataset.used==='1')return false;
  const pool=gameQuestions?.[cat]?.[Number(pts)];if(!Array.isArray(pool)||!pool.length){window.showGameToast?.('لا يوجد سؤال متاح في هذا المستوى');return false}
  const q=pool.shift();stopTimer();
  try{
   current={cat,pts:Number(pts),btn:button,q};finalDecisionLocked=false;state.seconds=cat==='من غير كلام'?60:30;state.steal=false;state.revealed=false;
   document.querySelectorAll('.screen.active').forEach(screen=>screen.classList.remove('active'));
   const host=createHost(),r=root();host.style.display='block';
   try{sessionStorage.removeItem('almajlis_opening_question_270')}catch(_){ }
   setText('.turn','دور فريق: '+(currentTurn===1?team1:team2));setText('.points',pts+' نقطة');setText('.category',cat);setText('.t1',team1);setText('.t2',team2);setText('.s1',score1);setText('.s2',score2);
   const question=r.querySelector('.question');question.innerHTML=questionMarkup(q);question.classList.toggle('long',(question.textContent||'').length>135);
   r.querySelector('.media').innerHTML=mediaMarkup(cat,q);r.querySelector('.answer').classList.remove('show');r.querySelector('.answer b').textContent=q.answer||'';r.querySelector('.reveal').style.display='block';
   r.querySelector('.award .one').textContent=(team1||'الفريق الأول')+' +'+pts;r.querySelector('.award .two').textContent=(team2||'الفريق الثاني')+' +'+pts;
   startTimer();return true;
  }catch(error){pool.unshift(q);current=null;hide();window.show?.('boardScreen');console.error('BUILD 272 isolated open',error);return false}
 }
 function reveal(){if(!current)return;state.revealed=true;stopTimer();const r=root();r.querySelector('.answer').classList.add('show');r.querySelector('.reveal').style.display='none'}
 function returnToBoard(){if(current?.q&&current?.btn?.dataset.used!=='1'){const pool=gameQuestions?.[current.cat]?.[current.pts];if(Array.isArray(pool)&&!pool.some(q=>q?.id===current.q.id))pool.unshift(current.q)}current=null;hide();window.show?.('boardScreen')}
 function givePoints(team){if(!current||!state.revealed)return;hide();try{window.award?.(team)}catch(error){console.error('BUILD 272 award',error);window.show?.('boardScreen')}}

 createHost();window.ALMAJLIS_DIRECT_OPEN_269=open;window.ALMAJLIS_STABLE_QUESTION_272={open,hide,returnToBoard};
 document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-272-ISOLATED-QUESTION-20260922');document.querySelector('meta[name="build-number"]')?.setAttribute('content','272');document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 272'));
 try{sessionStorage.setItem('almajlis_build_seen','272');sessionStorage.setItem('almajlis_active_build','272')}catch(_){ }
})();
