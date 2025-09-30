"use client";
import React, { useState } from "react";
import Image from "next/image";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";
import { ASSESSMENT_YEAR as year } from "../app/store/slices/mainSlice";
import ErrorField from "../components/ErrorField";
import { handleInput, handleError } from "../app/utils/mainUtils";

export default function SectionIntro() {
  const dispatch: AppDispatch = useDispatch();
  const borough = useSelector(
    (state: RootState) => state.main.section_address.borough
  );
  const block = useSelector(
    (state: RootState) => state.main.section_address.block
  );
  const lot = useSelector((state: RootState) => state.main.section_address.lot);
  const group = useSelector(
    (state: RootState) => state.main.section_address.group
  );
  const reviewed_by = useSelector(
    (state: RootState) => state.main.section_address.reviewed_by
  );

  const apportionment = useSelector(
    (state: RootState) => state.main.section_received_notice.apportionment
  );
  const increased_assessment = useSelector(
    (state: RootState) =>
      state.main.section_received_notice.increased_assessment
  );

  const [blockError, setBlockError] = useState(false);
  const [lotError, setLotError] = useState(false);

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.currentTarget.checked;
    dispatch(
      actions.setBooleanField({
        path: "section_received_notice." + e.currentTarget.id,
        value: checked,
      })
    );
  }

  return (
    <div className="border-l border-r border-b">
      <div className="border-t border-b arialMT flexDirection flex-wrap justify-between">
        <div className="flex flex-col items-end mx-2 justify-between">
          <div>YEAR</div>
          <div
            className="arial"
            style={{ fontWeight: "bold", marginBottom: "2px" }}
          >
            {year}
          </div>
        </div>
        <div className="topAddress">
          <div>BOROUGH</div>
          <input
            id="section_address.borough"
            className="inputTopAddress"
            value={borough ? borough : ""}
            onChange={(e) => handleInput(e, dispatch)}
          />
        </div>
        <div className="topAddress relative">
          <div>BLOCK</div>
          <input
            id="section_address.block"
            className="inputTopAddress"
            style={{ width: "5rem" }}
            value={block ? block : ""}
            onChange={(e) => handleInput(e, dispatch)}
            onBlur={(e) =>
              setBlockError(handleError(e.target.value, /^\d{1,5}$/))
            }
          />
          {blockError && (
            <ErrorField title="The field must contain 1-5 digits" />
          )}
        </div>
        <div className="topAddress relative">
          <div>LOT</div>
          <input
            id="section_address.lot"
            className="inputTopAddress"
            style={{ width: "4rem" }}
            value={lot ? lot : ""}
            onChange={(e) => handleInput(e, dispatch)}
            onBlur={(e) =>
              setLotError(handleError(e.target.value, /^\d{1,4}$/))
            }
          />
          {lotError && <ErrorField title="The field must contain 1-4 digits" />}
        </div>
        <div className="topAddress">
          <div>GROUP #</div>
          <input
            id="section_address.group"
            className="inputTopAddress"
            style={{ width: "5rem" }}
            value={group ? group : ""}
            onChange={(e) => handleInput(e, dispatch)}
          />
        </div>
        <div className="topAddress" style={{ marginRight: "5rem" }}>
          <div>REVIEWED BY</div>
          <input
            id="section_address.reviewed_by"
            className="inputTopAddress"
            value={reviewed_by ? reviewed_by : ""}
            onChange={(e) => handleInput(e, dispatch)}
          />
        </div>
      </div>
      <div className="arial flex justify-between m-3">
        <div className="relative w-40 h-36 mt-4 min-w-40">
          <Image src="/seal.jpg" alt="Seal" fill />
        </div>
        <div className="arial text-2xl text-center font-bold mt-3">
          <span style={{ letterSpacing: "-0.02em" }}>
            TAX COMMISSION OF THE CITY OF NEW YORK{" "}
          </span>
          <br />1 Centre Street, Room 2400, New York, NY 10007
          <br />
          <br />
          <span>APPLICATION FOR CORRECTION OF ASSESSED VALUE FOR ONE,</span>
          <br />
          <span>
            TWO OR THREE-FAMILY HOUSE OR OTHER CLASS ONE PROPERTY{" "}
            <span className="underline">ONLY</span>
          </span>
        </div>
        <div className="flex flex-col justify-center items-center w-48 h-32 mt-[3px] border-[15px] border-solid borderGray font-bold">
          <div className="arial text-2xl">TC108</div>
          <div className="arial text-base line-1rem">{year}</div>
        </div>
      </div>
      <div className="arial text-xl font-bold m-3">
        YOUR COMPLETED FORM TC108 MUST BE RECEIVED BY THE NYC TAX COMMISSION AT
        1 CENTRE ST., RM. 2400, NEW YORK, NY 10007 BY 5:00 P.M. MARCH 17, 2025.
        See Instructions “Filing TC108”.
      </div>
      <div className="border-t border-b arialMT text-justify text-xl px-3">
        <div>
          <span className="arial underline font-bold">However</span>, if you
          received a Revised Notice of Property Value <u>increasing</u> your
          assessed value or a notice of apportionment from the Dept. of Finance
          dated <u>after</u> February 1, 2025, you have 20 calendar days after
          the date of the notice to file Form TC108. Check the box next to the
          type of notice you received and attach a copy of the notice:
        </div>
        <div className="text-left">
          <input
            type="checkbox"
            id="apportionment"
            name="apportionment"
            className="boldCheckbox"
            checked={apportionment}
            onChange={(e) => handleCheckbox(e)}
          />
          <label htmlFor="apportionment" className="mr-[1em]">
            Apportionment notice
          </label>
          <input
            type="checkbox"
            id="increased_assessment"
            name="increased_assessment"
            className="boldCheckbox"
            checked={increased_assessment}
            onChange={(e) => handleCheckbox(e)}
          />
          <label htmlFor="increased_assessment">
            Notice of increased assessment.
          </label>
        </div>
      </div>
      <div className="border-t border-bl px-3">
        <div className="arialMT justify-between text-2xl text-justify">
          <u>YOU CANNOT USE THIS FORM TO:</u> (i) request a change in the
          estimated market value, physical description or building class of your
          property; (ii) apply for a reduction in the assessed value of a class
          2, 3 or 4 property; (iii) request a change in tax class; or (iv) claim
          an exemption.
        </div>
        <div className="arial text-xl font-bold">
          READ TC600 AND ALL INSTRUCTIONS BEFORE COMPLETING THIS FORM. COMPLETE
          ALL PARTS 1 THROUGH 10. Go to{" "}
          <a href="https://www.nyc.gov/html/taxcomm" className="font-normal">
            www.nyc.gov/html/taxcomm
          </a>{" "}
          for forms and instructions.
        </div>
        <div className="arial text-xl font-bold underline">
          NEW: NONRESIDENTIAL RENTAL ACTIVITY MUST BE REPORTED ON TC201 OR
          TC203. See Part 7 below.
        </div>
        <div className="arialMT text-xl">
          <b>NOTE</b>: A $175 FEE applies to applications if the 2025/26{" "}
          <u>assessed value</u> is $2 million or more. Do NOT pay the fee with
          this application; it will be included in your property tax bill. See
          TC600 for more information about the fee.
        </div>
      </div>
    </div>
  );
}
