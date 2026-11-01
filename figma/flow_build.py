"""Assemble the recharge flow screen (contact dial -> packs -> quick pay, enter number, phonebook, bank offers)
from the Figma exports. Static parts are the converted Figma layers at their Figma positions; flow.js animates them.

Figma frames (file rGZTE0UxCKIhtcJ9Em2QNn): dial Harshit 81554:160472 (figma/dial.jsx), packs 81554:154187
(figma/packs.jsx), cards 155811/156759/157719/158670/159615, phonebook 161480, keyboard 161506."""
import os, re, subprocess, sys

fig = os.path.dirname(os.path.abspath(__file__))


def convert(jsx, adir):
    env = dict(os.environ, KEEP_IDS='1')
    return subprocess.run([sys.executable, f'{fig}/convert.py', f'{fig}/{jsx}', adir], capture_output=True,
                          text=True, check=True, env=env).stdout


def take(h, nid=None, marker=None):
    """the element whose opening tag carries data-n=nid (or contains marker), balanced on div/a/p"""
    i = h.index(f'data-n="{nid}"' if nid else marker)
    i = h.rindex('<', 0, i)
    depth = 0
    for m in re.finditer(r'<(/?)(div|a|p)\b[^>]*?>', h[i:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return h[i:i + m.end()]
    raise ValueError(nid or marker)


def clean(t):
    return re.sub(r' data-n="[^"]*"', '', t)


def layer(name, inner, cls=''):
    return f'<div class="L {cls}" id="L-{name}">\n{inner}\n</div>'


def apify(ap):
    """'ap' and its four tick rings are display:contents groups in the export; give them real full-frame boxes so
    they can rotate (children keep their frame coordinates because the boxes start at the frame origin)."""
    ap = ap.replace('class="absolute contents left-[-55.19px] top-[462.03px]"', 'class="absolute inset-0 apw"', 1)
    # the four ring groups are the direct 'absolute contents' children of ap
    out, depth, i = [], 0, 0
    for m in re.finditer(r'<(/?)div\b([^>]*)>', ap):
        if m.group(1):
            depth -= 1
            continue
        if depth == 1 and 'class="absolute contents' in m.group(2):
            out.append((m.start(), m.end()))
        depth += 1
    for s, e in reversed(out):
        tag = ap[s:e]
        tag = re.sub(r'class="absolute contents[^"]*"', 'class="absolute inset-0 apr"', tag)
        ap = ap[:s] + tag + ap[e:]
    return ap


# ---------------------------------------------------------------- pack cards
C = 'assets/flow/cards'
CHECK = f'<img alt="" class="absolute left-[235px] size-[20px]" src="{C}/check.svg"'


def logo(kind):
    if kind == 'adobe':
        return (f'<div class="-translate-y-1/2 absolute aspect-square left-0 right-0 top-1/2"><img alt="" class="absolute block inset-0 max-w-none size-full" src="{C}/adobe-bg.svg"></div>'
                f'<div class="absolute inset-[4.98%_4.61%_4.57%_4.95%] mask-no-repeat mask-intersect mask-position-[2.812px_2.79px,_0.056px_0.032px] mask-size-[16px_16.029px,_21.513px_21.544px]" style="-webkit-mask-image:url({C}/adobe-m1.svg),url({C}/adobe-m2.svg);mask-image:url({C}/adobe-m1.svg),url({C}/adobe-m2.svg)"><div class="absolute inset-0 overflow-hidden"><img alt="" class="absolute left-0 top-0 max-w-none size-full" src="{C}/adobe.png"></div></div>')
    if kind == 'spam':
        return (f'<div class="absolute inset-[-1.73%_0] mask-alpha mask-no-clip mask-no-repeat mask-size-[100%_100%]" style="-webkit-mask-image:url({C}/spam-mask.svg);mask-image:url({C}/spam-mask.svg)"><div class="absolute inset-0 overflow-hidden"><img alt="" class="absolute h-[100.74%] left-[-2.11%] max-w-none top-[-0.74%] w-[104.23%]" src="{C}/spam.png"></div></div>')
    if kind == 'hellotunes':
        return (f'<div class="-translate-y-1/2 absolute aspect-square left-0 right-0 top-1/2"><img alt="" class="absolute block inset-0 max-w-none size-full" src="{C}/hellotunes-bg.svg"></div>'
                f'<div class="absolute inset-[8.33%] rounded-[5.333px] overflow-hidden"><img alt="" class="absolute left-[12.1%] max-w-none size-[75.03%] top-[12.5%]" src="{C}/hellotunes.png"></div>')
    img = {'jio': 'jiohotstar.png', 'xstream': 'xstream.png', 'apple': 'applemusic.png'}[kind]
    return (f'<div class="absolute inset-0 mask-alpha mask-no-clip mask-no-repeat mask-size-[100%_100%] rounded-[5.333px]" style="-webkit-mask-image:url({C}/jh-mask.svg);mask-image:url({C}/jh-mask.svg)"><img alt="" class="absolute inset-0 max-w-none object-cover rounded-[5.333px] size-full" src="{C}/{img}"></div>')


def benefit(kind, title, sub=None):
    t = title.replace('\n', '<br>')
    txt = 'font-[Inter] font-semibold leading-[normal] text-[12px] text-[#292c31] whitespace-nowrap'
    if sub:
        body = (f'<p class="absolute left-[41px] top-0 {txt}">{t}</p>'
                f'<p class="absolute left-[41px] top-[17.5px] font-[Inter] font-normal leading-[normal] text-[12px] text-[#87888a] whitespace-nowrap">{sub}</p>'
                f'{CHECK} style="top:7.5px">')
    elif '\n' in title:
        body = f'<p class="absolute left-[41px] top-0 {txt}">{t}</p>{CHECK} style="top:6px">'
    else:
        body = f'<p class="absolute left-[41px] top-1/2 -translate-y-1/2 {txt}">{t}</p>{CHECK} style="top:6px">'
    return f'<div class="relative h-[32px] w-[259px] shrink-0"><div class="absolute left-0 top-0 relative rounded-[5.333px] size-[32px]">{logo(kind)}</div>{body}</div>'


TAGS = {
    'grey': 'bg-[#e6e9ef] border-[#8e9aa9] text-[#292c31]',
    'yellow': 'bg-[#fff0b8] border-[#ffe48a] text-[#8f4c00]',
}


def card(i, price, tag, stats, benefits, cta, top, more=False):
    tag_html = ''
    if tag:
        tag_html = (f'<div class="absolute right-[23px] top-[37px] border border-solid rounded-[20px] px-[12px] py-[4px] {TAGS[tag[1]]}">'
                    f'<p class="font-[Inter] font-bold italic text-[11px] leading-[14px] whitespace-nowrap">{tag[0]}</p></div>')
    cols = ''
    for x, icon, val, lab in zip((61.5, 147.5, 239.5), ('wifi', 'calendar', 'phone'), stats, ('Data/day', 'Validity', 'Calls')):
        cols += (f'<img alt="" class="absolute size-[16px] top-[82px]" style="left:{x - 8}px" src="{C}/{icon}.svg">'
                 f'<p class="absolute -translate-x-1/2 top-[106px] font-[Inter] font-semibold leading-[16px] text-[14px] text-[#292c31] whitespace-nowrap" style="left:{x}px">{val}</p>'
                 f'<p class="absolute -translate-x-1/2 top-[126px] font-[Inter] font-normal leading-[14px] text-[12px] text-[#696b6f] whitespace-nowrap" style="left:{x}px">{lab}</p>')
    cols += f'<img alt="" class="absolute left-[103px] top-[97.5px] h-[32px] w-[1px]" src="{C}/sep.svg"><img alt="" class="absolute left-[190px] top-[97.5px] h-[32px] w-[1px]" src="{C}/sep.svg">'
    more_html = ''
    if more:
        more_html = (f'<p class="absolute -translate-x-1/2 left-[calc(50%-10.5px)] top-[299px] font-[Inter] font-medium leading-[16px] text-[12px] text-[#075ee8] whitespace-nowrap">+2 more benefits </p>'
                     f'<img alt="" class="absolute left-[198px] top-[299px] size-[16px]" src="{C}/caret.svg">')
    rows = ''.join(benefit(*b) for b in benefits)
    num_cls = 'font-black not-italic' if price == '349' else ''
    return f'''<div class="card-face absolute inset-0 bg-gradient-to-b border border-[#cdd3dd] border-solid from-[white] overflow-clip rounded-[16px] shadow-[0px_5px_5.62px_0px_rgba(180,180,180,0.2)] to-[#f5f5f5]">
  <div class="-translate-y-1/2 absolute flex flex-col justify-center leading-[0] left-[24px] top-[40px] font-[Inter] font-black italic text-[40px] text-[#292c31] whitespace-nowrap"><p><span class="font-semibold italic leading-[normal]">₹</span><span class="leading-[normal] {num_cls}">{price}</span></p></div>
  {tag_html}{cols}
  <div class="absolute left-[24px] flex flex-col gap-[16px]" style="top:{top}px">{rows}</div>
  {more_html}
  <a class="card-cta absolute left-[23px] top-[330px] w-[259px] h-[48px] rounded-[12px] border border-solid border-[#292c31] bg-gradient-to-t from-[black] to-[#2d2b2b] flex items-center justify-center" data-act="pay"><p class="font-[Inter] font-medium text-[14px] leading-[16px] text-white whitespace-nowrap">{cta}</p></a>
</div>'''


def looking_card():
    tile = 'bg-gradient-to-b border border-[#cdd3dd] border-solid from-[white] h-[140px] overflow-clip relative rounded-[16px] shrink-0 to-[#f5f5f5] w-[110px]'
    lab = 'absolute font-[Inter] font-medium leading-[16px] text-[#374150] text-[12px] whitespace-nowrap'
    return f'''<div class="card-face absolute inset-0 bg-gradient-to-b border border-[#cdd3dd] border-solid from-[white] overflow-clip rounded-[16px] shadow-[0px_5px_5.62px_0px_rgba(180,180,180,0.2)] to-[#f5f5f5]">
  <a class="card-cta -translate-x-1/2 absolute left-1/2 top-[330px] w-[259px] h-[48px] rounded-[12px] border border-solid border-[#292c31] bg-gradient-to-t from-[black] to-[#2d2b2b] flex items-center justify-center" data-act="explore"><p class="font-[Inter] font-medium text-[14px] leading-[16px] text-white whitespace-nowrap">Explore More Packs</p></a>
  <img alt="" class="absolute left-[225.53px] size-[89.745px] top-[-5.15px] max-w-none" src="{C}/question.png">
  <div class="absolute flex gap-[12px] items-center left-[23px] top-[163px]">
    <div class="{tile}"><div class="absolute h-[77.312px] left-[10.76px] mix-blend-multiply rounded-[10px] top-[51.02px] w-[88.471px] overflow-hidden"><img alt="" class="absolute h-[864.73%] left-[-57.9%] max-w-none top-[-412.55%] w-[590.57%]" src="{C}/cat-1.png"></div><p class="{lab} left-[10.76px] top-[12.02px]">International<br>roaming Packs</p></div>
    <div class="{tile}"><div class="absolute h-[77.312px] left-[9.73px] mix-blend-multiply top-[49.28px] w-[88.545px] overflow-hidden"><img alt="" class="absolute h-[864.73%] left-[-196.87%] max-w-none top-[-412.55%] w-[590.08%]" src="{C}/cat-2.png"></div><p class="{lab} left-[9.73px] top-[9.28px]">Data Topup<br>Packs</p></div>
    <div class="{tile}"><p class="{lab} left-[11.98px] top-[3.66px]">Monthly<br>Packs</p><div class="absolute h-[77.312px] left-[11.98px] mix-blend-multiply top-[48.66px] w-[47.199px] overflow-hidden"><img alt="" class="absolute h-[864.73%] left-[-590.82%] max-w-none top-[-412.55%] w-[1106.99%]" src="{C}/cat-2.png"></div></div>
  </div>
  <p class="absolute font-[Inter] font-extrabold leading-[normal] left-[calc(50%-126.97px)] text-[26px] text-black top-[15px] whitespace-nowrap">Looking for<br>other plans?</p>
  <p class="absolute font-[Inter] font-normal leading-[normal] left-[calc(50%-126.97px)] text-[14px] text-black top-[102px] whitespace-nowrap">Which type of plans you want<br>to see?</p>
</div>'''


# ---------------------------------------------------------------- phonebook + alphabetic keyboard (Figma 161480 / 161506)
CONTACTS = ['Aakash Gupta', 'Abhishek Pawar', 'Amit Yadav', 'Anjali Patil', 'Anurag Singhania', 'Arvind Kumar Yadav',
            'Ashish Chaudhary', 'Chitra Patil', 'Deepak Sharma']


def phonebook():
    rows = ''.join(f'''<a class="bk-row flex items-start gap-[8px] px-[16px] py-[16px] w-full" data-num="9876543210" data-name="{n}">
  <div class="relative size-[40px] shrink-0"><div class="absolute inset-0 bg-[#e6f0ff] border border-solid border-[#9cbff6] rounded-[100px] flex items-center justify-center"><img alt="" class="size-[20px]" src="assets/flow/book/user.svg"></div></div>
  <div class="flex flex-col gap-[4px]"><p class="font-[Inter] font-semibold text-[16px] leading-[18px] text-[#292c31] whitespace-nowrap">{n}</p><p class="font-[Inter] font-normal text-[12px] leading-[18px] text-[#292c31]">9876543210</p></div>
</a>''' for n in CONTACTS)
    return f'''<div class="absolute bg-white border border-[#d0caca] border-solid h-[769px] left-0 rounded-tl-[24px] rounded-tr-[24px] top-[137.96px] w-[375px]">
  <p class="-translate-x-1/2 -translate-y-1/2 absolute font-[Inter] font-bold text-[18px] leading-[20px] text-black left-[186.5px] top-[33.62px] whitespace-nowrap">Recharge any number</p>
</div>
<div class="bk-list absolute left-0 top-[271.58px] w-[375px] bottom-0 overflow-y-auto bg-white flex flex-col gap-[8px]">{rows}<div class="bk-empty hidden px-[16px] py-[24px] font-[Inter] text-[14px] text-[#696b6f]">No contacts found</div></div>
<div class="-translate-x-1/2 absolute bg-white border border-[#d5dbde] border-solid flex items-center left-1/2 px-[12px] py-[8px] rounded-[70px] top-[206.96px] w-[343px] h-[40px]">
  <img alt="" class="size-[16px]" src="assets/flow/book/search.svg"><p class="bk-q ml-[8px] font-[Inter] font-normal leading-[24px] text-[12px] text-black tracking-[-0.12px] whitespace-nowrap"><span class="bk-ph">Search Name or Number</span><span class="bk-text"></span><span class="bk-caret"></span></p>
</div>
<div class="bk-mode absolute bg-[#e7e7e7] h-[32px] left-[262.16px] rounded-[70px] top-[210.96px] w-[93px]">
  <i class="bk-knob absolute bg-black border border-solid border-[#d5dbde] h-[28px] w-[49px] rounded-[70px] top-[2px] left-[2px]"></i>
  <a class="bk-abc absolute left-[2px] top-[2px] w-[49px] h-[28px] flex items-center justify-center font-[Inter] font-semibold text-[12px] tracking-[-0.12px]" data-kb="abc">ABC</a>
  <a class="bk-123 absolute left-[51px] top-[2px] w-[40px] h-[28px] flex items-center justify-center font-[Inter] font-normal text-[12px] tracking-[-0.12px]" data-kb="123">123</a>
</div>'''


KEY = 'kb-key bg-white flex flex-[1_0_0] items-center justify-center min-w-px p-[7px] rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d] text-[22px] leading-[28px] text-black'
KEYG = 'kb-key bg-[#adb3bc] flex items-center justify-center rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]'
SHIFT = '<svg width="19" height="17" viewBox="0 0 19 17"><path d="M9.5 1 1 9.6h4.6V16h7.8V9.6H18L9.5 1Z" fill="black"/></svg>'
DEL = '<svg width="23" height="17" viewBox="0 0 23 17" fill="none"><path d="M7.2 1h13.3A1.5 1.5 0 0 1 22 2.5v12a1.5 1.5 0 0 1-1.5 1.5H7.2L1 8.5 7.2 1Z" stroke="black" stroke-width="1.6" stroke-linejoin="round"/><path d="m11 5.5 6 6m0-6-6 6" stroke="black" stroke-width="1.6" stroke-linecap="round"/></svg>'


def alpha_keyboard():
    row = lambda keys, pad='': f'<div class="flex gap-[5px] w-full {pad}">' + ''.join(f'<a class="{KEY}" data-k="{k}">{k}</a>' for k in keys) + '</div>'
    sugg = '<p class="flex-[1_0_0] text-center text-[17px] leading-[20px] text-[#3a3b3d]">Suggest</p>'
    sep = '<i class="h-[24px] w-px bg-[#b0b3b8]"></i>'
    return f'''<div class="kb-alpha absolute left-0 bottom-0 w-[375px] font-[-apple-system,'SF_Pro_Text',Inter,sans-serif] backdrop-blur-[10px] bg-[rgba(204,206,211,0.94)]">
  <div class="flex items-center pt-[10px] px-px h-[44px]">{sugg}{sep}{sugg}{sep}{sugg}</div>
  <div class="flex flex-col gap-[12px] px-[3px] py-[8px]">
    {row('QWERTYUIOP')}{row('ASDFGHJKL', 'px-[18px]')}
    <div class="flex gap-px w-full"><a class="{KEY.replace('flex-[1_0_0] ', 'shrink-0 ')} size-[42px] p-[11px]" data-k="shift">{SHIFT}</a><div class="flex flex-[1_0_0] gap-[5px] px-[13px]">{''.join(f'<a class="{KEY}" data-k="{k}">{k}</a>' for k in 'ZXCVBNM')}</div><a class="{KEYG} size-[42px] shrink-0" data-k="del">{DEL}</a></div>
    <div class="flex gap-[6px] w-full"><a class="{KEYG} h-[42px] w-[87px] text-[16px]" data-kb="123">123</a><a class="{KEY.replace('text-[22px] leading-[28px]', 'text-[16px] leading-[21px]')} h-[42px]" data-k=" ">space</a><a class="{KEYG} h-[42px] w-[88px] text-[16px]" data-k="go">Go</a></div>
  </div>
  <div class="h-[70px] flex items-end justify-center pb-[9px]"><i class="bg-black h-[5px] rounded-[5px] w-[134px]"></i></div>
</div>'''


# ---------------------------------------------------------------- the screen
def flow_html():
    d = convert('dial.jsx', 'assets/flow/dial')
    p = convert('packs.jsx', 'assets/flow/packs')
    L = []
    hdr = clean(take(d, '81554:160548'))
    hdr = hdr.replace('<div class="absolute left-[16.43px] size-[40px] top-[16px]">', '<div data-act="exit" class="absolute left-[16.43px] size-[40px] top-[16px] cursor-pointer">', 1)
    hdr = hdr.replace('<a class="absolute contents cursor-pointer left-[318.57px] top-[16px]">', '<a data-act="book" class="absolute contents cursor-pointer left-[318.57px] top-[16px]">', 1)
    hdr = hdr.replace('<a class="absolute contents cursor-pointer left-[108.7px] top-[15.5px]">', '<a data-act="bank" class="hdr-pill absolute contents cursor-pointer left-[108.7px] top-[15.5px]">', 1)
    assert hdr.count('data-act=') == 3
    L.append(layer('hdr', hdr))
    L.append(layer('pname', '''<p class="pn-name -translate-x-1/2 -translate-y-1/2 absolute font-[Inter] font-extrabold text-[16px] leading-[18px] text-black left-[188px] top-[86px] tracking-[0.64px] whitespace-nowrap">Harshit</p>
<p class="pn-num -translate-x-1/2 -translate-y-1/2 absolute font-[Inter] font-normal text-[12px] leading-[18px] text-[rgba(1,39,82,0.8)] left-[187.5px] top-[109px] tracking-[0.24px] whitespace-nowrap">+91 9864309723</p>'''))
    L.append(layer('name', '''<div class="nm-slot" data-s="a"><p class="nm-name">Harshit</p><p class="nm-num">9864309723</p></div>
<div class="nm-slot" data-s="b"><p class="nm-name"></p><p class="nm-num"></p></div>'''))
    L.append(layer('big1', clean(take(d, '81554:160567'))))
    L.append(layer('ap', apify(clean(take(d, '81554:160568')))))
    L.append(layer('big2', clean(take(d, '81554:160717'))))
    L.append(layer('fade', clean(take(d, '81554:160718'))))
    L.append(layer('needle', clean(take(d, '81554:160721')).replace('<a class="absolute block cursor-pointer', '<a data-act="packs" class="go-btn absolute block cursor-pointer', 1)))
    L.append(layer('tap', clean(take(d, '81554:160729'))))
    L.append(layer('hint', clean(take(d, '81554:160730'))))
    L.append(layer('rel', clean(take(d, '81554:160736'))))
    L.append(layer('glow', clean(take(d, '81554:160740'))))
    L.append(layer('avatars', ''))
    L.append(layer('pfees', clean(take(p, '81554:154428'))))
    L.append(layer('dots', clean(take(p, '81554:154447'))))
    L.append(layer('tabs', clean(take(p, '81554:154195'))))
    L.append(layer('pback', clean(take(p, '81554:154188')).replace('class="absolute left-[16px]', 'data-act="dial" class="absolute left-[16px] cursor-pointer', 1)))
    L.append(layer('psearch', clean(take(p, '81554:154219')).replace('class="absolute contents', 'data-act="book" class="absolute contents cursor-pointer', 1)))
    # card stack: two blank plates behind, then the six cards (₹399 straight from Figma, the rest templated from its siblings)
    c399 = clean(take(p, '81554:154455'))
    c399 = c399.replace('absolute bg-gradient-to-b', 'card-face absolute inset-0 bg-gradient-to-b', 1)
    c399 = re.sub(r' h-\[403px\] left-\[34px\]', '', c399, count=1).replace(' top-[213.54px] w-[307px]"', '"', 1)
    c399 = c399.replace('mask-size-[24px_23.999px]', 'mask-size-[100%_100%]')
    c399 = c399.replace('<a class="absolute bg-gradient-to-t', '<a data-act="pay" class="card-cta absolute bg-gradient-to-t', 1)
    cards = [c399,
             card(1, '199', ('Last recharge', 'grey'), ('1.5 GB', '28 days', 'Unlimited'),
                  [('adobe', 'Adobe Express \nPremium'), ('spam', 'Safe \nNetwork'), ('xstream', 'Airtel Xstream Play', 'free content')], 'Repeat Recharge', 166),
             card(2, '449', ('Cricket Pack', 'yellow'), ('4 GB', '28 days', 'Unlimited'),
                  [('jio', 'JioHotstar Mobile', 'for 28 days'), ('adobe', 'Adobe Express \nPremium'), ('xstream', 'Airtel Xstream Play', 'free content')], 'Recharge Now', 155, more=True),
             card(3, '299', None, ('1.5 GB', '28 days', 'Unlimited'),
                  [('adobe', 'Adobe Express \nPremium'), ('spam', 'Safe \nNetwork'), ('hellotunes', 'Hellotunes')], 'Recharge Now', 155),
             card(4, '349', None, ('1.5 GB', '28 days', 'Unlimited'),
                  [('adobe', 'Adobe Express \nPremium'), ('hellotunes', 'Hellotunes'), ('apple', 'Apple Music', 'for 6 months')], 'Recharge Now', 155, more=True),
             looking_card()]
    stack = ''.join(f'<div class="card" data-i="{i}">{c}</div>' for i, c in enumerate(cards))
    L.append(layer('cards', f'<div class="cards-wrap">{stack}</div>'))
    L.append(layer('toggle', '''<div class="tg absolute bg-white border border-[rgba(213,219,222,0.6)] border-solid h-[40px] left-[16.25px] rounded-[70px] top-[59.8px] w-[284px]">
  <i class="tg-knob absolute bg-black h-[32px] left-[3px] rounded-[70px] top-[3px] w-[139px]"></i>
  <a class="tg-enter absolute left-[3px] top-[3px] w-[139px] h-[32px] flex items-center justify-center gap-[4px]" data-act="enter"><img alt="" class="size-[16px]" src="assets/flow/dial/imgGridNine.svg"><span class="font-[Inter] font-medium text-[12px] leading-[24px]">Enter Number</span></a>
  <a class="tg-book absolute left-[142px] top-[3px] w-[139px] h-[32px] flex items-center justify-center gap-[4px]" data-act="book"><img alt="" class="size-[16px]" src="assets/flow/dial/imgAddressBook.svg"><span class="font-[Inter] font-medium text-[12px] leading-[24px]">Phonebook</span></a>
</div>'''))
    L.append(layer('cross', '''<a class="absolute left-[318.75px] top-[59.8px] size-[40px] rounded-full bg-white border border-solid border-[rgba(213,219,222,0.8)] flex items-center justify-center" data-act="close"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15.6 4.4 4.4 15.6M4.4 4.4l11.2 11.2" stroke="#292c31" stroke-width="1.6" stroke-linecap="round"/></svg></a>'''))
    L.append(layer('book', phonebook()))
    L.append(layer('numkb', clean(take(d, marker='bottom-[-419.96px]')).replace('bottom-[-419.96px]', 'bottom-0', 1)))
    L.append(layer('alphakb', alpha_keyboard()))
    L.append(layer('scrim', '<a class="absolute inset-0" data-act="dismiss"></a>'))
    # the dial frame's copy of the sheet says "Offers"; the Bank Offers frame (81554:162719) titles it "Bank Offers"
    L.append(layer('bank', clean(take(d, '81554:160799')).replace('<p class="leading-[normal]">Offers</p>', '<p class="leading-[normal]">Bank Offers</p>', 1)))
    L.append(layer('quick', clean(take(p, '81554:154518'))))
    L.append(layer('status', clean(take(d, '81554:160842'))))
    return '<div class="flow-stage" id="flowStage" data-mode="dial">\n' + '\n'.join(L) + '\n</div>'


if __name__ == '__main__':
    print(flow_html())
