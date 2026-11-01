// Recharge flow: contact dial (aperture) -> packs (card stack) -> quick pay, plus enter number, phonebook, bank offers.
// Every layer is a Figma layer at its Figma position; this file only moves/fades them. One render() reads the state below.
(function () {
  const stage = document.getElementById('flowStage');
  if (!stage) return;
  const $ = (s, r = stage) => r.querySelector(s), $$ = (s, r = stage) => [...r.querySelectorAll(s)];
  const Lr = {}; $$('.L').forEach(l => Lr[l.id.slice(2)] = l);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v)), lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => 1 - Math.pow(1 - t, 3), easeIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // ---------------------------------------------------------------- haptics
  // Android: Vibration API. iOS Safari 18+: toggling a <input switch> fires the system haptic (needs a user gesture).
  const hapt = (() => {
    const lab = document.createElement('label'), inp = document.createElement('input');
    inp.type = 'checkbox'; inp.setAttribute('switch', ''); lab.appendChild(inp);
    lab.style.cssText = 'position:fixed;left:-200px;top:0;width:1px;height:1px;opacity:0;pointer-events:none';
    document.body.appendChild(lab);
    let last = 0;
    return kind => {
      const now = performance.now(); if (now - last < 28) return; last = now;
      if (navigator.vibrate) navigator.vibrate(kind === 'snap' ? [14] : kind === 'heavy' ? [22] : [6]);
      else try { lab.click(); } catch (e) {}
    };
  })();

  // ---------------------------------------------------------------- data
  const IMG = 'assets/flow/dial/';
  const contacts = [
    { pad: true },
    { name: 'Harshit', num: '9864309723', img: IMG + 'imgScreenshot20260603At110441Am2.png', crop: [120.4, 107.7, -15, -1.5] },
    { name: 'Sapna', num: '986430987823', img: IMG + 'imgScreenshot20260603At110626Am2.png', crop: [128.3, 105.8, -18.6, -2.9] },
    { name: 'Simranpreet', num: '9864309723', img: IMG + 'imgScreenshot20260603At105729Am1.png', crop: [137.4, 123.9, -13.1, 0] },
  ];
  const packs = [
    { price: 399, data: '2.5 GB data • 28 days validity' }, { price: 199, data: '1.5 GB/day • 28 days validity' },
    { price: 449, data: '4 GB/day • 28 days validity' }, { price: 299, data: '1.5 GB/day • 28 days validity' },
    { price: 349, data: '1.5 GB/day • 28 days validity' }, null,
  ];

  // ---------------------------------------------------------------- state (all animated values live here)
  const S = { p: 1, pk: 0, kb: 0, bk: 0, bank: 0, quick: 0, intro: 1, c: 0, cardDrag: 0, num123: 0, spin: 0 };
  let typed = '98765433456', query = '', kbMode = 'abc', packIdx = 1;
  const anims = {};
  function tween(key, to, dur = 450, fn = ease, done) {
    const from = S[key], t0 = performance.now();
    if (dur <= 0 || from === to) { S[key] = to; anims[key] = null; done && done(); return; }
    anims[key] = { from, to, t0, dur, fn, done };
    kick();
  }
  // critically-damped spring for the dial index (feels like a detent)
  let springTo = null, vel = 0;
  function springP(to) { springTo = to; kick(); }
  let raf = 0;
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }
  let lastT = performance.now();
  function frame(t) {
    raf = 0; const dt = Math.min(.05, (t - lastT) / 1000); lastT = t;
    let busy = false;
    for (const k in anims) {
      const a = anims[k]; if (!a) continue;
      const u = clamp((t - a.t0) / a.dur, 0, 1); S[k] = lerp(a.from, a.to, a.fn(u));
      if (u >= 1) { anims[k] = null; a.done && a.done(); } else busy = true;
    }
    if (springTo !== null) {
      const k = 170, d = 2 * Math.sqrt(k) * .92;
      vel += (-(S.p - springTo) * k - vel * d) * dt; S.p += vel * dt;
      if (Math.abs(S.p - springTo) < .0015 && Math.abs(vel) < .01) { S.p = springTo; springTo = null; vel = 0; settled(); }
      else busy = true;
    }
    // aperture blades relax back after the dial moves
    S.spin *= Math.pow(.0009, dt); if (Math.abs(S.spin) > .05) busy = true; else S.spin = 0;
    render();
    if (busy) kick();
  }

  // ---------------------------------------------------------------- avatars
  const avWrap = Lr.avatars;
  const avs = contacts.map((c, i) => {
    const el = document.createElement('div'); el.className = 'av'; el.dataset.i = i;
    if (c.pad) {
      el.innerHTML = `<div class="av-bg"></div><img class="av-ring" alt="" src="${IMG}imgE1.svg"><div class="av-padc"><svg viewBox="0 0 30 38"><g fill="#000">${[0, 1, 2].map(r => [0, 1, 2].map(k => `<circle cx="${4 + k * 11}" cy="${4 + r * 10}" r="3.1"/>`).join('')).join('')}<circle cx="15" cy="34" r="3.1"/></g></svg></div>`;
    } else {
      const [w, h, l, tp] = c.crop;
      el.innerHTML = `<div class="av-bg"></div><img class="av-ring" alt="" src="${IMG}imgE1.svg"><div class="av-photo"><img alt="" src="${c.img}" style="width:${w}%;height:${h}%;left:${l}%;top:${tp}%"></div>`;
    }
    avWrap.appendChild(el); return el;
  });
  // arc slots (centre x, centre y, size) from the Figma frames: d = -2 .. 2
  const SLOTS = [[-1, 464.2, 64], [76, 418.5, 64], [187, 373.5, 124], [300, 418.5, 64], [378.7, 462, 64]];
  function slot(d) {
    const x = clamp(d + 2, -1, 5);
    if (x <= 0) return [SLOTS[0][0] + x * 80, SLOTS[0][1] + -x * 40, 64];
    if (x >= 4) return [SLOTS[4][0] + (x - 4) * 80, SLOTS[4][1] + (x - 4) * 40, 64];
    const i = Math.floor(x), f = x - i, a = SLOTS[i], b = SLOTS[Math.min(4, i + 1)];
    const g = easeIO(f);
    return [lerp(a[0], b[0], f), lerp(a[1], b[1], g), lerp(a[2], b[2], g)];
  }
  const PACK_AV = [187.9, 759.9, 54];

  // ---------------------------------------------------------------- name slots
  const slots = $$('#L-name .nm-slot');
  function setSlot(el, i) {
    if (el._i === i) return; el._i = i;
    const c = contacts[i];
    el.querySelector('.nm-name').textContent = c.pad ? typed : c.name;
    el.querySelector('.nm-num').textContent = c.pad ? '' : c.num;
  }

  // ---------------------------------------------------------------- cards
  const cards = $$('.card');
  const N = cards.length;
  const dotsP = $$('#L-dots p').find(p => /\d\/6/.test(p.textContent));

  // ---------------------------------------------------------------- render
  const st = (el, o, tr, extra) => { if (!el) return; el.style.opacity = o; el.style.transform = tr || ''; if (extra) Object.assign(el.style, extra); };
  const pill = $('.hdr-pill'), apw = $('.apw'), aprs = $$('.apr');
  const tg = $('.tg'), pbMode = $('.bk-mode');
  let lastRot = 0, tickAcc = 0;

  function render() {
    const { p, pk, kb, bk, bank, quick, intro } = S;
    const e = clamp(1 - p, 0, 1);             // how far we are on the dial-pad (Enter Number) item
    const tgv = Math.max(e, bk);               // header shows the Enter Number | Phonebook toggle
    const it = intro, d1 = 1 - pk;
    const rise = (1 - ease(clamp(it * 1.25 - .2, 0, 1))) * 240;   // intro: dial rises from the bottom

    // header
    st(Lr.hdr, (1 - tgv) * d1, `translateY(${-8 * pk}px) scale(${1 - .04 * tgv})`, { transformOrigin: '187px 80px' });
    if (pill) pill.style.opacity = clamp(it * 2 - 1, 0, 1);
    st(Lr.toggle, tgv * d1, `scale(${.94 + .06 * tgv})`, { transformOrigin: '160px 80px' });
    st(Lr.cross, tgv * d1, `rotate(${(1 - tgv) * -90}deg)`, { transformOrigin: '338.75px 79.8px' });
    if (tg) { tg.dataset.on = bk > .5 ? 'book' : 'enter'; $('.tg-knob', tg).style.left = (3 + 139 * bk) + 'px'; }

    // contact name (cross-fade with blur as the dial turns) and packs header name
    const i0 = clamp(Math.floor(p), 0, contacts.length - 1), i1 = clamp(i0 + 1, 0, contacts.length - 1), f = clamp(p - i0, 0, 1);
    setSlot(slots[0], i0); setSlot(slots[1], i1);
    const nameO = d1 * clamp(it * 2 - .6, 0, 1);
    slots.forEach((el, k) => {
      const w = k ? f : 1 - f;
      el.style.opacity = nameO * clamp((w - .25) * 2, 0, 1);
      el.style.filter = `blur(${(1 - w) * 6}px)`;
      el.style.transform = `translateX(${(k ? 1 - f : -f) * 14}px)`;
    });
    st(Lr.name, 1, `translateY(${-92 * pk}px) scale(${1 - .333 * pk})`, { transformOrigin: '188px 192px' });
    st(Lr.pname, pk, `translateY(${92 * d1}px) scale(${1 + .5 * d1})`, { transformOrigin: '188px 97px' });
    st(Lr.rel, (1 - e) * d1 * clamp(it * 2 - .8, 0, 1), '');

    // dial body
    const down = `translateY(${260 * pk + rise}px)`;
    ['big1', 'big2', 'fade', 'needle'].forEach(k => st(Lr[k], d1, down));
    st(Lr.tap, d1, `translateY(${60 * pk + rise}px)`); st(Lr.hint, d1, `translateY(${60 * pk + rise}px)`);
    st(Lr.glow, d1 * clamp(it * 2 - 1, 0, 1), '');

    // aperture: dial rotates 22.5deg per contact; the four rings fan out with the motion and settle back together
    const rot = -(p - 1) * 22.5;
    st(Lr.ap, 1, `translate(${1.6 * pk}px, ${273.5 * pk + rise}px)`);
    if (apw) apw.style.transform = `rotate(${rot}deg)`;
    aprs.forEach((r, k) => r.style.transform = `rotate(${S.spin * (k - 1.5) * 1.4}deg) scale(${1 + Math.abs(S.spin) * .0018 * (k + 1)})`);
    // a detent click every 7.5deg that passes the needle
    tickAcc += rot - lastRot; lastRot = rot;
    if (Math.abs(tickAcc) >= 7.5) { tickAcc %= 7.5; if (dragging) hapt('tick'); }

    // avatars
    avs.forEach((el, i) => {
      let [x, y, s] = slot(i - p);
      if (contacts[i].pad) { const w = clamp(1 - Math.abs(i - p + 1), 0, 1); x = lerp(x, 72.1, w); y = lerp(y, 404.3, w); }  // Figma parks the pad a bit higher
      const cen = clamp(1 - Math.abs(i - p), 0, 1);
      let o = clamp(1.6 - Math.abs(i - p) * .45, 0, 1) * clamp(it * 1.6 - .3, 0, 1);
      const isC = Math.round(p) === i;
      if (pk > 0) {
        if (isC) { x = lerp(x, PACK_AV[0], pk); y = lerp(y, PACK_AV[1], pk); s = lerp(s, PACK_AV[2], pk); }
        else o *= d1;
      }
      const k = s / 124;
      el.style.transform = `translate(${x - s / 2}px, ${y - s / 2}px) scale(${k})`;
      el.style.opacity = o;
      el.style.zIndex = Math.round(10 + cen * 10);
      const ring = el.querySelector('.av-ring'), bg = el.querySelector('.av-bg');
      const ringO = isC && pk > 0 ? 1 : cen;
      ring.style.opacity = ringO; bg.style.opacity = 1 - ringO;
      const inset = lerp(4.7 / 64, 5 / 124, ringO) * 124;
      const ph = el.querySelector('.av-photo') || el.querySelector('.av-padc');
      ph.style.left = ph.style.top = inset + 'px'; ph.style.width = ph.style.height = (124 - inset * 2) + 'px';
      el.style.boxShadow = ringO > .5 ? '' : `0 ${4}px ${10}px rgba(78,96,140,${.18 * (1 - ringO)})`;
      el.style.pointerEvents = (pk > .5 && !isC) || o < .2 ? 'none' : '';
    });

    // packs
    st(Lr.pfees, pk, `translateY(${16 * d1}px)`); st(Lr.dots, pk, `translateY(${16 * d1}px)`);
    st(Lr.tabs, 1, `translateX(${370 * d1}px)`);
    st(Lr.pback, pk, ''); st(Lr.psearch, pk, '');
    st(Lr.cards, pk, `translate(${1.2 * d1}px, ${-46.5 * d1}px) scale(${.36 + .64 * pk})`, { transformOrigin: '187.5px 415px' });
    renderCards();

    // keyboards, phonebook
    const numShow = Math.max(kb * e * d1, bk * S.num123);
    st(Lr.numkb, 1, `translateY(${(1 - numShow) * 100}%)`);
    st(Lr.alphakb, 1, `translateY(${(1 - bk * (1 - S.num123)) * 100}%)`);
    st(Lr.book, 1, `translateY(${(1 - bk) * 720}px)`);

    // sheets
    const sc = Math.max(bank, quick);
    st(Lr.scrim, sc, '', { backdropFilter: `blur(${14 * sc}px)`, webkitBackdropFilter: `blur(${14 * sc}px)`, background: `rgba(238,244,255,${.35 * sc})` });
    st(Lr.bank, 1, `translateY(${-779.96 * bank}px)`);
    st(Lr.quick, 1, `translateY(${-450 * quick}px)`);

    // only what is visible can be touched
    const vis = { hdr: (1 - tgv) * d1 > .5, toggle: tgv * d1 > .5, cross: tgv * d1 > .5, needle: d1 > .5, pback: pk > .5, psearch: pk > .5, tabs: pk > .5,
      cards: pk > .5, book: bk > .5, numkb: numShow > .5, alphakb: bk * (1 - S.num123) > .5, scrim: sc > .1, bank: bank > .5, quick: quick > .5 };
    for (const k in vis) Lr[k] && (Lr[k].inert = !vis[k]);
  }

  function renderCards() {
    const c = S.c + S.cardDrag;
    cards.forEach((el, i) => {
      let d = ((i - c) % N + N) % N; if (d > N / 2) d -= N;   // circular: -3 .. 3
      let tr, o = 1, cv = 1, z;
      if (d < 0) {                       // swiped away to the left, tilted (Figma: x -452, rotated 15deg)
        const u = clamp(-d, 0, 1);
        tr = `translate(${-440 * u}px, ${30 * u}px) rotate(${-15 * u}deg)`; o = d < -1 ? 0 : 1; z = 30 - Math.round(-d * 4);
      } else {                           // stacked behind: narrower plates peeking 11-12px below
        const u = Math.min(d, 2.4);
        tr = `translateY(${11.5 * u}px) scaleX(${1 - .078 * u})`; cv = clamp(1 - d * 1.4, 0, 1);
        o = d > 2.4 ? 0 : 1; z = 20 - Math.round(d * 4);
      }
      el.style.transform = tr; el.style.opacity = o; el.style.zIndex = z; el.style.setProperty('--c', cv);
      el.style.pointerEvents = Math.abs(d) < .5 ? '' : 'none';
    });
    const idx = ((Math.round(S.c) % N) + N) % N;
    if (dotsP) dotsP.textContent = `${idx + 1}/6`;
  }

  // ---------------------------------------------------------------- modes
  function settled() {
    const i = Math.round(S.p);
    hapt('snap');
    if (i === 0 && S.kb < .5 && !S._kbClosedByUser) tween('kb', 1, 380, ease);
    if (i !== 0) S._kbClosedByUser = false;
  }
  function goIndex(i) { i = clamp(i, 0, contacts.length - 1); if (i !== 0 && S.kb > 0) tween('kb', 0, 260); springP(i); }
  function current() { const c = contacts[Math.round(S.p)]; return c.pad ? { name: typed, num: typed } : c; }
  function openPacks() {
    const c = current();
    $('.pn-name').textContent = c.name; $('.pn-num').textContent = '+91 ' + c.num;
    S.c = Math.round(S.c / N) * N;     // start on the first card (₹399)
    if (S.kb > 0) tween('kb', 0, 250);
    hapt('heavy'); tween('pk', 1, 620, easeIO);
  }
  function closePacks() { hapt('tick'); tween('pk', 0, 560, easeIO); }
  function openBook() { if (S.pk > .5) tween('pk', 0, 400, easeIO); hapt('tick'); tween('bk', 1, 480, ease); }
  function closeBook(toEnter) {
    tween('bk', 0, 420, ease);
    if (toEnter) { springP(0); tween('kb', 1, 420); } else if (Math.round(S.p) === 0) goIndex(1);
  }
  function setKb(mode) {
    kbMode = mode; pbMode.dataset.on = mode;
    tween('num123', mode === '123' ? 1 : 0, 300, ease);
  }
  function openSheet(which) { hapt('tick'); tween(which, 1, 520, t => 1 - Math.pow(1 - t, 4)); }
  function closeSheets() { if (S.bank > 0) tween('bank', 0, 380, ease); if (S.quick > 0) tween('quick', 0, 380, ease); }

  // quick pay texts follow the selected pack and contact
  const qp = {}; $$('#L-quick p').forEach(p => {
    const t = p.textContent.trim();
    if (t === '₹399') qp.price = p; else if (t === 'Pay ₹399') qp.pay = p; else if (/^Prepaid/.test(t)) qp.who = p; else if (/validity$/.test(t)) qp.data = p;
  });
  function openQuick(i) {
    const pk = packs[i] || packs[0], c = current();
    if (qp.price) qp.price.textContent = '₹' + pk.price; if (qp.pay) qp.pay.textContent = 'Pay ₹' + pk.price;
    if (qp.who) qp.who.textContent = 'Prepaid • ' + c.num; if (qp.data) qp.data.textContent = pk.data;
    openSheet('quick');
  }
  // sheet controls found by their Figma content
  const bankRoot = Lr.bank.firstElementChild, quickRoot = Lr.quick.firstElementChild;
  bankRoot.firstElementChild.dataset.act = 'close-sheet'; quickRoot.firstElementChild.dataset.act = 'close-sheet';
  const byText = (root, t) => { const p = $$('p', root).find(x => x.textContent.trim() === t); let e = p; while (e && e !== root && !/(^|\s)(bg-|border)/.test(e.getAttribute('class') || '')) e = e.parentElement; return e; };
  const more = byText(Lr.quick, 'More Options'), pay = byText(Lr.quick, 'Pay ₹399');
  if (more) more.dataset.act = 'close-sheet'; if (pay) pay.dataset.act = 'confirm-pay';

  // ---------------------------------------------------------------- keypad + keyboard
  const numKeys = $$('#L-numkb p').filter(p => /^\d$/.test(p.textContent.trim()));
  numKeys.forEach(p => {
    let k = p; while (k.parentElement && !/rounded/.test(k.getAttribute('class') || '')) k = k.parentElement;
    k.dataset.key = p.textContent.trim(); k.style.pointerEvents = 'auto';
  });
  const del = $('#L-numkb svg'); if (del) { const k = del.closest('div'); k.dataset.key = 'del'; k.style.pointerEvents = 'auto'; }
  function typeDigit(k) {
    if (S.bk > .5) { // phonebook in 123 mode types into search
      query = k === 'del' ? query.slice(0, -1) : (query + k).slice(0, 14); filterBook(); return;
    }
    typed = k === 'del' ? typed.slice(0, -1) : (typed.length >= 12 ? typed : typed + k);
    slots.forEach(s => s._i = -1); render();
  }
  function filterBook() {
    $('.bk-ph').style.display = query ? 'none' : ''; $('.bk-text').textContent = query;
    const q = query.toLowerCase(); let n = 0;
    $$('.bk-row').forEach(r => { const ok = !q || r.dataset.name.toLowerCase().includes(q) || r.dataset.num.includes(q); r.style.display = ok ? '' : 'none'; n += ok; });
    $('.bk-empty').classList.toggle('hidden', n > 0);
  }

  // ---------------------------------------------------------------- input
  let dragging = false, down = null, moved = false, dragKind = null, vx = 0, lastX = 0, lastMoveT = 0, p0 = 0;
  const local = ev => { const r = stage.getBoundingClientRect(), k = r.width / 375; return [(ev.clientX - r.left) / k, (ev.clientY - r.top) / k, k]; };
  stage.addEventListener('pointerdown', ev => {
    const [x, y] = local(ev);
    down = { x, y, t: performance.now(), target: ev.target }; moved = false; dragKind = null;
    const act = ev.target.closest('[data-act], [data-key], [data-k], [data-kb], .bk-row, .av, .card-cta, .kb-key');
    if (act) act.classList.add('press');
    const sheetOpen = S.bank > .1 || S.quick > .1;
    if (!sheetOpen && S.bk < .5 && S.pk < .5 && y > 250 && y < 660 && !(S.kb > .5 && Math.round(S.p) === 0 && y > 524)) dragKind = 'dial';
    if (!sheetOpen && S.pk > .5 && y > 200 && y < 640) dragKind = 'card';
    lastX = x; lastMoveT = down.t; vx = 0; p0 = S.p;
  });
  stage.addEventListener('pointermove', ev => {
    if (!down) return;
    const [x, y] = local(ev), dx = x - down.x, dy = y - down.y, now = performance.now();
    if (!moved && Math.hypot(dx, dy) > 6) {
      moved = true; $$('.press').forEach(e => e.classList.remove('press'));
      if (Math.abs(dy) > Math.abs(dx) * 1.2 && dragKind !== 'card') dragKind = null;
      if (dragKind) { dragging = true; try { stage.setPointerCapture(ev.pointerId); } catch (e) {} springTo = null; }
    }
    if (dragging) {
      const ddt = Math.max(1, now - lastMoveT); vx = lerp(vx, (x - lastX) / ddt, .35); lastX = x; lastMoveT = now;
      if (dragKind === 'dial') {
        let np = p0 - dx / 113;
        if (np < 0) np = -Math.pow(-np, .6) * .35; if (np > contacts.length - 1) np = contacts.length - 1 + Math.pow(np - contacts.length + 1, .6) * .35;
        S.spin = clamp(S.spin + (np - S.p) * 60, -14, 14);
        S.p = np;
      } else if (dragKind === 'card') S.cardDrag = -dx / 440;
      kick();
    }
  });
  const end = ev => {
    if (!down) return;
    $$('.press').forEach(e => e.classList.remove('press'));
    if (dragging) {
      if (dragKind === 'dial') {
        // one contact per swipe, like the reference: a short flick or a drag past ~1/3 of a slot moves one step
        const start = Math.round(p0), moved = S.p - p0, fl = -vx;
        const step = (moved > .3 || fl > .35) ? 1 : (moved < -.3 || fl < -.35) ? -1 : 0;
        goIndex(clamp(start + step, 0, contacts.length - 1));
      } else if (dragKind === 'card') {
        const dir = S.cardDrag + (-vx * .25);
        const step = dir > .14 ? 1 : dir < -.14 ? -1 : 0;
        const base = Math.round(S.c), from = S.c + S.cardDrag;
        S.cardDrag = 0; S.c = from;
        tween('c', base + step, 420, t => 1 - Math.pow(1 - t, 3));
        if (step) hapt('snap');
      }
    } else if (ev.type === 'pointerup' && !moved) tap(down.target);
    dragging = false; down = null; dragKind = null;
  };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);

  function tap(target) {
    const a = target.closest('[data-act], [data-key], [data-k], [data-kb], .bk-row, .av');
    if (!a) {
      // tap on the dial-pad bubble area or empty space on Enter Number closes/opens the keypad
      if (Math.round(S.p) === 0 && S.pk < .5 && S.bk < .5) { const open = S.kb < .5; S._kbClosedByUser = !open; tween('kb', open ? 1 : 0, 360); }
      return;
    }
    if (a.classList.contains('av')) {
      const i = +a.dataset.i;
      if (S.pk > .5) { closePacks(); return; }
      if (i === Math.round(S.p)) { if (i === 0) { const open = S.kb < .5; S._kbClosedByUser = !open; tween('kb', open ? 1 : 0, 360); hapt('tick'); } else openPacks(); }
      else goIndex(i);
      return;
    }
    if (a.dataset.key) { hapt('tick'); typeDigit(a.dataset.key); return; }
    if (a.dataset.kb) { hapt('tick'); setKb(a.dataset.kb === '123' && kbMode === '123' ? 'abc' : a.dataset.kb); return; }
    if (a.dataset.k) {
      hapt('tick'); const k = a.dataset.k;
      if (k === 'del') query = query.slice(0, -1); else if (k === 'go' || k === 'shift') {} else query = (query + k.toLowerCase()).slice(0, 24);
      filterBook(); return;
    }
    if (a.classList.contains('bk-row')) {
      hapt('snap'); typed = a.dataset.num; slots.forEach(s => s._i = -1);
      S._kbClosedByUser = true; tween('bk', 0, 420); tween('kb', 0, 200); springP(0); return;
    }
    switch (a.dataset.act) {
      case 'exit': hapt('tick'); window.flowExit && window.flowExit(); break;
      case 'packs': openPacks(); break;
      case 'dial': closePacks(); break;
      case 'bank': openSheet('bank'); break;
      case 'book': openBook(); break;
      case 'enter': hapt('tick'); if (S.bk > .5) closeBook(true); else { springP(0); } break;
      case 'close': hapt('tick'); if (S.bk > .5) closeBook(false); else goIndex(1); break;
      case 'dismiss': case 'close-sheet': hapt('tick'); closeSheets(); break;
      case 'pay': openQuick(((Math.round(S.c) % N) + N) % N); break;
      case 'explore': hapt('tick'); break;
      case 'confirm-pay': hapt('heavy'); tween('quick', 0, 300, ease, () => window.flowPaid && window.flowPaid()); break;
    }
  }

  // ---------------------------------------------------------------- entry from Manage Family
  window.Flow = {
    enter(contactIndex = 1) {
      for (const k in anims) anims[k] = null; springTo = null; vel = 0;
      Object.assign(S, { pk: 0, kb: 0, bk: 0, bank: 0, quick: 0, cardDrag: 0, spin: 0, intro: 0, p: contactIndex + .9 });
      S.c = 0; query = ''; filterBook(); setKb('abc'); lastRot = -(S.p - 1) * 22.5; tickAcc = 0;
      render();
      setTimeout(() => { tween('intro', 1, 900, t => t); springP(contactIndex); }, 260);
    },
    render,
  };
  setKb('abc'); render();
})();
