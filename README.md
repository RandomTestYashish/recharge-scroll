# recharge-scroll

"Manage Family - Single User" screen from Figma (`rGZTE0UxCKIhtcJ9Em2QNn`, node `81554:162131`) as a plain HTML prototype.

- Design frame is 375 x 812; the page scrolls inside it (content 2259px). Other viewports scale the frame, never re-lay it out.
- `index.html` + `screen.css` are generated: `figma/make.sh` (convert `figma/screen.jsx` -> HTML, compile Tailwind v4 utilities to plain CSS).
- `styles.css` = device shell + the few hand-tuned overrides; `app.js` = viewport scaling, tap feedback, offers carousel.
- `figma/reference.png` is the Figma render used for comparison.

## Recharge flow (rebuilt from scratch)
Manage Family → "Pack Expired" / "Repeat Recharge" → contact dial → packs → Quick Pay → success. Figma frames are the layout
reference only; every component is hand-made in `flow.js` + `flow.css` (no Figma export). Images live in `assets/rc/`.
- Contact dial: swipe one contact at a time; the tick ring turns 22.5° per contact with a haptic tick every 2.5°.
- Dial-pad item = Enter Number (keypad, 10-digit check); search / Phonebook tab = contact search with ABC/123 keyboards.
- Packs: tabs (Recommended, Top data, International), swipeable card deck, pack details sheet, Quick Pay, Bank Offers
  (expandable, "apply on next payment"), relation picker on the dial.
- Haptics: `navigator.vibrate` on Android; iOS 18+ Safari via the `<input switch>` trick.
