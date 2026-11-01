# recharge-scroll

"Manage Family - Single User" screen from Figma (`rGZTE0UxCKIhtcJ9Em2QNn`, node `81554:162131`) as a plain HTML prototype.

- Design frame is 375 x 812; the page scrolls inside it (content 2259px). Other viewports scale the frame, never re-lay it out.
- `index.html` + `screen.css` are generated: `figma/make.sh` (convert `figma/screen.jsx` -> HTML, compile Tailwind v4 utilities to plain CSS).
- `styles.css` = device shell + the few hand-tuned overrides; `app.js` = viewport scaling, tap feedback, offers carousel.
- `figma/reference.png` is the Figma render used for comparison.

## Recharge flow (from the reference video)
Manage Family → "Pack Expired" / "Repeat Recharge" → contact dial (Figma 81554:160472 …) → packs (81554:154187 …) → Quick Pay → success.
- `figma/flow_build.py` assembles the screen from Figma layers (`figma/dial.jsx`, `figma/packs.jsx`) plus templated pack cards, phonebook and keyboard.
- `flow.js` animates it: swipe the dial (aperture ring turns 22.5° per contact, rings fan out and settle, haptic tick every 7.5°), dial-pad = Enter Number with keypad, search/Phonebook tab, Bank Offers sheet, card stack swipe, Quick Pay.
- Haptics: `navigator.vibrate` on Android; on iOS 18+ Safari via the `<input switch>` trick.
