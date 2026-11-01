"""Rebuild index.html + screen.css from the Figma exports in figma/*.jsx.
Screens: Manage Family (81554:162131) -> Prepaid (81554:163094) -> Recharge Success (81554:163091)."""
import os, re, subprocess, sys
fig = os.path.dirname(os.path.abspath(__file__)); root = os.path.dirname(fig)

def convert(jsx, adir):
    return subprocess.run([sys.executable, f'{fig}/convert.py', f'{fig}/{jsx}', adir], capture_output=True, text=True, check=True).stdout

def take(html, marker):
    """cut out the element whose opening tag contains marker (balanced <div>s); returns (element, html without it)"""
    i = html.index(marker); i = html.rindex('<div', 0, i)
    depth, j = 0, i
    for m in re.finditer(r'<(/?)div\b', html[i:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            j = i + m.end() + html[i + m.end():].index('>') + 1; break
    return html[i:j], html[:i] + html[j:]

def indent(t, n):
    return '\n'.join(' ' * n + l if l.strip() else '' for l in t.strip('\n').split('\n'))

def replace1(t, a, b):
    assert a in t, f'build.py: marker not found: {a[:60]}'
    return t.replace(a, b, 1)

# ---- Manage Family: root stays the 375x812 Figma frame (children use calc(50% ...) against it); .fh (2259px) scrolls
fam = convert('screen.jsx', 'assets')
fam = replace1(fam, '<div class="bg-white relative size-full">', '<div class="bg-white relative w-[375px] h-[812px]">')
# hooks for the hand-tuned overrides in styles.css
fam = replace1(fam, 'size-full" src="assets/imgEllipse19119.svg">', 'size-full glow" src="assets/imgEllipse19119.svg">')
fam = replace1(fam, 'size-full" src="assets/imgEllipse19118.svg">', 'size-full glow" src="assets/imgEllipse19118.svg">')
fam = replace1(fam, 'content-stretch flex flex-col gap-[4px] h-[76px] items-center', 'sheet-text content-stretch flex flex-col gap-[4px] h-[76px] items-center')
# "Offers for you" is a 626px row inside the 375 frame: swipeable carousel, same start position as Figma
fam = replace1(fam, 'items-start left-[16px] top-[1291.08px] w-[626px]', 'items-start left-0 top-[1291.08px] w-[375px] px-[16px] offers')

# ---- Prepaid: content runs to y=1424; the filter bar is pinned to the bottom of the screen
pre = convert('prepaid.jsx', 'assets/prepaid')
pre = replace1(pre, '<div class="bg-white relative size-full">', '<div class="bg-white relative w-[375px] h-[812px]">')
# Figma strokes don't add to a box's size; CSS borders do (2px per card, adding up down the list).
# On auto-height boxes, draw the stroke as an inset shadow instead.
def stroke_inset(m):
    c = m.group(1)
    if re.search(r'(^| )(h-\[|size-\[|h-full|size-full)', c): return m.group(0)
    mm = re.search(r'(?:^| )border(?:-\[length:1px\])? border-\[([^\]]+)\] border-solid', c)
    if not mm: return m.group(0)
    inset = f'inset_0_0_0_1px_{mm.group(1)}'
    c = c.replace(mm.group(0).strip(), '')
    sh = re.search(r'(^| )shadow-\[([^\]]+)\]', c)
    c = c.replace(sh.group(0), f' shadow-[{sh.group(2)},{inset}]') if sh else c + f' shadow-[{inset}]'
    return 'class="' + re.sub(r'\s+', ' ', c).strip() + '"'
pre = re.sub(r'class="([^"]*)"', stroke_inset, pre)
bar, pre = take(pre, 'bottom-0 drop-shadow-[0px_4px_6.5px_rgba(133,140,143,0.1)] h-[97px]')
bar = replace1(bar, 'bottom-0 drop-shadow', 'top-0 drop-shadow')
pre = replace1(pre, '<a class="absolute block cursor-pointer left-[15.5px] size-[40px] top-[77.5px]">', '<a class="absolute block cursor-pointer left-[15.5px] size-[40px] top-[77.5px] tap" data-go="back" aria-label="Back">')

# ---- Recharge flow (contact dial, packs, quick pay, enter number, phonebook, bank offers): figma/flow_build.py
sys.path.insert(0, fig)
import flow_build
flow = flow_build.flow_html()

# ---- Recharge success
suc = convert('success.jsx', 'assets/success')
suc = replace1(suc, '<div class="bg-[#f5f6fa] relative size-full">', '<div class="bg-[#f5f6fa] relative w-[375px] h-[812px] overflow-hidden">')

screens = f'''    <section class="screen active" id="family" aria-label="Manage Family">
      <div class="scroll">
        <div class="fh" style="height:2259px">
{indent(fam, 10)}
        </div>
      </div>
    </section>
    <section class="screen" id="prepaid" aria-label="Recharge for Harshit">
      <div class="scroll">
        <div class="fh" style="height:1521px">
{indent(pre, 10)}
        </div>
      </div>
      <div class="dock">
{indent(bar, 8)}
      </div>
    </section>
    <section class="screen" id="flow" aria-label="Recharge for a family member">
      <div class="scroll">
        <div class="fh">
{indent(flow, 10)}
        </div>
      </div>
    </section>
    <section class="screen" id="success" aria-label="Recharge successful">
      <div class="scroll">
        <div class="fh" style="height:812px">
{indent(suc, 10)}
        </div>
      </div>
    </section>'''
page = open(f'{fig}/shell.html').read().replace('{{SCREENS}}', screens)
open(f'{root}/index.html', 'w').write(page)
tw = os.environ.get('TAILWIND', 'tailwindcss')
subprocess.run([tw, '-i', f'{fig}/tw.css', '-o', f'{root}/screen.css', '--minify'], cwd=fig, check=True)
