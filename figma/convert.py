"""Convert the Figma MCP React+Tailwind output (figma/screen.jsx) into static HTML. Tailwind classes are kept and compiled by build.py."""
import re, sys

src = open(sys.argv[1]).read()
consts = {n: u.rsplit('.', 1)[1] for n, u in re.findall(r'const (\w+) = "(https://www\.figma\.com/api/mcp/asset/[^"]+)"', src)}
# the Divider helper component is inlined at its call sites
divider = '<div className="CLS"><div className="absolute inset-[-1px_0_0_0]"><img alt="" className="block max-w-none size-full" src={imgTypeCardDividerModeSingleLine} /></div></div>'
src = re.sub(r'<Divider className="([^"]*)" />', lambda m: divider.replace('CLS', m.group(1)), src)
lines = src.split('\n')
a = next(i for i, l in enumerate(lines) if l.startswith('export default function'))
body = '\n'.join(lines[a + 2:])
s = body[:body.rindex(');')]

WEIGHT = {'bold': 'font-bold', '700': 'font-bold', 'semibold': 'font-semibold', '600': 'font-semibold',
          'medium': 'font-medium', '500': 'font-medium', 'regular': 'font-normal', '400': 'font-normal',
          'bold_italic': 'font-bold italic', 'medium_italic': 'font-medium italic',
          'black_italic': 'font-black italic', 'extra_bold_italic': 'font-extrabold italic'}

def fix_classes(c):
    c = c.replace('\\/', '/')
    def fam(m):
        return 'font-[Inter] ' + WEIGHT[m.group(1).lower().replace(' ', '_')]
    c = re.sub(r"font-\[family-name:var\(--typography/font/family,'Inter:([^']+)'\)\]", fam, c)
    c = re.sub(r"font-\['Inter:([^']+)'\]", fam, c)
    c = re.sub(r"font-\[var\(--typography/(?:weight|style)/[^\]]*\)\]", '', c)
    for _ in range(3):  # Figma token vars contain '/', keep only their fallbacks
        c = re.sub(r'var\(--[^,()]+,((?:[^()]|\([^()]*\))*)\)', r'\1', c)
    return re.sub(r'\s+', ' ', c).strip()

s = re.sub(r'\{/\*.*?\*/\}', '', s)
s = re.sub(r'\s*data-(?:node-id|name|annotations)="[^"]*"', '', s)
s = re.sub(r'className="([^"]*)"', lambda m: f'class="{fix_classes(m.group(1))}"', s)
s = re.sub(r'src=\{(\w+)\}', lambda m: f'src="assets/{m.group(1)}.{consts[m.group(1)]}"', s)
s = re.sub(r'style=\{\{ maskImage: `url\("\$\{(\w+)\}"\)` \}\}',
           lambda m: f'style="-webkit-mask-image:url(assets/{m.group(1)}.{consts[m.group(1)]});mask-image:url(assets/{m.group(1)}.{consts[m.group(1)]})"', s)
s = s.replace("""style={{ fontFeatureSettings: '"liga" 0' }}""", "style=\"font-feature-settings:'liga' 0\"")
s = re.sub(r'style=\{\{ backgroundImage: "([^"]+)" \}\}', r'style="background-image:\1"', s)
s = re.sub(r'style=\{\{ backgroundImage: "([^"]+)", fontFeatureSettings: \'"liga" 0\' \}\}', r'style="background-image:\1;font-feature-settings:\'liga\' 0"', s)
s = s.replace('style={{ containerType: "size" }}', 'style="container-type:size"')
s = re.sub(r'\{`([^`]*)`\}', r'\1', s)
s = re.sub(r'\{"([^"]*)"\}', r'\1', s)
s = s.replace('<br aria-hidden />', '<br>')
s = re.sub(r'<img([^>]*?)\s*/>', r'<img\1>', s)
s = re.sub(r'<(\w+)([^<>]*?)\s*/>', r'<\1\2></\1>', s)
left = re.findall(r'\{[^}]*\}', s)
if left: print('LEFTOVER JSX:', left[:8], file=sys.stderr)
print(s)
