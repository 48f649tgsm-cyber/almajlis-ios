/* BUILD 275 — unified visual identity, team-name limit and match helpers */
(()=>{'use strict';
 const BUILD='275',KEY='almajlis_helpers_275';
 const fresh=()=>({used:{1:{two:false,block:false,double:false},2:{two:false,block:false,double:false}},pendingDoubleTeam:0});
 let state=fresh();
 try{const saved=JSON.parse(sessionStorage.getItem(KEY)||'null');if(saved?.used)state={...fresh(),...saved}}catch(_){ }

 function save(){try{sessionStorage.setItem(KEY,JSON.stringify(state))}catch(_){ }}
 function reset(){state.used=fresh().used;state.pendingDoubleTeam=0;save();syncBoard();window.ALMAJLIS_STABLE_QUESTION_272?.syncHelpButtons?.()}
 function icon(type){
  if(type==='two')return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M25 37 16.5 13C15 9 17 5 20.5 4s6.5 1 7.7 4.6L35 31M35 31l5-23c.9-4 3.6-6.4 7-5.7 3.6.7 5.2 3.9 4.4 7.7L46 38"/><path d="M25 36c-3-5-6-8-9-9-3-1-6 1-6 4 0 2 2 4 5 7l5 6M46 36c4 1 7 4 8 8 1 8-5 16-14 17H29c-8-1-14-6-16-14l-2-9M24 43c3-4 8-5 12-2M31 48c3-4 8-5 12-2M28 60v-5M43 60v-5"/></svg>';
  if(type==='block')return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/></svg>';
  return '<span class="x2">×2</span>';
 }

 function installBoard(){
  const root=document.getElementById('mjBoardV5')?.shadowRoot;if(!root)return;
  if(!root.getElementById('HELP_STYLE_275')){const style=document.createElement('style');style.id='HELP_STYLE_275';style.textContent=`
   .footer{grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:clamp(20px,4vw,72px)!important;padding-inline:clamp(16px,3vw,54px)!important}
   .logo{display:none!important}.team{height:96%!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;grid-template-rows:34% 66%!important;column-gap:clamp(8px,1.2vw,18px)!important}.team.two{grid-column:1!important}.team.one{grid-column:2!important}
   .team-name{grid-column:1!important;grid-row:1!important;width:100%!important;max-width:none!important;margin-bottom:-6px!important;padding-inline:9px!important;font-size:clamp(12px,1.25vw,19px)!important}.score-row{grid-column:1!important;grid-row:2!important}.helps275{grid-column:2!important;grid-row:1/3!important;display:flex;align-items:center;gap:clamp(5px,.65vw,10px);direction:rtl}.help275{display:grid;place-items:center;width:clamp(42px,4.45vw,66px);height:clamp(42px,4.45vw,66px);aspect-ratio:1;padding:7px;border:2px solid var(--help-accent);border-radius:50%;background:#090909;color:#d9b75f;box-shadow:0 3px 8px #0004}.help275[data-type="two"]{--help-accent:#29a9e8}.help275[data-type="block"]{--help-accent:#ef5c55}.help275[data-type="double"]{--help-accent:#9a72db}.help275 svg{width:clamp(23px,2.5vw,35px);height:clamp(23px,2.5vw,35px);fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.help275 .x2{font:800 clamp(18px,2vw,28px) Arial;color:#d9b75f}.help275 small{display:none}.help275.active{background:#090909;color:#f5d77d;box-shadow:0 0 0 3px var(--help-accent),0 0 14px var(--help-accent)}.help275.used{opacity:.3;filter:grayscale(1)}
   @media(max-height:560px){.footer{gap:22px!important}.help275{height:48px}.help275 small{display:none}.team-name{font-size:12px!important}}
  `;root.appendChild(style)}
  for(const team of [1,2]){const panel=root.querySelector('.team.'+(team===1?'one':'two'));if(!panel||panel.querySelector('.helps275'))continue;const helps=document.createElement('div');helps.className='helps275';for(const [type,label] of [['two','إجابتان'],['block','بلوك'],['double','دبل']]){const button=document.createElement('button');button.type='button';button.className='help275';button.dataset.team=team;button.dataset.type=type;button.setAttribute('aria-label',label);button.innerHTML=icon(type)+'<small>'+label+'</small>';button.onclick=()=>type==='double'?activateBoardDouble(team):window.showGameToast?.('تُستخدم هذه الوسيلة بعد فتح السؤال');helps.appendChild(button)}panel.appendChild(helps)}
  syncBoard();
 }
 function activateBoardDouble(team){
  if(state.used?.[team]?.double)return;
  if(typeof currentTurn!=='undefined'&&Number(currentTurn)!==team){window.showGameToast?.('دبل النقاط متاحة للفريق صاحب الدور فقط');return}
  state.used[team].double=true;state.pendingDoubleTeam=team;save();syncBoard();window.showGameToast?.('تم تفعيل دبل النقاط للسؤال القادم')
 }
 function syncBoard(){const root=document.getElementById('mjBoardV5')?.shadowRoot;if(!root)return;root.querySelectorAll('.help275').forEach(button=>{const team=Number(button.dataset.team),type=button.dataset.type,active=type==='double'&&state.pendingDoubleTeam===team;button.classList.toggle('active',active);button.classList.toggle('used',!!state.used?.[team]?.[type]&&!active)})}

 function normalizeName(value){return [...String(value||'').replace(/^\s+/, '')].slice(0,15).join('')}
 function installNameLimit(){
  for(const id of ['t1','t2']){const input=document.getElementById(id);if(!input||input.dataset.limit275==='1')continue;input.dataset.limit275='1';input.maxLength=15;const count=document.createElement('small');count.className='mjNameCount275';count.hidden=true;input.insertAdjacentElement('afterend',count);const paint=()=>{input.value=normalizeName(input.value);count.textContent=[...input.value].length+' / 15'};input.addEventListener('input',paint);input.addEventListener('focus',()=>{paint();count.hidden=false});input.addEventListener('blur',()=>{count.hidden=true});paint()}
  if(!document.getElementById('NAME_STYLE_275')){const style=document.createElement('style');style.id='NAME_STYLE_275';style.textContent='.mjNameCount275{display:block;margin:4px 8px 0;color:#7b4a43;font-size:12px;text-align:left;direction:ltr}.mjNameCount275[hidden]{display:none!important}.teamField .input[maxlength="15"]{padding-inline-end:14px}';document.head.appendChild(style)}
 }
 function wrapFlows(){
  if(typeof window.draw==='function'&&!window.draw.__build275){const previous=window.draw;const wrapped=function(){for(const id of ['t1','t2']){const input=document.getElementById(id);if(input){input.value=normalizeName(input.value).trim();if(!input.value){window.showGameToast?.('اكتب اسم الفريقين قبل بدء المباراة');input.focus();return}}}return previous.apply(this,arguments)};wrapped.__build275=true;window.draw=wrapped}
  if(typeof window.startNewGame==='function'&&!window.startNewGame.__build275){const previous=window.startNewGame;const wrapped=function(){reset();return previous.apply(this,arguments)};wrapped.__build275=true;window.startNewGame=wrapped;window.startFreshCouncil=wrapped}
 }
 function install(){installNameLimit();installBoard();wrapFlows();document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-275-HELPERS-VISUAL-20260922');document.querySelector('meta[name="build-number"]')?.setAttribute('content',BUILD);document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD '+BUILD));try{sessionStorage.setItem('almajlis_build_seen',BUILD);sessionStorage.setItem('almajlis_active_build',BUILD)}catch(_){ }}

 window.ALMAJLIS_HELP_275={state,save,reset,syncBoard,install,normalizeName,activateBoardDouble};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
 window.addEventListener('pageshow',install,{passive:true});
})();
