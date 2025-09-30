"use client";
import React, { useState } from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import ErrorField from "../components/ErrorField";
import { handleInput, handleError } from "../app/utils/mainUtils";

export default function Section_4() {
  const dispatch: AppDispatch = useDispatch();
  const market_value = useSelector(
    (state: RootState) => state.main.section_4.market_value
  );
  const [market_valueError, setMarket_valueError] = useState(false);

  const assessed_value = useSelector(
    (state: RootState) => state.main.section_4.assessed_value
  );
  const [assessed_valueError, setAssessed_valueError] = useState(false);

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
      <div className="arialMT flex w-full ml-3 leading-tight mb-3 relative">
        <div className=" w-2/4">
          a) {"Applicant's"} estimate of market value (what the property <br />
          would sell for in the current market):
        </div>
        <div className="flex place-items-center relative w-2/4">
          <div className="whitespace-nowrap">a) $</div>
          <input
            type="text"
            id="section_4.market_value"
            className="border-b border-black mb-1 mr-3 flex-grow flex-shrink min-w-0"
            value={market_value ? market_value : ""}
            onChange={(e) => handleInput(e, dispatch)}
            onBlur={(e) =>
              setMarket_valueError(
                handleError(e.target.value, /^\d+(\.\d{1,2})?$/)
              )
            }
          />
          {market_valueError && (
            <ErrorField title="Enter amount in numbers only, up to 2 decimal places, no $" />
          )}
        </div>
      </div>
      <div className="arialMT flex w-full ml-3 leading-tight mb-3">
        <div className="w-2/4">b) Multiply line a by 6% (.06)</div>
        <div className="flex w-2/4">
          <div>b) $ </div>
          <div
            id="section_4.market_value"
            className="border-b border-black mb-1 mr-3 flex-grow pl-2 h-5"
          >
            {market_value && !isNaN(Number(market_value))
              ? (Number(market_value) * 0.06).toFixed(2)
              : ""}
          </div>
        </div>
      </div>
      <div className="arialMT flex w-full ml-3 leading-tight relative">
        <div className="w-2/4">
          c) Assessed Value (from Notice of Property Value) <br />
          <b>If line c is less than line b, DO NOT FILE TC108.</b>
        </div>
        <div className="flex place-items-center w-2/4">
          <div className="whitespace-nowrap">c) $</div>
          <input
            type="text"
            id="section_4.assessed_value"
            className="border-b border-black mb-1 mr-3 flex-grow flex-shrink min-w-0"
            value={assessed_value ? assessed_value : ""}
            onChange={(e) => handleInput(e, dispatch)}
            onBlur={(e) =>
              setAssessed_valueError(
                handleError(e.target.value, /^\d+(\.\d{1,2})?$/)
              )
            }
          />
          {assessed_valueError && (
            <ErrorField title="Enter amount in numbers only, up to 2 decimal places, no $" />
          )}
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
