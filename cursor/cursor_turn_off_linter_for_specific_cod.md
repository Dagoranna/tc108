# Turn off linter for specific code
_Exported on 9/25/2025 at 09:46:55 GMT+3 from Cursor (1.6.45)_

---

**User**

how to turn off linter  for
let current: any = state;

---

**Cursor**

```plaintext
// file contents
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/no-explicit-any */
```

### Turn off the linter for that line

- **Disable the specific rule on the next line**:
```
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let current: any = state;
```

- **Disable the specific rule inline**:
```
let current: any = state; // eslint-disable-line @typescript-eslint/no-explicit-any
```

- **Disable all ESLint rules for that line (not recommended)**:
```
// eslint-disable-next-line
let current: any = state;
```

### If you need it for the whole file (not ideal)
```
/* eslint-disable @typescript-eslint/no-explicit-any */
// …your file…
/* eslint-enable @typescript-eslint/no-explicit-any */
```

If the warning isn’t `@typescript-eslint/no-explicit-any`, replace the rule name with the one shown in your lint error.

```plaintext
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let current: any = state;
```

```plaintext
let current: any = state; // eslint-disable-line @typescript-eslint/no-explicit-any
```

```plaintext
// eslint-disable-next-line
let current: any = state;
```

```plaintext
/* eslint-disable @typescript-eslint/no-explicit-any */
// …your file…
/* eslint-enable @typescript-eslint/no-explicit-any */
```

