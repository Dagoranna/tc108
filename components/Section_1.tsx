"use client";
import React from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";
import { ASSESSMENT_YEAR as year } from "../app/store/slices/mainSlice";
import LabeledField from "../components/LabeledField";

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
          value={borough ? borough : ""}
          onChange={(e) => handleInput(e)}
        />
      </LabeledField>
      <LabeledField title="BLOCK" additionalClass="border-r border-b">
        <input
          id="section_1.block"
          value={block ? block : ""}
          onChange={(e) => handleInput(e)}
        />
      </LabeledField>
      <LabeledField title="LOT" additionalClass="border-r border-b">
        <input
          id="section_1.lot"
          value={lot ? lot : ""}
          onChange={(e) => handleInput(e)}
        />
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
          value={full_address ? full_address : ""}
          onChange={(e) => handleInput(e)}
        />
      </LabeledField>
    </div>
  );
}
