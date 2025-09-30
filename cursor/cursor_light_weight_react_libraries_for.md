# Light-weight react libraries for date fields
_Exported on 9/25/2025 at 08:46:26 GMT+3 from Cursor (1.6.45)_

---

**User**

name light-weight react libraries with date field design

---

**Cursor**

### Lightweight React date field libraries

- react-day-picker — flexible, accessible calendar; great for custom UIs. Very small. [Link](https://react-day-picker.js.org/)
- dayzed — headless datepicker hooks for building your own design; tiny footprint. [Link](https://github.com/deseretdigital/dayzed)
- react-nice-dates — simple, well‑styled datepicker built on date-fns. [Link](https://github.com/hernansartorio/react-nice-dates)
- react-modern-calendar-datepicker — clean UI, minimal deps. [Link](https://github.com/Kiarash-Z/react-modern-calendar-datepicker)
- react-date-picker — lightweight controlled component; good keyboard support. [Link](https://github.com/wojtekmaj/react-date-picker)
- react-datepicker — popular, easy to drop in; slightly heavier but still reasonably light. [Link](https://github.com/Hacker0x01/react-datepicker)

Headless/minimal building blocks:
- react-input-mask — lightweight masked input for date fields (MM/DD/YYYY etc.). [Link](https://github.com/sanniassin/react-input-mask)
- date-fns — tiny utilities for parsing/formatting; pair with headless calendar. [Link](https://date-fns.org/)

If you want the smallest + most customizable: use dayzed + date-fns or react-day-picker with your own input.

---

**User**

give a command for react-day-picker installation

---

**Cursor**

### Install react-day-picker

- npm:
```bash
npm install react-day-picker
```

- yarn:
```bash
yarn add react-day-picker
```

- pnpm:
```bash
pnpm add react-day-picker
```

```shellscript
npm install react-day-picker
```

```shellscript
yarn add react-day-picker
```

```shellscript
pnpm add react-day-picker
```

---

**User**

unicode code for symbol "calendar"

---

**Cursor**

**Common calendar Unicode symbols**

- 📅 U+1F4C5 — calendar
- 📆 U+1F4C6 — tear-off calendar
- 🗓 U+1F5D3 — spiral calendar

HTML: `&#x1F4C5;`, `&#x1F4C6;`, `&#x1F5D3;`  
JS/TS: `'\u{1F4C5}'`, `'\u{1F4C6}'`, `'\u{1F5D3}'`

---

**User**

how to remove slider from the right part of input type=number

---

**Cursor**

### Remove number input spinners

- Chrome/Edge/Safari:
```css
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
```

- Firefox:
```css
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
```

Add to your `app/globals.css` or a scoped stylesheet.

```css
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
```

```css
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
```

