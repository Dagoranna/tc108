"use client";
import React, { useRef, useState } from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";
import LabeledField from "../components/LabeledField";
import ErrorField from "../components/ErrorField";
import { handleInput, handleError } from "../app/utils/mainUtils";

export default function Section_10() {
  const dispatch: AppDispatch = useDispatch();
  const address_borough = useSelector(
    (state: RootState) => state.main.section_10.address.borough
  );
  const address_block = useSelector(
    (state: RootState) => state.main.section_10.address.block
  );
  const address_lot = useSelector(
    (state: RootState) => state.main.section_10.address.lot
  );
  const [blockError, setBlockError] = useState(false);
  const [lotError, setLotError] = useState(false);

  const signer_name = useSelector(
    (state: RootState) => state.main.section_10.signer_name
  );
  const signer_is = useSelector(
    (state: RootState) => state.main.section_10.signer_is
  );
  const fiduciary_relationship = useSelector(
    (state: RootState) => state.main.section_10.fiduciary_relationship
  );
  const fiduciary_entity = useSelector(
    (state: RootState) => state.main.section_10.fiduciary_entity
  );
  const officer_corporate_title = useSelector(
    (state: RootState) => state.main.section_10.officer_corporate_title
  );
  const officer_condo_title = useSelector(
    (state: RootState) => state.main.section_10.officer_condo_title
  );
  const llc_signer_title = useSelector(
    (state: RootState) => state.main.section_10.llc_signer_title
  );
  const date = useSelector((state: RootState) => state.main.section_10.date);

  const signatureRef = useRef<HTMLInputElement | null>(null);

  function handleUploadSignature() {
    signatureRef.current?.click();
  }

  function handleSignerType(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "section_10_signer_is_applicant":
        dispatch(
          actions.setTextField({
            path: "section_10.signer_is",
            value: "Applicant",
          })
        );
        break;
      case "section_10_signer_is_fiduciary":
        dispatch(
          actions.setTextField({
            path: "section_10.signer_is",
            value: "Fiduciary",
          })
        );
        break;
      case "section_10_signer_is_officer_corporate":
        dispatch(
          actions.setTextField({
            path: "section_10.signer_is",
            value: "Officer of a corporate Applicant",
          })
        );
        break;
      case "section_10_signer_is_officer_condo":
        dispatch(
          actions.setTextField({
            path: "section_10.signer_is",
            value: "An officer of the condominium",
          })
        );
        break;
      case "section_10_signer_is_general_partner":
        dispatch(
          actions.setTextField({
            path: "section_10.signer_is",
            value: "General partner of Applicant",
          })
        );
        break;
      case "section_10_signer_is_llc":
        dispatch(
          actions.setTextField({
            path: "section_10.signer_is",
            value: "Member or manager of LLC Applicant",
          })
        );
        break;
      case "section_10_signer_is_agent":
        dispatch(
          actions.setTextField({
            path: "section_10.signer_is",
            value: "Agent for the Applicant",
          })
        );
        break;
    }
  }

  return (
    <div className="border-l border-r border-b  text-base">
      <div className="flex w-full">
        <div className="sectionHeader">
          10. SIGNATURE AND CERTIFICATION{" "}
          <span className="arial text-base flex-grow">
            See Instr. and TC600 “Who May Sign”
          </span>
        </div>
        <div className="flexDirection">
          <LabeledField
            title="BOROUGH"
            additionalClass="border-l border-b flex-none w-28 flex-shrink"
          >
            <input
              id="section_10.address.borough"
              type="text"
              value={address_borough ? address_borough : ""}
              onChange={(e) => handleInput(e, dispatch)}
            />
          </LabeledField>
          <LabeledField
            title="BLOCK"
            additionalClass="border-l border-b flex-none w-28 relative"
          >
            <input
              id="section_10.address.block"
              type="text"
              value={address_block ? address_block : ""}
              onChange={(e) => handleInput(e, dispatch)}
              onBlur={(e) =>
                setBlockError(handleError(e.target.value, /^\d{1,5}$/))
              }
            />
            {blockError && (
              <ErrorField title="The field must contain 1-5 digits" />
            )}
          </LabeledField>
          <LabeledField
            title="LOT"
            additionalClass="border-l border-b flex-none w-28 relative"
          >
            <input
              id="section_10.address.lot"
              type="text"
              value={address_lot ? address_lot : ""}
              onChange={(e) => handleInput(e, dispatch)}
              onBlur={(e) =>
                setLotError(handleError(e.target.value, /^\d{1,4}$/))
              }
            />
            {lotError && (
              <ErrorField title="The field must contain 1-4 digits" />
            )}
          </LabeledField>
        </div>
      </div>{" "}
      <div className="px-3 pb-3 arialMT text-sm">
        <div>
          <u>
            This application must be signed by an individual having personal
            knowledge of the facts
          </u>{" "}
          who is: the owner or other Applicant named in Part 2 on the first page
          of this application, a fiduciary such as an executor, trustee or
          guardian, or another authorized individual acting for the Applicant.
        </div>
        <div className="flex">
          <div>
            a) <b>Print clearly name of person signing:</b>
            <input
              id="section_10.signer_name"
              type="text"
              value={signer_name ? signer_name : ""}
              onChange={(e) => handleInput(e, dispatch)}
              className="border-b border-black flex-grow mr-30 ml-3"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            b) The person signing is (check <u>one</u> box only):
          </div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_10_signer_is_applicant"
              name="section_10_signer_is_applicant"
              className="smallCheckbox"
              checked={signer_is === "Applicant"}
              onChange={(e) => handleSignerType(e)}
            />
            <label htmlFor="section_10_signer_is_applicant">
              The Applicant (check this box only if Applicant is an individual)
            </label>
          </div>
          <div className="px-3 flex flex-wrap break-normal whitespace-normal">
            <div className="flex justify-start">
              <input
                type="checkbox"
                id="section_10_signer_is_fiduciary"
                name="section_10_signer_is_fiduciary"
                className="smallCheckbox flex-none mt-2"
                checked={signer_is === "Fiduciary"}
                onChange={(e) => handleSignerType(e)}
              />
              <div className="ml-0">
                <label htmlFor="section_10_signer_is_fiduciary">
                  Fiduciary. Specify fiduciary’s relationship to Applicant
                </label>
                <input
                  id="section_10.fiduciary_relationship"
                  type="text"
                  readOnly={signer_is !== "Fiduciary"}
                  value={fiduciary_relationship ? fiduciary_relationship : ""}
                  onChange={(e) => handleInput(e, dispatch)}
                  className="border-b border-black"
                />
                <span className="text-base font-bold">
                  (If this box is checked, Form TC200 may be required. See Form
                  TC200 instructions. Write “Special Counsel Review” on the top
                  of page 1.)
                </span>{" "}
                If signing as fiduciary for a corporation, partnership or LLC,
                enter name of entity
                <input
                  id="section_10.fiduciary_entity"
                  type="text"
                  readOnly={signer_is !== "Fiduciary"}
                  value={fiduciary_entity ? fiduciary_entity : ""}
                  onChange={(e) => handleInput(e, dispatch)}
                  className="border-b border-black"
                />
              </div>
            </div>
          </div>
          <div className="px-3 flex flex-wrap">
            <div>
              <input
                type="checkbox"
                id="section_10_signer_is_officer_corporate"
                name="section_10_signer_is_officer_corporate"
                className="smallCheckbox"
                checked={signer_is === "Officer of a corporate Applicant"}
                onChange={(e) => handleSignerType(e)}
              />
              <label htmlFor="section_10_signer_is_officer_corporate">
                An officer of a corporate Applicant.
              </label>
            </div>
            <div>
              Title:
              <input
                id="section_10.officer_corporate_title"
                type="text"
                readOnly={signer_is !== "Officer of a corporate Applicant"}
                value={officer_corporate_title ? officer_corporate_title : ""}
                onChange={(e) => handleInput(e, dispatch)}
                className="border-b border-black min-w-min"
              />
            </div>
          </div>
          <div className="px-3 flex flex-wrap">
            <div>
              <input
                type="checkbox"
                id="section_10_signer_is_officer_condo"
                name="section_10_signer_is_officer_condo"
                className="smallCheckbox"
                checked={signer_is === "An officer of the condominium"}
                onChange={(e) => handleSignerType(e)}
              />
              <label htmlFor="section_10_signer_is_officer_condo">
                An officer of the condominium board of managers.
              </label>
            </div>
            <div>
              Title:
              <input
                id="section_10.officer_condo_title"
                type="text"
                readOnly={signer_is !== "An officer of the condominium"}
                value={officer_condo_title ? officer_condo_title : ""}
                onChange={(e) => handleInput(e, dispatch)}
                className="border-b border-black min-w-min"
              />
            </div>
          </div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_10_signer_is_general_partner"
              name="section_10_signer_is_general_partner"
              className="smallCheckbox"
              checked={signer_is === "General partner of Applicant"}
              onChange={(e) => handleSignerType(e)}
            />
            <label htmlFor="section_10_signer_is_general_partner">
              General partner of partnership Applicant
            </label>
          </div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_10_signer_is_llc"
              name="section_10_signer_is_llc"
              className="smallCheckbox"
              checked={signer_is === "Member or manager of LLC Applicant"}
              onChange={(e) => handleSignerType(e)}
            />
            <label htmlFor="section_10_signer_is_officer_condo">
              Member or manager of, or individual officer of, LLC Applicant
              Signer’s Title:
            </label>
            <input
              id="section_10.llc_signer_title"
              type="text"
              readOnly={signer_is !== "Member or manager of LLC Applicant"}
              value={llc_signer_title ? llc_signer_title : ""}
              onChange={(e) => handleInput(e, dispatch)}
              className="border-b border-black"
            />
          </div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_10_signer_is_agent"
              name="section_10_signer_is_agent"
              className="smallCheckbox"
              checked={signer_is === "Agent for the Applicant"}
              onChange={(e) => handleSignerType(e)}
            />
            <label htmlFor="section_10_signer_is_agent">
              An attorney, employee, property manager or other agent for the
              Applicant.{" "}
              <span className="text-base font-bold">
                (If you checked this box, a notarized Power of Attorney AND Form
                TC244 must be attached or your application will be dismissed.)
              </span>{" "}
              <span className="text-base underline">
                Write “Special Counsel Review” on the top of page 1.)
              </span>
            </label>
          </div>
        </div>
        <div className="arial text-base font-bold">
          <span className="arial text-lg underline">CERTIFICATION</span> I have
          read this entire application before signing below, including all
          relevant instructions, whether on this form or on another. I am
          personally responsible for the accuracy of the information provided on
          this application and on all attachments, and I certify that all such
          information is true and correct to the best of my knowledge and
          belief. I also understand that such information is subject to
          verification, is being relied upon by the City of New York and that
          the making of any willfully false statement of material fact on this
          application or any attachments will subject me to the provisions of
          the penal law relevant to the making and filing of false statements.
        </div>
        <div className="flex mt-2">
          <label htmlFor="signature">
            Signature of individual named in item (a) above:
          </label>
          <div className="flex items-center flex-grow pl-3">
            <input type="file" ref={signatureRef} className="hidden" />
            <button
              type="button"
              onClick={handleUploadSignature}
              className="button-14 w-40"
            >
              Upload Signature
            </button>
          </div>
          <div className="ml-3 ">
            Date:
            <input
              id="section_10.date"
              type="text"
              value={date ? date : ""}
              onChange={(e) => handleInput(e, dispatch)}
              className="border-b border-black w-20 mr-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
