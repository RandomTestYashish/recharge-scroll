// Recharge flow, built from scratch: contact dial -> packs deck -> quick pay -> success,
// plus Enter Number keypad, Phonebook search, Bank Offers, pack details and relation picker.
// Layout follows the Figma frames (375 x 812); every component here is hand-made. One render() draws the state.
(function () {
  const root = document.getElementById('flowStage');
  if (!root) return;
  root.classList.add('rc');
  const $ = (s, r = root) => r.querySelector(s), $$ = (s, r = root) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v)), lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => 1 - Math.pow(1 - t, 3), easeIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeOut4 = t => 1 - Math.pow(1 - t, 4);
  const A = 'assets/rc/';

  // ================================================================ icons
  const sv = (w, h, body) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">${body}</svg>`;
  const st = (c = '#292c31', w = 1.6) => `stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
  const IC = {
    caretL: sv(20, 20, `<path d="M12.5 4.5 7 10l5.5 5.5" ${st()}/>`),
    arrowL: sv(20, 20, `<path d="M16.5 10h-13M8.5 4.5 3 10l5.5 5.5" ${st()}/>`),
    arrowR: (c = '#fff', s = 20) => sv(s, s, `<path d="M${s * .17} ${s / 2}h${s * .66}M${s * .55} ${s * .22} ${s * .83} ${s / 2} ${s * .55} ${s * .78}" ${st(c)}/>`),
    search: sv(20, 20, `<circle cx="9" cy="9" r="5.6" ${st()}/><path d="m13.2 13.2 3.6 3.6" ${st()}/>`),
    x: (s = 20, c = '#292c31') => sv(s, s, `<path d="M${s * .25} ${s * .25}l${s * .5} ${s * .5}M${s * .75} ${s * .25}l-${s * .5} ${s * .5}" ${st(c)}/>`),
    seal: sv(16, 16, `<path d="M8 1.6 9.6 3l2.1-.3.6 2 1.9 1-.6 2 .9 1.9-1.7 1.2-.1 2.1-2.1.2L8 14.4l-1.6-1.3-2.1.3-.6-2-1.9-1 .6-2-.9-1.9L3.2 5.3l.1-2.1 2.1-.2L8 1.6Z" ${st('#01a845', 1.2)}/><path d="m6 10 4-4" ${st('#01a845', 1.2)}/><circle cx="6.2" cy="6.2" r=".9" fill="#01a845"/><circle cx="9.8" cy="9.8" r=".9" fill="#01a845"/>`),
    grid: sv(16, 16, [3, 8, 13].map(y => [3, 8, 13].map(x => `<circle cx="${x}" cy="${y}" r="1.35" fill="currentColor"/>`).join('')).join('')),
    book: sv(16, 16, `<rect x="3" y="2" width="10.5" height="12" rx="1.6" stroke="currentColor" stroke-width="1.3"/><circle cx="8.2" cy="6.8" r="1.8" stroke="currentColor" stroke-width="1.3"/><path d="M5.4 11.2c.6-1.3 1.6-2 2.8-2s2.2.7 2.8 2M1.8 5h2.4M1.8 8h2.4M1.8 11h2.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`),
    wifi: sv(16, 16, `<path d="M1.6 6.2a9.2 9.2 0 0 1 12.8 0M3.9 8.6a5.8 5.8 0 0 1 8.2 0M6.2 11a2.5 2.5 0 0 1 3.6 0" ${st('#292c31', 1.3)}/><circle cx="8" cy="13.1" r=".9" fill="#292c31"/>`),
    cal: sv(16, 16, `<rect x="2.3" y="3.2" width="11.4" height="10.5" rx="1.4" ${st('#292c31', 1.3)}/><path d="M2.3 6.2h11.4M5.3 1.8v2.6M10.7 1.8v2.6" ${st('#292c31', 1.3)}/><circle cx="5.6" cy="9" r=".7" fill="#292c31"/><circle cx="8" cy="9" r=".7" fill="#292c31"/><circle cx="10.4" cy="9" r=".7" fill="#292c31"/><circle cx="5.6" cy="11.3" r=".7" fill="#292c31"/><circle cx="8" cy="11.3" r=".7" fill="#292c31"/>`),
    phone: sv(16, 16, `<path d="M10.2 9.6 9 10.8a8 8 0 0 1-3.8-3.8l1.2-1.2-1-3H2.8A1 1 0 0 0 1.8 4 10.2 10.2 0 0 0 12 14.2a1 1 0 0 0 1.2-.9V10.6l-3-1Z" ${st('#292c31', 1.3)}/><path d="M10 2.2a4 4 0 0 1 3.8 3.8M9.6 4.4a2 2 0 0 1 2 2" ${st('#292c31', 1.3)}/>`),
    tick: sv(12, 12, `<path d="m3 6.2 2 2 4-4.4" ${st('#8e9aa9', 1.4)}/>`),
    caretD: (c = '#075ee8') => sv(16, 16, `<path d="m4 6 4 4 4-4" ${st(c, 1.4)}/>`),
    star: sv(16, 16, `<path d="m9.6 2.4 1 2.6 2.6.2-2 1.7.6 2.6-2.2-1.4L7.4 9.5 8 6.9 6 5.2l2.6-.2 1-2.6Z" fill="currentColor"/><path d="M5.6 10.4 2 14M4 8.6l-1.6 1.6M7.4 12.2l-1.6 1.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`),
    bars: sv(16, 16, `<path d="M3 12.5v-1.5M6 12.5V9M9 12.5V6.5M12 12.5V3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`),
    plane: sv(16, 16, `<path d="M6.6 13.6 8 12l-.4-3.4 4.6-3.1a1.3 1.3 0 0 0-1.4-2.2L6.2 6.4 2.8 5.9 1.6 7.2l3 1.6 1.2 2.6-1.4 1.1 2.2 1.1Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>`),
    hand: sv(16, 16, `<path d="M6.5 8.6V3.6a1.1 1.1 0 0 1 2.2 0v3.6m0-.6a1.1 1.1 0 0 1 2.2 0v1.2m0-.4a1.1 1.1 0 0 1 2.2 0V11a3.6 3.6 0 0 1-3.6 3.6H8.8a3.6 3.6 0 0 1-2.9-1.5L3.7 10a1.1 1.1 0 0 1 1.8-1.3l1 1" ${st('#696b6f', 1.1)}/><path d="M1.6 3.2h3M1.6 3.2l1.1-1.1M1.6 3.2l1.1 1.1" ${st('#696b6f', 1.1)}/>`),
    info: sv(16, 16, `<circle cx="8" cy="8" r="6.3" ${st('#075ee8', 1.2)}/><path d="M8 7.3v3.6" ${st('#075ee8', 1.3)}/><circle cx="8" cy="5.2" r=".8" fill="#075ee8"/>`),
    user: sv(20, 20, `<circle cx="10" cy="7" r="3.3" ${st('#075ee8', 1.4)}/><path d="M3.8 16.6c1.2-2.6 3.5-4 6.2-4s5 1.4 6.2 4" ${st('#075ee8', 1.4)}/>`),
    del: sv(23, 17, `<path d="M7.2 1h13.3A1.5 1.5 0 0 1 22 2.5v12a1.5 1.5 0 0 1-1.5 1.5H7.2L1 8.5 7.2 1Z" ${st('#000', 1.5)}/><path d="m11 5.5 6 6m0-6-6 6" ${st('#000', 1.5)}/>`),
    shift: sv(19, 17, `<path d="M9.5 1 1 9.6h4.6V16h7.8V9.6H18L9.5 1Z" fill="#000"/>`),
    tip: sv(12, 10, `<path d="M0 0h12L6 9.5Z" fill="#292c31"/>`),
    chev: sv(20, 20, `<path d="m5 7.5 5 5 5-5" ${st('#292c31', 1.5)}/>`),
    okTick: sv(34, 34, `<path d="M9 17.5 14.5 23 25.5 11.5" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`),
  };
  const statusBar = `<div class="sb"><div class="sb-time">9:41</div><div class="sb-icons">
    ${sv(18, 12, `<rect x="0" y="8" width="3" height="4" rx=".8" fill="#000"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8" fill="#000"/><rect x="10" y="3" width="3" height="9" rx=".8" fill="#000"/><rect x="15" y="0" width="3" height="12" rx=".8" fill="#000"/>`)}
    ${sv(16, 12, `<path d="M8 2.2c2.3 0 4.4.9 6 2.4l1-1.1A10 10 0 0 0 8 .7 10 10 0 0 0 1 3.5l1 1.1a8.6 8.6 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1-1.1A6.6 6.6 0 0 0 8 4.1 6.6 6.6 0 0 0 3.4 5.9l1 1.1c1-.9 2.2-1.4 3.6-1.4Zm2.2 2.6A3.2 3.2 0 0 0 8 7.4c-.8 0-1.6.3-2.2.8L8 10.6l2.2-2.4Z" fill="#000"/>`)}
    ${sv(26, 12, `<rect x=".5" y=".5" width="22" height="11" rx="3" stroke="#000" opacity=".4"/><rect x="2" y="2" width="19" height="8" rx="1.8" fill="#000"/><path d="M24 4v4c.8-.3 1.4-1.1 1.4-2S24.8 4.3 24 4Z" fill="#000" opacity=".45"/>`)}
  </div></div>`;

  const LOGO = {
    jio: `<div class="logo"><img alt="" src="${A}jiohotstar.png"></div>`,
    xstream: `<div class="logo"><img alt="" src="${A}xstream.png"></div>`,
    spam: `<div class="logo"><img alt="" src="${A}spam.png"></div>`,
    hellotunes: `<div class="logo ht"><img alt="" src="${A}hellotunes.png"></div>`,
    adobe: `<div class="logo">${sv(32, 32, `<defs><linearGradient id="adg" x1="9" y1="24" x2="23" y2="8" gradientUnits="userSpaceOnUse"><stop stop-color="#ff3c3c"/><stop offset=".5" stop-color="#ff2bb1"/><stop offset="1" stop-color="#7c5cff"/></linearGradient></defs><rect width="32" height="32" rx="5.3" fill="#000"/><path d="M13.9 8h4.2l6.4 16h-3.7l-1.5-4h-6.6l-1.5 4H7.5l6.4-16Zm-.1 9h4.4L16 11.1 13.8 17Z" fill="url(#adg)"/>`)}</div>`,
    apple: `<div class="logo">${sv(32, 32, `<defs><linearGradient id="amg" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse"><stop stop-color="#fa5c75"/><stop offset="1" stop-color="#f6304c"/></linearGradient></defs><rect width="32" height="32" rx="5.3" fill="url(#amg)"/><path d="M13 21.3V11.5l8-1.8v9.6" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/><circle cx="11.4" cy="21.4" r="2" fill="#fff"/><circle cx="19.4" cy="19.5" r="2" fill="#fff"/>`)}</div>`,
  };
  const BANK = {
    axis: sv(36, 36, `<path d="M18 9 9.5 26h4.6L18 18.4 21.9 26h4.6L18 9Z" fill="#97144d"/><path d="M15.8 26h4.4L18 21.6 15.8 26Z" fill="#c4306e"/>`),
    paytm: sv(36, 36, `<text x="5" y="21.5" font-family="Inter,Arial" font-weight="800" font-size="9.5" fill="#002970">pay</text><text x="21.6" y="21.5" font-family="Inter,Arial" font-weight="800" font-size="9.5" fill="#00baf2">tm</text>`),
    bhim: sv(36, 36, `<path d="m15 10 5.5 8-5.5 8" stroke="#f47920" stroke-width="3.2" stroke-linejoin="round"/><path d="m20.5 12 4.2 6-4.2 6" stroke="#0f8a3c" stroke-width="2.6" stroke-linejoin="round"/>`),
    amazon: sv(36, 36, `<circle cx="18" cy="18" r="18" fill="#232f3e"/><text x="18" y="18.5" text-anchor="middle" font-family="Inter,Arial" font-weight="700" font-size="9" fill="#fff">pay</text><path d="M11.5 22c4 2.3 9 2.3 13 0" stroke="#ff9900" stroke-width="1.6" stroke-linecap="round"/>`),
    cred: sv(36, 36, `<circle cx="18" cy="18" r="18" fill="#111"/><path d="M18 9.5 12 12v5.4c0 3.8 2.6 6.6 6 8.1 3.4-1.5 6-4.3 6-8.1V12l-6-2.5Z" stroke="#fff" stroke-width="1.4"/><path d="M15.4 18h5.2" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>`),
  };

  // ================================================================ data
  const contacts = [
    { pad: true },
    { name: 'Harshit', num: '9864309723', img: A + 'harshit.png', pos: '50% 22%' },
    { name: 'Sapna', num: '9864309878', img: A + 'sapna.png', pos: '55% 20%' },
    { name: 'Simranpreet', num: '9864307723', img: A + 'simranpreet.png', pos: '45% 16%' },
  ];
  const BEN = {
    jio: ['jio', 'JioHotstar Mobile', 'for 28 days'], adobe: ['adobe', 'Adobe Express<br>Premium'], spam: ['spam', 'Safe<br>Network'],
    xstream: ['xstream', 'Airtel Xstream Play', 'free content'], ht: ['hellotunes', 'Hellotunes'], apple: ['apple', 'Apple Music', 'for 6 months'],
  };
  const P = {
    p399: { price: 399, tag: ['Best value', 'blue'], stats: ['2.5 GB', '28 days', 'Unlimited'], band: 'UNLIMITED 5G DATA', bens: ['jio', 'adobe'], more: ['Unlimited 5G data', '100 SMS / day'], cta: 'Recharge Now', data: '2.5 GB data • 28 days validity' },
    p199: { price: 199, tag: ['Last recharge', 'grey'], stats: ['1.5 GB', '28 days', 'Unlimited'], bens: ['adobe', 'spam', 'xstream'], cta: 'Repeat Recharge', data: '1.5 GB/day • 28 days validity' },
    p449: { price: 449, tag: ['Cricket Pack', 'yellow'], stats: ['4 GB', '28 days', 'Unlimited'], bens: ['jio', 'adobe', 'xstream'], more: ['Unlimited 5G data', '100 SMS / day'], cta: 'Recharge Now', data: '4 GB/day • 28 days validity' },
    p299: { price: 299, stats: ['1.5 GB', '28 days', 'Unlimited'], bens: ['adobe', 'spam', 'ht'], cta: 'Recharge Now', data: '1.5 GB/day • 28 days validity' },
    p349: { price: 349, stats: ['2 GB', '28 days', 'Unlimited'], bens: ['adobe', 'ht', 'apple'], more: ['Unlimited 5G data', '100 SMS / day'], cta: 'Recharge Now', data: '2 GB/day • 28 days validity' },
    r649: { price: 649, tag: ['UAE • Gulf', 'blue'], stats: ['2 GB', '10 days', '100 min'], labels: ['Data', 'Validity', 'Calls'], bens: ['spam'], cta: 'Recharge Now', data: '2 GB • 10 days • 100 min' },
    r2999: { price: 2999, tag: ['184 countries', 'blue'], stats: ['5 GB', '30 days', '200 min'], labels: ['Data', 'Validity', 'Calls'], bens: ['spam', 'xstream'], cta: 'Recharge Now', data: '5 GB • 30 days • 200 min' },
    look: { look: true },
  };
  const TABS = [
    { id: 'rec', label: 'Recommended Packs', icon: IC.star, cards: ['p399', 'p199', 'p449', 'p299', 'p349', 'look'] },
    { id: 'data', label: 'Top data packs', icon: IC.bars, cards: ['p449', 'p399', 'p349', 'p299', 'p199', 'look'] },
    { id: 'intl', label: 'International roaming', icon: IC.plane, cards: ['r649', 'r2999', 'look'] },
  ];
  const OFFERS = [
    ['axis', 'Get 25% cashback upto ₹250', 'Airtel Axis Bank Credit Card', 'Valid on recharges of ₹199 and above. Cashback is credited within 3 working days.'],
    ['paytm', 'Get upto ₹300 cashback', 'Paytm UPI', 'Assured cashback between ₹10 and ₹300 on your first recharge through Paytm UPI this month.'],
    ['bhim', '₹10 instant cashback', 'BHIM UPI', 'Instant ₹10 off on recharges of ₹249 and above. Once per user.'],
    ['amazon', 'Get upto ₹25 cashback', 'Amazon Pay Wallet', 'Pay with Amazon Pay balance and get up to ₹25 back as Amazon Pay balance.'],
    ['cred', 'Get upto 5% cashback', 'Cred UPI', 'Up to 5% back as CRED coins on recharges above ₹299.'],
    ['paytm', 'Get upto ₹300 cashback', 'Paytm UPI', 'Scratch card worth up to ₹300 on recharges made with Paytm Postpaid.'],
  ];
  const NAMES = ['Aakash Gupta', 'Abhishek Pawar', 'Amit Yadav', 'Anjali Patil', 'Anurag Singhania', 'Arvind Kumar Yadav', 'Ashish Chaudhary', 'Chitra Patil', 'Deepak Sharma', 'Divya Menon', 'Farhan Qureshi', 'Gaurav Jain'];
  const BOOK = NAMES.map((n, i) => ({ name: n, num: '98765' + String(43210 + i * 1117).slice(-5) }));
  const RELS = ['Father', 'Mother', 'Brother', 'Sister', 'Spouse', 'Son', 'Daughter', 'Friend'];

  // ================================================================ components
  function cardHTML(key) {
    const c = P[key];
    if (c.look) return `<div class="card-f">
      <img class="lk-q" alt="" src="${A}question.png">
      <div class="lk-title">Looking for<br>other plans?</div>
      <div class="lk-sub">Which type of plans do you<br>want to see?</div>
      <div class="lk-tiles">
        <button class="lk-tile" data-act="tab" data-tab="intl"><span>International<br>roaming</span>${sv(56, 56, `<defs><radialGradient id="glb" cx=".35" cy=".3" r=".8"><stop stop-color="#c9b8ff"/><stop offset="1" stop-color="#6a4df5"/></radialGradient></defs><circle cx="28" cy="28" r="20" fill="url(#glb)"/><path d="M8 28h40M28 8c6 6 6 34 0 40M28 8c-6 6-6 34 0 40M12 18h32M12 38h32" stroke="#fff" stroke-opacity=".55" stroke-width="1.4"/>`)}</button>
        <button class="lk-tile" data-act="tab" data-tab="data"><span>Data<br>top-up</span>${sv(56, 56, `<defs><linearGradient id="dtp" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#7fb2ff"/><stop offset="1" stop-color="#2f6df6"/></linearGradient></defs><rect x="10" y="12" width="32" height="34" rx="8" fill="url(#dtp)"/><path d="M26 38V22m-6 6 6-6 6 6" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M46 20v-4M50 20v-8" stroke="#2f6df6" stroke-width="2.4" stroke-linecap="round"/>`)}</button>
        <button class="lk-tile" data-act="tab" data-tab="rec"><span>Monthly<br>packs</span>${sv(56, 56, `<defs><linearGradient id="mtp" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#7be3b0"/><stop offset="1" stop-color="#11a05c"/></linearGradient></defs><rect x="11" y="14" width="34" height="31" rx="7" fill="url(#mtp)"/><path d="M11 23h34M20 10v7M36 10v7" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><text x="28" y="40" text-anchor="middle" font-family="Inter" font-weight="800" font-size="12" fill="#fff">30</text>`)}</button>
      </div>
      <button class="cta" data-act="tab" data-tab="data">Explore More Packs</button>
    </div>`;
    const labels = c.labels || ['Data/day', 'Validity', 'Calls'];
    const bens = c.bens.map(b => { const [lg, t, s] = BEN[b]; return `<div class="ben">${LOGO[lg]}<div class="ben-t">${t}${s ? `<i>${s}</i>` : ''}</div><span class="ben-ok">${IC.tick}</span></div>`; }).join('');
    return `<div class="card-f">
      <div class="price"><small>₹</small>${c.price.toLocaleString('en-IN')}</div>
      ${c.tag ? `<div class="tag ${c.tag[1]}">${c.tag[0]}</div>` : ''}
      <div class="stats">${[IC.wifi, IC.cal, IC.phone].map((ic, i) => `<div class="stat">${ic}<b>${c.stats[i]}</b><i>${labels[i]}</i></div>`).join('')}</div>
      ${c.band ? `<div class="band"><hr><span>${c.band}</span><hr></div>` : ''}
      <div class="bens" style="top:${c.band ? 178 : 154}px">${bens}${c.more ? `<div class="more"><button data-act="details">+${c.more.length} more benefits ${IC.caretD()}</button></div>` : ''}</div>
      <button class="cta" data-act="pay">${c.cta}</button>
    </div>`;
  }

  root.innerHTML = `
  <div class="ly" id="Y-dial">
    <div class="dial pass" id="dial">
      <div class="dial-disc"></div>
      <div class="dial-inner"></div>
      <div class="dial-ticks"><canvas id="ticks" width="970" height="970"></canvas></div>
    </div>
    <div class="fadeb pass"></div>
    <div class="needle pass"></div><div class="needle-tip pass">${IC.tip}</div>
    <button class="go" data-act="packs" aria-label="View packs">${IC.arrowR('#fff', 22)}</button>
    <div class="go-label pass">Tap to view packs</div>
    <div class="hint pass">${IC.hand}<span>Swipe left or right to explore contacts</span></div>
  </div>
  <div class="ly" id="Y-name"><div class="nm pass"><b></b><i></i></div><div class="nm pass"><b></b><i></i></div></div>
  <div class="ly" id="Y-rel"><div class="rel"><button data-act="rel"><span id="relTxt">Add relation</span>${IC.caretD()}</button></div></div>
  <div class="ly" id="Y-avs"></div>
  <div class="ly" id="Y-hdr">
    <button class="icb" style="left:16px;top:60px" data-act="exit" aria-label="Back">${IC.caretL}</button>
    <button class="pill" data-act="bank">${IC.seal}<span>Bank Offers</span><i class="shine"></i></button>
    <button class="icb" style="left:319px;top:60px" data-act="book" aria-label="Search contacts">${IC.search}</button>
  </div>
  <div class="ly" id="Y-seg">
    <div class="seg"><i class="seg-knob" id="segKnob"></i>
      <button style="left:3px" data-act="enter" id="segEnter">${IC.grid}Enter Number</button>
      <button style="left:142px" data-act="book" id="segBook">${IC.book}Phonebook</button></div>
    <button class="icb" style="left:319px;top:60px" data-act="close" aria-label="Close">${IC.x()}</button>
  </div>
  <div class="ly" id="Y-ph">
    <button class="icb" style="left:16px;top:77.5px" data-act="dial" aria-label="Back to contacts">${IC.arrowL}</button>
    <div class="ph-name pass"><b id="phName">Harshit</b><i id="phNum">+91 9864309723</i></div>
    <button class="icb" style="left:319px;top:77.5px" data-act="book" aria-label="Search">${IC.search}</button>
  </div>
  <div class="ly" id="Y-tabs"><div class="tabs"><div class="tabs-in">${TABS.map((t, i) => `<button class="tab${i ? '' : ' on'}" data-act="tab" data-tab="${t.id}">${t.icon}${t.label}</button>`).join('')}</div></div></div>
  <div class="ly" id="Y-deck"><div class="deck" id="deck"></div></div>
  <div class="ly" id="Y-dots"><div class="dots pass" id="dots"><i></i><i></i><i></i></div><div class="fees pass">• ₹0 PLATFORM FEES •</div></div>
  <div class="ly" id="Y-book">
    <div class="book-panel pass"></div><div class="book-title pass">Recharge any number</div>
    <div class="search"><span>${IC.search}</span><span id="qTxt"></span><span class="caret"></span><span class="ph" id="qPh">Search Name or Number</span></div>
    <div class="abc" id="abc"><i class="abc-knob"></i><button class="on" style="left:2px;width:49px" data-act="kb" data-kb="abc">ABC</button><button style="left:51px;width:40px" data-act="kb" data-kb="123">123</button></div>
    <div class="list" id="list"></div>
  </div>
  <div class="ly" id="Y-np"><div class="kbd" style="height:288px">
    <div class="np">${['1:', '2:ABC', '3:DEF', '4:GHI', '5:JKL', '6:MNO', '7:PQRS', '8:TUV', '9:WXYZ', ':', '0:', 'del'].map(k => {
      if (k === 'del') return `<button class="blank" data-key="del" aria-label="Delete">${IC.del}</button>`;
      const [d, l] = k.split(':'); return d ? `<button data-key="${d}"><b>${d}</b><i>${l}</i></button>` : '<button class="blank" tabindex="-1"></button>';
    }).join('')}</div><div class="home"><i></i></div></div></div>
  <div class="ly" id="Y-ak"><div class="kbd">
    <div class="ak-sugg"><span>Suggest</span><em></em><span>Suggest</span><em></em><span>Suggest</span></div>
    <div class="ak">
      <div class="ak-row">${[...'QWERTYUIOP'].map(k => `<button data-k="${k}">${k}</button>`).join('')}</div>
      <div class="ak-row" style="padding:0 18px">${[...'ASDFGHJKL'].map(k => `<button data-k="${k}">${k}</button>`).join('')}</div>
      <div class="ak-row" style="gap:1px"><button class="g" style="width:42px;background:#fff" data-k="shift">${IC.shift}</button><div class="ak-row" style="flex:1;padding:0 13px">${[...'ZXCVBNM'].map(k => `<button data-k="${k}">${k}</button>`).join('')}</div><button class="g" style="width:42px" data-k="del">${IC.del}</button></div>
      <div class="ak-row" style="gap:6px"><button class="g" style="width:87px" data-act="kb" data-kb="123">123</button><button style="font-size:16px" data-k=" ">space</button><button class="g" style="width:88px" data-k="go">Go</button></div>
    </div><div class="home" style="height:70px"><i></i></div></div></div>
  <div class="ly" id="Y-menu"><div class="rel-menu" id="relMenu">${RELS.map(r => `<button data-act="pickrel" data-rel="${r}">${r}</button>`).join('')}</div></div>
  <div class="ly" id="Y-scrim"><div class="scrim" data-act="dismiss"></div></div>
  <div class="ly" id="Y-bank"><div class="sheet"><button class="sheet-x" data-act="dismiss" aria-label="Close">${IC.x(14)}</button><div class="sheet-b">
    <div class="sheet-h">Bank Offers</div>
    ${OFFERS.map(([b, t, s, m]) => `<div class="offer"><button class="offer-top" data-act="offer"><span class="blogo">${BANK[b]}</span><div><b>${t}</b><i>${s}</i></div><span class="chev">${IC.chev}</span></button><div class="offer-more"><p>${m}</p><button data-act="useoffer">Apply on next payment</button></div></div>`).join('')}
  </div></div></div>
  <div class="ly" id="Y-quick"><div class="sheet"><button class="sheet-x" data-act="dismiss" aria-label="Close">${IC.x(14)}</button><div class="sheet-b">
    <div class="sheet-h">Quick Pay</div>
    <div class="qp-card"><div class="qp-l1"><span id="qpWho">Prepaid • 9864309723</span><span id="qpPrice">₹399</span></div>
      <div class="qp-l2"><span id="qpData">2.5 GB data • 28 days validity</span><button data-act="details">View Details</button></div>
      <div class="qp-pay"><span class="blogo" style="width:28px;height:28px">${BANK.paytm}</span>Paytm UPI<span style="flex:1"></span><span id="qpOffer" style="font:500 11px/14px Inter;color:#12a150"></span></div>
      <div class="qp-info">${IC.info}You will be redirected to Paytm</div></div>
    <div class="qp-btns"><button class="qp-more" data-act="bank">More Options</button><button class="qp-go" data-act="confirm"><span id="qpPay">Pay ₹399</span>${IC.arrowR('#fff', 18)}</button></div>
  </div></div></div>
  <div class="ly" id="Y-det"><div class="sheet"><button class="sheet-x" data-act="dismiss" aria-label="Close">${IC.x(14)}</button><div class="sheet-b">
    <div class="sheet-h" id="detH">₹399 pack details</div><div id="detList"></div>
    <div class="qp-btns"><button class="qp-go" data-act="pay"><span id="detPay">Recharge ₹399</span>${IC.arrowR('#fff', 18)}</button></div>
  </div></div></div>
  <div class="ly" id="Y-ok"><div class="ok" data-act="okdone"><div class="ok-halo"><div class="ok-disc">${IC.okTick}</div></div><div class="ok-t">Recharge successful</div><div class="ok-s" id="okS">₹399 pack activated</div></div></div>
  <div class="ly" id="Y-sb">${statusBar}</div>
  <div class="ly" id="Y-toast"><div class="toast pass" id="toast"></div></div>`;

  const Y = {}; $$('.ly').forEach(l => Y[l.id.slice(2)] = l);

  // ================================================================ haptics
  // Android: Vibration API. iOS 18+ Safari: toggling an <input switch> plays the system haptic (inside a user gesture).
  const hapt = (() => {
    const lab = document.createElement('label'), inp = document.createElement('input');
    inp.type = 'checkbox'; inp.setAttribute('switch', ''); lab.appendChild(inp);
    lab.style.cssText = 'position:fixed;left:-200px;top:0;width:1px;height:1px;opacity:0;pointer-events:none';
    document.body.appendChild(lab);
    let last = 0;
    return kind => {
      const now = performance.now(); if (now - last < 26) return; last = now;
      if (navigator.vibrate) navigator.vibrate(kind === 'heavy' ? 24 : kind === 'snap' ? 14 : 5);
      else try { lab.click(); } catch (e) {}
    };
  })();

  // ================================================================ state + animation engine
  const S = { p: 1, pk: 0, kb: 0, bk: 0, num: 0, bank: 0, quick: 0, det: 0, ok: 0, menu: 0, intro: 1, c: 0, cd: 0, shut: 0, deckIn: 1 };
  const anims = {};
  let raf = 0, lastT = performance.now(), springTo = null, vel = 0, dragging = false;
  function tween(k, to, dur = 450, fn = ease, done) {
    if (dur <= 0 || S[k] === to) { S[k] = to; anims[k] = null; done && done(); kick(); return; }
    anims[k] = { from: S[k], to, t0: performance.now(), dur, fn, done }; kick();
  }
  function springP(to) { springTo = to; kick(); }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }
  function frame(t) {
    raf = 0; const dt = Math.min(.05, (t - lastT) / 1000); lastT = t; let busy = false;
    for (const k in anims) { const a = anims[k]; if (!a) continue; const u = clamp((t - a.t0) / a.dur, 0, 1); S[k] = lerp(a.from, a.to, a.fn(u)); if (u >= 1) { anims[k] = null; a.done && a.done(); } else busy = true; }
    if (springTo !== null) {
      const K = 160, D = 2 * Math.sqrt(K) * .9;
      vel += (-(S.p - springTo) * K - vel * D) * dt; S.p += vel * dt;
      if (Math.abs(S.p - springTo) < .001 && Math.abs(vel) < .01) { S.p = springTo; springTo = null; vel = 0; settled(); } else busy = true;
    }
    render(); if (busy) kick();
  }

  // ================================================================ tick ring
  const tc = $('#ticks'), tctx = tc.getContext('2d');
  (function drawTicks() {
    const k = 2, c = 242.5 * k; tctx.lineCap = 'round';
    for (let i = 0; i < 144; i++) {   // every 2.5deg; a long mark per contact (22.5deg), mid marks every 7.5deg
      const a = i * 2.5 * Math.PI / 180 - Math.PI / 2, major = i % 9 === 0, mid = i % 3 === 0;
      const r1 = (major ? 228 : mid ? 233 : 236.5) * k, r2 = 241.5 * k;
      tctx.strokeStyle = major ? 'rgba(41,44,49,.95)' : mid ? 'rgba(41,44,49,.55)' : 'rgba(41,44,49,.28)';
      tctx.lineWidth = (major ? 1.7 : 1) * k;
      tctx.beginPath(); tctx.moveTo(c + Math.cos(a) * r1, c + Math.sin(a) * r1); tctx.lineTo(c + Math.cos(a) * r2, c + Math.sin(a) * r2); tctx.stroke();
    }
  })();

  // ================================================================ avatars
  const avs = contacts.map((c, i) => {
    const el = document.createElement('button'); el.className = 'av'; el.dataset.act = 'av'; el.dataset.i = i;
    el.innerHTML = c.pad
      ? `<div class="av-side"></div><div class="av-halo"></div><div class="av-ring"></div><div class="av-pad">${sv(30, 38, `${[0, 1, 2].map(r => [0, 1, 2].map(k => `<circle cx="${4 + k * 11}" cy="${4 + r * 10}" r="3.1" fill="#000"/>`).join('')).join('')}<circle cx="15" cy="34" r="3.1" fill="#000"/>`)}</div>`
      : `<div class="av-side"></div><div class="av-halo"></div><div class="av-ring"></div><div class="av-photo"><img alt="" src="${c.img}" style="object-position:${c.pos}"></div>`;
    el.setAttribute('aria-label', c.pad ? 'Enter a number' : c.name);
    Y.avs.appendChild(el); return el;
  });
  const SLOTS = [[-1, 464, 64], [78, 418.5, 64], [187.5, 373.5, 124], [297, 418.5, 64], [378.7, 462, 64]];
  function slot(d) {
    const x = clamp(d + 2, -1.5, 5.5);
    if (x <= 0) return [SLOTS[0][0] + x * 80, SLOTS[0][1] - x * 40, 64];
    if (x >= 4) return [SLOTS[4][0] + (x - 4) * 80, SLOTS[4][1] + (x - 4) * 40, 64];
    const i = Math.floor(x), f = x - i, a = SLOTS[i], b = SLOTS[Math.min(4, i + 1)], g = easeIO(f);
    return [lerp(a[0], b[0], f), lerp(a[1], b[1], g), lerp(a[2], b[2], g)];
  }

  // ================================================================ names
  let typed = '98765433456', sample = true, rels = {}, query = '', kbMode = 'abc', tab = 'rec', deckKeys = TABS[0].cards, kbClosed = false;
  const nms = $$('.nm');
  function fillName(el, i, force) {
    if (el._i === i && !force) return; el._i = i;
    const c = contacts[i];
    el.querySelector('b').textContent = c.pad ? (typed || 'Enter number') : c.name;
    el.querySelector('b').style.color = c.pad && !typed ? '#b7bcc5' : '';
    el.querySelector('i').textContent = c.pad ? '' : c.num;
  }
  const current = () => { const c = contacts[Math.round(S.p)]; return c.pad ? { name: typed, num: typed, pad: true } : c; };

  // ================================================================ deck
  const deck = $('#deck');
  function buildDeck(keys) { deckKeys = keys; deck.innerHTML = keys.map((k, i) => `<div class="card" data-i="${i}">${cardHTML(k)}</div>`).join(''); S.c = 0; S.cd = 0; }
  buildDeck(deckKeys);
  const deckIdx = () => { const n = deckKeys.length; return ((Math.round(S.c) % n) + n) % n; };

  // ================================================================ phonebook list
  const list = $('#list');
  function renderList() {
    const q = query.trim().toLowerCase();
    const hit = s => { if (!q) return s; const i = s.toLowerCase().indexOf(q); return i < 0 ? s : s.slice(0, i) + '<mark>' + s.slice(i, i + q.length) + '</mark>' + s.slice(i + q.length); };
    const rows = BOOK.filter(b => !q || b.name.toLowerCase().includes(q) || b.num.includes(q));
    list.innerHTML = rows.length ? rows.map(b => `<button class="row" data-act="pick" data-num="${b.num}"><span class="row-av">${IC.user}</span><span><b>${hit(b.name)}</b><i>${hit(b.num)}</i></span></button>`).join('')
      : `<div class="empty">No contacts found${/^\d{10}$/.test(q) ? `. <button data-act="pick" data-num="${q}" style="color:#075ee8;font-weight:600">Recharge ${q}</button>` : ''}</div>`;
    $('#qTxt').textContent = query; $('#qPh').style.display = query ? 'none' : '';
  }
  renderList();

  // ================================================================ render
  const css = (el, o, tr) => { el.style.opacity = o; el.style.transform = tr || ''; };
  const dialEl = $('#dial'), segKnob = $('#segKnob'), dotsEl = $('#dots'), disc = $('.dial-disc'), inner = $('.dial-inner'), goBtn = $('.go');
  const dialBits = $$('.needle, .needle-tip, .go-label, .fadeb, .hint', Y.dial);
  let lastRot = 0, tickAcc = 0;
  function render() {
    const { p, pk, kb, bk, intro } = S, d1 = 1 - pk;
    const e = clamp(1 - p, 0, 1), tg = Math.max(e, bk);
    const rise = (1 - ease(clamp(intro * 1.3 - .25, 0, 1))) * 250;

    css(Y.hdr, (1 - tg) * d1, `translateY(${-8 * pk}px)`);
    $('.pill', Y.hdr).style.opacity = clamp(intro * 2.2 - 1.1, 0, 1);
    css(Y.seg, tg * d1, `scale(${.95 + .05 * tg})`); Y.seg.style.transformOrigin = '187px 80px';
    segKnob.style.left = (3 + 139 * bk) + 'px';
    $('#segEnter').classList.toggle('on', bk < .5); $('#segBook').classList.toggle('on', bk >= .5);

    // names cross-fade with blur as the dial turns
    const i0 = clamp(Math.floor(p), 0, contacts.length - 1), i1 = clamp(i0 + 1, 0, contacts.length - 1), f = clamp(p - i0, 0, 1);
    fillName(nms[0], i0); fillName(nms[1], i1);
    const nameO = clamp(intro * 2.4 - 1, 0, 1);
    nms.forEach((el, k) => { const w = k ? f : 1 - f; el.style.opacity = nameO * clamp((w - .2) * 1.7, 0, 1); el.style.filter = `blur(${(1 - w) * 7}px)`; el.style.transform = `translateX(${(k ? 1 - f : -f) * 16}px)`; });
    css(Y.name, d1, `translateY(${-90 * pk}px) scale(${1 - .33 * pk})`); Y.name.style.transformOrigin = '187.5px 180px';
    css(Y.rel, (1 - e) * d1 * clamp(intro * 2.4 - 1.2, 0, 1), '');
    $('#relTxt').textContent = rels[Math.round(p)] || 'Add relation';

    // dial: ticks turn 22.5deg per contact
    const rot = -(p - 1) * 22.5;
    tc.style.transform = `rotate(${rot}deg)`;
    dialEl.style.transform = `translate(0px, ${274 * pk + rise}px)`;
    disc.style.opacity = inner.style.opacity = d1;
    dialBits.forEach(el => css(el, d1 * (el.matches('.hint, .go-label') ? clamp(1 - S.shut * 2, 0, 1) : 1), `translateY(${rise + 250 * pk}px)`));
    css(goBtn, d1 * clamp(1 - S.shut * 1.6, 0, 1), `translateY(${rise + 250 * pk}px) scale(${1 - S.shut * .35})`);
    tickAcc += rot - lastRot; lastRot = rot;
    if (Math.abs(tickAcc) >= 2.5) { tickAcc %= 2.5; if (dragging || springTo !== null) hapt('tick'); }

    // avatars on the arc; the selected one rides down to the packs screen
    avs.forEach((el, i) => {
      let [x, y, s] = slot(i - p);
      if (contacts[i].pad) { const w = clamp(1 - Math.abs(i - p + 1), 0, 1); y = lerp(y, 404.3, w); x = lerp(x, 72.1, w); }
      const cen = clamp(1 - Math.abs(i - p), 0, 1), isC = Math.round(p) === i;
      let o = clamp(1.7 - Math.abs(i - p) * .5, 0, 1) * clamp(intro * 1.7 - .35, 0, 1), rg = cen;
      if (pk > 0) { if (isC) { x = lerp(x, 187.5, pk); y = lerp(y, 780, pk); s = lerp(s, 54, pk); rg = 1; } else o *= d1 * d1; }
      el.style.transform = `translate(${x - s / 2}px, ${y - s / 2}px) scale(${s / 124})`;
      el.style.opacity = o; el.style.zIndex = Math.round(10 + cen * 10);
      el.children[0].style.opacity = 1 - rg; el.children[1].style.opacity = rg; el.children[2].style.opacity = rg;
      const ins = lerp(9.1, 5, rg), ph = el.children[3];
      ph.style.left = ph.style.top = ins + 'px'; ph.style.width = ph.style.height = (124 - 2 * ins) + 'px';
      el.style.pointerEvents = o < .3 || (pk > .5 && !isC) ? 'none' : '';
    });

    // packs
    css(Y.ph, pk, '');
    css(Y.tabs, pk, `translateX(${300 * d1}px)`);
    css(Y.dots, pk, `translateY(${14 * d1}px)`);
    css(Y.deck, pk * S.deckIn, `translate(${1.2 * d1}px, ${-46.5 * d1}px) scale(${(.36 + .64 * pk) * (.94 + .06 * S.deckIn)})`); Y.deck.style.transformOrigin = '187.5px 415px';
    if (pk > 0) renderDeck();

    // keyboards, phonebook, relation menu
    const npShow = Math.max(kb * e * d1, bk * S.num);
    css(Y.np, 1, `translateY(${(1 - npShow) * 100}%)`);
    css(Y.ak, 1, `translateY(${(1 - bk * (1 - S.num)) * 100}%)`);
    css(Y.book, 1, `translateY(${(1 - bk) * 720}px)`);
    css(Y.menu, S.menu, `translateY(${-6 * (1 - S.menu)}px) scale(${.92 + .08 * S.menu})`); Y.menu.style.transformOrigin = '187px 258px';

    // sheets
    const sc = Math.max(S.bank, S.quick, S.det);
    Y.scrim.style.opacity = sc;
    css(Y.bank, 1, `translateY(${(1 - S.bank) * 110}%)`);
    css(Y.quick, 1, `translateY(${(1 - S.quick) * 110}%)`);
    css(Y.det, 1, `translateY(${(1 - S.det) * 110}%)`);
    css(Y.ok, S.ok, '');

    const vis = { hdr: (1 - tg) * d1 > .5, seg: tg * d1 > .5, rel: (1 - e) * d1 > .5, dial: d1 > .5, ph: pk > .5, tabs: pk > .5, deck: pk > .5, book: bk > .5, np: npShow > .5,
      ak: bk * (1 - S.num) > .5, menu: S.menu > .5, scrim: sc > .1, bank: S.bank > .5, quick: S.quick > .5, det: S.det > .5, ok: S.ok > .5 };
    for (const k in vis) Y[k].inert = !vis[k];
  }

  function renderDeck() {
    const n = deckKeys.length, c = S.c + S.cd;
    $$('.card', deck).forEach((el, i) => {
      let d = ((i - c) % n + n) % n; if (d > n / 2) d -= n;
      let tr, o = 1, cv = 1, z;
      if (d < 0) { const u = clamp(-d, 0, 1); tr = `translate(${-440 * u}px, ${30 * u}px) rotate(${-15 * u}deg)`; o = d < -1 ? 0 : 1; z = 30 - Math.round(-d * 4); }
      else { const u = Math.min(d, 2.4); tr = `translateY(${11.5 * u}px) scaleX(${1 - .078 * u})`; cv = clamp(1 - d * 1.5, 0, 1); o = d > 2.4 ? 0 : 1; z = 20 - Math.round(d * 4); }
      el.style.transform = tr; el.style.opacity = o; el.style.zIndex = z; el.style.setProperty('--c', cv);
      el.style.pointerEvents = Math.abs(d) < .5 ? '' : 'none';
    });
    const idx = deckIdx(), pos = n < 3 ? idx : idx === 0 ? 0 : idx === n - 1 ? 2 : 1;
    [...dotsEl.children].forEach((d, k) => { d.classList.toggle('on', k === pos); d.textContent = k === pos ? `${idx + 1}/${n}` : ''; d.style.display = k < Math.min(3, n) ? '' : 'none'; });
  }

  // ================================================================ actions
  let toastT = 0, okT = 0, applied = null;
  const toastEl = $('#toast'); toastEl.style.opacity = 0; toastEl.style.transform = 'translate(-50%,8px)';
  function toast(msg) { toastEl.textContent = msg; toastEl.style.opacity = 1; toastEl.style.transform = 'translate(-50%,0)'; clearTimeout(toastT); toastT = setTimeout(() => { toastEl.style.opacity = 0; toastEl.style.transform = 'translate(-50%,8px)'; }, 1800); }
  function settled() {
    hapt('snap');
    const i = Math.round(S.p);
    if (i === 0 && S.kb < .5 && !kbClosed && S.bk < .5) tween('kb', 1, 380, ease);
    if (i !== 0) kbClosed = false;
  }
  function goIndex(i) { i = clamp(i, 0, contacts.length - 1); if (i !== 0 && S.kb > 0) tween('kb', 0, 240); closeMenu(); springP(i); }
  function closeMenu() { if (S.menu > 0) tween('menu', 0, 200); }
  function shake(els) { els.forEach(el => el.animate([{ translate: '0' }, { translate: '-8px' }, { translate: '7px' }, { translate: '-4px' }, { translate: '0' }], { duration: 360 })); }
  function openPacks() {
    const c = current();
    if (c.pad && typed.length < 10) { toast('Enter a valid 10-digit number'); hapt('heavy'); shake(nms); return; }
    $('#phName').textContent = c.pad ? '+91 ' + typed : c.name; $('#phNum').textContent = c.pad ? 'Prepaid' : '+91 ' + c.num;
    if (S.kb > 0) tween('kb', 0, 220);
    closeMenu(); setTab('rec', true);
    // the button shrinks away, then the packs open
    hapt('heavy');
    tween('shut', 1, 260, easeIO, () => { hapt('snap'); tween('pk', 1, 620, easeIO); tween('shut', 0, 520, ease); });
  }
  function closePacks() { hapt('tick'); closeSheets(); tween('pk', 0, 560, easeIO); }
  function openBook() { hapt('tick'); closeMenu(); closeSheets(); if (S.pk > .5) tween('pk', 0, 380, easeIO); tween('bk', 1, 480, ease); }
  function closeBook(toEnter) {
    tween('bk', 0, 420, ease);
    if (toEnter) { kbClosed = false; springP(0); tween('kb', 1, 420); } else if (Math.round(S.p) === 0) goIndex(1);
  }
  function setKb(m) { kbMode = m; $('#abc').classList.toggle('num', m === '123'); $$('#abc button').forEach(b => b.classList.toggle('on', b.dataset.kb === m)); tween('num', m === '123' ? 1 : 0, 300); }
  function setTab(id, quiet) {
    if (tab === id && !quiet) return;
    tab = id; $$('.tab').forEach(t => t.classList.toggle('on', t.dataset.tab === id));
    const t = TABS.find(x => x.id === id);
    if (quiet) { buildDeck(t.cards); return; }
    const btn = $(`.tab[data-tab="${id}"]`), bar = $('.tabs');
    bar.scrollTo({ left: Math.max(0, btn.offsetLeft - (375 - btn.offsetWidth) / 2), behavior: 'smooth' });
    tween('deckIn', 0, 160, ease, () => { buildDeck(t.cards); render(); tween('deckIn', 1, 320, ease); });
  }
  function openSheet(k) { hapt('tick'); ['bank', 'quick', 'det'].forEach(o => o !== k && S[o] > 0 && tween(o, 0, 260)); tween(k, 1, 520, easeOut4); }
  function closeSheets() { ['bank', 'quick', 'det'].forEach(o => S[o] > 0 && tween(o, 0, 360, ease)); }
  const packOf = (i = deckIdx()) => P[deckKeys[i]];
  function openQuick() {
    const pk = packOf(); if (!pk || pk.look) return;
    const c = current();
    $('#qpWho').textContent = 'Prepaid • ' + c.num; $('#qpPrice').textContent = '₹' + pk.price; $('#qpData').textContent = pk.data;
    $('#qpPay').textContent = 'Pay ₹' + pk.price; $('#qpOffer').textContent = applied ? applied + ' applied' : '';
    openSheet('quick');
  }
  function openDetails() {
    const pk = packOf(); if (!pk || pk.look) return;
    $('#detH').textContent = `₹${pk.price} pack details`; $('#detPay').textContent = 'Recharge ₹' + pk.price;
    const lab = pk.labels || ['data / day', 'validity', 'calls'];
    const rows = [[IC.wifi, `${pk.stats[0]} ${lab[0].toLowerCase()}`], [IC.cal, `${pk.stats[1]} validity`], [IC.phone, `${pk.stats[2]} calls`],
      ...pk.bens.map(b => [LOGO[BEN[b][0]].replace('class="logo', 'style="width:22px;height:22px;border-radius:4px" class="logo'), BEN[b][1].replace('<br>', ' ') + (BEN[b][2] ? ' • ' + BEN[b][2] : '')]),
      ...(pk.more || []).map(m => [IC.tick, m])];
    $('#detList').innerHTML = rows.map(([ic, t]) => `<div class="det-row">${ic}<span>${t}</span></div>`).join('');
    openSheet('det');
  }
  function paid() {
    const pk = packOf(), c = current();
    $('#okS').textContent = `₹${pk.price} pack activated for ${c.pad ? '+91 ' + typed : c.name}`;
    const ok = $('.ok'); ok.classList.remove('play'); void ok.offsetWidth; ok.classList.add('play');
    tween('ok', 1, 260, ease); hapt('heavy');
    clearTimeout(okT); okT = setTimeout(finish, 2600);
  }
  function finish() { clearTimeout(okT); window.flowExit && window.flowExit(); }
  function type(k) {
    if (S.bk > .5) { query = k === 'del' ? query.slice(0, -1) : (query + k).slice(0, 14); renderList(); return; }
    if (k === 'del') { typed = sample ? '' : typed.slice(0, -1); sample = false; }
    else { if (sample) { typed = ''; sample = false; } if (typed.length < 10) typed += k; else hapt('heavy'); }
    nms.forEach(n => fillName(n, n._i, true));
  }

  // ================================================================ input
  let down = null, moved = false, kind = null, vx = 0, vy = 0, lx = 0, ly = 0, lt = 0, p0 = 0, sheetK = null;
  const local = ev => { const r = root.getBoundingClientRect(), k = r.width / 375; return [(ev.clientX - r.left) / k, (ev.clientY - r.top) / k]; };
  root.addEventListener('pointerdown', ev => {
    const [x, y] = local(ev);
    down = { x, y, el: ev.target }; moved = false; kind = null; vx = vy = 0; lx = x; ly = y; lt = performance.now(); p0 = S.p;
    const b = ev.target.closest('button');
    if (b) b.classList.add(b.matches('.np button, .ak button, .row') ? 'down' : 'press');
    const sheet = ['bank', 'quick', 'det'].find(k => S[k] > .9);
    if (sheet && ev.target.closest('.sheet-b, .sheet-x, .scrim') && !ev.target.closest('.offer-more')) { kind = 'sheet'; sheetK = sheet; }
    else if (!sheet && S.bk < .5 && S.pk < .5 && S.menu < .5 && S.ok < .5 && y > 250 && y < 745 && !(S.kb > .5 && Math.round(S.p) === 0 && y > 524)) kind = 'dial';
    else if (!sheet && S.pk > .5 && S.bk < .5 && y > 205 && y < 640) kind = 'card';
  });
  root.addEventListener('pointermove', ev => {
    if (!down) return;
    const [x, y] = local(ev), dx = x - down.x, dy = y - down.y, now = performance.now();
    if (!moved && Math.hypot(dx, dy) > 7) {
      moved = true; $$('.press, .down').forEach(e => e.classList.remove('press', 'down'));
      if (kind === 'sheet' && dy < Math.abs(dx)) kind = null;
      if ((kind === 'dial' || kind === 'card') && Math.abs(dy) > Math.abs(dx) * 1.3) kind = null;
      if (kind) { dragging = true; try { root.setPointerCapture(ev.pointerId); } catch (e) {} springTo = null; }
    }
    if (!dragging) return;
    const ddt = Math.max(1, now - lt); vx = lerp(vx, (x - lx) / ddt, .4); vy = lerp(vy, (y - ly) / ddt, .4); lx = x; ly = y; lt = now;
    if (kind === 'dial') {
      let np = p0 - dx / 113; const max = contacts.length - 1;
      if (np < 0) np = -Math.pow(-np, .6) * .3; if (np > max) np = max + Math.pow(np - max, .6) * .3;
      S.p = np;
    } else if (kind === 'card') S.cd = -dx / 440;
    else if (kind === 'sheet') S[sheetK] = clamp(1 - Math.max(0, dy) / 520, 0, 1);
    kick();
  });
  const end = ev => {
    if (!down) return;
    $$('.press, .down').forEach(e => e.classList.remove('press', 'down'));
    if (dragging) {
      if (kind === 'dial') {
        const start = Math.round(p0), mv = S.p - p0, fl = -vx;
        goIndex(start + ((mv > .28 || fl > .35) ? 1 : (mv < -.28 || fl < -.35) ? -1 : 0));   // one contact per swipe
      } else if (kind === 'card') {
        const dir = S.cd - vx * .25, step = dir > .14 ? 1 : dir < -.14 ? -1 : 0, base = Math.round(S.c);
        S.c += S.cd; S.cd = 0; tween('c', base + step, 420, ease);
        if (step) hapt('snap');
      } else if (kind === 'sheet') {
        if (S[sheetK] < .82 || vy > .5) tween(sheetK, 0, 300, ease); else tween(sheetK, 1, 260, ease);
      }
    } else if (ev.type === 'pointerup' && !moved) tap(down.el);
    dragging = false; down = null; kind = null; kick();
  };
  root.addEventListener('pointerup', end); root.addEventListener('pointercancel', end);

  function tap(el) {
    const k = el.closest('[data-key]'); if (k) { hapt('tick'); type(k.dataset.key); return; }
    const ak = el.closest('[data-k]');
    if (ak) {
      hapt('tick'); const c = ak.dataset.k;
      if (c === 'del') query = query.slice(0, -1); else if (c === 'go') { const r = $('.row', list); if (r) tap(r); return; } else if (c !== 'shift') query = (query + c.toLowerCase()).slice(0, 24);
      renderList(); return;
    }
    const a = el.closest('[data-act]');
    if (!a) {
      if (S.menu > .5) { closeMenu(); return; }
      if (Math.round(S.p) === 0 && S.pk < .5 && S.bk < .5) { const open = S.kb < .5; kbClosed = !open; tween('kb', open ? 1 : 0, 340); }
      return;
    }
    switch (a.dataset.act) {
      case 'av': {
        const i = +a.dataset.i;
        if (S.pk > .5) { closePacks(); break; }
        if (i !== Math.round(S.p)) { goIndex(i); break; }
        if (i === 0) { const open = S.kb < .5; kbClosed = !open; tween('kb', open ? 1 : 0, 340); hapt('tick'); } else openPacks();
        break;
      }
      case 'packs': openPacks(); break;
      case 'dial': closePacks(); break;
      case 'exit': hapt('tick'); finish(); break;
      case 'bank': openSheet('bank'); break;
      case 'book': openBook(); break;
      case 'enter': hapt('tick'); if (S.bk > .5) closeBook(true); else { kbClosed = false; springP(0); } break;
      case 'close': hapt('tick'); if (S.bk > .5) closeBook(false); else goIndex(1); break;
      case 'kb': hapt('tick'); setKb(a.dataset.kb === '123' && kbMode === '123' ? 'abc' : a.dataset.kb); break;
      case 'pick': hapt('snap'); typed = a.dataset.num; sample = false; nms.forEach(n => fillName(n, n._i, true)); kbClosed = true; tween('bk', 0, 420); tween('kb', 0, 200); springP(0); break;
      case 'rel': hapt('tick'); $$('#relMenu button').forEach(b => b.classList.toggle('on', b.dataset.rel === rels[Math.round(S.p)])); tween('menu', S.menu > .5 ? 0 : 1, 220, ease); break;
      case 'pickrel': hapt('snap'); rels[Math.round(S.p)] = a.dataset.rel; closeMenu(); toast(`${current().name} saved as ${a.dataset.rel}`); break;
      case 'tab': hapt('tick'); closeSheets(); setTab(a.dataset.tab); break;
      case 'pay': openQuick(); break;
      case 'details': openDetails(); break;
      case 'dismiss': hapt('tick'); closeSheets(); break;
      case 'offer': {
        hapt('tick'); const o = a.closest('.offer'), m = $('.offer-more', o), open = !o.classList.contains('open');
        $$('.offer.open').forEach(x => { if (x !== o) { x.classList.remove('open'); $('.offer-more', x).style.height = '0px'; } });
        o.classList.toggle('open', open); m.style.height = open ? m.scrollHeight + 'px' : '0px'; break;
      }
      case 'useoffer': {
        hapt('snap'); applied = $('i', a.closest('.offer')).textContent + ' offer';
        toast('Offer will be applied at payment'); if (S.pk > .5 && !packOf().look) setTimeout(openQuick, 260); else closeSheets(); break;
      }
      case 'confirm': tween('quick', 0, 280, ease, paid); break;
      case 'okdone': finish(); break;
    }
  }

  // ================================================================ entry
  window.Flow = {
    state: S, render,
    enter(i = 1) {
      for (const k in anims) anims[k] = null; springTo = null; vel = 0; clearTimeout(okT);
      Object.assign(S, { pk: 0, kb: 0, bk: 0, num: 0, bank: 0, quick: 0, det: 0, ok: 0, menu: 0, cd: 0, shut: 0, deckIn: 1, intro: 0, p: i + .9 });
      query = ''; renderList(); setKb('abc'); setTab('rec', true); kbClosed = false; applied = null;
      $$('.offer.open').forEach(x => { x.classList.remove('open'); $('.offer-more', x).style.height = '0px'; });
      lastRot = -(S.p - 1) * 22.5; tickAcc = 0; render();
      setTimeout(() => { tween('intro', 1, 950, t => t); springP(i); }, 240);
    },
  };
  render();
})();
