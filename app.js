// Fit the 375 x 812 design frame to the viewport by scaling it, never by changing its layout.
(function () {
  const root = document.documentElement, W = 375, H = 812;
  function fit() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const phone = vw <= 520 && matchMedia('(pointer: coarse), (max-width: 520px)').matches;
    root.classList.toggle('phone', phone);
    if (phone) {               // full width, page scrolls natively
      root.style.setProperty('--s', vw / W);
    } else {                   // desktop: whole 375 x 812 frame visible
      root.style.setProperty('--s', Math.min(1, (vh - 48) / (H + 20), (vw - 48) / (W + 20)));
      root.style.setProperty('--dh', H + 'px');
    }
  }
  fit(); addEventListener('resize', fit);
})();

// Tap feedback on the design's buttons and tappable cards (found by their label, styling untouched).
(function () {
  const labels = [ 'Add member', 'Repeat Recharge', 'Add Now', 'View all', 'Track Request', 'Add family member',
    'Poornima (You)', 'Harshit', '014547154467_dsl', 'Having an issue?'];
  const screen = document.getElementById('screen');
  const boxOf = el => {   // nearest ancestor that paints a button/card (background or rounded corners)
    for (let e = el; e && e !== screen; e = e.parentElement) {
      if (e.closest('.offers') && e.parentElement && e.parentElement.parentElement === e.closest('.offers')) return e;
      const c = e.getAttribute('class') || '';
      if (/(^|\s)(bg-|rounded)/.test(c) && e.offsetWidth > 40 && getComputedStyle(e).position !== 'absolute' || /rounded/.test(c) && /(^|\s)(bg-|border)/.test(c) && e.offsetWidth > 40) return e;
    }
  };
  const seen = new Set();
  screen.querySelectorAll('p').forEach(p => {
    const t = p.textContent.trim();
    if (!labels.some(l => t.startsWith(l))) return;
    const b = boxOf(p); if (b && !seen.has(b)) { seen.add(b); b.classList.add('tap'); }
  });
  // floating labels on the family map live in display:contents groups: press-scale their children around the group centre
  const groups = [];
  screen.querySelectorAll('p').forEach(p => {
    const t = p.textContent.trim();
    if (!/^(Pack Expired|Poornima \(you\)|014547154467_dsl|Harshit)$/.test(t) && !t.startsWith('Pack Expired')) return;
    const g = p.parentElement.parentElement;
    if (getComputedStyle(g).display === 'contents' && !g.closest('.tap')) groups.push(g);
  });
  groups.forEach(g => {
    g.dataset.tapgroup = '';
    const kids = [...g.children];
    kids.forEach(k => k.style.transition = 'scale .16s cubic-bezier(.2,.8,.2,1)');
    const press = on => {
      if (on) {
        const rs = kids.map(k => k.getBoundingClientRect());
        const cx = (Math.min(...rs.map(r => r.left)) + Math.max(...rs.map(r => r.right))) / 2;
        const cy = (Math.min(...rs.map(r => r.top)) + Math.max(...rs.map(r => r.bottom))) / 2;
        const s = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--s')) || 1);
        kids.forEach((k, i) => { k.style.transformOrigin = ((cx - rs[i].left) / s) + 'px ' + ((cy - rs[i].top) / s) + 'px'; k.style.scale = '.94'; });
      } else kids.forEach(k => k.style.scale = '');
    };
    kids.forEach(k => { k.style.cursor = 'pointer'; k.addEventListener('pointerdown', () => press(true)); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(n => g.addEventListener(n, () => press(false), true));
    addEventListener('pointerup', () => press(false));
  });
  // offers cards
  document.querySelectorAll('.offers > :last-child > *').forEach(c => c.classList.add('tap'));
  screen.addEventListener('pointerdown', e => { const t = e.target.closest('.tap'); if (t) t.classList.add('down'); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(n => screen.addEventListener(n, () => screen.querySelectorAll('.tap.down').forEach(t => t.classList.remove('down')), true));
})();
