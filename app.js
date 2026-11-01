// Fit the 375 x 812 design frame to the viewport by scaling it, never by changing its layout.
const root = document.documentElement;
(function () {
  const W = 375, H = 812;
  function fit() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const phone = vw <= 520 && matchMedia('(pointer: coarse), (max-width: 520px)').matches;
    root.classList.toggle('phone', phone);
    if (phone) root.style.setProperty('--s', vw / W);      // full width, page scrolls natively
    else root.style.setProperty('--s', Math.min(1, (vh - 48) / (H + 20), (vw - 48) / (W + 20)));
  }
  fit(); addEventListener('resize', fit);
})();

// ---------- navigation: Manage Family -> Prepaid (Harshit) -> Recharge success -> back to Manage Family
const screens = { family: document.getElementById('family'), prepaid: document.getElementById('prepaid'), flow: document.getElementById('flow'), success: document.getElementById('success') };
let current = 'family', successTimer;
function scrollerOf(id) { return root.classList.contains('phone') ? null : screens[id].querySelector('.scroll'); }
function go(id, how) {
  if (id === current) return;
  const from = screens[current], to = screens[id];
  from.classList.remove('active', 'in-right', 'in-left', 'in-fade', 'play');
  to.classList.remove('in-right', 'in-left', 'in-fade', 'play');
  to.classList.add('active');
  void to.offsetWidth;
  to.classList.add(how === 'back' ? 'in-left' : how === 'fade' ? 'in-fade' : 'in-right');
  const sc = scrollerOf(id); if (sc) sc.scrollTop = 0; else scrollTo(0, 0);
  current = id;
  clearTimeout(successTimer);
  if (id === 'flow' && window.Flow) window.Flow.enter(1);
  if (id === 'success') {
    to.classList.add('play');
    successTimer = setTimeout(() => go('family', 'fade'), 2600);
  }
}

// label -> where it goes
const routes = [
  { screen: 'family', match: t => t.startsWith('Pack Expired'), to: 'flow' },
  { screen: 'family', match: t => t === 'Repeat Recharge', to: 'flow' },
  { screen: 'family', match: t => t.startsWith('Harshit') && t.includes('199'), to: 'flow' },
  { screen: 'prepaid', match: t => /^Recharge ₹/.test(t) || t === 'Buy', to: 'success' },
];

// ---------- tap feedback (found by label; the design's styling is untouched)
function boxOf(el, stop) {   // nearest ancestor that paints a button/card
  for (let e = el; e && e !== stop; e = e.parentElement) {
    if (e.closest('.offers') && e.parentElement && e.parentElement.parentElement === e.closest('.offers')) return e;
    const c = e.getAttribute('class') || '';
    if (/(^|\s)(bg-|rounded)/.test(c) && e.offsetWidth > 40 && getComputedStyle(e).position !== 'absolute'
        || /rounded/.test(c) && /(^|\s)(bg-|border)/.test(c) && e.offsetWidth > 40) return e;
  }
}
const labels = ['Add member', 'Repeat Recharge', 'Add Now', 'View all', 'Track Request', 'Add family member',
  'Poornima (You)', 'Harshit', '014547154467_dsl', 'Having an issue?', 'Recharge ₹', 'Buy', 'Pack Details'];
Object.entries(screens).forEach(([id, sec]) => {
  if (id === 'flow') return;               // flow.js handles its own input
  const hidden = !sec.classList.contains('active');
  if (hidden) sec.style.cssText = 'display:block;visibility:hidden';   // measure hidden screens too
  const frame = sec.querySelector('.fh > div');                          // never treat the whole screen as a button
  sec.querySelectorAll('p').forEach(p => {
    const t = p.textContent.trim().replace(/\s+/g, ' ');
    const route = routes.find(r => r.screen === id && r.match(t));
    if (!route && !labels.some(l => t.startsWith(l))) return;
    const b = boxOf(p, frame); if (!b) return;
    b.classList.add('tap');
    if (route && !b.dataset.go) b.dataset.go = route.to;
  });
  if (hidden) sec.style.cssText = '';
});
document.querySelectorAll('.offers > :last-child > *').forEach(c => c.classList.add('tap'));

// floating labels on the family map live in display:contents groups: press-scale their children around the group centre
screens.family.querySelectorAll('p').forEach(p => {
  const t = p.textContent.trim().replace(/\s+/g, ' ');
  if (!/^(Pack Expired.*|Poornima \(you\)|014547154467_dsl|Harshit)$/.test(t)) return;
  const g = p.parentElement.parentElement;
  if (getComputedStyle(g).display !== 'contents' || g.closest('.tap')) return;
  const route = routes.find(r => r.screen === 'family' && r.match(t));
  if (route) g.dataset.go = route.to;
  const kids = [...g.children];
  kids.forEach(k => { k.style.transition = 'scale .16s cubic-bezier(.2,.8,.2,1)'; k.style.cursor = 'pointer'; });
  const press = on => {
    if (!on) return kids.forEach(k => k.style.scale = '');
    const rs = kids.map(k => k.getBoundingClientRect());
    const cx = (Math.min(...rs.map(r => r.left)) + Math.max(...rs.map(r => r.right))) / 2;
    const cy = (Math.min(...rs.map(r => r.top)) + Math.max(...rs.map(r => r.bottom))) / 2;
    const s = parseFloat(getComputedStyle(root).getPropertyValue('--s')) || 1;
    kids.forEach((k, i) => { k.style.transformOrigin = ((cx - rs[i].left) / s) + 'px ' + ((cy - rs[i].top) / s) + 'px'; k.style.scale = '.94'; });
  };
  kids.forEach(k => k.addEventListener('pointerdown', () => press(true)));
  addEventListener('pointerup', () => press(false)); addEventListener('pointercancel', () => press(false));
});

const dev = document.getElementById('device');
dev.addEventListener('pointerdown', e => { const t = e.target.closest('.tap'); if (t) t.classList.add('down'); });
['pointerup', 'pointercancel'].forEach(n => addEventListener(n, () => dev.querySelectorAll('.tap.down').forEach(t => t.classList.remove('down'))));
dev.addEventListener('click', e => {
  const t = e.target.closest('[data-go]'); if (!t) return;
  e.preventDefault();
  const to = t.dataset.go;
  if (to === 'back') go('family', 'back'); else go(to, to === 'flow' ? 'fade' : undefined);
});
screens.success.addEventListener('click', () => go('family', 'fade'));

// success animation hooks
const halo = screens.success.querySelector('img[src$="imgEllipse18997.svg"]');
const check = screens.success.querySelector('img[src$="imgCheckCircle.svg"]');
if (halo) halo.parentElement.classList.add('halo');
if (check) { check.parentElement.classList.add('tick'); const disc = screens.success.querySelector('[style*="rgb(1, 101, 40)"]'); if (disc) disc.classList.add('tick'); }

// recharge flow hooks (flow.js)
window.flowExit = () => go('family', 'fade');
window.flowPaid = () => go('success', 'fade');
