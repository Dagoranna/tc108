# Fix typisation in SalesBlock section 9
_Exported on 9/29/2025 at 09:50:16 GMT+3 from Cursor (1.6.45)_

---

**User**

how to fix typisation in SalesBlock (in Sectiion_9)

---

**Cursor**

I'll open `components/Section_9.tsx` and the related Redux slice `app/store/slices/mainSlice.ts` to see the current typings for `SalesBlock` and its props. Then I’ll pinpoint and correct the type errors.

I'll open `app/store/store.ts` to confirm exported types `RootState` and `AppDispatch`, then fix prop typing of `SalesBlock` and input value types to remove type errors.

I'll update `components/Section_9.tsx` to properly type `SalesBlock` props and clean up an unused import, then check for any linter/type issues.

```typescriptreact
"use client";
import React from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";

/*
  section_9: {
    value_proof_attach: boolean;
    sale_1: {
      date: DateObj;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
    sale_2: {
      date: DateObj;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
    sale_3: {
      date: DateObj;
      price: number | null;
      address: string;
      block_lot: string;
      total_dwelling: number | null;
    };
  };
*/
interface SalesBlockProps {
  blockTitle: "sale_1" | "sale_2" | "sale_3";
}

function SalesBlock({ blockTitle }: SalesBlockProps) {
  const dispatch: AppDispatch = useDispatch();

  const date = useSelector(
    (state: RootState) => state.main.section_9[blockTitle].date
  );
  const price = useSelector(
    (state: RootState) => state.main.section_9[blockTitle].price
  );
  const address = useSelector(
    (state: RootState) => state.main.section_9[blockTitle].address
  );
  const block_lot = useSelector(
    (state: RootState) => state.main.section_9[blockTitle].block_lot
  );
  const total_dwelling = useSelector(
    (state: RootState) => state.main.section_9[blockTitle].total_dwelling
  );

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    //TODO: switch with checks for values
    dispatch(
      actions.setTextField({
        path: e.currentTarget.id,
        value: value,
      })
    );
  }

  const bTitle =
    blockTitle.charAt(0).toUpperCase() + blockTitle.replace(/_/g, " ").slice(1);

  return (
    <div className="flex flex-col flex-1">
      <div>{bTitle}</div>
      <input
        id={`section_9.${blockTitle}.date`}
        value={date ? date : ""}
        onChange={(e) => handleInput(e)}
        className="border-b border-black mr-3"
      />
      <input
        id={`section_9.${blockTitle}.price`}
        value={price ? price : ""}
        onChange={(e) => handleInput(e)}
        className="border-b border-black mr-3"
      />
      <input
        id={`section_9.${blockTitle}.address`}
        value={address ? address : ""}
        onChange={(e) => handleInput(e)}
        className="border-b border-black mr-3"
      />
      <input
        id={`section_9.${blockTitle}.block_lot`}
        value={block_lot ? block_lot : ""}
        onChange={(e) => handleInput(e)}
        className="border-b border-black mr-3"
      />
      <input
        id={`section_9.${blockTitle}.total_dwelling`}
        value={total_dwelling ? total_dwelling : ""}
        onChange={(e) => handleInput(e)}
        className="border-b border-black mr-3"
      />
    </div>
  );
}

export default function Section_9() {
  const dispatch: AppDispatch = useDispatch();
  const value_proof_attach = useSelector(
    (state: RootState) => state.main.section_9.value_proof_attach
  );

  return (
    <div className="border-l border-r border-b flex flex-wrap text-base">
      <div className="sectionHeader">
        <div className="flex flex-col w-full">
          <div>
            9. INFORMATION IN SUPPORT – You must complete this part if you
            checked “Review on Papers” in Part 5.
          </div>
          <div className="px-3 text-xl">
            <input
              type="checkbox"
              id="section_9.value_proof_attach"
              name="section_9.value_proof_attach"
              className="boldCheckbox"
              checked={value_proof_attach}
              onChange={() =>
                dispatch(
                  actions.setBooleanField({
                    path: "section_9.value_proof_attach",
                    value: !value_proof_attach,
                  })
                )
              }
            />
            <label htmlFor="section_9.value_proof_attach">
              Check here if sales or other proof of market value is provided on
              attached sheets.
            </label>
          </div>
          <div>
            If you are requesting an in-person hearing, you may provide this
            information at the hearing. See instructions for information on how
            to find comparable sales information or other evidence of market
            value.
          </div>
        </div>
      </div>
      <div className="flex w-full ml-3">
        <div className="flex flex-col flex-1">
          <div className="leading-normal">&nbsp;</div>
          <div>Sale Date</div>
          <div>Sales Price</div>
          <div>Address</div>
          <div>Block/lot</div>
          <div>Total dwelling units</div>
        </div>
        <div className="flex flex-col flex-1">
          <div>Sale 1</div>
          <SalesBlock blockTitle="sale_1" />
          <SalesBlock blockTitle="sale_2" />
          <SalesBlock blockTitle="sale_3" />
        </div>
      </div>
    </div>
  );
}

```

- I’m going to fix the prop typing for `SalesBlock` in `Section_9` and remove an unused import; then I’ll verify there are no linter/type issues.

Changes applied:
- Converted `SalesBlock` to accept a typed props object and destructure `blockTitle`.
- Removed the unused `DateField` import.

You can now use `SalesBlock` as `<SalesBlock blockTitle="sale_1" />` etc. No linter errors remain.

