"use client";
import React, { useState } from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { ASSESSMENT_YEAR as year } from "../app/store/slices/mainSlice";
import LabeledField from "../components/LabeledField";
import ErrorField from "../components/ErrorField";
import { handleInput, handleError } from "../app/utils/mainUtils";

export default function Section_1() {
  const dispatch: AppDispatch = useDispatch();

  const borough = useSelector(
    (state: RootState) => state.main.section_1.borough
  );
  const block = useSelector((state: RootState) => state.main.section_1.block);
  const lot = useSelector((state: RootState) => state.main.section_1.lot);
  const full_address = useSelector(
    (state: RootState) => state.main.section_1.full_address
  );

  const [blockError, setBlockError] = useState(false);
  const [lotError, setLotError] = useState(false);

  return (
    <div className="border-l border-r border-b flex flex-wrap">
      <div className="sectionHeader">
        1. PROPERTY IDENTIFICATION - A separate application is required for each
        tax lot, except for condo units.
      </div>
      <LabeledField
        title="BOROUGH (Bronx, Brooklyn, Manhattan, Queens or Staten Island)"
        additionalClass="border-r border-b"
      >
        <input
          id="section_1.borough"
          type="text"
          value={borough ? borough : ""}
          onChange={(e) => handleInput(e, dispatch)}
        />
      </LabeledField>
      <LabeledField title="BLOCK" additionalClass="border-r border-b relative">
        <input
          id="section_1.block"
          type="text"
          value={block ? block : ""}
          onChange={(e) => handleInput(e, dispatch)}
          onBlur={(e) =>
            setBlockError(handleError(e.target.value, /^\d{1,5}$/))
          }
        />
        {blockError && <ErrorField title="The field must contain 1-5 digits" />}
      </LabeledField>
      <LabeledField title="LOT" additionalClass="border-r border-b relative">
        <input
          id="section_1.lot"
          type="text"
          value={lot ? lot : ""}
          onChange={(e) => handleInput(e, dispatch)}
          onBlur={(e) => setLotError(handleError(e.target.value, /^\d{1,4}$/))}
        />
        {lotError && <ErrorField title="The field must contain 1-4 digits" />}
      </LabeledField>
      <LabeledField
        title="ASSESSMENT YEAR"
        additionalClass="border-b text-center"
      >
        <div className="font-bold">{year}</div>
      </LabeledField>
      <LabeledField
        title="FULL ADDRESS OF PROPERTY (INCLUDING ZIP CODE)"
        additionalClass="w-full"
      >
        <input
          id="section_1.full_address"
          type="text"
          value={full_address ? full_address : ""}
          onChange={(e) => handleInput(e, dispatch)}
        />
      </LabeledField>
    </div>
  );
}
