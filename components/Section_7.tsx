"use client";
import React from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";
import LabeledField from "../components/LabeledField";

/*
  section_7: {
    was_rented: boolean;
  };
*/
export default function Section_7() {
  const dispatch: AppDispatch = useDispatch();
  const was_rented = useSelector(
    (state: RootState) => state.main.section_7.was_rented
  );

  function handleRented(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "section_7_was_rented_no":
        dispatch(
          actions.setBooleanField({
            path: "section_7.was_rented",
            value: false,
          })
        );
        break;
      case "section_7_was_rented_yes":
        dispatch(
          actions.setBooleanField({
            path: "section_7.was_rented",
            value: true,
          })
        );
        break;
    }
  }

  return (
    <div className="border-l border-r border-b flex flex-wrap text-base">
      <div className="sectionHeader">
        <div>
          7. NONRESIDENTIAL RENTAL ACTIVITY – THIS PART MUST BE COMPLETED
        </div>
      </div>

      <div className="arialMT flex w-full ml-3 leading-tight mb-3">
        <div className="flex flex-wrap place-items-center text-base basis-full">
          <div>
            Was any portion of the property rented or offered for rent for any{" "}
            <u>nonresidential</u> use (for example, commercial, retail or office
            use) in 2024?
          </div>
          <div className="basis-full"></div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_7_was_rented_no"
              name="section_7_was_rented__no"
              className="smallCheckbox"
              checked={!was_rented}
              onChange={(e) => handleRented(e)}
            />
            <label htmlFor="section_7_was_rented_no">No</label>
          </div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_7_was_rented_yes"
              name="section_7_was_rented__yes"
              className="smallCheckbox"
              checked={was_rented}
              onChange={(e) => handleRented(e)}
            />
            <label htmlFor="section_7_was_rented_yes">Yes</label>
          </div>
          <div className="arial text-lg font-bold ml-8">
            <u>NEW:</u> IF YES, YOU MUST FILE TC201 (or TC203 for a condo board
            of managers).
          </div>
        </div>
      </div>
    </div>
  );
}
