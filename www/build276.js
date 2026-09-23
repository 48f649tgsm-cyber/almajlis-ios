/* BUILD 276 — final helper activation rules */
(()=>{'use strict';
 const BUILD='276';
 const twoIcon='<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M22 55c-5-3-8-8-9-14l-1-8c-.4-3 1.4-5 4-5 2 0 3.6 1.3 4.3 3.2L23 38V13c0-3 2-5 5-5s5 2 5 5v18V8c0-3 2-5 5-5s5 2 5 5v28-9c0-3 2-5 5-5s5 2 5 5v13c0 11-8 19-19 19h-4c-3 0-6-1-8-4Z"/></svg>';
 const blockIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/></svg>';
 function installHomeHelp(){
  document.querySelector('.mjHelpOpen276')?.remove();document.getElementById('mjHelpGuide276')?.remove();
  const home=document.getElementById('home'),about=home?.querySelector('.mjLandingAbout'),description=about?.querySelector('.mjLandingDescription');if(!home||!about||!description||document.getElementById('mjHelpInline276'))return;
  const section=document.createElement('section');section.id='mjHelpInline276';section.className='mjHelpInline276';section.setAttribute('aria-label','وسائل المساعدة');section.innerHTML=`<h2>وسائل المساعدة</h2><p class="intro">لكل فريق ثلاث وسائل، وكل وسيلة متاحة مرة واحدة طوال المباراة.</p><div class="items"><article data-type="two"><div class="icon">${twoIcon}</div><div><h3>إجابتان</h3><p>يفعّلها الفريق صاحب الدور بعد ظهور السؤال، وتمنحه محاولتين للإجابة.</p></div></article><article data-type="block"><div class="icon">${blockIcon}</div><div><h3>بلوك</h3><p>يفعّلها الفريق المنافس بعد ظهور السؤال لينتقل إليه حق الإجابة.</p></div></article><article data-type="double"><div class="icon"><b>×2</b></div><div><h3>دبل النقاط</h3><p>يفعّلها الفريق صاحب الدور من لوحة الأسئلة قبل اختيار السؤال، وتتضاعف له النقاط فقط إذا أجاب بشكل صحيح.</p></div></article></div>`;
  description.insertAdjacentElement('afterend',section);
  if(!document.getElementById('HOME_HELP_STYLE_276')){const style=document.createElement('style');style.id='HOME_HELP_STYLE_276';style.textContent=`
   #home .mjLandingAbout{display:flex!important;flex-direction:column!important;align-items:stretch!important;overflow:visible!important}#home .mjHelpInline276{position:relative;z-index:2;width:min(1500px,94vw);margin:0 auto 42px;padding:24px 28px;border-right:6px solid #c66556;background:#fff;direction:rtl;font-family:'Tajawal Local',Tahoma,Arial,sans-serif;color:#202b35}#home .mjHelpInline276>h2{margin:0 0 5px;color:#c65f50;text-align:center;font-size:clamp(28px,3.3vw,52px)}#home .mjHelpInline276>.intro{margin:0 0 18px;text-align:center;color:#5d6670;font-size:clamp(13px,1.25vw,18px)}#home .mjHelpInline276 .items{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}#home .mjHelpInline276 article{--help-accent:#29a9e8;display:grid;grid-template-columns:88px minmax(0,1fr);align-items:center;gap:15px;min-height:180px;padding:20px;border:2px solid var(--help-accent);border-radius:20px;background:#f6f6f6}#home .mjHelpInline276 article[data-type="block"]{--help-accent:#ef5c55}#home .mjHelpInline276 article[data-type="double"]{--help-accent:#9a72db}#home .mjHelpInline276 .icon{display:grid;place-items:center;width:76px;height:76px;border:3px solid var(--help-accent);border-radius:50%;background:#090909;color:#d9b75f;box-shadow:0 4px 10px #0004}#home .mjHelpInline276 svg{width:52px;height:52px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}#home .mjHelpInline276 .icon b{font:800 38px Arial;color:#d9b75f}#home .mjHelpInline276 h3{margin:0 0 8px;color:#111;font-size:clamp(19px,1.7vw,28px)}#home .mjHelpInline276 article p{margin:0;color:#222;font-size:clamp(14px,1.15vw,18px);line-height:1.65}@media(max-width:760px){#home .mjHelpInline276{padding:18px 14px}#home .mjHelpInline276 .items{grid-template-columns:1fr}#home .mjHelpInline276 article{min-height:0;grid-template-columns:64px minmax(0,1fr);padding:14px}#home .mjHelpInline276 .icon{width:56px;height:56px}#home .mjHelpInline276 svg{width:39px;height:39px}}
  `;document.head.appendChild(style)}
 }
 function mark(){
  installHomeHelp();
  document.querySelector('meta[name="almajlis-build"]')?.setAttribute('content','BUILD-276-HELPER-RULES-20260922');
  document.querySelector('meta[name="build-number"]')?.setAttribute('content',BUILD);
  document.querySelector('#draw .note')?.replaceChildren(document.createTextNode('الإصدار: BUILD '+BUILD));
  try{sessionStorage.setItem('almajlis_build_seen',BUILD);sessionStorage.setItem('almajlis_active_build',BUILD)}catch(_){ }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mark,{once:true});else mark();
 window.addEventListener('pageshow',mark,{passive:true});
})();
