# What's the issue at hand?
_Exported on 9/29/2025 at 09:11:49 GMT+3 from Cursor (1.6.45)_

---

**User**

what's wrong in this useSelector?

---

**Cursor**

I'll open `components/Section_9.tsx` and the slice `app/store/slices/mainSlice.ts` to verify the state shape and confirm the correct selector path and syntax.

I looked at `components/Section_9.tsx` and the state shape in `app/store/slices/mainSlice.ts`.

- The issue is the invalid property access: `section_9.[blockTitle]`. You can’t put a dot before a computed key. Use bracket notation directly.

Code reference (current):
```36:39:components/Section_9.tsx
    date: useSelector(
      (state: RootState) => state.main.section_9.[blockTitle].date
    ),
```

Replace that selector with:
```tsx
(state: RootState) => state.main.section_9[blockTitle].date
```

Also ensure `blockTitle` is typed as one of `'sale_1' | 'sale_2' | 'sale_3'` so TypeScript accepts the dynamic key:
```tsx
function SalesBlock(blockTitle: 'sale_1' | 'sale_2' | 'sale_3') {
  // ...
}
```

Two more quick checks:
- Only use `SalesBlock` as a React component (e.g., `<SalesBlock blockTitle="sale_1" />`). Don’t call it as a plain function, or the hook call will violate the Rules of Hooks.
- In your slice, `date` is a `string` for section 9, so make sure the input value/formatter aligns with that.

Let me know if you want me to update the typings and usages accordingly.

- I opened `Section_9.tsx` and the slice to verify the selector path; the problem is the computed-key syntax.

```typescriptreact
    date: useSelector(
      (state: RootState) => state.main.section_9.[blockTitle].date
    ),
```

```typescriptreact
(state: RootState) => state.main.section_9[blockTitle].date
```

```typescriptreact
function SalesBlock(blockTitle: 'sale_1' | 'sale_2' | 'sale_3') {
  // ...
}
```

