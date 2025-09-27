"use client";
import React from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";

export default function Section_5() {
  const dispatch: AppDispatch = useDispatch();
  const hearing_req = useSelector(
    (state: RootState) => state.main.section_5.hearing_req
  );

  function handleHearingReq(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "section_5.request.without":
        dispatch(
          actions.setTextField({
            path: "section_5.hearing_req",
            value: "Without",
          })
        );
        break;
      case "section_5.request.inperson":
        dispatch(
          actions.setTextField({
            path: "section_5.hearing_req",
            value: "In-person",
          })
        );
        break;
      case "section_5.request.telephone":
        dispatch(
          actions.setTextField({
            path: "section_5.hearing_req",
            value: "Telephone",
          })
        );
        break;
      case "section_5.request.video":
        dispatch(
          actions.setTextField({
            path: "section_5.hearing_req",
            value: "Video",
          })
        );
        break;
    }
  }

  return (
    <div className="border-l border-r border-b flex flex-wrap text-base">
      <div className="sectionHeader">
        <div>
          5. HEARING REQUEST - Check <u>one</u> box only.
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-3 text-xl">
          <input
            type="checkbox"
            id="section_5.request.without"
            name="section_5.request.without"
            className="boldCheckbox"
            checked={hearing_req === "Without"}
            onChange={(e) => handleHearingReq(e)}
          />
          <label htmlFor="section_5.request.without">
            Review on papers submitted WITHOUT an in-person hearing
          </label>
        </div>
        <div className="ml-40 font-bold arial text-xl">OR</div>
        <div className="px-3 text-xl">
          <input
            type="checkbox"
            id="section_5.request.inperson"
            name="section_5.request.inperson"
            className="boldCheckbox"
            checked={hearing_req === "In-person"}
            onChange={(e) => handleHearingReq(e)}
          />
          <label htmlFor="section_5.request.inperson">
            In-person hearing in Manhattan
          </label>
        </div>
        <div className="px-3 text-xl">
          <input
            type="checkbox"
            id="section_5.request.telephone"
            name="section_5.request.telephone"
            className="boldCheckbox"
            checked={hearing_req === "Telephone"}
            onChange={(e) => handleHearingReq(e)}
          />
          <label htmlFor="section_5.request.telephone">Telephone hearing</label>
        </div>
        <div className="px-3 text-xl">
          <input
            type="checkbox"
            id="section_5.request.video"
            name="section_5.request.video"
            className="boldCheckbox"
            checked={hearing_req === "Video"}
            onChange={(e) => handleHearingReq(e)}
          />
          <label htmlFor="section_5.request.video">
            Video conference using Microsoft Teams
          </label>
        </div>
      </div>
    </div>
  );
}
