# Fixing CSS margin issues in class
_Exported on 9/30/2025 at 13:03:36 GMT+3 from Cursor (1.7.17)_

---

**User**

className="border-b border-black w-full mr-3 " - margin is not working, block stretches in full. How to make it working?

---

**Cursor**

Short answer: `mr-3` can’t show because `w-full` makes the input span 100% of its container. Margins add outside space; they don’t reduce the element’s width.

Pick one depending on intent:
- Make the input not full width:
  - Change to `className="border-b border-black inline-block w-auto mr-3"`
- Make it fill remaining space next to siblings in a row:
  - Wrap siblings in a flex container and use `className="border-b border-black flex-1 mr-3"`
- Keep full width but need space inside on the right (for icons/overlays):
  - Use padding: `className="border-b border-black w-full pr-3"` (not `mr-3`)
- Keep full width but force visual right gap inside the container:
  - Put the margin on the container: `<div className="relative mr-3">...</div>`

In your snippet, a simple fix is either remove `w-full` or move `mr-3` to the wrapping `div`.

