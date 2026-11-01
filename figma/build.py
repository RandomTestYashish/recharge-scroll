"""Rebuild index.html + screen.css from figma/screen.jsx (Figma node 81554:162131)."""
import os, re, subprocess, sys
fig = os.path.dirname(os.path.abspath(__file__)); root = os.path.dirname(fig)
html = subprocess.run([sys.executable, f'{fig}/convert.py', f'{fig}/screen.jsx'], capture_output=True, text=True, check=True).stdout
# root stays the 375x812 Figma frame (its children use calc(50% ...) against it); content overflows it and
# .fh (2259px = last section end 2227 + 32) is what actually scrolls
html = html.replace('<div class="bg-white relative size-full">', '<div class="bg-white relative w-[375px] h-[812px]" id="screen">', 1)
# hooks for the few hand-tuned overrides in styles.css (see the notes there)
html = html.replace('<img alt="" class="absolute block inset-0 max-w-none size-full" src="assets/imgEllipse19119.svg">', '<img alt="" class="absolute block inset-0 max-w-none size-full glow" src="assets/imgEllipse19119.svg">', 1)
html = html.replace('<img alt="" class="absolute block inset-0 max-w-none size-full" src="assets/imgEllipse19118.svg">', '<img alt="" class="absolute block inset-0 max-w-none size-full glow" src="assets/imgEllipse19118.svg">', 1)
html = html.replace('content-stretch flex flex-col gap-[4px] h-[76px] items-center', 'sheet-text content-stretch flex flex-col gap-[4px] h-[76px] items-center', 1)
# "Offers for you" is a 626px row inside the 375 frame: make it a swipeable carousel (same start position as Figma)
html = html.replace('items-start left-[16px] top-[1291.08px] w-[626px]', 'items-start left-0 top-[1291.08px] w-[375px] px-[16px] offers', 1)
html = '\n'.join('      ' + l if l.strip() else '' for l in html.strip('\n').split('\n'))
page = open(f'{fig}/shell.html').read().replace('{{SCREEN}}', html)
open(f'{root}/index.html', 'w').write(page)
tw = os.environ.get('TAILWIND', 'tailwindcss')
subprocess.run([tw, '-i', f'{fig}/tw.css', '-o', f'{root}/screen.css', '--minify'], cwd=fig, check=True)
