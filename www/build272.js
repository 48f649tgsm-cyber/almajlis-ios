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
   .media{flex:1 1 auto;display:grid;place-items:center;width:min(1040px,98%);height:35dvh;min-height:0;max-height:390px;padding:0;border:1px solid #c5c5c5;border-radius:17px;background:#202b35;overflow:hidden}.media:empty{display:none}.media img,.media video{display:block;width:auto!important;height:auto!important;max-width:100%!important;max-height:100%!important;margin:auto!important;border-radius:11px;object-fit:contain!important}.media img{cursor:zoom-in}.media audio{width:min(680px,92%)}.media .mediaFrame{width:100%;height:100%;margin:0!important}.media .filledImage{position:relative;display:grid;place-items:center;overflow:hidden;border-radius:16px;background:#202b35}.media .filledImage .mediaBackdrop{position:absolute!important;inset:-9%;width:118%!important;height:118%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;filter:blur(22px) brightness(.5) saturate(.8);transform:scale(1.08);border-radius:0!important}.media .filledImage .mediaMain{position:relative!important;z-index:1;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;border-radius:10px!important;filter:drop-shadow(0 5px 12px #0008)}.media .wikiPlayerStage{width:100%;height:100%;display:grid;place-items:center}.media .wikiPlayerStage img{width:100%!important;height:100%!important;object-fit:contain!important}
   .reveal,.who-button{position:absolute;left:4%;bottom:-24px;min-width:165px;height:48px;padding:0 20px;border:1px solid #9c3026;border-radius:15px;background:#cf7467;color:#fff;font-weight:800}.who-button{display:none;background:#172733;border-color:#172733}.who-button.show{display:block}.answer{display:none;width:min(900px,94%);padding:10px 16px;border:1.5px solid #df7568;border-radius:16px;background:#fff;text-align:center}.answer.show{display:block}.answer b{display:block;color:#b40000;font-size:clamp(20px,2.4vw,32px)}
   .media-modal,.decision-screen{position:fixed;inset:0;z-index:20;display:none;place-items:center;padding:max(14px,env(safe-area-inset-top)) max(14px,env(safe-area-inset-right)) max(14px,env(safe-area-inset-bottom)) max(14px,env(safe-area-inset-left));background:#07111af2}.media-modal.show,.decision-screen.show{display:grid}.zoom-surface{width:100%;height:100%;display:grid;place-items:center;overflow:hidden;touch-action:none;user-select:none}.media-modal img{display:block;max-width:96vw;max-height:90dvh;object-fit:contain;transform-origin:center center;pointer-events:none;-webkit-user-drag:none}.modal-close{position:absolute;z-index:2;top:max(12px,env(safe-area-inset-top));right:max(12px,env(safe-area-inset-right));width:52px;height:52px;border:0;border-radius:50%;background:#fff;color:#111;font-size:25px;font-weight:900}.decision-screen{z-index:21;background:#fff;color:#172733}.decision-back{position:absolute;top:max(13px,env(safe-area-inset-top));right:max(13px,env(safe-area-inset-right));min-width:150px;height:48px;border:1.5px solid #c66556;border-radius:15px;background:#fff;color:#9c3026;font-weight:800}.decision-card{width:min(760px,92vw);display:grid;gap:18px;text-align:center}.decision-card h1{margin:0 0 12px;color:#b40000;font-size:clamp(30px,4.5vw,58px)}.decision-team,.decision-none{width:100%;min-height:88px;padding:14px 22px;border:0;border-radius:22px;color:#fff;font-size:clamp(25px,3.6vw,47px);font-weight:900;box-shadow:0 10px 26px #0002}.decision-one{background:#303fa6}.decision-two{background:#d33327}.decision-none{width:min(420px,80%);min-height:68px;margin:auto;background:#65717d;font-size:clamp(21px,2.8vw,35px)}
   aside{min-height:0;display:flex;flex-direction:column;justify-content:center;gap:16px;direction:rtl}.team{display:grid;grid-template-rows:34px 58px 46px;padding:5px;border:1.5px solid #202b35;border-radius:19px;background:#fff}.name{z-index:1;display:grid;place-items:center;width:92%;margin:0 auto -4px;padding:3px;border-radius:13px 13px 6px 6px;background:#293f54;color:#fff;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.score{display:grid;place-items:center;border-radius:13px;color:#fff;font:700 clamp(24px,3vw,38px) Arial}.team:first-child .score{background:#303fa6}.team:last-child .score{background:#d33327}.helps{display:flex;align-items:center;justify-content:center;gap:7px;padding-top:5px}.help{display:grid;place-items:center;width:38px;height:38px;padding:5px;border:2px solid var(--help-accent);border-radius:50%;background:#090909;color:#d9b75f;cursor:pointer;box-shadow:0 2px 6px #0004}.help[data-type="two"]{--help-accent:#29a9e8}.help[data-type="block"]{--help-accent:#ef5c55}.help[data-type="double"]{--help-accent:#9a72db}.help svg{width:25px;height:25px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.help .x2{font:800 18px Arial;color:#d9b75f}.help.active{background:#090909;color:#f5d77d;box-shadow:0 0 0 3px var(--help-accent),0 0 13px var(--help-accent)}.help:disabled,.help.used{opacity:.3;filter:grayscale(1);cursor:default}.urgent{background:#d33327!important;color:#fff;animation:pulse .55s infinite alternate}@keyframes pulse{to{transform:translateX(-50%) scale(1.08)}}
   @media(max-height:530px){.screen{grid-template-rows:50px minmax(0,1fr)}.nav{top:5px;height:39px}.card{margin:29px 2px 21px;padding:37px 14px 31px}.question{font-size:clamp(16px,3.8vh,23px);max-height:21dvh}.media{height:36dvh;max-height:36dvh}.media img,.media video{max-height:100%!important}.points{top:-27px;height:48px}.timer{top:-28px;width:56px;height:56px}.category,.reveal{bottom:-21px;height:43px}}
  </style><main class="screen"><header><button class="nav exit" type="button">الخروج</button><button class="nav back" type="button">الرجوع إلى اللوحة</button><div class="turn"></div><div class="brand">المجلس</div></header><section class="stage"><article class="card"><div class="points"></div><div class="timer">00:30</div><div class="question"></div><div class="media"></div><div class="answer"><small>الإجابة الصحيحة</small><b></b></div><div class="category"></div><button class="reveal" type="button">الجواب</button><button class="who-button" type="button">من أجاب؟</button></article><aside><div class="team" data-team="1"><div class="name t1"></div><div class="score s1">0</div><div class="helps"></div></div><div class="team" data-team="2"><div class="name t2"></div><div class="score s2">0</div><div class="helps"></div></div></aside></section></main><div class="media-modal" role="dialog" aria-modal="true" aria-label="عرض الصورة مكبرة"><button class="modal-close" type="button" aria-label="إغلاق">×</button><div class="zoom-surface"><img alt="الصورة المكبرة"></div></div><section class="decision-screen" role="dialog" aria-modal="true" aria-label="من أجاب"><header><button class="decision-back" type="button">العودة إلى الجواب</button><div class="turn decision-turn"></div><div class="brand">المجلس</div></header><div class="stage"><article class="card"><div class="decision-card"><h1>من أجاب؟</h1><div class="decision-choices"><button class="decision-team decision-one" type="button"></button><button class="decision-team decision-two" type="button"></button></div><button class="decision-none" type="button">لا أحد</button></div></article><aside><div class="team" data-team="1"><div class="name decision-t1"></div><div class="score decision-s1">0</div></div><div class="team" data-team="2"><div class="name decision-t2"></div><div class="score decision-s2">0</div></div></aside></div></section>`;
  const mediaFit=document.createElement('style');
  mediaFit.textContent=`.card{justify-content:flex-start}.media{flex:1 1 0;height:auto;max-height:none;min-height:0;width:min(1040px,98%);background:#f8f7f3;display:flex!important;align-items:stretch;justify-content:center}.media .mediaFrame,.media .filledImage,.media .flagStage,.media .lineupStage,.media .mjCareerImage260{width:100%!important;height:100%!important;min-height:0!important;max-width:100%!important;max-height:100%!important;overflow:hidden!important}.media .filledImage{position:relative!important;display:block!important}.media .filledImage .mediaMain{position:absolute!important;inset:0!important;display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;object-position:center!important}.media .mediaFrame>img:not(.mediaMain):not(.mediaBackdrop),.media .mjCareerImage260 img{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;object-position:center!important}.media .lineupStage{display:flex!important;flex-direction:column!important;justify-content:flex-start!important;overflow:hidden!important;padding:7px!important}.media .lineupStage .lineupHeader,.media .lineupStage .lineupHint{flex:none!important}.media .lineupStage .footballPitch{min-height:0!important;max-height:100%!important;height:auto!important;width:min(100%,650px)!important;aspect-ratio:auto!important;flex:1 1 0!important;margin:0 auto!important}.media .mediaBackdrop{display:none!important}.media .letterGrid{display:grid!important;grid-template-columns:repeat(7,minmax(0,1fr))!important;grid-template-rows:repeat(4,minmax(0,1fr))!important;align-content:center!important;gap:min(1.2vh,10px)!important;width:min(100%,650px)!important;height:100%!important;padding:10px!important;margin:auto!important}.media .letterCell{display:grid!important;place-items:center!important;min-height:0!important;aspect-ratio:auto!important;border-radius:10px!important;border:1px solid #c9d7de!important;background:#edf5f8!important;color:#243442!important;font-size:clamp(16px,3.4vh,30px)!important;font-weight:800!important}.media .letterCell.active{background:#f37b4a!important;color:#fff!important;border-color:#bd4c23!important}.career-question .question{flex:none}.career-question .media{flex:1 1 0}`;
  root.appendChild(mediaFit);
  const allMediaFit=document.createElement('style');
  allMediaFit.textContent=`
   .media:empty{display:none!important}
   .media .mediaFrame,.media .wikiPlayerStage,.media .playerGallery,.media .silentPuzzle{box-sizing:border-box;min-width:0;min-height:0;max-width:100%;max-height:100%}
   .media .filledImage{flex:1 1 auto;min-width:0;min-height:0}
   .media .filledImage .mediaMain{min-width:0;min-height:0;filter:none!important}
   .media .wikiPlayerStage{position:relative;display:grid;place-items:center;width:100%!important;height:100%!important;overflow:hidden}
   .media .wikiPlayerStage img{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important}
   .media .playerGallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;width:100%;height:100%;align-items:stretch;overflow:hidden;padding:8px}
   .media .playerCard{min-width:0;min-height:0;display:flex;flex-direction:column;overflow:hidden;border:1px solid #ccc;border-radius:12px;background:#fff}
   .media .playerCard img{width:100%!important;height:100%!important;min-height:0!important;flex:1 1 0;object-fit:contain!important;object-position:center!important}
   .media .playerNum{flex:none;text-align:center;padding:5px;font-size:clamp(10px,1.7vw,16px);font-weight:700}
   .media .playerFallback{flex:1;display:grid;place-items:center;text-align:center;padding:8px}
   .media .audioStage{display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:12px;text-align:center;background:#faf6ee}
   .media .audioStage audio{display:block;max-width:100%;flex:none}.media .waveform{display:flex;align-items:center;justify-content:center;gap:3px;height:32px;max-width:100%;overflow:hidden}.media .waveform i{width:4px;flex:none;border-radius:4px;background:#bd8b2f}
   .media video{display:block;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important}
   .media .silentPuzzle{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:auto}.media .silentRow{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap}.media .silentToken{font-size:clamp(20px,5vh,42px)}
   .media .lineupStage{background:#10233b;color:#fff}.media .lineupHeader{display:flex;justify-content:space-between;gap:8px;align-items:center;width:100%;color:#fff}.media .lineupHeader b,.media .lineupHeader span{display:block}.media .lineupHeader em{font-style:normal}.media .lineupHint{text-align:center;color:#fff}
   .media .lineupStage .footballPitch{position:relative;overflow:hidden;border:2px solid #fff;border-radius:12px;background:repeating-linear-gradient(0deg,#277744 0 12%,#2e824b 12% 24%)}
   .media .lineupStage .lineupRows{position:absolute;inset:5%;display:flex;flex-direction:column-reverse;justify-content:space-between}.media .lineupStage .lineupRow{display:grid;grid-template-columns:repeat(var(--row-count),minmax(0,1fr));align-items:center;justify-items:center;min-height:14%}.media .lineupPlayer{min-width:0;text-align:center}.media .lineupPlayer .shirt{display:block;color:#fff}.media .lineupPlayer b{display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:clamp(9px,1.6vh,14px);color:#fff;background:#152939}
   .media .mjCareerImage260,.media .mjCareerImage260 img{min-width:0;min-height:0;max-width:100%!important;max-height:100%!important;object-fit:contain!important}
   .media .mediaError{display:grid;place-items:center;width:100%;padding:14px;text-align:center;color:#8b2020}.media .filledImage .mediaError{position:absolute;inset:0;background:#fff9f7}
   @media(max-height:530px){.media .lineupStage .lineupHeader,.media .lineupStage .lineupHint{font-size:clamp(10px,2vh,14px);padding:2px}.media .playerGallery{gap:5px;padding:5px}}
  `;
  root.appendChild(allMediaFit);
  const goalStyle=document.createElement('style');
  goalStyle.textContent=`
   .media.goal-media{position:relative;overflow:hidden;background:#f8f7f3}
   .goal-stage{position:relative;display:grid;place-items:center;width:100%;height:100%;min-width:0;min-height:0;background:#111}
   .goal-stage video{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;background:#111}
   .goal-controls{position:absolute;z-index:5;left:9px;top:9px;display:flex;gap:7px;direction:rtl;padding:6px;border-radius:11px;background:#142531eb}
   .goal-controls[hidden],.goal-stage video[hidden]{display:none!important}
   .goal-controls button,.goal-reopen{min-height:37px;padding:5px 12px;border:0;border-radius:8px;background:#fff;color:#172733;font:700 clamp(12px,1.4vw,16px) Arial;white-space:nowrap;cursor:pointer}
   .goal-reopen{position:absolute;z-index:6;left:50%;top:50%;transform:translate(-50%,-50%);background:#172733;color:#fff}
   .goal-video-modal{position:fixed;inset:0;z-index:100;display:none;place-items:center;background:#000;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)}
   .goal-video-modal.show{display:grid}.goal-video-modal video{display:block;width:100%;height:100%;object-fit:contain;background:#000}
   .goal-video-modal .goal-controls{left:50%;top:auto;bottom:max(10px,env(safe-area-inset-bottom));transform:translateX(-50%)}
   .screen.goal-answer .answer{padding:5px 10px;max-height:16dvh;overflow:auto}.screen.goal-answer .answer b{font-size:clamp(16px,1.55vw,23px);line-height:1.2}
   .screen.goal-answer .media{flex:1 1 auto;min-height:0}
   .screen.player-question .question{flex:1 1 auto;max-height:none;min-height:0;overflow:hidden;line-height:1.28}
   .screen.player-question .question.long{max-height:none}
  `;root.appendChild(goalStyle);
  const goalViewer=document.createElement('div');goalViewer.className='goal-video-modal';goalViewer.setAttribute('role','dialog');goalViewer.setAttribute('aria-modal','true');goalViewer.setAttribute('aria-label','عرض فيديو الهدف مكبرًا');
  goalViewer.innerHTML='<video playsinline controls></video><div class="goal-controls"><button type="button" class="goal-modal-play">⏸ إيقاف</button><button type="button" class="goal-modal-close">× إغلاق والعودة</button></div>';
  root.appendChild(goalViewer);
  goalViewer.querySelector('.goal-modal-close').onclick=closeGoalViewer;
  goalViewer.querySelector('.goal-modal-play').onclick=()=>toggleGoalPlayback(goalViewer.querySelector('video'),goalViewer.querySelector('.goal-modal-play'));
  goalViewer.querySelector('video').addEventListener('play',()=>paintGoalButton(goalViewer.querySelector('video'),goalViewer.querySelector('.goal-modal-play')));
  goalViewer.querySelector('video').addEventListener('pause',()=>paintGoalButton(goalViewer.querySelector('video'),goalViewer.querySelector('.goal-modal-play')));
  const teamUi=document.createElement('style');
  teamUi.textContent=`
   :host{--team-one:#245f5a;--team-two:#a65a4b;--team-ink:#243d43}
   .team{border-color:#d9dedc;background:#fff;box-shadow:0 4px 14px #243d4312}
   .team .name{background:var(--team-ink)}
   .team[data-team="1"] .score{background:var(--team-one)!important}
   .team[data-team="2"] .score{background:var(--team-two)!important}
   .decision-screen{display:none;grid-template-rows:58px minmax(0,1fr);gap:10px;direction:rtl;padding:max(8px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(8px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left));background:#fff}
   .decision-screen.show{display:grid}
   .decision-screen header{height:58px;width:100%}
   .decision-back{position:absolute;top:7px;right:12px;min-width:178px;height:43px;padding:0 14px;border:2px solid #fff;border-radius:16px;background:transparent;color:#fff;font-size:clamp(15px,1.7vw,22px);font-weight:800}
   .decision-screen .stage{min-height:0;display:grid;grid-template-columns:minmax(0,1fr) clamp(185px,19vw,235px);gap:13px;direction:ltr}
   .decision-screen .card{display:flex;align-items:center;justify-content:center;min-height:0;margin:34px 3px 25px;padding:24px;border:1.5px solid #202b35;border-radius:27px;background:#f4f4f4}
   .decision-screen aside{direction:rtl}
   .decision-screen .team{grid-template-rows:34px minmax(58px,1fr);min-height:0;max-height:160px;align-self:center}
   .decision-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(14px,3vh,28px);width:min(870px,94%);height:100%;min-height:0}
   .decision-card h1{margin:0;color:#9c3026;font-size:clamp(28px,5vw,58px);line-height:1.1}
   .decision-choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(12px,2vw,30px);width:100%}
   .decision-team,.decision-none{width:100%;min-height:clamp(74px,17vh,130px);padding:10px;border:2px solid;border-radius:22px;background:#fff;font-size:clamp(22px,3vw,40px);font-weight:800;box-shadow:0 6px 18px #243d4312;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
   .decision-one{color:var(--team-one);border-color:var(--team-one);background:#e7f1ee}
   .decision-two{color:var(--team-two);border-color:var(--team-two);background:#f8ede8}
   .decision-none{width:min(340px,65%);min-height:clamp(57px,11vh,86px);color:#263b41;border-color:#b7c3c4;background:#fff;font-size:clamp(20px,2.5vw,32px)}
   @media(max-height:530px){.decision-screen{grid-template-rows:50px minmax(0,1fr)}.decision-screen header{height:50px}.decision-screen .card{margin:29px 2px 21px}.decision-team,.decision-none{min-height:clamp(54px,16vh,82px)}.decision-card{gap:10px}}
  `;root.appendChild(teamUi);
  const choices=document.createElement('div');choices.className='answer-choices';
  choices.innerHTML='<div class="answer-teams"><button class="answer-team answer-one" type="button"></button><button class="answer-team answer-two" type="button"></button></div><button class="answer-none" type="button">لا أحد</button>';
  root.querySelector('.answer').appendChild(choices);
  const choiceStyle=document.createElement('style');choiceStyle.textContent=`
   .answer .answer-choices{display:none;flex-direction:column;align-items:center;gap:12px;width:100%}
   .answer.choosing{width:min(900px,94%);padding:12px 16px}
   .answer.choosing>small,.answer.choosing>b,.answer.choosing>img{display:none!important}
   .answer.choosing .answer-choices{display:flex}
   .answer-teams{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(10px,2vw,24px);width:100%}
   .answer-team,.answer-none{min-width:0;min-height:clamp(56px,11vh,85px);padding:8px 12px;border:1.5px solid #d5aca4;border-radius:15px;background:#fff;color:#263b43;font-size:clamp(19px,2.4vw,31px);font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:none}
   .answer-one{border-color:#9bafb9;background:#f3f7f8}.answer-two{border-color:#d8b8ae;background:#fcf7f4}
   .answer-none{width:min(300px,60%);min-height:clamp(48px,8vh,65px);background:#fff}
   .team[data-team="1"] .score{background:#e7eff2!important;color:#274452!important}
   .team[data-team="2"] .score{background:#f4e9e3!important;color:#754d3f!important}
  `;root.appendChild(choiceStyle);
  const decisionCloneStyle=document.createElement('style');
  decisionCloneStyle.textContent=`
   .decision-screen,.decision-screen.show{padding:0;display:none;background:#fff}
   .decision-screen.show{display:block}
   .decision-screen>.screen{width:100%;height:100dvh}
   .decision-screen .stage{grid-template-columns:minmax(0,1fr) clamp(185px,19vw,235px);gap:13px}
   .decision-screen .card{margin:34px 3px 25px;padding:43px 18px 35px;justify-content:flex-start;align-items:center;border:1.5px solid #202b35;background:#f4f4f4}
   .decision-screen .team{grid-template-rows:34px 58px 46px;max-height:none;min-height:0;align-self:auto}
   .decision-screen .selection{flex:0 0 auto;width:min(900px,94%);display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px 16px;border:1.5px solid #df7568;border-radius:16px;background:#fff}
   .decision-screen .selection-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(18px,3vw,42px);width:100%;direction:rtl}
   .decision-screen .selection button{display:grid;place-items:center;min-width:0;min-height:clamp(56px,10dvh,84px);padding:9px 16px;border:1.5px solid #d5aca4;border-radius:15px;background:#fff;color:#263b43;font-size:clamp(18px,2.2vw,30px);font-weight:800;line-height:1.25;text-align:center;overflow-wrap:anywhere;cursor:pointer}
   .decision-screen .selection .selection-one{border-color:#9bafb9;background:#f3f7f8}
   .decision-screen .selection .selection-two{border-color:#d8b8ae;background:#fcf7f4}
   .decision-screen .selection .selection-none{width:min(360px,72%);min-height:clamp(48px,8dvh,65px)}
   .decision-screen .help{pointer-events:none}
   @media(max-height:530px){.decision-screen .card{margin:29px 2px 21px;padding:37px 14px 31px}.decision-screen .selection{gap:8px;padding:8px 10px}.decision-screen .selection button{min-height:45px}.decision-screen .selection .selection-none{min-height:42px}}
  `;
  root.appendChild(decisionCloneStyle);

  document.body.appendChild(host);
  root.querySelector('.reveal').onclick=reveal;
  root.querySelector('.back').onclick=returnToBoard;
  root.querySelector('.exit').onclick=()=>{if(confirm('هل تريد الخروج من اللعبة؟')){stopTimer();hide();if(window.ALMAJLIS_STABILITY_273?.goHome){window.ALMAJLIS_STABILITY_273.goHome()}else{window.show?.('home')}}};
  root.querySelector('.who-button').onclick=openDecision;
  root.querySelector('.decision-one').onclick=()=>givePoints(1);root.querySelector('.decision-two').onclick=()=>givePoints(2);root.querySelector('.decision-none').onclick=()=>givePoints(0);root.querySelector('.decision-back').onclick=closeDecision;root.querySelector('.answer-one').onclick=()=>givePoints(1);root.querySelector('.answer-two').onclick=()=>givePoints(2);root.querySelector('.answer-none').onclick=()=>givePoints(0);
  const mediaModal=root.querySelector('.media-modal');root.querySelector('.media').onclick=event=>{const image=event.target.closest('img');if(!image)return;mediaModal.querySelector('img').src=image.currentSrc||image.src;mediaModal.classList.add('show')};mediaModal.onclick=event=>{if(event.target===mediaModal||event.target.closest('.modal-close'))mediaModal.classList.remove('show')};
  root.querySelector('.media').addEventListener('error',event=>{
   const image=event.target;if(!(image instanceof HTMLImageElement)||!image.classList.contains('mediaMain'))return;
   const cacheKey=current?.q?.media?.cacheKey||'';
   if(!image.dataset.networkRetry&&image.src.startsWith('blob:')&&cacheKey.startsWith('question-media/')){
    image.dataset.networkRetry='1';image.src='https://qkacbcpcezsevhrkiirb.supabase.co/storage/v1/object/public/'+cacheKey;return;
   }
   const holder=image.closest('.filledImage');if(holder&&!holder.querySelector('.mediaError')){
    const error=document.createElement('div');error.className='mediaError';error.textContent='تعذر تحميل الصورة. تحقّق من توفر ملف الوسيط.';
    image.style.setProperty('display','none','important');holder.appendChild(error);
   }
  },true);
  installHelpButtons(root);
  return host;
 }
 function root(){return createHost().shadowRoot}
 let goalOrigin=null,goalWasPlaying=false;
 function paintGoalButton(video,button){if(button)button.textContent=video?.paused?'▶ تشغيل':'⏸ إيقاف'}
 function toggleGoalPlayback(video,button){if(!video)return;if(video.paused)video.play().catch(()=>{});else video.pause();paintGoalButton(video,button)}
 function closeGoalViewer(){
  const modal=root().querySelector('.goal-video-modal'),large=modal.querySelector('video');
  large.pause();large.removeAttribute('src');large.load();modal.classList.remove('show');
  if(goalOrigin?.isConnected&&goalWasPlaying&&!goalOrigin.hidden)goalOrigin.play().catch(()=>{});
  goalOrigin=null;
 }
 function expandGoalVideo(video){
  if(!video?.src)return;
  const modal=root().querySelector('.goal-video-modal'),large=modal.querySelector('video');
  goalOrigin=video;goalWasPlaying=!video.paused;video.pause();large.src=video.currentSrc||video.src;large.muted=video.muted;large.loop=video.loop;
  try{large.currentTime=video.currentTime||0}catch(_){ }
  modal.classList.add('show');large.play().catch(()=>{});
 }
 function goalOriginalUrl(q){
  if(q?.answerMedia?.type==='video'&&q.answerMedia.src)return q.answerMedia.src;
  const sketch=String(q?.media?.src||'');if(/question[-_]sketch/i.test(sketch))return sketch.replace(/question[-_]sketch/i,'answer-original');
  const key=String(q?.media?.cacheKey||'').replace(/^question-media\//,'');
  if(/question[-_]sketch/i.test(key))return 'https://qkacbcpcezsevhrkiirb.supabase.co/storage/v1/object/public/question-media/'+key.replace(/question[-_]sketch/i,'answer-original');
  return '';
 }
 function renderGoalMedia(host,src,original){
  host.replaceChildren();host.classList.add('goal-media');
  if(!src){host.textContent='الفيديو الأصلي غير مرتبط بهذا السؤال.';return}
  const stage=document.createElement('div');stage.className='goal-stage';
  const video=document.createElement('video');video.src=src;video.controls=true;video.playsInline=true;video.preload='auto';video.muted=!original;video.loop=!original;
  video.setAttribute('aria-label',original?'الفيديو الأصلي بالصوت والصورة':'فيديو السؤال المموّه');
  const bar=document.createElement('div');bar.className='goal-controls';
  const play=document.createElement('button');play.type='button';play.textContent='▶ تشغيل';play.onclick=()=>toggleGoalPlayback(video,play);
  const zoom=document.createElement('button');zoom.type='button';zoom.textContent='⛶ تكبير';zoom.onclick=()=>expandGoalVideo(video);
  const close=document.createElement('button');close.type='button';close.textContent='× إغلاق';close.onclick=()=>{
   video.pause();video.hidden=true;bar.hidden=true;
   const reopen=document.createElement('button');reopen.type='button';reopen.className='goal-reopen';reopen.textContent='▶ عرض الفيديو';
   reopen.onclick=()=>{video.hidden=false;bar.hidden=false;reopen.remove();video.play().catch(()=>{})};stage.append(reopen);
  };
  bar.append(play,zoom,close);stage.append(video,bar);host.append(stage);
  video.addEventListener('play',()=>paintGoalButton(video,play));video.addEventListener('pause',()=>paintGoalButton(video,play));
  video.play().catch(()=>{});
 }
 function fitPlayerQuestion(){
  if(current?.cat!=='من هو اللاعب')return;
  const r=root(),card=r.querySelector('.screen .card'),q=r.querySelector('.screen .question');
  if(!card||!q)return;
  q.style.height='auto';q.style.maxHeight='none';q.style.overflow='hidden';
  let size=Math.min(30,Math.max(17,window.innerWidth*.021));q.style.fontSize=size+'px';
  while(size>11&&q.scrollHeight>q.clientHeight+1){size-=.5;q.style.fontSize=size+'px'}
  q.dataset.fullTextVisible=q.scrollHeight<=q.clientHeight+1?'yes':'no';
  if(q.dataset.fullTextVisible==='no')q.style.overflow='auto';
 }
 function stopTimer(){clearInterval(state.interval);state.interval=0}
 function hide(){stopTimer();const host=document.getElementById('mjStableQuestion272');if(host){host.shadowRoot.querySelectorAll('video').forEach(v=>v.pause());host.style.display='none'}}
 function openDecision(){
  if(!current||!state.revealed)return;
  const r=root(),decision=r.querySelector('.decision-screen');
  if(current.cat==='من سجل الهدف')r.querySelector('.screen .media video')?.pause();
  // Copy the actual answer screen so that its header, question, media and score rail
  // remain identical; only the answer card and its button change.
  const screen=r.querySelector('.screen').cloneNode(true);
  screen.querySelector('.answer')?.remove();
  screen.querySelector('.reveal')?.remove();
  screen.querySelector('.who-button')?.remove();
  if(current.q?.answerOnlyMedia||current.cat==='من سجل الهدف')screen.querySelector('.media')?.replaceChildren();
  const selection=document.createElement('div');selection.className='selection';
  selection.innerHTML='<div class="selection-pair"><button class="selection-one" type="button"></button><button class="selection-two" type="button"></button></div><button class="selection-none" type="button">لا أحد</button>';
  selection.querySelector('.selection-one').textContent=team1||'الفريق الأول';
  selection.querySelector('.selection-two').textContent=team2||'الفريق الثاني';
  screen.querySelector('.card').appendChild(selection);
  screen.querySelector('.back').textContent='العودة إلى الجواب';
  screen.querySelector('.back').onclick=closeDecision;
  screen.querySelector('.exit').onclick=()=>{if(confirm('هل تريد الخروج من اللعبة؟')){closeDecision();stopTimer();hide();if(window.ALMAJLIS_STABILITY_273?.goHome){window.ALMAJLIS_STABILITY_273.goHome()}else{window.show?.('home')}}};
  selection.querySelector('.selection-one').onclick=()=>givePoints(1);
  selection.querySelector('.selection-two').onclick=()=>givePoints(2);
  selection.querySelector('.selection-none').onclick=()=>givePoints(0);
  screen.querySelector('.media').onclick=event=>{const image=event.target.closest('img');if(!image)return;const modal=r.querySelector('.media-modal');modal.querySelector('img').src=image.currentSrc||image.src;modal.classList.add('show')};
  decision.replaceChildren(screen);
  decision.classList.add('show');
 }
 function closeDecision(){const r=root();r.querySelector('.decision-screen').classList.remove('show');r.querySelector('.answer').classList.remove('choosing');r.querySelector('.who-button').textContent='من أجاب؟';if(current?.cat==='من سجل الهدف'){const video=r.querySelector('.screen .media video');if(video&&!video.hidden)video.play().catch(()=>{})}}
 function setText(selector,value){const node=root().querySelector(selector);if(node)node.textContent=value}
 function updateTimer(){const timer=root().querySelector('.timer');timer.textContent='00:'+String(Math.max(0,state.seconds)).padStart(2,'0');timer.classList.toggle('urgent',state.seconds<=5&&state.seconds>0)}
 function helperStore(){return window.ALMAJLIS_HELP_275?.state||{used:{1:{two:false,block:false,double:false},2:{two:false,block:false,double:false}}}}
 function helperIcon(type){
  if(type==='two')return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M25 37 16.5 13C15 9 17 5 20.5 4s6.5 1 7.7 4.6L35 31M35 31l5-23c.9-4 3.6-6.4 7-5.7 3.6.7 5.2 3.9 4.4 7.7L46 38"/><path d="M25 36c-3-5-6-8-9-9-3-1-6 1-6 4 0 2 2 4 5 7l5 6M46 36c4 1 7 4 8 8 1 8-5 16-14 17H29c-8-1-14-6-16-14l-2-9M24 43c3-4 8-5 12-2M31 48c3-4 8-5 12-2M28 60v-5M43 60v-5"/></svg>';
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
 function mediaMarkup(cat,q){try{
  if(cat==='حروف اسلامي')return renderQuestionMedia({media:{type:'letter_grid',highlight:String(q?.answer||'').trim().charAt(0)}});
  return cat==='من غير كلام'&&q?.mime&&typeof renderMimeQR==='function'?renderMimeQR(q):(typeof renderQuestionMedia==='function'?renderQuestionMedia(q):'');
 }catch(error){console.error('BUILD 272 media',error);return '<div>تعذر تجهيز الوسيط</div>'}}

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
   const question=r.querySelector('.question');question.style.cssText='';question.innerHTML=questionMarkup(q);question.classList.toggle('long',(question.textContent||'').length>135);
   const mediaHost=r.querySelector('.media');mediaHost.classList.remove('goal-media');
   if(cat==='من سجل الهدف')renderGoalMedia(mediaHost,q?.media?.src||'',false);
   else mediaHost.innerHTML=q.answerOnlyMedia?'':mediaMarkup(cat,q);
   r.querySelector('.screen').classList.toggle('career-question',cat==='مسيرة لاعب');
   r.querySelector('.screen').classList.toggle('player-question',cat==='من هو اللاعب');
   r.querySelector('.screen').classList.remove('goal-answer');
   if(cat==='مسيرة لاعب')question.textContent='من هو اللاعب؟';r.querySelector('.answer').classList.remove('show','choosing');r.querySelector('.who-button').textContent='من أجاب؟';r.querySelector('.answer').querySelector('img.ai-answer-photo')?.remove();r.querySelector('.answer b').textContent=q.answer||'';r.querySelector('.reveal').style.display='block';r.querySelector('.who-button').classList.remove('show');r.querySelector('.decision-screen').classList.remove('show');r.querySelector('.media-modal').classList.remove('show');
   r.querySelector('.decision-one').textContent=team1||'الفريق الأول';r.querySelector('.decision-two').textContent=team2||'الفريق الثاني';
   if(cat==='من هو اللاعب')requestAnimationFrame(fitPlayerQuestion);
   syncHelpButtons();startTimer();return true;
  }catch(error){pool.unshift(q);current=null;hide();window.show?.('boardScreen');console.error('BUILD 272 isolated open',error);return false}
 }
 function reveal(){if(!current)return;state.revealed=true;stopTimer();const r=root();if(current.q?.answerOnlyMedia)r.querySelector('.media').innerHTML=mediaMarkup(current.cat,current.q);
 if(current.cat==='من سجل الهدف'){
  closeGoalViewer();r.querySelector('.screen').classList.add('goal-answer');
  renderGoalMedia(r.querySelector('.media'),goalOriginalUrl(current.q),true);
 }
 if(current.cat==='AI كروية'&&current.q?.answerPhotoSrc){
  r.querySelector('.media').innerHTML='';
  const answer=r.querySelector('.answer'),photo=document.createElement('img');
  photo.className='ai-answer-photo';photo.src=current.q.answerPhotoSrc;photo.alt=current.q.answer||'صورة اللاعب';
  photo.style.cssText='display:block;max-width:100%;max-height:42dvh;min-height:0;object-fit:contain;margin:8px auto 0;border-radius:11px';
  answer.querySelector('img.ai-answer-photo')?.remove();answer.appendChild(photo);
 }
 r.querySelector('.answer').classList.add('show');r.querySelector('.reveal').style.display='none';r.querySelector('.who-button').classList.add('show');syncHelpButtons()}
 function returnToBoard(){if(current?.q&&current?.btn?.dataset.used!=='1'){const pool=gameQuestions?.[current.cat]?.[current.basePts||current.pts];if(Array.isArray(pool)&&!pool.some(q=>q?.id===current.q.id))pool.unshift(current.q)}if(state.doubleTeam){const helpers=helperStore();helpers.pendingDoubleTeam=state.doubleTeam;window.ALMAJLIS_HELP_275?.save?.();window.ALMAJLIS_HELP_275?.syncBoard?.()}current=null;hide();window.show?.('boardScreen')}
 function givePoints(team){if(!current||!state.revealed)return;closeDecision();if(team&&state.doubleTeam===team)current.pts=Number(current.basePts||current.pts)*2;hide();try{window.award?.(team)}catch(error){console.error('BUILD 272 award',error);window.show?.('boardScreen')}}

 window.addEventListener('resize',()=>{if(current?.cat==='من هو اللاعب'&&document.getElementById('mjStableQuestion272')?.style.display!=='none')requestAnimationFrame(fitPlayerQuestion)},{passive:true});
 createHost();window.ALMAJLIS_DIRECT_OPEN_269=open;window.ALMAJLIS_STABLE_QUESTION_272={open,hide,returnToBoard,activateHelp,syncHelpButtons};
 document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-272-ISOLATED-QUESTION-20260922');document.querySelector('meta[name="build-number"]')?.setAttribute('content','272');document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD 272'));
 try{sessionStorage.setItem('almajlis_build_seen','272');sessionStorage.setItem('almajlis_active_build','272')}catch(_){ }
})();
