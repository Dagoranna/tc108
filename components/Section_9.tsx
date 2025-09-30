"use client";
import React, { useState } from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";
import ErrorField from "../components/ErrorField";
import { handleInput, handleError } from "../app/utils/mainUtils";

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
  const [priceError, setPriceError] = useState(false);

  const address = useSelector(
    (state: RootState) => state.main.section_9[blockTitle].address
  );
  const block_lot = useSelector(
    (state: RootState) => state.main.section_9[blockTitle].block_lot
  );
  const total_dwelling = useSelector(
    (state: RootState) => state.main.section_9[blockTitle].total_dwelling
  );
  const [total_dwellingError, setTotal_dwellingError] = useState(false);

  const bTitle =
    blockTitle.charAt(0).toUpperCase() + blockTitle.replace(/_/g, " ").slice(1);

  return (
    <div className="flex flex-col flex-1 flex-shrink min-w-2 mr-3">
      <div className="arialMT text-center">{bTitle}</div>
      <input
        id={`section_9.${blockTitle}.date`}
        type="text"
        value={date ? date : ""}
        className="border-b border-black min-w-2"
        onChange={(e) => handleInput(e, dispatch)}
      />
      <div className="relative">
        <input
          id={`section_9.${blockTitle}.price`}
          type="text"
          value={price ? price : ""}
          className="border-b border-black w-full"
          onChange={(e) => handleInput(e, dispatch)}
          onBlur={(e) => {
            setPriceError(handleError(e.target.value, /^\d+(\.\d{1,2})?$/));
          }}
        />
        {priceError && (
          <ErrorField title="Enter amount in numbers only, up to 2 decimal places, no $" />
        )}
      </div>
      <input
        id={`section_9.${blockTitle}.address`}
        type="text"
        value={address ? address : ""}
        className="border-b border-black"
        onChange={(e) => handleInput(e, dispatch)}
      />
      <input
        id={`section_9.${blockTitle}.block_lot`}
        type="text"
        value={block_lot ? block_lot : ""}
        className="border-b border-black"
        onChange={(e) => handleInput(e, dispatch)}
      />
      <div className="relative">
        <input
          id={`section_9.${blockTitle}.total_dwelling`}
          type="text"
          value={total_dwelling ? total_dwelling : ""}
          className="border-b border-black w-full"
          onChange={(e) => handleInput(e, dispatch)}
          onBlur={(e) => {
            setTotal_dwellingError(handleError(e.target.value, /^\d+$/));
          }}
        />
        {total_dwellingError && <ErrorField title="Enter digits only" />}
      </div>
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
