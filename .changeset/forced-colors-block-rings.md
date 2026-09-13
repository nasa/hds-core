---
'@nasa-hds/core': patch
---

Block-level focus rings (buttons, accordion, icon buttons, pagination, side navigation) and link underlines now stay visible in forced-colors mode (Windows High Contrast). Both were drawn with effects the browser drops there; they now fall back to a solid outline and a real `text-decoration` underline. Default rendering is unchanged. Extends the inline-ring fix; refs #176.
