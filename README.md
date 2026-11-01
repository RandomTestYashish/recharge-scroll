# recharge-scroll

"Manage Family - Single User" screen from Figma (`rGZTE0UxCKIhtcJ9Em2QNn`, node `81554:162131`) as a plain HTML prototype.

- Design frame is 375 x 812; the page scrolls inside it (content 2259px). Other viewports scale the frame, never re-lay it out.
- `index.html` + `screen.css` are generated: `figma/make.sh` (convert `figma/screen.jsx` -> HTML, compile Tailwind v4 utilities to plain CSS).
- `styles.css` = device shell + the few hand-tuned overrides; `app.js` = viewport scaling, tap feedback, offers carousel.
- `figma/reference.png` is the Figma render used for comparison.
