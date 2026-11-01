"""Convert Figma MCP React+Tailwind output into static HTML (Tailwind classes kept, compiled by build.py).
usage: convert.py screen.jsx asset_dir"""
import re, sys

src = open(sys.argv[1]).read()
adir = sys.argv[2].rstrip('/')
consts = {n: u.rsplit('.', 1)[1] for n, u in re.findall(r'const (\w+) = "(https://www\.figma\.com/api/mcp/asset/[^"]+)"', src)}

# inline helper components: function Name(...) { return ( BODY ); }  ->  <Name className="x" />
helpers = {m.group(1): m.group(2) for m in re.finditer(r'^function (\w+)\([^\n]*\{\n  return \(\n(.*?)\n  \);\n\}', src, re.M | re.S)}
def inline(m):
    name, cls = m.group(1), m.group(3)
    body = helpers[name].strip()
    return re.sub(r'className=\{className \|\| "([^"]*)"\}', lambda d: f'className="{cls if cls is not None else d.group(1)}"', body, count=1)
for _ in range(3):
    src = re.sub(r'<(' + '|'.join(helpers) + r')(\s+className="([^"]*)")?\s*/>', inline, src) if helpers else src

# boolean props default to true in the exported helpers: keep the conditional block's content
src = re.sub(r'\{\w+ && \(\n(.*?)\n\s*\)\}', r'\1', src, flags=re.S)
# SF Symbols have no web equivalent: draw the one Figma uses here (keyboard delete key)
src = re.sub(r'<SFSymbol>\{`Image\(systemName: "delete.left"\)`\}</SFSymbol>',
  '<svg width="23" height="17" viewBox="0 0 23 17" fill="none"><path d="M7.2 1h13.3A1.5 1.5 0 0 1 22 2.5v12a1.5 1.5 0 0 1-1.5 1.5H7.2L1 8.5 7.2 1Z" stroke="black" stroke-width="1.6" stroke-linejoin="round"/><path d="m11 5.5 6 6m0-6-6 6" stroke="black" stroke-width="1.6" stroke-linecap="round"/></svg>', src)
lines = src.split('\n')
a = next(i for i, l in enumerate(lines) if l.startswith('export default function'))
body = '\n'.join(lines[a + 2:])
s = body[:body.rindex(');')]

WEIGHT = {'bold': 'font-bold', '700': 'font-bold', 'semibold': 'font-semibold', 'semi_bold': 'font-semibold', '600': 'font-semibold',
          'medium': 'font-medium', '500': 'font-medium', 'regular': 'font-normal', '400': 'font-normal',
          'bold_italic': 'font-bold italic', 'medium_italic': 'font-medium italic', 'semibold_italic': 'font-semibold italic', 'semi_bold_italic': 'font-semibold italic',
          'black_italic': 'font-black italic', 'extra_bold_italic': 'font-extrabold italic', 'extra_bold': 'font-extrabold',
          'black': 'font-black', '800': 'font-extrabold', '900': 'font-black', 'italic': 'font-normal italic'}

def fix_classes(c):
    c = c.replace('\\/', '/')
    def fam(m):
        return 'font-[Inter] ' + WEIGHT[m.group(1).lower().replace(' ', '_')]
    c = re.sub(r"font-\[family-name:var\(--typography/font/family,'Inter:([^']+)'\)\]", fam, c)
    c = re.sub(r"font-\['Inter:([^']+)'\]", fam, c)
    c = re.sub(r"font-\[var\(--typography/style/[^\]]*italic[^\]]*\)\]", 'italic', c)
    c = re.sub(r"font-\[var\(--typography/(?:weight|style)/[^\]]*\)\]", '', c)
    for _ in range(3):  # Figma token vars contain '/', keep only their fallbacks
        c = re.sub(r'var\(--[^,()]+,((?:[^()]|\([^()]*\))*)\)', r'\1', c)
    return re.sub(r'\s+', ' ', c).strip()

def style(m):  # JSX style object -> CSS (values may be "..", '..' or `..` strings with escapes)
    out = []
    for k, q, v, bare in re.findall(r'(\w+):\s*(?:(["\'`])((?:\\.|(?!\2).)*)\2|([^,}]+))', m.group(1)):
        v = re.sub(r'\\(.)', r'\1', v) if q else bare.strip()
        if k == 'fontFeatureSettings': v = "'liga' 0"
        if k == 'maskImage':
            names = re.findall(r'\$\{(\w+)\}', v)
            u = ', '.join(f'url({adir}/{n}.{consts[n]})' for n in names)
            out += [f'-webkit-mask-image:{u}', f'mask-image:{u}']
            continue
        out.append(re.sub(r'([A-Z])', lambda x: '-' + x.group(1).lower(), k) + ':' + v)
    return 'style="' + ';'.join(out).replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;').replace('>', '&gt;') + '"'

s = re.sub(r'\{/\*.*?\*/\}', '', s)
import os
if os.environ.get('KEEP_IDS'):   # keep node ids (as data-n) so build scripts can pick layers out
    s = re.sub(r'\s*data-(?:name|annotations)="[^"]*"', '', s)
    s = re.sub(r'data-node-id="([^"]*)"', r'data-n="\1"', s)
else:
    s = re.sub(r'\s*data-(?:node-id|name|annotations)="[^"]*"', '', s)
s = re.sub(r'className="([^"]*)"', lambda m: f'class="{fix_classes(m.group(1))}"', s)
s = re.sub(r'src=\{(\w+)\}', lambda m: f'src="{adir}/{m.group(1)}.{consts[m.group(1)]}"', s)
s = re.sub(r'style=\{\{ ((?:"(?:\\.|[^"\\])*"|`[^`]*`|[^"`}])*?) \}\}', style, s)
s = re.sub(r'\{`([^`]*)`\}', r'\1', s)
s = re.sub(r'\{"([^"]*)"\}', r'\1', s)
s = s.replace('<br aria-hidden />', '<br>')
s = re.sub(r'<img([^>]*?)\s*/>', r'<img\1>', s)
s = re.sub(r'<(\w+)([^<>]*?)\s*/>', r'<\1\2></\1>', s)
def mask_defaults(m):
    tag = m.group(0)
    if 'mask-image:' not in tag: return tag
    add = [] if 'mask-no-repeat' in tag else ['mask-no-repeat']
    if 'mask-image:url(' in tag and tag.split('mask-image:')[1].split('"')[0].count('url(') > 1 and 'mask-intersect' not in tag: add.append('mask-intersect')
    return tag.replace('class="', 'class="' + ' '.join(add) + ' ', 1) if add else tag
s = re.sub(r'<div [^>]*>', mask_defaults, s)
# whitespace-pre text: the JSX source indentation is not content
def pre_text(m):
    return m.group(1) + re.sub(r'\s*\n\s*', '', m.group(2)) + m.group(3)
s = re.sub(r'(<p [^>]*whitespace-pre[^>]*>)(.*?)(</p>)', pre_text, s, flags=re.S)
s = re.sub(r'</span>\s+<span', '</span><span', s)
left = re.findall(r'\{[^}]*\}', s)
if left: print('LEFTOVER JSX:', left[:8], file=sys.stderr)
print(s)
