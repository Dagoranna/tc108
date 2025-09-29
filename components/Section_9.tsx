"use client";
import React from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";

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
    <div className="flex flex-col flex-1 flex-shrink min-w-2">
      <div className="arialMT text-center">{bTitle}</div>
      <input
        id={`section_9.${blockTitle}.date`}
        type="text"
        value={date ? date : ""}
        onChange={(e) => handleInput(e)}
        className="border-b border-black mr-3 min-w-2"
      />
      <input
        id={`section_9.${blockTitle}.price`}
        type="text"
        value={price ? price : ""}
        onChange={(e) => handleInput(e)}
        className="border-b border-black mr-3"
      />
      <input
        id={`section_9.${blockTitle}.address`}
        type="text"
        value={address ? address : ""}
        onChange={(e) => handleInput(e)}
        className="border-b border-black mr-3"
      />
      <input
        id={`section_9.${blockTitle}.block_lot`}
        type="text"
        value={block_lot ? block_lot : ""}
        onChange={(e) => handleInput(e)}
        className="border-b border-black mr-3"
      />
      <input
        id={`section_9.${blockTitle}.total_dwelling`}
        type="text"
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
      <div className="flex w-full ml-3 pb-1 pr-6">
        <div className="flex flex-col flex-1 flex-shrink">
          <div className="leading-normal">&nbsp;</div>
          <div className="whitespace-nowrap">Sale Date</div>
          <div className="whitespace-nowrap">Sales Price</div>
          <div className="whitespace-nowrap">Address</div>
          <div className="whitespace-nowrap">Block/lot</div>
          <div className="whitespace-nowrap">Total dwelling units</div>
        </div>
        <SalesBlock blockTitle="sale_1" />
        <SalesBlock blockTitle="sale_2" />
        <SalesBlock blockTitle="sale_3" />
      </div>
    </div>
  );
}
