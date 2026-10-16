/* ===================== نظام القاضي — المنطق المشترك بين التصاميم =====================
   كل تصميم يعرّف window.DESIGN = { shell(), renderCard(r), renderList(), afterMount?(), fvHTML? }
   ويستعمل نفس المعرّفات: #app #main #head #as-log #as-input #as-send #as-form #as-ctx #summary
   #rc-count #rc-badge #review-all  — وعناصر .para[data-r][data-p]  .fv[data-r][data-f][data-p]
   كل البيانات هنا مصطنعة بالكامل: لا أسماء ولا أرقام طعون حقيقية.
*/
(function () {
const R = {
  R1: {
    id: 'R1', no: '2187', year: '2016', circuit: 'إداري/2', date: '11/3/2025', kind: 'حكم',
    title: 'بدل التخصص — مطابقة المؤهل للنص',
    paras: [
      'محكمة التمييز — الدائرة الإدارية الثانية. بالجلسة المنعقدة علناً بتاريخ 11 رمضان 1446هـ الموافق 11/3/2025م صدر الحكم الآتي في الطعن بالتمييز المقيد بالجدول برقم 2187 لسنة 2016 إداري/2.',
      'المرفوع من: وكيل الوزارة بصفته، ورئيس ديوان الخدمة المدنية بصفته — ضد: المطعون ضده [موظف ـ أ].',
      'وحيث إن الوقائع — على ما يبين من الأوراق — تتحصل في أن المطعون ضده أقام الدعوى طالباً الحكم بأحقيته في بدل التخصص المقرر لشاغلي الوظائف الفنية اعتباراً من تاريخ تعيينه وما يترتب على ذلك من فروق مالية، تأسيساً على أنه يشغل وظيفة فنية ويؤدي أعمالها فعلاً منذ سنوات.',
      'وبتاريخ 31/6/2014 حكمت محكمة أول درجة بأحقيته في البدل المطالب به، فاستأنفت الجهة الإدارية هذا الحكم، وقضت محكمة الاستئناف بتأييده، فطعن الطاعنان بصفتيهما في هذا الحكم بطريق التمييز.',
      'وقدمت النيابة مذكرة أبدت فيها الرأي برفض الطعن، وإذ عُرض الطعن على هذه المحكمة في غرفة مشورة رأت أنه جدير بالنظر وحددت جلسة لنظره.',
      'وحيث إن مما ينعاه الطاعنان على الحكم المطعون فيه الخطأ في تطبيق القانون، ذلك أن المقرر في قضاء هذه المحكمة أن العبرة في استحقاق البدل هي بمطابقة المؤهل الدراسي الحاصل عليه الموظف للمؤهل الذي حدده القرار المنظم له، لا بطبيعة العمل الذي يؤديه فعلاً ولا بمدة أقدميته فيه.',
      'ولا يغير من ذلك أن جهة الإدارة كانت قد صرفت للمطعون ضده البدل مدةً ثم أوقفته، إذ إن خطأ الإدارة لا ينشئ للموظف حقاً، ولا حق مكتسب فيما صُرف بغير سند من القانون.',
      'فلهذه الأسباب: حكمت المحكمة بتمييز الحكم المطعون فيه، وفي موضوع الاستئناف بإلغاء الحكم المستأنف وبرفض الدعوى، وألزمت المطعون ضده المصروفات عن درجات التقاضي وعشرين ديناراً مقابل أتعاب المحاماة.'
    ],
    fields: [
      { p: 0, k: 'circuit', label: 'الدائرة', value: 'إداري/2', state: 'reviewed' },
      { p: 0, k: 'date', label: 'تاريخ الصدور', value: '11/3/2025', state: 'reviewed' },
      { p: 1, k: 'parties', label: 'الأطراف', value: 'الإدارة ضد موظف', state: 'reviewed' },
      { p: 2, k: 'dispute', label: 'نوع النزاع', value: 'بدل تخصص — خدمة مدنية', state: 'unreviewed' },
      { p: 3, k: 'prior', label: 'أحكام الدرجات السابقة', value: 'أول درجة للموظف · الاستئناف أيّد', state: 'unreviewed' },
      { p: 3, k: 'warn', label: 'تنبيه صياغة', value: 'تاريخ مستحيل «31/6/2014» — يونيو 30 يوماً', state: 'warn' },
      { p: 4, k: 'nyaba', label: 'رأي النيابة', value: 'رفض الطعن', state: 'unreviewed' },
      { p: 5, k: 'principle', label: 'المبدأ', value: 'العبرة بمطابقة المؤهل للنص', state: 'unreviewed' },
      { p: 5, k: 'statute', label: 'النص المطبّق', value: 'القرار المنظِّم لبدل التخصص', state: 'unreviewed' },
      { p: 6, k: 'principle', label: 'المبدأ', value: 'لا حق مكتسب فيما صُرف بغير سند', state: 'reviewed' },
      { p: 7, k: 'disposition', label: 'نوع الحسم', value: 'تمييز وتصدٍّ للموضوع', state: 'unreviewed' },
      { p: 7, k: 'winner', label: 'النتيجة لصالح', value: 'الإدارة', state: 'unreviewed' },
      { p: 7, k: 'costs', label: 'المصروفات والأتعاب', value: 'على المطعون ضده · 20 د.ك', state: 'reviewed' }
    ]
  },
  R2: {
    id: 'R2', no: '942', year: '2015', circuit: 'إداري/2', date: '4/2/2025', kind: 'حكم',
    title: 'استرداد علاوة صُرفت بغير سند',
    paras: [
      'محكمة التمييز — الدائرة الإدارية الثانية. في الطعن رقم 942 لسنة 2015 إداري/2، بالجلسة المنعقدة بتاريخ 4/2/2025م. وأبدت النيابة الرأي برفض الطعن.',
      'وحيث إن الوقائع تتحصل في أن المطعون ضدها أقامت الدعوى طالبةً إلغاء قرار جهة الإدارة باسترداد ما صُرف لها من العلاوة الاجتماعية بفئة المتزوج، وقضت محكمتا الموضوع بإجابتها إلى طلبها.',
      'وحيث إن المقرر أنه لا حق مكتسب فيما صُرف بغير سند من القانون، وأن للإدارة أن تسترد ما أُدّي دون وجه حق متى ثبت انتفاء شرط الاستحقاق، ولا يحول دون ذلك حسن نية الموظف.',
      'فلهذه الأسباب: حكمت المحكمة بتمييز الحكم المطعون فيه، وفي موضوع الاستئناف بإلغاء الحكم المستأنف وبرفض الدعوى.'
    ],
    fields: [
      { p: 0, k: 'nyaba', label: 'رأي النيابة', value: 'رفض الطعن', state: 'unreviewed' },
      { p: 1, k: 'dispute', label: 'نوع النزاع', value: 'استرداد علاوة اجتماعية', state: 'unreviewed' },
      { p: 1, k: 'prior', label: 'أحكام الدرجات السابقة', value: 'الدرجتان للموظفة', state: 'unreviewed' },
      { p: 2, k: 'principle', label: 'المبدأ', value: 'لا حق مكتسب فيما صُرف بغير سند', state: 'unreviewed' },
      { p: 3, k: 'disposition', label: 'نوع الحسم', value: 'تمييز وتصدٍّ للموضوع', state: 'unreviewed' },
      { p: 3, k: 'winner', label: 'النتيجة لصالح', value: 'الإدارة', state: 'unreviewed' }
    ]
  },
  R3: {
    id: 'R3', no: '1310', year: '2017', circuit: 'إداري/2', date: '14/1/2025', kind: 'حكم',
    title: 'الترقية إلى وظيفة يُشترط لها مؤهل',
    paras: [
      'محكمة التمييز — الدائرة الإدارية الثانية. في الطعن رقم 1310 لسنة 2017 إداري/2، بالجلسة المنعقدة بتاريخ 14/1/2025م. وأبدت النيابة الرأي برفض الطعن.',
      'وحيث إن الطاعن ينعى على الحكم المطعون فيه أنه رفض أحقيته في الترقية إلى الوظيفة الإشرافية رغم أقدميته وقيامه بأعبائها فعلاً لمدة تزيد على ثماني سنوات.',
      'وحيث إن هذا النعي مردود، ذلك أن المقرر أن الترقية إلى الوظائف التي يُشترط لها مؤهل معين لا تكون إلا لمن استوفى هذا الشرط، ولا يغني عنه طول المدة ولا القيام بالعمل فعلاً.',
      'فلهذه الأسباب: حكمت المحكمة برفض الطعن، وألزمت الطاعن المصروفات.'
    ],
    fields: [
      { p: 0, k: 'nyaba', label: 'رأي النيابة', value: 'رفض الطعن', state: 'reviewed' },
      { p: 1, k: 'dispute', label: 'نوع النزاع', value: 'ترقية — اشتراط مؤهل', state: 'reviewed' },
      { p: 2, k: 'principle', label: 'المبدأ', value: 'العبرة بمطابقة المؤهل للنص', state: 'unreviewed' },
      { p: 3, k: 'disposition', label: 'نوع الحسم', value: 'رفض الطعن', state: 'reviewed' },
      { p: 3, k: 'winner', label: 'النتيجة لصالح', value: 'الإدارة', state: 'reviewed' }
    ]
  },
  R4: {
    id: 'R4', no: '388', year: '2018', circuit: 'تجاري/2', date: '2/3/2025', kind: 'قرار غرفة مشورة',
    title: 'رفض توجيه اليمين الحاسمة',
    paras: [
      'محكمة التمييز — الدائرة التجارية الثانية. قرار في غرفة المشورة في الطعن رقم 388 لسنة 2018 تجاري/2، بتاريخ 2/3/2025م.',
      'وحيث إن الطعن أقيم على سبب وحيد ينعى به الطاعن على الحكم المطعون فيه مخالفة القانون، إذ رفض توجيه اليمين الحاسمة إلى المطعون ضده.',
      'وحيث إن المقرر أن لمحكمة الموضوع رفض توجيه اليمين الحاسمة متى تبيّن لها أن طالبها متعسف في توجيهها، وتقدير ذلك مما تستقل به بغير معقب متى أقامت قضاءها على أسباب سائغة.',
      'لذلك: قررت المحكمة عدم قبول الطعن، وألزمت الطاعن المصروفات، مع مصادرة الكفالة.'
    ],
    fields: [
      { p: 1, k: 'dispute', label: 'نوع النزاع', value: 'يمين حاسمة — تجاري', state: 'reviewed' },
      { p: 2, k: 'principle', label: 'المبدأ', value: 'رفض اليمين عند التعسف — سلطة تقديرية', state: 'reviewed' },
      { p: 3, k: 'disposition', label: 'نوع الحسم', value: 'عدم قبول (غرفة مشورة)', state: 'reviewed' },
      { p: 3, k: 'costs', label: 'المصروفات', value: 'على الطاعن · مصادرة الكفالة', state: 'reviewed' }
    ]
  }
};
const ORDER = ['R1', 'R2', 'R3', 'R4'];

const svg = (d, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IC = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  cases: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>',
  rulings: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  principles: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  tasks: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  settings: '<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  back: '<path d="m9 18 6-6-6-6"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  stop: '<rect x="7" y="7" width="10" height="10" rx="1"/>',
  up: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  compare: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/>',
  sum: '<path d="M21 6H3"/><path d="M15 12H3"/><path d="M17 18H3"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  spark: '<path d="M12 3v3"/><path d="M12 18v3"/><path d="m5.6 5.6 2.1 2.1"/><path d="m16.3 16.3 2.1 2.1"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="m5.6 18.4 2.1-2.1"/><path d="m16.3 7.7 2.1-2.1"/>',
  grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>'
};

const S = { view: 'card', rid: 'R1' };
let timers = []; let streaming = null; let litKey = null; let headRO = null;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

function counts(r) { const f = r.fields.filter(x => x.state !== 'warn'); return [f.filter(x => x.state === 'reviewed').length, f.length]; }
function badge(r) {
  const [d, t] = counts(r);
  return d === t ? `<span class="badge badge-ok">${svg(IC.check)}مراجَع</span>` : `<span class="badge badge-warn">${svg(IC.clock)}بانتظار المراجعة</span>`;
}
function stamp(r, size, vt) {
  return `<span class="stamp stamp-${size}" ${vt ? `style="view-transition-name:stamp-${r.id}"` : ''} aria-label="الطعن رقم ${r.no} لسنة ${r.year}، دائرة ${r.circuit}"><span>${r.circuit}</span><span>${r.year}</span><span>${r.no}</span></span>`;
}
function paraUnreviewed(rid, p) { return R[rid].fields.some(f => f.p === p && f.state === 'unreviewed'); }
function citeHTML(rid, p) {
  const r = R[rid]; const un = paraUnreviewed(rid, p);
  return `<button class="cite${un ? ' unrev' : ''}" data-r="${rid}" data-p="${p}" aria-label="افتح الطعن ${r.no} لسنة ${r.year}، الفقرة ${p + 1}${un ? '، فيها حقول غير مراجَعة' : ''}">${r.no}/${r.year} · ¶${p + 1}</button>`;
}
function fvHTML(r, f, idx, k) {
  if (window.DESIGN.fvHTML) return window.DESIGN.fvHTML(r, f, idx, k);
  const warn = f.state === 'warn';
  const btn = warn ? '' : (f.state === 'reviewed'
    ? `<button class="fv-btn" data-action="toggle-review" aria-label="ألغِ المراجعة: ${f.label}">${svg(IC.check, 'ic-sm')}مراجَع</button>`
    : `<button class="fv-btn" data-action="toggle-review" aria-label="راجعت: ${f.label}">راجعت</button>`);
  return `<div class="fv" data-state="${f.state}" data-r="${r.id}" data-f="${idx}" data-p="${f.p}" style="--i:${k}" tabindex="0">
    <span class="fv-label">${warn ? svg(IC.alert, 'ic-sm') : ''}${f.label}</span>
    <span class="fv-value">${f.value}</span>${btn}</div>`;
}
const NAV = [['home', 'الرئيسية'], ['cases', 'القضايا'], ['rulings', 'الأحكام'], ['search', 'البحث'], ['principles', 'المبادئ والنصوص'], ['tasks', 'المهام'], ['settings', 'الإعدادات']];
const SUGG = [
  ['nocquired', 'أحكامي تحت مبدأ «لا حق مكتسب فيما صُرف بغير سند»'],
  ['nyaba', 'الأحكام اللي خالفت فيها رأي النيابة'],
  ['qual', 'هل سبق أن حكمت بخلاف مبدأ «العبرة بمطابقة المؤهل»؟']
];
function ctxText() { if (S.view === 'card') { const r = R[S.rid]; return `في: الطعن ${r.no}/${r.year}`; } return 'في: قائمة الأحكام'; }
function assistEmptyHTML() {
  return `<div class="as-empty" id="as-empty">
    <p class="as-intro">أجيب من أحكامك المفهرسة فقط، وكل جملة معها فقرة مصدرها. ما لا أجده أقول إني لم أجده.</p>
    <div class="sugg">${SUGG.map(([k, l]) => `<button data-q="${k}">${l}</button>`).join('')}</div></div>`;
}

/* ---------- mount / view ---------- */
function measureHead() { const h = $('#head'); const m = $('#main'); if (h && m) m.style.setProperty('--head-h', h.offsetHeight + 'px'); }
function watchHead() { headRO?.disconnect(); const h = $('#head'); if (!h || !window.ResizeObserver) return; headRO = new ResizeObserver(measureHead); headRO.observe(h); }
function mountAll() {
  clearTimers(); stopStream(false); $('#cmp')?.close();
  const stage = $('#stage'); stage.innerHTML = window.DESIGN.shell();
  measureHead(); watchHead(); litKey = null;
  window.DESIGN.afterMount?.();
}
function setView(view, rid, after) {
  const apply = () => {
    S.view = view; if (rid) S.rid = rid;
    $('#main').innerHTML = view === 'card' ? window.DESIGN.renderCard(R[S.rid]) : window.DESIGN.renderList();
    $('#main').scrollTop = 0; window.scrollTo(0, 0);
    const c = $('#as-ctx'); if (c) c.textContent = ctxText();
    measureHead(); watchHead(); litKey = null;
    window.DESIGN.afterView?.();
  };
  const done = () => { if (after) requestAnimationFrame(after); };
  if (document.startViewTransition && !reduced()) { const vt = document.startViewTransition(apply); vt.finished.then(done, done); }
  else { apply(); done(); }
}

/* ---------- highlight link ---------- */
function setLit(key) {
  if (key === litKey) return;
  const main = $('#main'); if (!main) return;
  $$('.lit', main).forEach(n => n.classList.remove('lit'));
  litKey = key; if (!key) return;
  const [rid, p] = key.split(':');
  $(`#${rid}-p${p}`)?.classList.add('lit');
  $$(`.fv[data-p="${p}"]`, main).forEach(n => n.classList.add('lit'));
}
function keyFrom(t) {
  const fv = t.closest?.('.fv'); if (fv) return `${fv.dataset.r}:${fv.dataset.p}`;
  const pa = t.closest?.('.para'); if (pa) return `${pa.dataset.r}:${pa.dataset.p}`;
  return null;
}
function focusPara(rid, p, flash) {
  const el = document.getElementById(`${rid}-p${p}`); if (!el) return;
  el.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' });
  if (flash) { el.classList.add('flash'); later(() => el.classList.remove('flash'), 1600); }
}
function gotoCite(rid, p) {
  window.DESIGN.beforeCite?.();
  if (S.view === 'card' && S.rid === rid) focusPara(rid, p, true);
  else setView('card', rid, () => focusPara(rid, p, true));
}

/* ---------- review ---------- */
function refreshHeader() {
  const r = R[S.rid]; const [d, t] = counts(r);
  const c = $('#rc-count'); if (c) c.textContent = `${d} من ${t} مراجَع`;
  const b = $('#rc-badge'); if (b) b.innerHTML = badge(r);
  const ra = $('#review-all'); if (ra) ra.hidden = d === t;
  const pct = $('#rc-pct'); if (pct) pct.style.setProperty('--pct', String(t ? d / t : 0));
}
function toggleReview(fvEl) {
  const r = R[fvEl.dataset.r]; const idx = +fvEl.dataset.f; const f = r.fields[idx];
  f.state = f.state === 'reviewed' ? 'unreviewed' : 'reviewed';
  const k = getComputedStyle(fvEl).getPropertyValue('--i');
  fvEl.outerHTML = fvHTML(r, f, idx, k || 0);
  const fresh = $(`.fv[data-r="${r.id}"][data-f="${idx}"]`);
  if (fresh) { fresh.style.animation = 'none'; fresh.querySelector('.fv-btn')?.focus(); }
  refreshHeader(); announce(f.state === 'reviewed' ? `روجع: ${f.label}` : `أُلغيت مراجعة: ${f.label}`);
}
function reviewAll() {
  const r = R[S.rid]; r.fields.forEach(f => { if (f.state === 'unreviewed') f.state = 'reviewed'; });
  $$('.fv', $('#main')).forEach(el => { const idx = +el.dataset.f; const k = getComputedStyle(el).getPropertyValue('--i'); el.outerHTML = fvHTML(r, r.fields[idx], idx, k || 0); });
  $$('.fv', $('#main')).forEach(el => el.style.animation = 'none');
  refreshHeader(); toast('روجعت كل الحقول');
}

/* ---------- assistant ---------- */
const ANSWERS = {
  nocquired: [
    { t: 'وجدت حكمين تحت هذا المبدأ، وانتهى كلاهما لصالح الإدارة رغم أن الدرجتين السابقتين حكمتا للموظف في الاثنين. الأول' }, { c: ['R1', 6] },
    { t: 'قرّر أن خطأ الإدارة لا ينشئ للموظف حقاً. والثاني' }, { c: ['R2', 2] },
    { t: 'أضاف أن حسن نية الموظف لا يحول دون الاسترداد. المبدأ في الحكم الثاني لم تراجعه بعد.' }
  ],
  nyaba: [
    { t: 'في حكمين من أربعة انتهت المحكمة بخلاف رأي النيابة: النيابة رأت رفض الطعن' }, { c: ['R1', 4] },
    { t: 'والمحكمة ميّزت وتصدّت، وكذلك' }, { c: ['R2', 0] },
    { t: '. في' }, { c: ['R3', 0] }, { t: 'وافق القضاء رأي النيابة، و388/2018 قرار غرفة مشورة بلا رأي نيابة مسجَّل.' }
  ],
  qual: [
    { t: 'لم أجد حكماً بخلافه. المبدأ ورد في حكمين بنفس الاتجاه:' }, { c: ['R1', 5] },
    { t: 'في بدل التخصص، و' }, { c: ['R3', 2] },
    { t: 'في الترقية. القاسم المشترك: لا العمل الفعلي ولا الأقدمية يغنيان عن المؤهل المنصوص.' }
  ]
};
function summaryFor(r) {
  if (r.id === 'R1') return [
    { t: 'طعن من الإدارة في حكم أيّد أحقية موظف في بدل التخصص' }, { c: ['R1', 3] },
    { t: '. ميّزت المحكمة وتصدّت ورفضت الدعوى' }, { c: ['R1', 7] },
    { t: '، لأن العبرة بمطابقة المؤهل للنص لا بالعمل الفعلي' }, { c: ['R1', 5] },
    { t: '، وصرف الإدارة السابق لا ينشئ حقاً' }, { c: ['R1', 6] }, { t: '.' }
  ];
  const g = k => (r.fields.find(f => f.k === k) || {}).value || '—'; const last = r.paras.length - 1;
  return [{ t: `${g('dispute')}. انتهت المحكمة إلى ${g('disposition')}` }, { c: [r.id, last] }, { t: `، على أساس: ${g('principle')}` }, { c: [r.id, Math.max(last - 1, 0)] }, { t: '.' }];
}
function setSendMode(mode) {
  const b = $('#as-send'); if (!b) return;
  b.dataset.mode = mode; b.innerHTML = svg(mode === 'stop' ? IC.stop : IC.up);
  b.setAttribute('aria-label', mode === 'stop' ? 'أوقف' : 'أرسل');
}
function stopStream(userAction) {
  if (!streaming) return;
  const st = streaming; streaming = null; st.cancelled = true; clearTimeout(st.timer); clearTimeout(st.start);
  st.thinking?.remove();
  if (userAction) { const s = document.createElement('span'); s.className = 'stopped'; s.textContent = 'أُوقف — والنص الجزئي محفوظ.'; (st.body || st.target).append(s); announce('أُوقف الجواب'); }
  $('#as-log')?.setAttribute('aria-busy', 'false'); setSendMode('send');
}
function stream(target, segs, onDone) {
  stopStream(false);
  const log = $('#as-log'); log?.setAttribute('aria-busy', 'true');
  const st = { cancelled: false, target }; streaming = st; setSendMode('stop');
  const thinking = document.createElement('div'); thinking.className = 'thinking'; thinking.innerHTML = '<span class="pulse"></span>جارٍ البحث في أحكامك…';
  target.append(thinking); st.thinking = thinking;
  const tokens = []; segs.forEach(s => { if (s.t) s.t.split(/(\s+)/).forEach(w => w && tokens.push({ w })); else tokens.push(s); });
  let i = 0; let cites = 0;
  const scroll = () => { if (log && target.closest('#as-log')) log.scrollTop = log.scrollHeight; };
  const tick = () => {
    if (st.cancelled) return;
    if (i >= tokens.length) { streaming = null; log?.setAttribute('aria-busy', 'false'); setSendMode('send'); announce(`وصل الجواب، ${cites} استشهادات`); onDone?.(st.body); return; }
    const tk = tokens[i++];
    if (tk.w) st.body.append(tk.w); else { st.body.insertAdjacentHTML('beforeend', ' ' + citeHTML(tk.c[0], tk.c[1]) + ' '); cites++; }
    scroll(); st.timer = setTimeout(tick, reduced() ? 0 : 32);
  };
  st.start = setTimeout(() => { thinking.remove(); st.thinking = null; st.body = document.createElement('div'); st.body.className = 'ai-body'; st.body.dir = 'rtl'; target.append(st.body); tick(); }, reduced() ? 0 : 480);
}
function ask(key, text) {
  window.DESIGN.beforeAsk?.();
  const log = $('#as-log'); if (!log) return;
  $('#as-empty')?.remove();
  const u = document.createElement('div'); u.className = 'msg-user'; u.dir = 'rtl'; u.textContent = text; log.append(u);
  const m = document.createElement('div'); m.className = 'msg-ai'; m.dir = 'rtl';
  m.innerHTML = `<span class="ai-label">${svg(IC.info)}مولَّد — راجع الاستشهادات</span>`; log.append(m);
  log.scrollTop = log.scrollHeight;
  const segs = ANSWERS[key] || [{ t: 'لم أجد هذا في أحكامك الأربعة المفهرسة. لا أجيب من خارجها.' }];
  stream(m, segs, () => { if (!ANSWERS[key]) m.insertAdjacentHTML('beforeend', `<div class="ai-actions"><button class="btn btn-secondary" data-action="semantic">وسّع البحث بالمعنى</button></div>`); });
}
function summarize() {
  const sec = $('#summary'); if (!sec) return;
  sec.hidden = false;
  sec.innerHTML = `<div class="summary-head"><span class="ai-label">${svg(IC.info)}ملخّص مولَّد — راجع الاستشهادات</span><button class="btn btn-ghost btn-icon" data-action="close-summary" aria-label="أغلق الملخّص">${svg(IC.x)}</button></div>`;
  const body = document.createElement('div'); sec.append(body);
  sec.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' });
  stream(body, summaryFor(R[S.rid]));
}

/* ---------- compare ---------- */
function fieldVals(r, k) { return r.fields.filter(f => f.k === k).map(f => f.value); }
function renderCompare(aId, bId) {
  const a = R[aId], b = R[bId];
  const keys = [['dispute', 'نوع النزاع'], ['nyaba', 'رأي النيابة'], ['principle', 'المبدأ'], ['disposition', 'نوع الحسم'], ['winner', 'النتيجة لصالح']];
  const rows = keys.map(([k, l]) => {
    const va = fieldVals(a, k), vb = fieldVals(b, k); const same = va.join('|') === vb.join('|'); const shared = va.filter(x => vb.includes(x));
    const tag = same ? '' : (shared.length ? `<span class="diff-tag">${svg(IC.alert, 'ic-sm')}مشترك جزئياً</span>` : `<span class="diff-tag">${svg(IC.alert, 'ic-sm')}مختلف</span>`);
    return `<tr data-diff="${same ? 'no' : 'yes'}"><th scope="row">${l}</th><td>${va.join('<br>') || '—'}</td><td>${vb.join('<br>') || '—'}${tag ? '<br>' + tag : ''}</td></tr>`;
  }).join('');
  const others = ORDER.filter(id => id !== aId).map(id => `<button data-action="cmp-pick" data-id="${id}" aria-pressed="${id === bId}">${stamp(R[id], 'sm', false)}</button>`).join('');
  return `<div class="cmp-head"><h2>مقارنة حكمين</h2><button class="btn btn-ghost btn-icon" data-action="cmp-close" aria-label="أغلق">${svg(IC.x)}</button></div>
    <div class="cmp-pick">قارن ${stamp(a, 'sm', false)} مع: ${others}</div>
    <table class="cmp-tbl"><thead><tr><th></th><td>${a.no}/${a.year}</td><td>${b.no}/${b.year}</td></tr></thead><tbody>${rows}</tbody></table>
    <div class="cmp-foot"><button class="btn btn-ghost" data-action="cmp-close">أغلق</button><button class="btn btn-secondary" data-action="cmp-open" data-id="${bId}">افتح ${b.no}/${b.year}</button></div>`;
}
function openCompare(bId) {
  let d = $('#cmp');
  if (!d) { d = document.createElement('dialog'); d.id = 'cmp'; d.className = 'cmp'; d.dir = 'rtl'; d.setAttribute('aria-label', 'مقارنة حكمين'); d.addEventListener('click', e => { if (e.target === d) d.close(); }); document.body.append(d); }
  d.innerHTML = renderCompare(S.rid, bId); if (!d.open) d.showModal();
}

/* ---------- misc ---------- */
function toast(msg) { let r = $('#toasts'); if (!r) { r = document.createElement('div'); r.id = 'toasts'; r.className = 'toasts'; document.body.append(r); } const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; r.append(t); setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 200); }, 2600); }
function announce(msg) { let a = $('#announcer'); if (!a) { a = document.createElement('div'); a.id = 'announcer'; a.className = 'sr-only'; a.setAttribute('aria-live', 'polite'); document.body.append(a); } a.textContent = ''; setTimeout(() => a.textContent = msg, 30); }
function setTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  try { localStorage.setItem('qadi-theme-' + (window.DESIGN.key || 'x'), dark ? 'dark' : 'light'); } catch (e) {}
  window.DESIGN.onTheme?.(dark);
}
function initTheme(defaultDark) {
  let t = null; try { t = localStorage.getItem('qadi-theme-' + (window.DESIGN.key || 'x')); } catch (e) {}
  document.documentElement.dataset.theme = t ? t : (defaultDark ? 'dark' : 'light');
}

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const a = e.target.closest('[data-action]');
  if (a) {
    const act = a.dataset.action;
    if (window.DESIGN.onAction?.(act, a, e)) return;
    if (act === 'toggle-review') { e.stopPropagation(); toggleReview(a.closest('.fv')); return; }
    if (act === 'review-all') return reviewAll();
    if (act === 'list') return setView('list');
    if (act === 'nav') { if (a.dataset.to === 'rulings') { if (S.view !== 'list') setView('list'); return; } return toast('هذي الشاشة خارج نموذج اليوم — المعروض: الأحكام وبطاقة الحكم والمساعد'); }
    if (act === 'assist') { $('#app')?.classList.toggle('assist-open'); window.DESIGN.onAssistToggle?.(); return; }
    if (act === 'theme') return setTheme(document.documentElement.dataset.theme !== 'dark');
    if (act === 'summarize') return summarize();
    if (act === 'close-summary') { stopStream(false); const s = $('#summary'); s.hidden = true; s.innerHTML = ''; return; }
    if (act === 'compare') return openCompare(S.rid === 'R3' ? 'R1' : 'R3');
    if (act === 'cmp-pick') return openCompare(a.dataset.id);
    if (act === 'cmp-close') return $('#cmp')?.close();
    if (act === 'cmp-open') { $('#cmp')?.close(); return setView('card', a.dataset.id); }
    if (act === 'draft') return toast('فحص المسودة شاشة مستقلة — في الجولة القادمة');
    if (act === 'semantic') return toast('البحث بالمعنى يعمل على الخادم — خارج هذا النموذج');
  }
  const cite = e.target.closest('.cite'); if (cite) return gotoCite(cite.dataset.r, +cite.dataset.p);
  const q = e.target.closest('[data-q]'); if (q) return ask(q.dataset.q, q.textContent);
  const row = e.target.closest('[data-open]'); if (row) return setView('card', row.dataset.open);
  const fv = e.target.closest('.fv'); if (fv && !e.target.closest('button')) return focusPara(fv.dataset.r, +fv.dataset.p, false);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const row = e.target.closest?.('[data-open]'); if (row && !e.target.closest('button')) { e.preventDefault(); setView('card', row.dataset.open); return; }
    if (e.target.classList?.contains('fv')) { focusPara(e.target.dataset.r, +e.target.dataset.p, true); return; }
    if (e.target.id === 'as-input' && !e.shiftKey) { e.preventDefault(); $('#as-form').requestSubmit(); return; }
  }
  if (e.key === 'Escape') { $('#app')?.classList.remove('assist-open'); window.DESIGN.onAssistToggle?.(); }
  if (e.key === 'r' || e.key === 'R') { if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return; const fv = e.target.closest?.('.fv'); if (fv && fv.dataset.state === 'unreviewed') toggleReview(fv); }
});
document.addEventListener('submit', e => {
  if (e.target.id !== 'as-form') return; e.preventDefault();
  const b = $('#as-send'); if (b.dataset.mode === 'stop') return stopStream(true);
  const inp = $('#as-input'); const v = inp.value.trim(); if (!v) return; inp.value = '';
  const hit = SUGG.find(([, l]) => l === v); ask(hit ? hit[0] : 'free', v);
});
document.addEventListener('pointerover', e => setLit(keyFrom(e.target)));
document.addEventListener('focusin', e => { const k = keyFrom(e.target); if (k) setLit(k); });
window.addEventListener('resize', measureHead);

window.QADI = { R, ORDER, S, svg, IC, NAV, SUGG, counts, badge, stamp, citeHTML, fvHTML, assistEmptyHTML, ctxText, mountAll, setView, later, reduced, toast, announce, initTheme, setTheme, $, $$, focusPara };
})();
