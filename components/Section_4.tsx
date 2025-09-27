"use client";
import React from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";

export default function Section_4() {
  const dispatch: AppDispatch = useDispatch();
  const market_value = useSelector(
    (state: RootState) => state.main.section_4.market_value
  );
  const assessed_value = useSelector(
    (state: RootState) => state.main.section_4.assessed_value
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

  return (
    <div className="border-l border-r border-b flex flex-wrap text-base">
      <div className="sectionHeader">
        <div>
          4. VALUATION CLAIM – IF YOU DO NOT FULLY COMPLETE THIS PART 4, YOUR
          APPLICATION WILL BE DISMISSED. The Tax Commission cannot change the
          estimate of market value shown on your Notice of Property Value. See
          instructions for an explanation of market value.
        </div>
      </div>
      <div className="arialMT flex w-full ml-3 leading-tight mb-3">
        <div className="basis-1/2">
          a) {"Applicant's"} estimate of market value (what the property <br />
          would sell for in the current market):
        </div>
        <div className="flex place-items-center basis-1/2">
          <div>a) $ </div>
          <input
            type="text"
            id="section_4.market_value"
            className="border-b border-black mb-1 mr-3 flex-grow"
            value={market_value ? market_value : ""}
            onChange={(e) => handleInput(e)}
          />
        </div>
      </div>
      <div className="arialMT flex w-full ml-3 leading-tight mb-3">
        <div className="basis-1/2">b) Multiply line a by 6% (.06)</div>
        <div className="flex basis-1/2">
          <div>b) $ </div>
          <div
            id="section_4.market_value"
            className="border-b border-black mb-1 mr-3 flex-grow"
          >
            {market_value ? (Number(market_value) * 0.06).toFixed(2) : ""}
          </div>
        </div>
      </div>
      <div className="arialMT flex w-full ml-3 leading-tight">
        <div className="basis-1/2">
          c) Assessed Value (from Notice of Property Value) <br />
          <b>If line c is less than line b, DO NOT FILE TC108.</b>
        </div>
        <div className="flex place-items-center basis-1/2">
          <div>c) $ </div>
          <input
            type="text"
            id="section_4.assessed_value"
            className="border-b border-black mb-1 mr-3 flex-grow"
            value={assessed_value ? assessed_value : ""}
            onChange={(e) => handleInput(e)}
          />
        </div>
      </div>
      <div className="ArialMT ml-2 text-lg leading-tight">
        You have the right to allege an assessment ratio lower than the 6% ratio
        used in setting the assessment and seek a lower assessment in a
        proceeding for judicial review. See TC600 available at:{" "}
        <a href="https://www.nyc.gov/html/taxcomm" className="font-normal">
          www.nyc.gov/html/taxcomm
        </a>
        .
      </div>
    </div>
  );
}
