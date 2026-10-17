/* ===================== بوابة الموظفين — نظام القاضي (نموذج شاشات، بلا خادم) =====================
   كل البيانات هنا مصطنعة بالكامل: لا أسماء ولا أرقام ولا نصوص حقيقية.
   الشاشات: الدخول · إعادة تعيين كلمة السر · المستندات (بحث · إضافة يدوي/بالمساعد · قراءة · تعديل · حذف)
            · المستخدمون (admin / viewer) · الإعدادات (حدّ استهلاك المساعد).
*/
(function () {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let timers = []; const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; }; const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

/* ---------- الأيقونات (Lucide inline) ---------- */
const svg = (d, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IC = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  docs: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  settings: '<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>', x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  back: '<path d="m9 18 6-6-6-6"/>', plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  edit: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>',
  file: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
  undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>',
  key: '<path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
};

/* ---------- البيانات المصطنعة ---------- */
const TYPES = { law: 'قانون', article: 'مادة', ruling: 'حكم', memo: 'مذكرة' };
const EXTRACTION = { pending: 'بانتظار التفريغ', extracting: 'قيد التفريغ', extracted: 'مُفرَّغ', failed: 'فشل التفريغ', manual: 'مُدخَل يدوياً' };
const ROLES = { admin: 'مدير', viewer: 'مُطالِع' };
const USERS = [
  { id: 'U1', name: 'عبدالعزيز المطيري', email: 'a.mutairi@example.kw', role: 'admin', status: 'active', limit: 60, used: 23, last: '17/10/2026' },
  { id: 'U2', name: 'فاطمة العنزي', email: 'f.anzi@example.kw', role: 'admin', status: 'active', limit: 40, used: 40, last: '16/10/2026' },
  { id: 'U3', name: 'يوسف الرشيدي', email: 'y.rashidi@example.kw', role: 'viewer', status: 'active', limit: 0, used: 0, last: '15/10/2026' },
  { id: 'U4', name: 'نورة الصباح', email: 'n.sabah@example.kw', role: 'viewer', status: 'disabled', limit: 0, used: 0, last: '2/9/2026' },
];
const SETTINGS = { org: 'مكتب المستشار — محكمة التمييز', lang: 'ar', unit: 'docs', defaultLimit: 40, cap: 200, capUsed: 63 };
const P = (h, ...ps) => ({ h, ps });
const DOCS = [
  { id: 'D1', type: 'law', title: 'قانون رقم 11 لسنة 2025 — تنظيم بدل التخصص للوظائف الفنية', desc: 'نسخة الجريدة الرسمية، تشمل المواد 1–9 والمذكرة الإيضاحية.', att: { name: 'law-11-2025.pdf', size: '412 KB', kind: 'PDF' }, ext: 'extracted', by: 'U1', date: '14/10/2026', sections: [
    P('المادة الأولى — التعريفات', 'يُقصد بالوظيفة الفنية في تطبيق أحكام هذا القانون كل وظيفة يشترط لشغلها مؤهل علمي متخصص يحدده القرار المنظم لها.', 'ويُقصد بالبدل ما يُصرف شهرياً لشاغل الوظيفة الفنية مقابل التخصص لا مقابل العمل الفعلي.'),
    P('المادة الثانية — شروط الاستحقاق', 'يستحق البدل من كان مؤهله الدراسي مطابقاً للمؤهل المحدد في القرار المنظم، ولا يغني عن ذلك طول المدة ولا القيام بأعباء الوظيفة فعلاً.'),
    P('المادة الثالثة — الاسترداد', 'لا حق مكتسب فيما صُرف بغير سند من القانون، وللجهة أن تسترد ما أُدّي دون وجه حق متى ثبت انتفاء شرط الاستحقاق.'),
    P('المذكرة الإيضاحية', 'جاء هذا القانون لحسم الخلاف حول العبرة في استحقاق البدل، فجعلها بمطابقة المؤهل للنص لا بطبيعة العمل.'),
  ] },
  { id: 'D2', type: 'ruling', title: 'حكم تمييز — الطعن 2187 لسنة 2016 إداري — بدل التخصص', desc: 'حكم جلسة علنية، الدائرة الإدارية الثانية. الأسماء مجهَّلة.', att: { name: '4070-2016-2187.docx', size: '88 KB', kind: 'Word' }, ext: 'extracted', by: 'U1', date: '13/10/2026', sections: [
    P('الديباجة', 'محكمة التمييز — الدائرة الإدارية الثانية. بالجلسة المنعقدة علناً بتاريخ 11/3/2025م صدر الحكم الآتي في الطعن المقيد برقم 2187 لسنة 2016 إداري/2.'),
    P('الوقائع', 'تتحصل الوقائع في أن المطعون ضده [موظف ـ أ] أقام الدعوى طالباً الحكم بأحقيته في بدل التخصص اعتباراً من تاريخ تعيينه، تأسيساً على أنه يشغل وظيفة فنية ويؤدي أعمالها فعلاً.', 'وبتاريخ 31/6/2014 حكمت محكمة أول درجة بأحقيته، فاستأنفت الجهة الإدارية وقضت محكمة الاستئناف بالتأييد.'),
    P('الأسباب', 'وحيث إن المقرر في قضاء هذه المحكمة أن العبرة في استحقاق البدل هي بمطابقة المؤهل الدراسي للمؤهل الذي حدده القرار المنظم له، لا بطبيعة العمل الذي يؤديه فعلاً ولا بمدة أقدميته.', 'ولا يغير من ذلك أن جهة الإدارة صرفت البدل مدةً ثم أوقفته، إذ إن خطأ الإدارة لا ينشئ حقاً.'),
    P('المنطوق', 'فلهذه الأسباب حكمت المحكمة بتمييز الحكم المطعون فيه، وفي موضوع الاستئناف بإلغاء الحكم المستأنف ورفض الدعوى.'),
  ] },
  { id: 'D3', type: 'article', title: 'المادة 264 مدني — التعويض عن الضرر', desc: 'نص المادة مع تعليق مختصر من شرح القانون المدني.', att: null, ext: 'manual', by: 'U2', date: '12/10/2026', sections: [
    P('النص', 'كل من أحدث بفعله الخاطئ ضرراً بغيره يلتزم بتعويضه، سواء أكان في إحداثه الضرر مباشراً أم متسبباً.'),
    P('التعليق', 'يشترط لقيام المسؤولية ثبوت الخطأ والضرر وعلاقة السببية بينهما، وتقدير التعويض مما تستقل به محكمة الموضوع.'),
  ] },
  { id: 'D4', type: 'ruling', title: 'قرار غرفة مشورة — الطعن 388 لسنة 2018 تجاري — اليمين الحاسمة', desc: 'عدم قبول الطعن. الدائرة التجارية الثانية.', att: { name: '4020-2018-388.pdf', size: '301 KB', kind: 'PDF' }, ext: 'extracted', by: 'U2', date: '11/10/2026', sections: [
    P('الديباجة', 'محكمة التمييز — الدائرة التجارية الثانية. قرار في غرفة المشورة في الطعن رقم 388 لسنة 2018 تجاري/2، بتاريخ 2/3/2025م.'),
    P('الأسباب', 'وحيث إن المقرر أن لمحكمة الموضوع رفض توجيه اليمين الحاسمة متى تبيّن لها أن طالبها متعسف في توجيهها، وتقدير ذلك مما تستقل به بغير معقب.'),
    P('القرار', 'لذلك قررت المحكمة عدم قبول الطعن، وألزمت الطاعن المصروفات، مع مصادرة الكفالة.'),
  ] },
  { id: 'D5', type: 'memo', title: 'مذكرة — مبادئ الاسترداد في منازعات الخدمة المدنية', desc: 'تجميع داخلي لأبرز المبادئ المتواترة.', att: { name: 'memo-restitution.docx', size: '54 KB', kind: 'Word' }, ext: 'extracting', by: 'U1', date: '17/10/2026', sections: [] },
  { id: 'D6', type: 'ruling', title: 'حكم تمييز — الطعن 942 لسنة 2015 إداري — استرداد علاوة', desc: 'نسخة ممسوحة ضوئياً بلا طبقة نص.', att: { name: 'scan-942-2015.pdf', size: '6.2 MB', kind: 'PDF' }, ext: 'failed', by: 'U2', date: '10/10/2026', sections: [], failReason: 'المرفق صورة ممسوحة بلا طبقة نص — ارفع نسخة أوضح أو أدخل النص يدوياً.' },
  { id: 'D7', type: 'law', title: 'قرار الخدمة المدنية رقم 11 لسنة 2005 — المؤهلات المعتمدة', desc: 'جدول المؤهلات المطلوبة لكل مجموعة وظيفية.', att: { name: 'csc-11-2005.pdf', size: '1.1 MB', kind: 'PDF' }, ext: 'extracted', by: 'U1', date: '9/10/2026', sections: [
    P('المجموعة الفنية', 'يُشترط لشغل وظائف المجموعة الفنية الحصول على مؤهل جامعي في التخصص المحدد قرين كل وظيفة في الجدول المرفق.'),
    P('أحكام انتقالية', 'يُحتفظ لمن يشغل الوظيفة عند صدور هذا القرار بوضعه، دون أن يترتب على ذلك استحقاق بدل لم يكن مستحقاً.'),
  ] },
  { id: 'D8', type: 'article', title: 'المادة 64 مرافعات — سرية الجلسات', desc: 'نص المادة.', att: null, ext: 'manual', by: 'U1', date: '8/10/2026', sections: [
    P('النص', 'تكون المرافعة علنية إلا إذا رأت المحكمة من تلقاء نفسها أو بناءً على طلب أحد الخصوم إجراءها سراً محافظةً على النظام العام أو مراعاةً للآداب أو لحرمة الأسرة.'),
  ] },
];
DOCS.forEach(d => { d.status = 'active'; d.anonAttested = !!d.att; });

/* ---------- الحالة ---------- */
const S = { me: null, q: '', filters: { type: new Set(), ext: new Set(), trash: false }, seenPipeline: new Set(['D1', 'D2', 'D4', 'D7']) };
const me = () => USERS.find(u => u.id === S.me);
const isAdmin = () => me()?.role === 'admin';
try { const saved = sessionStorage.getItem('qadi-me'); if (saved && USERS.find(u => u.id === saved)) S.me = saved; } catch (e) {}

/* ---------- مساعدات العرض ---------- */
function extBadge(d) {
  const m = { extracted: ['badge-ok', IC.check], manual: ['badge-ok', IC.pen], extracting: ['badge-pending', IC.clock], pending: ['badge-pending', IC.clock], failed: ['badge-danger', IC.alert] }[d.ext];
  return `<span class="badge ${m[0]}">${svg(m[1])}${EXTRACTION[d.ext]}</span>`;
}
const userName = id => USERS.find(u => u.id === id)?.name || '—';
const initials = n => n.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('');
function toast(msg, action) {
  let r = $('#toasts'); if (!r) { r = document.createElement('div'); r.id = 'toasts'; r.className = 'toasts'; document.body.append(r); }
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = `<span>${esc(msg)}</span>${action ? `<button type="button">${esc(action.label)}</button>` : ''}`;
  if (action) t.querySelector('button').onclick = () => { action.fn(); t.remove(); };
  r.append(t); setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 200); }, action ? 6000 : 2600);
}
function announce(msg) { let a = $('#announcer'); if (!a) { a = document.createElement('div'); a.id = 'announcer'; a.className = 'sr-only'; a.setAttribute('aria-live', 'polite'); document.body.append(a); } a.textContent = ''; setTimeout(() => a.textContent = msg, 30); }
function dialog({ title, body, confirm, danger, onConfirm, cancel = 'إلغاء' }) {
  let d = $('#dlg'); if (!d) { d = document.createElement('dialog'); d.id = 'dlg'; d.className = 'dlg'; d.dir = 'rtl'; d.addEventListener('click', e => { if (e.target === d) d.close(); }); document.body.append(d); }
  d.innerHTML = `<div class="dlg-head"><h2>${esc(title)}</h2><button type="button" class="btn btn-ghost btn-icon" data-close aria-label="أغلق">${svg(IC.x)}</button></div>
    <div class="dlg-body">${body}</div>
    <div class="dlg-foot"><button type="button" class="btn btn-ghost" data-close>${esc(cancel)}</button>${confirm ? `<button type="button" class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-confirm>${esc(confirm)}</button>` : ''}</div>`;
  $$('[data-close]', d).forEach(b => b.onclick = () => d.close());
  const c = $('[data-confirm]', d); if (c) c.onclick = () => { if (onConfirm(d) !== false) d.close(); };
  d.showModal(); if (danger) $('[data-close].btn', d)?.focus();
  return d;
}
function mark(text, q) { if (!q) return esc(text); const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'); return esc(text).replace(re, '<mark>$1</mark>'); }
function setTheme(dark) { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; try { localStorage.setItem('qadi-portal-theme', dark ? 'dark' : 'light'); } catch (e) {} const b = $('#theme-btn'); if (b) { b.innerHTML = svg(dark ? IC.sun : IC.moon); b.setAttribute('aria-label', dark ? 'الوضع الفاتح' : 'الوضع الداكن'); } }
(function initTheme() { let t = null; try { t = localStorage.getItem('qadi-portal-theme'); } catch (e) {} document.documentElement.dataset.theme = t || 'light'; })();

/* ---------- الموجّه ---------- */
const routes = [];
const route = (re, fn, opts = {}) => routes.push({ re, fn, ...opts });
function go(hash) { location.hash = hash; }
function render() {
  clearTimers();
  const h = location.hash.replace(/^#/, '') || '/docs';
  const stage = $('#stage');
  for (const r of routes) {
    const m = h.match(r.re); if (!m) continue;
    if (!r.public && !S.me) { go('/login'); return; }
    if (r.admin && !isAdmin()) { stage.innerHTML = shell(forbidden(), h); bindShell(); return; }
    const out = r.fn(...m.slice(1));
    stage.innerHTML = r.bare ? out : shell(out, h);
    if (!r.bare) bindShell();
    r.after?.(...m.slice(1));
    window.scrollTo(0, 0);
    return;
  }
  stage.innerHTML = shell(`<div class="forbid"><h1>الصفحة غير موجودة</h1><a class="btn" href="#/docs">المستندات</a></div>`, h); bindShell();
}
window.addEventListener('hashchange', render);

/* ---------- القشرة ---------- */
function shell(content, h) {
  const u = me(); const dark = document.documentElement.dataset.theme === 'dark';
  const nav = [['/docs', 'المستندات', IC.docs, false], ['/users', 'المستخدمون', IC.users, true], ['/settings', 'الإعدادات', IC.settings, true]]
    .filter(([, , , adminOnly]) => !adminOnly || isAdmin())
    .map(([p, l, i]) => `<a href="#${p}" ${h.startsWith(p) ? 'aria-current="page"' : ''}>${svg(i, 'ic-sm')}<span class="lbl">${l}</span></a>`).join('');
  return `<div class="app" id="app">
    <header class="hdr">
      <a class="brand" href="#/docs"><span class="brand-mark" aria-hidden="true">ق</span><span class="lbl">نظام القاضي</span></a>
      <form class="sbox" role="search" id="sform">${svg(IC.search)}<label class="sr-only" for="q">ابحث</label><input id="q" type="search" value="${esc(S.q)}" placeholder="ابحث بالعنوان أو بنص المستند أو باسم المرفق…" autocomplete="off"><button type="submit" class="go">ابحث</button></form>
      <nav class="hnav" aria-label="التنقّل">${nav}</nav>
      <button type="button" class="ib" data-action="theme" id="theme-btn" aria-label="${dark ? 'الوضع الفاتح' : 'الوضع الداكن'}">${svg(dark ? IC.sun : IC.moon)}</button>
      <div class="me"><span class="avatar" aria-hidden="true">${esc(initials(u.name))}</span><span class="who"><span>${esc(u.name)}</span><small>${ROLES[u.role]}</small></span><button type="button" class="ib" data-action="logout" aria-label="خروج">${svg(IC.logout)}</button></div>
    </header>
    <main class="wrap" id="main">${content}</main>
  </div>`;
}
function bindShell() {
  $('#sform')?.addEventListener('submit', e => { e.preventDefault(); const v = $('#q').value.trim(); if (v && v.length < 2) { toast('اكتب حرفين على الأقل'); return; } S.q = v; if (location.hash.replace(/^#/, '').startsWith('/docs') && !/\/docs\/./.test(location.hash)) renderDocsList(); else go('/docs'); });
}
function forbidden() { return `<div class="forbid">${svg(IC.lock, 'ic-lg')}<h1>لا صلاحية</h1><p>هذه المنطقة للمدير فقط. حسابك بدور «${ROLES[me().role]}» يطّلع على المستندات ويبحث فيها.</p><a class="btn btn-primary" href="#/docs">إلى المستندات</a></div>`; }

/* ---------- الدخول ---------- */
route(/^\/login$/, () => `<div class="auth"><div class="auth-card">
  <div class="brand"><span class="brand-mark" aria-hidden="true">ق</span>نظام القاضي</div>
  <h1>الدخول</h1><p class="lead">بوابة الموظفين — ${esc(SETTINGS.org)}</p>
  <form id="login">
    <div class="field"><label for="email">البريد</label><input class="input" id="email" type="email" required value="a.mutairi@example.kw"></div>
    <div class="field"><label for="pw">كلمة السر</label><input class="input" id="pw" type="password" required value="••••••••"><span class="err" id="pw-err" hidden></span></div>
    <button class="btn btn-primary" type="submit">ادخل</button>
    <div class="auth-foot"><a href="#/reset">نسيت كلمة السر؟</a></div>
  </form>
  <div class="demo"><strong>نموذج عرض — ادخل بأي دور لتشوف الفرق:</strong>
    <div class="row"><button type="button" class="btn" data-demo="U1">${svg(IC.shield, 'ic-sm')}مدير (عبدالعزيز)</button><button type="button" class="btn" data-demo="U3">${svg(IC.eye, 'ic-sm')}مُطالِع (يوسف)</button><button type="button" class="btn" data-demo="U4">معطَّل (نورة)</button></div>
    <span>كل البيانات مصطنعة. الدخول الفعلي ببريد وكلمة سر على الخادم.</span></div>
</div></div>`, { public: true, bare: true, after() {
  const login = id => { const u = USERS.find(x => x.id === id); if (u.status !== 'disabled') { S.me = id; try { sessionStorage.setItem('qadi-me', id); } catch (e) {} announce('تم الدخول'); go('/docs'); } else { const e = $('#pw-err'); e.hidden = false; e.textContent = 'هذا الحساب معطَّل — راجع المدير.'; $('#pw').setAttribute('aria-invalid', 'true'); } };
  $('#login').addEventListener('submit', e => { e.preventDefault(); const em = $('#email').value.trim().toLowerCase(); const u = USERS.find(x => x.email === em) || USERS[0]; login(u.id); });
  $$('[data-demo]').forEach(b => b.onclick = () => login(b.dataset.demo));
} });

/* ---------- إعادة تعيين كلمة السر ---------- */
route(/^\/reset$/, () => `<div class="auth"><div class="auth-card">
  <div class="brand"><span class="brand-mark" aria-hidden="true">ق</span>نظام القاضي</div>
  <h1>إعادة تعيين كلمة السر</h1><p class="lead">اكتب بريدك وسيصلك رابط صالح 30 دقيقة لمرة واحدة.</p>
  <form id="reset"><div class="field"><label for="email">البريد</label><input class="input" id="email" type="email" required></div><button class="btn btn-primary" type="submit">أرسل الرابط</button></form>
  <div id="sent" hidden class="alert alert-ok">${svg(IC.mail, 'ic-sm')}<span>إن كان البريد مسجَّلاً فقد أُرسل الرابط. <a href="#/reset/new">افتح الرابط (نموذج)</a></span></div>
  <div class="auth-foot"><a href="#/login">${svg(IC.back, 'ic-sm')} رجوع للدخول</a></div>
</div></div>`, { public: true, bare: true, after() { $('#reset').addEventListener('submit', e => { e.preventDefault(); $('#sent').hidden = false; $('#reset').hidden = true; }); } });
route(/^\/reset\/new$/, () => `<div class="auth"><div class="auth-card">
  <div class="brand"><span class="brand-mark" aria-hidden="true">ق</span>نظام القاضي</div>
  <h1>كلمة سر جديدة</h1><p class="lead">تُستعمل أيضاً عند أول دخول بكلمة سر مؤقتة من المدير.</p>
  <form id="newpw">
    <div class="field"><label for="p1">كلمة السر الجديدة</label><input class="input" id="p1" type="password" required minlength="10"><span class="help">10 أحرف على الأقل.</span></div>
    <div class="field"><label for="p2">تأكيدها</label><input class="input" id="p2" type="password" required><span class="err" id="p2-err" hidden>غير متطابقتين.</span></div>
    <button class="btn btn-primary" type="submit">احفظ وادخل</button></form>
</div></div>`, { public: true, bare: true, after() { $('#newpw').addEventListener('submit', e => { e.preventDefault(); if ($('#p1').value !== $('#p2').value) { $('#p2-err').hidden = false; $('#p2').setAttribute('aria-invalid', 'true'); return; } S.me = S.me || 'U1'; try { sessionStorage.setItem('qadi-me', S.me); } catch (x) {} toast('حُفظت كلمة السر'); go('/docs'); }); } });

/* ---------- المستندات: القائمة والبحث ---------- */
function visibleDocs() {
  const q = S.q.toLowerCase();
  return DOCS.filter(d => (S.filters.trash ? d.status === 'deleted' : d.status === 'active'))
    .filter(d => !S.filters.type.size || S.filters.type.has(d.type))
    .filter(d => !S.filters.ext.size || S.filters.ext.has(d.ext))
    .map(d => {
      if (!q) return { d, where: null, snip: d.sections[0]?.ps[0] || d.desc };
      const inTitle = d.title.toLowerCase().includes(q); const inAtt = d.att?.name.toLowerCase().includes(q);
      let hit = null; for (const s of d.sections) { const p = s.ps.find(x => x.toLowerCase().includes(q)); if (p) { hit = { s, p }; break; } }
      const inDesc = d.desc.toLowerCase().includes(q);
      if (!inTitle && !inAtt && !hit && !inDesc) return null;
      const where = inTitle ? 'العنوان' : hit ? `النص · ${hit.s.h}` : inAtt ? 'اسم المرفق' : 'الوصف';
      const snip = hit ? hit.p : inDesc ? d.desc : (d.sections[0]?.ps[0] || d.desc);
      return { d, where, snip };
    }).filter(Boolean);
}
function facet(title, key, map, all) {
  const counts = {}; all.forEach(d => counts[d[key]] = (counts[d[key]] || 0) + 1);
  return `<div class="facet"><h3>${title}</h3>${Object.entries(map).map(([k, l]) => `<label class="${counts[k] ? '' : 'zero'}"><input type="checkbox" data-facet="${key}" value="${k}" ${S.filters[key].has(k) ? 'checked' : ''}>${l}<span class="n num">${counts[k] || 0}</span></label>`).join('')}</div>`;
}
function docsListHTML() {
  const all = DOCS.filter(d => d.status === 'active'); const rows = visibleDocs(); const q = S.q;
  const trashN = DOCS.filter(d => d.status === 'deleted').length;
  const cards = rows.map(({ d, where, snip }) => `<a class="card" href="#/docs/${d.id}" aria-label="افتح ${esc(d.title)}">
      <div class="c-top"><span>${TYPES[d.type]}</span><span>·</span><span class="num">${d.date}</span><span>·</span><span>${esc(userName(d.by))}</span>${where ? `<span>·</span><span class="badge badge-accent">مطابقة في ${where}</span>` : ''}</div>
      <div class="c-title">${mark(d.title, q)}</div>
      <div class="c-snip">${mark(snip.slice(0, 220), q)}${snip.length > 220 ? '…' : ''}</div>
      <div class="c-tags">${d.att ? `<span class="tag">${svg(IC.file, 'ic-sm')} ${mark(d.att.name, q)}</span>` : '<span class="tag">بلا مرفق</span>'}<span class="tag num">${d.sections.length} ${d.sections.length === 1 ? 'قسم' : d.sections.length <= 10 ? 'أقسام' : 'قسماً'}</span></div>
      <div class="c-side">${extBadge(d)}${d.status === 'deleted' ? '<span class="badge badge-muted">محذوف</span>' : ''}</div>
    </a>`).join('');
  const empty = all.length === 0 && !S.filters.trash
    ? `<div class="empty first"><h2>ابدأ بأرشيفك</h2><p>لا مستندات بعد. ارفع أول مستنداتك — PDF أو Word — ويفرّغ المساعد نصّها لتبحث فيه.</p>${isAdmin() ? `<a class="btn btn-primary" href="#/docs/new">${svg(IC.upload, 'ic-sm')}ارفع أول المستندات</a>` : ''}</div>`
    : rows.length === 0
      ? (q ? `<div class="empty"><h2>لم أجد «${esc(q)}»</h2><p>بحثتُ في العناوين والنصوص وأسماء المرفقات.</p><button type="button" class="btn" data-action="clear-q">امسح البحث</button> <button type="button" class="btn btn-secondary" data-action="semantic">وسّع البحث بالمعنى</button></div>`
           : `<div class="empty"><h2>${S.filters.trash ? 'لا مستندات محذوفة' : 'لا نتائج لهذا الترشيح'}</h2><button type="button" class="btn" data-action="clear-f">امسح الترشيح</button></div>`)
      : '';
  const overview = !q && !S.filters.trash && rows.length ? `<div class="overview"><div class="ov-head">${svg(IC.info, 'ic-sm')}نظرة على الأرشيف</div><p><span class="num">${all.length}</span> مستندات: ${Object.entries(TYPES).map(([k, l]) => `${all.filter(d => d.type === k).length} ${l}`).join(' · ')}. <span class="num">${all.filter(d => d.ext === 'extracting' || d.ext === 'pending').length}</span> قيد التفريغ، و<span class="num">${all.filter(d => d.ext === 'failed').length}</span> فشل تفريغه ويحتاج تدخّلاً.</p></div>` : '';
  return `<div class="page-head"><h1>${S.filters.trash ? 'المستندات المحذوفة' : 'المستندات'}</h1><span class="cnt"><span class="num">${rows.length}</span> ${q ? `نتيجة لـ«${esc(q)}»` : 'مستند'}</span><span class="spacer"></span>
      <button type="button" class="btn btn-ghost" data-action="toggle-facets">${svg(IC.filter, 'ic-sm')}رشّح</button>
      ${isAdmin() ? `<a class="btn btn-primary" href="#/docs/new">${svg(IC.plus, 'ic-sm')}إضافة مستند</a>` : ''}</div>
    <div class="results" id="results">
      <aside class="facets" id="facets" aria-label="المرشّحات">
        ${facet('النوع', 'type', TYPES, all)}
        ${facet('التفريغ', 'ext', EXTRACTION, all)}
        ${isAdmin() ? `<div class="facet"><h3>المحذوفة</h3><label><input type="checkbox" data-trash ${S.filters.trash ? 'checked' : ''}>اعرض المحذوفة<span class="n num">${trashN}</span></label></div>` : ''}
      </aside>
      <div id="list">${overview}${cards}${empty}</div>
    </div>`;
}
function renderDocsList() { $('#main').innerHTML = docsListHTML(); bindDocsList(); }
function bindDocsList() {
  $$('[data-facet]').forEach(cb => cb.onchange = () => { const set = S.filters[cb.dataset.facet]; cb.checked ? set.add(cb.value) : set.delete(cb.value); renderDocsList(); });
  const t = $('[data-trash]'); if (t) t.onchange = () => { S.filters.trash = t.checked; renderDocsList(); };
  $('[data-action="toggle-facets"]')?.addEventListener('click', () => $('#facets').classList.toggle('open'));
  $('[data-action="clear-q"]')?.addEventListener('click', () => { S.q = ''; $('#q').value = ''; renderDocsList(); });
  $('[data-action="clear-f"]')?.addEventListener('click', () => { S.filters.type.clear(); S.filters.ext.clear(); S.filters.trash = false; renderDocsList(); });
  $('[data-action="semantic"]')?.addEventListener('click', () => toast('البحث بالمعنى يُفعَّل بعد العقد'));
}
route(/^\/docs$/, docsListHTML, { after: bindDocsList });

/* ---------- المستندات: إضافة ---------- */
let pendingFiles = [];
route(/^\/docs\/new$/, () => `<a class="crumb" href="#/docs">${svg(IC.back, 'ic-sm')} المستندات</a>
  <div class="form-card"><h2>إضافة مستند</h2><p class="lead">اكتبه بيدك، أو ارفع مرفقاً ويفرّغ المساعد الذكي نصّه داخل السجل.</p>
  <form id="newdoc">
    <div class="choice" role="radiogroup" aria-label="طريقة الإضافة">
      <label><input type="radio" name="mode" value="manual" checked><strong>${svg(IC.pen)}يدوياً</strong><span>تكتب العنوان والوصف والنص مباشرة.</span></label>
      <label><input type="radio" name="mode" value="ai"><strong>${svg(IC.bot)}بالمساعد الذكي</strong><span>ترفع PDF أو Word، ويقرأه المساعد ويفرّغه نصاً بأقسام.</span></label>
    </div>
    <div class="field"><label for="type">النوع</label><select class="input" id="type">${Object.entries(TYPES).map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select></div>
    <div id="m-manual">
      <div class="field"><label for="title">العنوان</label><input class="input" id="title" placeholder="مثال: قانون رقم … لسنة … — المادة …"><span class="err" id="title-err" hidden>العنوان مطلوب.</span></div>
      <div class="field"><label for="desc">الوصف</label><input class="input" id="desc" placeholder="سطر يعرّف المستند"></div>
      <div class="field"><label for="body">النص</label><textarea class="input reading" id="body" placeholder="الصق النص أو اكتبه. افصل الأقسام بسطر فارغ وعنوان يبدأ بـ#"></textarea><span class="err" id="body-err" hidden>النص مطلوب في الإضافة اليدوية.</span></div>
    </div>
    <div id="m-ai" hidden>
      <div class="field"><label>المرفق</label>
        <div class="drop" id="drop" tabindex="0" role="button" aria-label="اختر ملفاً أو أفلته هنا">${svg(IC.upload, 'ic-lg')}<strong>أفلت الملفات هنا أو اختر</strong><span>PDF أو Word · حتى 20 ملفاً · 25 ميغابايت للملف</span><button type="button" class="btn" id="pick">اختر ملفاً</button></div>
        <input type="file" id="file" accept=".pdf,.doc,.docx" multiple hidden><div class="files" id="files"></div></div>
      <div class="field"><label for="hint">شرح عام للمساعد (اختياري)</label><textarea class="input" id="hint" placeholder="مثال: هذا قرار خدمة مدنية — فرّغه مادةً مادة، والجدول المرفق قسماً مستقلاً"></textarea></div>
      <div class="field"><label class="check"><input type="checkbox" id="attest"><span>أقرّ بأن هذا المستند مصطنع أو مجهَّل الأسماء، ويجوز إرساله إلى مزوّد التفريغ. <span class="help">(يُسجَّل الإقرار باسمي في سجل الأحداث)</span></span></label><span class="err" id="attest-err" hidden>لا يُرسل المرفق للمزوّد بلا إقرار.</span></div>
      <div class="alert alert-info">${svg(IC.info, 'ic-sm')}<span>بعد الرفع يبدأ التفريغ فوراً وتشوفه خطوةً خطوة. يُحتسب على حدّك الشهري: <span class="num">${me().used}/${me().limit}</span>.</span></div>
    </div>
    <div class="row end"><a class="btn btn-ghost" href="#/docs">إلغاء</a><button class="btn btn-primary" type="submit" id="submit">${svg(IC.check, 'ic-sm')}احفظ</button></div>
  </form></div>`, { admin: true, after() {
  pendingFiles = [];
  const modeEls = $$('input[name="mode"]'); const sync = () => { const ai = $('input[name="mode"]:checked').value === 'ai'; $('#m-manual').hidden = ai; $('#m-ai').hidden = !ai; $('#submit').innerHTML = ai ? `${svg(IC.bot, 'ic-sm')}ارفع وابدأ التفريغ` : `${svg(IC.check, 'ic-sm')}احفظ`; };
  modeEls.forEach(r => r.onchange = sync); sync();
  const drop = $('#drop'), file = $('#file'), list = $('#files');
  const addFiles = fs => { for (const f of fs) { if (pendingFiles.length >= 20) { toast('الحدّ 20 ملفاً في الطلب'); break; } if (f.size > 25 * 1024 * 1024) { toast(`«${f.name}» أكبر من 25 ميغابايت`); continue; } if (!/\.(pdf|docx?)$/i.test(f.name)) { toast(`«${f.name}» ليس PDF أو Word`); continue; } if (pendingFiles.some(p => p.name === f.name && p.size === f.size)) { toast(`«${f.name}» مكرّر — لن يُفرَّغ مرتين`); continue; } pendingFiles.push(f); } renderFiles(); };
  const renderFiles = () => { list.innerHTML = pendingFiles.map((f, i) => `<div class="att">${svg(IC.file)}<span class="name">${esc(f.name)}</span><small class="num">${(f.size / 1024).toFixed(0)} KB</small><button type="button" class="btn btn-ghost btn-icon" data-rm="${i}" aria-label="أزل ${esc(f.name)}">${svg(IC.x, 'ic-sm')}</button></div>`).join(''); $$('[data-rm]', list).forEach(b => b.onclick = () => { pendingFiles.splice(+b.dataset.rm, 1); renderFiles(); }); };
  $('#pick').onclick = e => { e.stopPropagation(); file.click(); }; drop.onclick = () => file.click(); drop.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } };
  file.onchange = () => { addFiles(file.files); file.value = ''; };
  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); if (ev === 'drop') addFiles(e.dataTransfer.files); }));
  $('#newdoc').addEventListener('submit', e => {
    e.preventDefault(); const ai = $('input[name="mode"]:checked').value === 'ai'; const type = $('#type').value; const u = me();
    if (!ai) {
      const title = $('#title').value.trim(), body = $('#body').value.trim(); let bad = false;
      $('#title-err').hidden = !!title; $('#title').setAttribute('aria-invalid', String(!title)); if (!title) bad = true;
      $('#body-err').hidden = !!body; $('#body').setAttribute('aria-invalid', String(!body)); if (!body) bad = true;
      if (bad) return;
      const sections = []; let cur = { h: 'النص', ps: [] };
      body.split(/\n\s*\n/).forEach(block => { const t = block.trim(); if (!t) return; if (t.startsWith('#')) { if (cur.ps.length) sections.push(cur); cur = { h: t.replace(/^#+\s*/, ''), ps: [] }; } else cur.ps.push(t); }); if (cur.ps.length) sections.push(cur);
      const id = 'D' + (DOCS.length + 1); DOCS.unshift({ id, type, title, desc: $('#desc').value.trim(), att: null, ext: 'manual', by: u.id, date: '17/10/2026', sections, status: 'active', anonAttested: false }); S.seenPipeline.add(id);
      toast('حُفظ المستند'); go('/docs/' + id); return;
    }
    if (!pendingFiles.length) { toast('اختر ملفاً أولاً'); return; }
    if (!$('#attest').checked) { $('#attest-err').hidden = false; $('#attest').focus(); return; }
    if (u.used >= u.limit) { toast(`بلغت حدّك الشهري (${u.limit}) — يُحفظ المرفق بلا تفريغ`); }
    const ids = pendingFiles.map((f, i) => { const id = 'D' + (DOCS.length + 1 + i); const over = u.used >= u.limit; if (!over) u.used++; return DOCS.unshift({ id, type, title: f.name.replace(/\.(pdf|docx?)$/i, '').replace(/[-_]/g, ' '), desc: $('#hint').value.trim() || 'مرفق مرفوع — العنوان أولي من اسم الملف، عدّله بعد التفريغ.', att: { name: f.name, size: (f.size / 1024).toFixed(0) + ' KB', kind: /pdf$/i.test(f.name) ? 'PDF' : 'Word' }, ext: over ? 'pending' : 'extracting', by: u.id, date: '17/10/2026', sections: [], status: 'active', anonAttested: true, fresh: !over }), id; });
    pendingFiles = []; toast(ids.length === 1 ? 'رُفع المرفق وبدأ التفريغ' : `رُفعت ${ids.length} مرفقات وبدأ التفريغ بالتتابع`); go('/docs/' + ids[0]);
  });
} });

/* ---------- المستندات: القراءة + شريط التفريغ ---------- */
const SIM = { // نص مصطنع يُولَّد للمرفقات المرفوعة في النموذج
  law: [P('المادة الأولى', 'نص مصطنع للعرض — تُستبدل هذه الفقرة بنص المرفق الفعلي بعد تفريغه على الخادم.', 'فقرة ثانية مصطنعة توضّح أن القسم قد يحوي أكثر من فقرة.'), P('المادة الثانية', 'فقرة مصطنعة أخرى لبيان ترقيم الأقسام والتنقّل بينها من الفهرس الجانبي.')],
  ruling: [P('الديباجة', 'فقرة مصطنعة — ديباجة الحكم.'), P('الوقائع', 'فقرة مصطنعة — وقائع الحكم.'), P('الأسباب', 'فقرة مصطنعة — أسباب الحكم.'), P('المنطوق', 'فقرة مصطنعة — منطوق الحكم.')],
  article: [P('النص', 'فقرة مصطنعة — نص المادة.')], memo: [P('المقدمة', 'فقرة مصطنعة — مقدمة المذكرة.'), P('المبادئ', 'فقرة مصطنعة — المبادئ.')],
};
function docHTML(d) {
  const q = S.q; const admin = isAdmin(); const nSec = d.sections.length;
  const sections = d.sections.map((s, i) => `<h2 class="sec-h" id="sec-${i}"><span class="n num">${i + 1}</span>${esc(s.h)}</h2>${s.ps.map((p, j) => `<p class="para" data-s="${i}" id="p-${i}-${j}">${mark(p, q)}</p>`).join('')}`).join('');
  const emptyBody = d.ext === 'failed' ? `<div class="alert alert-warn">${svg(IC.alert, 'ic-sm')}<span><strong>فشل التفريغ.</strong> ${esc(d.failReason || 'تعذّر قراءة المرفق.')}</span></div><div class="empty"><h2>لا نص بعد</h2><p>المرفق محفوظ. تقدر تعيد المحاولة بنسخة أوضح، أو تُدخل النص يدوياً.</p>${admin ? `<div class="row" style="justify-content:center"><button type="button" class="btn btn-secondary" data-action="retry">${svg(IC.undo, 'ic-sm')}أعد المحاولة</button><a class="btn" href="#/docs/${d.id}/edit">${svg(IC.pen, 'ic-sm')}أدخل النص يدوياً</a></div>` : ''}</div>`
    : d.ext === 'pending' ? `<div class="empty"><h2>بانتظار التفريغ</h2><p>بلغ حدّ الاستهلاك الشهري. يُفرَّغ أول الشهر، أو يطلب مدير آخر تفريغه.</p></div>`
    : d.ext === 'extracting' && !d.fresh ? `<div class="empty"><h2>قيد التفريغ</h2><p>يعمل المساعد على المرفق الآن — سيظهر النص هنا بأقسامه عند الاكتمال.</p></div>` : '';
  return `<div class="reader" id="reader">
    <article class="r-main" id="rmain" aria-label="نص المستند">
      <a class="crumb" href="#/docs">${svg(IC.back, 'ic-sm')} المستندات</a>
      <h1>${mark(d.title, q)}</h1>
      <div class="r-meta"><span class="badge badge-muted">${TYPES[d.type]}</span><span>أضافه ${esc(userName(d.by))}</span><span class="num">${d.date}</span><span id="ext-badge">${extBadge(d)}</span>${d.status === 'deleted' ? '<span class="badge badge-danger">محذوف</span>' : ''}</div>
      ${admin ? `<div class="r-actions">${d.status === 'deleted' ? `<button type="button" class="btn btn-primary" data-action="restore">${svg(IC.undo, 'ic-sm')}استرجع</button>` : `<a class="btn" href="#/docs/${d.id}/edit">${svg(IC.edit, 'ic-sm')}تعديل</a><button type="button" class="btn btn-danger" data-action="delete">${svg(IC.trash, 'ic-sm')}حذف</button>`}${d.att ? `<button type="button" class="btn btn-ghost" data-action="download">${svg(IC.download, 'ic-sm')}نزّل المرفق</button>` : ''}</div>` : `<div class="r-actions">${d.att ? `<button type="button" class="btn btn-ghost" data-action="download">${svg(IC.download, 'ic-sm')}نزّل المرفق</button>` : '<span class="badge badge-muted">قراءة فقط</span>'}</div>`}
      ${d.desc ? `<p class="r-desc">${mark(d.desc, q)}</p>` : ''}
      <div class="pipe" id="pipeline" aria-live="polite" ${d.att && d.ext !== 'manual' ? '' : 'hidden'}>${pipeHTML(d)}</div>
      ${emptyBody}${sections}
    </article>
    <aside class="r-aside">
      <div class="box"><h3>المرفق</h3>${d.att ? `<div class="att">${svg(IC.file)}<span class="name">${esc(d.att.name)}</span><small class="num">${d.att.kind} · ${d.att.size}</small></div>` : '<span class="badge badge-muted">بلا مرفق — مُدخَل يدوياً</span>'}</div>
      <div class="box"><h3>البيانات</h3><dl class="kv"><dt>النوع</dt><dd>${TYPES[d.type]}</dd><dt>التفريغ</dt><dd>${EXTRACTION[d.ext]}</dd><dt>الأقسام</dt><dd class="num">${nSec}</dd><dt>أضافه</dt><dd>${esc(userName(d.by))}</dd><dt>التاريخ</dt><dd class="num">${d.date}</dd>${d.att ? `<dt>إقرار التجهيل</dt><dd>${d.anonAttested ? `<span class="badge badge-ok">${svg(IC.check)}مسجَّل</span>` : '<span class="badge badge-warn">غير مسجَّل</span>'}</dd>` : ''}</dl></div>
      ${nSec ? `<div class="box"><h3>الفهرس <span class="num">${nSec}</span></h3><nav class="toc" aria-label="أقسام المستند">${d.sections.map((s, i) => `<a href="#sec-${i}" data-sec="${i}" style="--i:${i}"><span class="n num">${i + 1}</span>${esc(s.h)}</a>`).join('')}</nav></div>` : ''}
    </aside></div>`;
}
function pipeStepsHTML(d, n) { return `<span class="step"><span class="dot">${svg(IC.check)}</span><span>قراءة المرفق</span></span><span class="step"><span class="dot">${svg(IC.check)}</span><span>التجهيل · ${n.names === 0 ? 'لا أسماء أفراد' : `<span class="num">${n.names}</span> اسم`}</span></span><span class="step"><span class="dot">${svg(IC.check)}</span><span>التفريغ · <span class="num">${n.secs}</span> أقسام</span></span><span class="pipe-bar"><i></i></span>`; }
function pipeDoneHTML(d) {
  if (d.ext === 'failed') return `<span class="pipe-done failed">${svg(IC.alert, 'ic-sm')}<span>فشل التفريغ عند قراءة المرفق</span></span>`;
  if (d.ext === 'pending') return `<span class="pipe-done">${svg(IC.clock, 'ic-sm')}<span>بانتظار التفريغ — بلغ حدّ الاستهلاك</span></span>`;
  if (d.ext === 'extracting') return pipeStepsHTML(d, { names: '…', secs: '…' });
  const n = d.sections.reduce((a, s) => a + s.ps.length, 0);
  return `<span class="pipe-done">${svg(IC.check, 'ic-sm')}<span>اكتمل التفريغ: <span class="num">${d.sections.length}</span> أقسام · <span class="num">${n}</span> فقرات · التجهيل مسجَّل</span>${isAdmin() ? `<button type="button" class="btn btn-ghost replay" data-action="replay">أعد عرض التفريغ</button>` : ''}</span>`;
}
function pipeHTML(d) { return (d.fresh || (!S.seenPipeline.has(d.id) && d.ext === 'extracted')) ? pipeStepsHTML(d, { names: d.type === 'ruling' ? 3 : 0, secs: (d.sections.length || SIM[d.type].length) }) : pipeDoneHTML(d); }
function runPipeline(d) {
  const reader = $('#reader'), main = $('#rmain'), pipe = $('#pipeline'); if (!reader || !pipe) return;
  const needs = d.fresh || (!S.seenPipeline.has(d.id) && d.ext === 'extracted'); if (!needs) return;
  S.seenPipeline.add(d.id);
  const finish = () => { if (d.fresh) { d.sections = SIM[d.type].map(s => ({ h: s.h, ps: [...s.ps] })); d.ext = 'extracted'; d.fresh = false; } };
  if (reduced()) { finish(); $('#main').innerHTML = docHTML(d); bindDoc(d); return; }
  if (d.fresh) { finish(); $('#main').innerHTML = docHTML(d); bindDoc(d); return runAnim(d); }
  runAnim(d);
}
function runAnim(d) {
  const reader = $('#reader'), main = $('#rmain'), pipe = $('#pipeline');
  pipe.hidden = false; pipe.innerHTML = pipeStepsHTML(d, { names: d.type === 'ruling' ? 3 : 0, secs: d.sections.length });
  reader.classList.remove('revealed'); reader.classList.add('analyzing'); main.classList.add('analyzing');
  const steps = $$('.step', pipe), bar = $('.pipe-bar i', pipe), nodes = $$('.para, .sec-h', main);
  const setStep = i => { steps.forEach((s, j) => { s.classList.toggle('done', j < i); s.classList.toggle('active', j === i); }); bar.style.setProperty('--prog', String(Math.min(i / steps.length, 1))); };
  setStep(0); later(() => setStep(1), 380); later(() => setStep(2), 760);
  nodes.forEach((p, i) => later(() => { p.classList.add('scanned', 'scanning'); later(() => p.classList.remove('scanning'), 160); }, 800 + i * 90));
  const end = 800 + nodes.length * 90 + 120;
  later(() => { setStep(3); main.classList.remove('analyzing'); reader.classList.remove('analyzing'); reader.classList.add('revealed'); nodes.forEach(p => p.classList.remove('scanned')); announce('اكتمل التفريغ'); }, end);
  later(() => { pipe.innerHTML = pipeDoneHTML(d); $('#ext-badge').innerHTML = extBadge(d); bindPipe(d); }, end + 900);
}
function bindPipe(d) { $('[data-action="replay"]')?.addEventListener('click', () => { S.seenPipeline.delete(d.id); $('#main').innerHTML = docHTML(d); bindDoc(d); runPipeline(d); }); }
function bindDoc(d) {
  bindPipe(d);
  $$('.toc a').forEach(a => { a.onmouseenter = () => $$('.para[data-s="' + a.dataset.sec + '"]').forEach(p => p.classList.add('lit')); a.onmouseleave = () => $$('.para.lit').forEach(p => p.classList.remove('lit')); a.onclick = e => { e.preventDefault(); const t = $('#sec-' + a.dataset.sec); t?.scrollIntoView({ block: 'start', behavior: reduced() ? 'auto' : 'smooth' }); const first = $('.para[data-s="' + a.dataset.sec + '"]'); if (first) { first.classList.add('flash'); later(() => first.classList.remove('flash'), 1600); } }; });
  $('[data-action="download"]')?.addEventListener('click', () => toast(`بدأ تنزيل «${d.att.name}» (نموذج)`));
  $('[data-action="retry"]')?.addEventListener('click', () => { const u = me(); if (u.used >= u.limit) return toast(`بلغت حدّك الشهري (${u.limit})`); u.used++; d.ext = 'extracted'; d.failReason = null; d.sections = SIM[d.type].map(s => ({ h: s.h, ps: [...s.ps] })); d.fresh = false; S.seenPipeline.delete(d.id); $('#main').innerHTML = docHTML(d); bindDoc(d); runPipeline(d); });
  $('[data-action="delete"]')?.addEventListener('click', () => dialog({ title: 'حذف المستند', danger: true, confirm: 'احذف', body: `<p>سيُخفى «<strong>${esc(d.title)}</strong>» من البحث، ويبقى قابلاً للاسترجاع <span class="num">30</span> يوماً ثم يُحذف مرفقه نهائياً.</p><p class="help">يُسجَّل الحذف باسمك في سجل الأحداث.</p>`, onConfirm() { d.status = 'deleted'; announce('حُذف المستند'); go('/docs'); setTimeout(() => toast('حُذف المستند', { label: 'تراجع', fn: () => { d.status = 'active'; renderDocsList(); } }), 50); } }));
  $('[data-action="restore"]')?.addEventListener('click', () => { d.status = 'active'; toast('استُرجع المستند'); $('#main').innerHTML = docHTML(d); bindDoc(d); });
}
route(/^\/docs\/(D\d+)$/, id => { const d = DOCS.find(x => x.id === id); if (!d || (d.status === 'deleted' && !isAdmin())) return `<div class="forbid"><h1>المستند غير موجود</h1><a class="btn" href="#/docs">المستندات</a></div>`; return docHTML(d); },
  { after(id) { const d = DOCS.find(x => x.id === id); if (!d) return; bindDoc(d); runPipeline(d); } });

/* ---------- المستندات: تعديل ---------- */
route(/^\/docs\/(D\d+)\/edit$/, id => { const d = DOCS.find(x => x.id === id); if (!d) return '<div class="forbid"><h1>غير موجود</h1></div>';
  const body = d.sections.map(s => `# ${s.h}\n\n${s.ps.join('\n\n')}`).join('\n\n');
  return `<a class="crumb" href="#/docs/${d.id}">${svg(IC.back, 'ic-sm')} ${esc(d.title)}</a>
  <div class="form-card"><h2>تعديل المستند</h2><p class="lead">كل تعديل يُسجَّل باسمك مع القيمة قبل وبعد.</p>
  <form id="editdoc">
    <div class="field"><label for="type">النوع</label><select class="input" id="type">${Object.entries(TYPES).map(([k, l]) => `<option value="${k}" ${d.type === k ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
    <div class="field"><label for="title">العنوان</label><input class="input" id="title" value="${esc(d.title)}" required></div>
    <div class="field"><label for="desc">الوصف</label><input class="input" id="desc" value="${esc(d.desc)}"></div>
    <div class="field"><label for="body">النص</label><textarea class="input reading" id="body">${esc(body)}</textarea><span class="help">عنوان القسم يبدأ بـ# · الفقرات تُفصل بسطر فارغ.</span></div>
    ${d.att ? `<div class="field"><label>المرفق</label><div class="att">${svg(IC.file)}<span class="name">${esc(d.att.name)}</span><small class="num">${d.att.kind} · ${d.att.size}</small><button type="button" class="btn btn-ghost" data-action="swap-att">استبدل</button></div></div>` : ''}
    <div class="row end"><a class="btn btn-ghost" href="#/docs/${d.id}">إلغاء</a><button class="btn btn-primary" type="submit">${svg(IC.check, 'ic-sm')}احفظ التعديل</button></div>
  </form></div>`; }, { admin: true, after(id) { const d = DOCS.find(x => x.id === id); if (!d) return;
  $('[data-action="swap-att"]')?.addEventListener('click', () => toast('استبدال المرفق يعيد التفريغ — في النموذج غير مفعّل'));
  $('#editdoc').addEventListener('submit', e => { e.preventDefault(); const title = $('#title').value.trim(); if (!title) return; d.type = $('#type').value; d.title = title; d.desc = $('#desc').value.trim();
    const sections = []; let cur = null; $('#body').value.split(/\n\s*\n/).forEach(b => { const t = b.trim(); if (!t) return; if (t.startsWith('#')) { if (cur) sections.push(cur); cur = { h: t.replace(/^#+\s*/, ''), ps: [] }; } else { if (!cur) cur = { h: 'النص', ps: [] }; cur.ps.push(t); } }); if (cur) sections.push(cur);
    d.sections = sections; if (d.ext === 'failed' && sections.length) d.ext = 'manual'; S.seenPipeline.add(d.id); toast('حُفظ التعديل'); go('/docs/' + d.id); }); } });

/* ---------- المستخدمون ---------- */
function usersHTML() {
  const rows = USERS.map(u => { const pct = u.limit ? u.used / u.limit : 0; const self = u.id === S.me; const lastAdmin = u.role === 'admin' && u.status === 'active' && USERS.filter(x => x.role === 'admin' && x.status === 'active').length === 1;
    return `<tr class="${u.status === 'disabled' ? 'disabled' : ''}"><td><div class="u"><span class="avatar" aria-hidden="true">${esc(initials(u.name))}</span><span class="who"><span>${esc(u.name)}${self ? ' <small>(أنت)</small>' : ''}</span><small>${esc(u.email)}</small></span></div></td>
      <td><span class="badge ${u.role === 'admin' ? 'badge-accent' : 'badge-muted'}">${svg(u.role === 'admin' ? IC.shield : IC.eye)}${ROLES[u.role]}</span></td>
      <td>${u.status === 'active' ? `<span class="badge badge-ok">${svg(IC.check)}نشط</span>` : `<span class="badge badge-danger">${svg(IC.x)}معطَّل</span>`}</td>
      <td>${u.role === 'admin' ? `<div class="usage"><span class="num">${u.used} / ${u.limit} مستند هذا الشهر</span><div class="meter ${pct >= 1 ? 'full' : ''}"><i style="--pct:${Math.min(pct, 1)}"></i></div></div>` : '<span class="badge badge-muted">لا يستعمل المساعد</span>'}</td>
      <td class="num">${u.last}</td>
      <td class="actions"><button type="button" class="btn btn-ghost" data-edit="${u.id}">${svg(IC.edit, 'ic-sm')}<span class="lbl">تعديل</span></button><button type="button" class="btn btn-ghost" data-pw="${u.id}">${svg(IC.key, 'ic-sm')}<span class="lbl">كلمة سر مؤقتة</span></button>${u.status === 'active' ? `<button type="button" class="btn btn-ghost ${lastAdmin ? '' : 'btn-danger'}" data-disable="${u.id}" ${lastAdmin ? 'disabled title="المدير النشط الوحيد — لا يُعطَّل"' : ''}>${svg(IC.x, 'ic-sm')}<span class="lbl">تعطيل</span></button>` : `<button type="button" class="btn btn-ghost" data-enable="${u.id}">${svg(IC.undo, 'ic-sm')}<span class="lbl">تفعيل</span></button>`}</td></tr>`; }).join('');
  const admins = USERS.filter(u => u.role === 'admin').length;
  return `<div class="page-head"><h1>المستخدمون</h1><span class="cnt"><span class="num">${USERS.length}</span> مستخدمين · <span class="num">${admins}</span> مدير · <span class="num">${USERS.length - admins}</span> مُطالِع</span><span class="spacer"></span><button type="button" class="btn btn-primary" data-action="add-user">${svg(IC.plus, 'ic-sm')}إضافة مستخدم</button></div>
    <div class="overview"><div class="ov-head">${svg(IC.info, 'ic-sm')}الدوران</div><p><strong>المدير</strong> يضيف المستندات ويعدّلها ويحذفها ويدير المستخدمين والإعدادات ويستعمل المساعد الذكي ضمن حدّه الشهري. <strong>المُطالِع</strong> يبحث ويقرأ وينزّل المرفقات فقط.</p></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>المستخدم</th><th>الدور</th><th>الحالة</th><th>استهلاك المساعد</th><th>آخر دخول</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function userForm(u) { return `<div class="field"><label for="u-name">الاسم</label><input class="input" id="u-name" value="${esc(u?.name || '')}" required></div>
  <div class="field"><label for="u-email">البريد</label><input class="input" id="u-email" type="email" value="${esc(u?.email || '')}" required></div>
  <div class="field"><label>الدور</label><div class="choice"><label><input type="radio" name="u-role" value="admin" ${(!u || u.role === 'admin') ? 'checked' : ''}><strong>${svg(IC.shield)}مدير</strong><span>كل شيء</span></label><label><input type="radio" name="u-role" value="viewer" ${u?.role === 'viewer' ? 'checked' : ''}><strong>${svg(IC.eye)}مُطالِع</strong><span>قراءة وبحث فقط</span></label></div></div>
  <div class="field" id="u-limit-f"><label for="u-limit">حدّ المساعد الشهري (مستندات)</label><input class="input num" id="u-limit" type="number" min="0" value="${u ? u.limit : SETTINGS.defaultLimit}"><span class="help">سقف النظام <span class="num">${SETTINGS.cap}</span> يضبطه TheTeam؛ مجموع الحدود لا يتجاوزه.</span></div>
  ${u ? '' : `<div class="field"><label for="u-pw">كلمة سر مؤقتة</label><input class="input" id="u-pw" value="Qadi-${Math.random().toString(36).slice(2, 8)}" readonly><span class="help">يُجبَر على تغييرها عند أول دخول.</span></div>`}`; }
function bindUsers() {
  const openForm = (u) => { const d = dialog({ title: u ? 'تعديل مستخدم' : 'إضافة مستخدم', confirm: u ? 'احفظ' : 'أضف', body: `<form id="uform">${userForm(u)}</form>`, onConfirm() {
      const name = $('#u-name').value.trim(), email = $('#u-email').value.trim().toLowerCase(), role = $('input[name="u-role"]:checked').value, limit = +$('#u-limit').value || 0;
      if (!name || !email) { toast('الاسم والبريد مطلوبان'); return false; }
      if (USERS.some(x => x.email === email && x !== u)) { toast('البريد مسجَّل لمستخدم آخر'); return false; }
      const sum = USERS.filter(x => x !== u && x.role === 'admin').reduce((a, x) => a + x.limit, 0) + (role === 'admin' ? limit : 0); if (sum > SETTINGS.cap) { toast(`مجموع الحدود (${sum}) يتجاوز سقف النظام (${SETTINGS.cap})`); return false; }
      if (u && u.role === 'admin' && role === 'viewer' && USERS.filter(x => x.role === 'admin' && x.status === 'active').length === 1) { toast('هو المدير النشط الوحيد — لا يُخفَّض'); return false; }
      if (u) { Object.assign(u, { name, email, role, limit: role === 'admin' ? limit : 0 }); toast('حُفظ'); } else { USERS.push({ id: 'U' + (USERS.length + 1), name, email, role, status: 'active', limit: role === 'admin' ? limit : 0, used: 0, last: '—' }); toast('أُضيف المستخدم وأُرسلت كلمة السر المؤقتة'); }
      $('#main').innerHTML = usersHTML(); bindUsers(); } });
    const sync = () => { $('#u-limit-f', d).hidden = $('input[name="u-role"]:checked', d).value !== 'admin'; }; $$('input[name="u-role"]', d).forEach(r => r.onchange = sync); sync(); };
  $('[data-action="add-user"]').onclick = () => openForm(null);
  $$('[data-edit]').forEach(b => b.onclick = () => openForm(USERS.find(u => u.id === b.dataset.edit)));
  $$('[data-pw]').forEach(b => b.onclick = () => { const u = USERS.find(x => x.id === b.dataset.pw); dialog({ title: 'كلمة سر مؤقتة', confirm: 'عيّن وأرسل', body: `<p>تُعيَّن لـ<strong>${esc(u.name)}</strong> كلمة سر مؤقتة ويُجبَر على تغييرها عند أول دخول.</p><div class="att">${svg(IC.key)}<span class="name num">Qadi-${Math.random().toString(36).slice(2, 8)}</span></div>`, onConfirm() { toast(`عُيّنت كلمة سر مؤقتة لـ${u.name}`); } }); });
  $$('[data-disable]').forEach(b => b.onclick = () => { const u = USERS.find(x => x.id === b.dataset.disable); dialog({ title: 'تعطيل مستخدم', danger: true, confirm: 'عطّل', body: `<p>لن يستطيع <strong>${esc(u.name)}</strong> الدخول حتى يُفعَّل مجدداً. تبقى مستنداته وسجلّه.</p>`, onConfirm() { u.status = 'disabled'; if (u.id === S.me) { S.me = null; sessionStorage.removeItem('qadi-me'); go('/login'); return; } toast('عُطّل'); $('#main').innerHTML = usersHTML(); bindUsers(); } }); });
  $$('[data-enable]').forEach(b => b.onclick = () => { const u = USERS.find(x => x.id === b.dataset.enable); u.status = 'active'; toast('فُعّل'); $('#main').innerHTML = usersHTML(); bindUsers(); });
}
route(/^\/users$/, usersHTML, { admin: true, after: bindUsers });

/* ---------- الإعدادات ---------- */
function settingsHTML() {
  const sum = USERS.filter(u => u.role === 'admin').reduce((a, u) => a + u.limit, 0);
  return `<div class="page-head"><h1>الإعدادات</h1></div>
  <div class="settings-grid">
    <form class="box" id="s-general"><h2>عام</h2>
      <div class="field"><label for="org">اسم الجهة</label><input class="input" id="org" value="${esc(SETTINGS.org)}"></div>
      <div class="field"><label for="lang">لغة العرض</label><select class="input" id="lang"><option value="ar" selected>العربية</option><option value="en" disabled>English — بعد العقد</option></select></div>
      <div class="field"><label>المظهر</label><div class="row"><button type="button" class="btn" data-theme="light">فاتح</button><button type="button" class="btn" data-theme="dark">داكن</button></div></div>
      <div class="row end"><button class="btn btn-primary" type="submit">احفظ</button></div></form>
    <form class="box" id="s-ai"><h2>المساعد الذكي — حدّ الاستهلاك</h2>
      <div class="cap"><span>سقف النظام الشهري<br><small class="help">يضبطه TheTeam من خارج البوابة</small></span><strong class="num">${SETTINGS.cap}</strong></div>
      <div class="field" style="margin-top:var(--space-4)"><label>مجموع حدود المدراء</label><div class="usage"><span class="num">${sum} / ${SETTINGS.cap} · استُهلك هذا الشهر ${SETTINGS.capUsed}</span><div class="meter" style="width:100%"><i style="--pct:${Math.min(sum / SETTINGS.cap, 1)}"></i></div></div></div>
      <div class="field"><label for="unit">وحدة الحدّ</label><select class="input" id="unit"><option value="docs" selected>مستندات مُفرَّغة</option><option value="pages">صفحات</option></select><span class="help">يُصفَّر الاستهلاك أول كل شهر. الفاشل لا يُحتسب.</span></div>
      <div class="field"><label for="dlimit">الحدّ الافتراضي للمدير الجديد</label><input class="input num" id="dlimit" type="number" min="0" value="${SETTINGS.defaultLimit}"></div>
      <div class="row end"><button class="btn btn-primary" type="submit">احفظ</button></div></form>
    <div class="box"><h2>الحساب</h2>
      <dl class="kv"><dt>الاسم</dt><dd>${esc(me().name)}</dd><dt>البريد</dt><dd>${esc(me().email)}</dd><dt>الدور</dt><dd>${ROLES[me().role]}</dd></dl>
      <div class="row" style="margin-top:var(--space-4)"><a class="btn" href="#/reset/new">${svg(IC.key, 'ic-sm')}غيّر كلمة السر</a><button type="button" class="btn btn-ghost" data-action="logout">${svg(IC.logout, 'ic-sm')}خروج</button></div></div>
    <div class="box"><h2>بعد العقد</h2><p class="help" style="margin:0 0 var(--space-3)">تُفعَّل من هنا عند توقيع العقد:</p><div class="row"><span class="badge badge-muted">البحث بالمعنى</span><span class="badge badge-muted">ربط MCP</span><span class="badge badge-muted">النسخ الاحتياطي</span><span class="badge badge-muted">سجل الأحداث</span></div></div>
  </div>`;
}
route(/^\/settings$/, settingsHTML, { admin: true, after() {
  $('#s-general').addEventListener('submit', e => { e.preventDefault(); SETTINGS.org = $('#org').value.trim() || SETTINGS.org; toast('حُفظت الإعدادات'); });
  $('#s-ai').addEventListener('submit', e => { e.preventDefault(); SETTINGS.defaultLimit = +$('#dlimit').value || 0; SETTINGS.unit = $('#unit').value; toast('حُفظ حدّ الاستهلاك'); });
  $$('[data-theme]').forEach(b => b.onclick = () => setTheme(b.dataset.theme === 'dark'));
} });

/* ---------- أحداث عامة ---------- */
document.addEventListener('click', e => {
  const a = e.target.closest('[data-action]'); if (!a) return;
  if (a.dataset.action === 'theme') setTheme(document.documentElement.dataset.theme !== 'dark');
  if (a.dataset.action === 'logout') { S.me = null; try { sessionStorage.removeItem('qadi-me'); } catch (x) {} go('/login'); }
});
document.addEventListener('keydown', e => { if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && $('#q')) { e.preventDefault(); $('#q').focus(); } });

window.PORTAL = { S, USERS, DOCS, SETTINGS, go, render };
render();
})();
