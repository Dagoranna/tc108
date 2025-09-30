"use client";
import React, { useState } from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";
import LabeledField from "../components/LabeledField";
import ErrorField from "../components/ErrorField";
import { handleInput, handleError } from "../app/utils/mainUtils";

export default function Section_3() {
  const dispatch: AppDispatch = useDispatch();
  const name = useSelector((state: RootState) => state.main.section_3.name);
  const group = useSelector((state: RootState) => state.main.section_3.group);
  const phone_1 = useSelector(
    (state: RootState) => state.main.section_3.phone.phone_1
  );
  const [phoneError, setPhoneError] = useState(false);
  const phone_2 = useSelector(
    (state: RootState) => state.main.section_3.phone.phone_2
  );
  const phone_3 = useSelector(
    (state: RootState) => state.main.section_3.phone.phone_3
  );

  const mail_addr = useSelector(
    (state: RootState) => state.main.section_3.mail_addr
  );
  const email_addr = useSelector(
    (state: RootState) => state.main.section_3.email_addr
  );
  const [emailError, setEmailError] = useState(false);

  const isHandler = useSelector(
    (state: RootState) => state.main.section_3.isHandler
  );
  const representative_type = useSelector(
    (state: RootState) => state.main.section_3.representative_type
  );
  const representative_type_other = useSelector(
    (state: RootState) => state.main.section_3.representative_type_other
  );

  function handleIsHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "isHandler_no":
        dispatch(
          actions.setBooleanField({
            path: "section_3.isHandler",
            value: false,
          })
        );
        break;
      case "isHandler_yes":
        dispatch(
          actions.setBooleanField({
            path: "section_3.isHandler",
            value: true,
          })
        );
        break;
    }
  }

  function handleRepresentativeType(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;

    switch (value) {
      case "section3.representative_type.attorney":
        dispatch(
          actions.setTextField({
            path: "section_3.representative_type",
            value: "Attorney",
          })
        );
        break;
      case "section3.representative_type.other":
        dispatch(
          actions.setTextField({
            path: "section_3.representative_type",
            value: "Other",
          })
        );
        break;
    }
  }

  return (
    <div className="border-l border-r border-b flex flex-wrap">
      <div className="sectionHeader">
        <div>
          3. CONTACT INFORMATION - Supply information for Representative or
          Applicant, if self-represented. (See Instr.)
        </div>
      </div>
      <LabeledField
        title="NAME OF INDIVIDUAL OR FIRM TO BE CONTACTED"
        additionalClass="border-r border-b"
      >
        <input
          id="section_3.name"
          type="text"
          value={name ? name : ""}
          onChange={(e) => handleInput(e, dispatch)}
        />
      </LabeledField>
      <LabeledField
        title="GROUP #, IF ANY"
        additionalClass="border-r border-b"
        styleObj={{ flex: "0 1" }}
      >
        <input
          id="section_3.group"
          type="text"
          value={group ? group : ""}
          onChange={(e) => handleInput(e, dispatch)}
        />
      </LabeledField>
      <LabeledField
        title="PHONE NO.:"
        additionalClass="border-b"
        styleObj={{ flex: "1 1" }}
      >
        <div className="flex px-4 relative">
          (
          <input
            id="section_3.phone.phone_1"
            placeholder="XXX"
            className="border-b border-black w-10 text-center"
            value={phone_1 ? phone_1 : ""}
            onChange={(e) => handleInput(e, dispatch)}
            onBlur={(e) =>
              setPhoneError(handleError(e.target.value, /^\d{3}$/))
            }
          />
          <span className="mr-2">)</span>
          <input
            id="section_3.phone.phone_2"
            placeholder="XXX"
            className="border-b border-black w-10 text-center"
            value={phone_2 ? phone_2 : ""}
            onChange={(e) => handleInput(e, dispatch)}
            onBlur={(e) =>
              setPhoneError(handleError(e.target.value, /^\d{3}$/))
            }
          />
          <span className="tracking-tighter">----</span>
          <input
            id="section_3.phone.phone_3"
            placeholder="XXXX"
            className="border-b border-black w-14 text-center"
            value={phone_3 ? phone_3 : ""}
            onChange={(e) => handleInput(e, dispatch)}
            onBlur={(e) =>
              setPhoneError(handleError(e.target.value, /^\d{4}$/))
            }
          />
          {phoneError && (
            <ErrorField title="Enter the phone number using digits only, in the format: (XXX) XXX-XXXX" />
          )}
        </div>
      </LabeledField>
      <div className="basis-full"></div>
      <LabeledField
        title="MAILING ADDRESS:"
        additionalClass="border-r border-b basis-3/5"
      >
        <input
          id="section_3.mail_addr"
          type="text"
          value={mail_addr ? mail_addr : ""}
          onChange={(e) => handleInput(e, dispatch)}
        />
      </LabeledField>
      <LabeledField title="EMAIL ADDRESS:" additionalClass="border-b basis-2/5">
        <input
          id="section_3.email_addr"
          type="text"
          value={email_addr ? email_addr : ""}
          onChange={(e) => handleInput(e, dispatch)}
          onBlur={(e) =>
            setEmailError(
              handleError(
                e.target.value,
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
              )
            )
          }
        />
        {emailError && (
          <ErrorField title="Enter a valid email (example: name@example.com)" />
        )}
      </LabeledField>
      <div className="flex flex-wrap arialMT place-items-center text-lg">
        <span className="arial font-bold ml-3">
          Will an appointed Representative handle this application for the
          Applicant?
        </span>{" "}
        <span className="mr-3">(Check One):</span>
        <input
          type="checkbox"
          id="isHandler_no"
          name="isHandler_no"
          className="boldCheckbox"
          checked={!isHandler}
          onChange={(e) => handleIsHandler(e)}
        />
        <label htmlFor="isHandler_no" className="mr-3">
          No
        </label>
        <input
          type="checkbox"
          id="isHandler_yes"
          name="isHandler_yes"
          className="boldCheckbox"
          checked={isHandler}
          onChange={(e) => handleIsHandler(e)}
        />
        <label htmlFor="isHandler_yes" className="mr-3">
          Yes
        </label>
        <div className="basis-full"></div>
        <div className="flex flex-wrap place-items-center w-full">
          <div className="mr-3">If “Yes”, check type of Representative:</div>
          <input
            type="checkbox"
            id="section3.representative_type.attorney"
            name="section3.representative_type.attorney"
            readOnly={!isHandler}
            className="boldCheckbox"
            checked={representative_type === "Attorney"}
            onChange={(e) => {
              if (isHandler) handleRepresentativeType(e);
            }}
          />
          <label
            htmlFor="section3.representative_type.attorney"
            className="mr-3"
          >
            Attorney
          </label>
          <input
            type="checkbox"
            id="section3.representative_type.other"
            readOnly={!isHandler}
            name="section3.representative_type.other"
            className="boldCheckbox"
            checked={representative_type === "Other"}
            onChange={(e) => {
              if (isHandler) handleRepresentativeType(e);
            }}
          />
          <label htmlFor="section_3.representative_type_other" className="mr-3">
            Other (specify)
          </label>
          <input
            id="section_3.representative_type_other"
            type="text"
            readOnly={!isHandler || representative_type !== "Other"}
            className="border-b border-black mb-1 mr-3 flex-grow"
            value={representative_type_other ? representative_type_other : ""}
            onChange={(e) => handleInput(e, dispatch)}
          />
        </div>
      </div>
    </div>
  );
}
