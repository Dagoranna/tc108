# Add class based on applicant description
_Exported on 9/30/2025 at 09:32:05 GMT+3 from Cursor (1.7.17)_

---

**User**

with condition applicant_descr !== "Other" add class  text-gray-500 to className

---

**Cursor**

I'll open `components/Section_2.tsx` to locate the input and update its `className` to include `text-gray-500` when `applicant_descr !== "Other"`.

I'll update the input's className to conditionally append `text-gray-500` when `applicant_descr !== "Other"`, then check for linter issues in `components/Section_2.tsx`.

```typescriptreact
"use client";
import React from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";
import { handleInput } from "../app/utils/mainUtils";

export default function Section_2() {
  const dispatch: AppDispatch = useDispatch();
  const applicant_name = useSelector(
    (state: RootState) => state.main.section_2.applicant_name
  );
  const applicant_descr = useSelector(
    (state: RootState) => state.main.section_2.applicant_descr
  );
  const other_descr = useSelector(
    (state: RootState) => state.main.section_2.other_descr
  );
  const condo_auth = useSelector(
    (state: RootState) => state.main.section_2.condo_auth
  );

  function handleApplicantDescr(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "applicant_descr_owner":
        dispatch(
          actions.setTextField({
            path: "section_2.applicant_descr",
            value: "Owner",
          })
        );
        break;
      case "applicant_descr_tenant":
        dispatch(
          actions.setTextField({
            path: "section_2.applicant_descr",
            value: "Tenant",
          })
        );
        break;
      case "applicant_descr_other":
        dispatch(
          actions.setTextField({
            path: "section_2.applicant_descr",
            value: "Other",
          })
        );
        break;
      case "applicant_descr_condo":
        dispatch(
          actions.setTextField({
            path: "section_2.applicant_descr",
            value: "Condo",
          })
        );
        break;
    }
  }

  function handleCondoAuthority(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "condo_auth_bylaws":
        dispatch(
          actions.setTextField({
            path: "section_2.condo_auth",
            value: "By-laws",
          })
        );
        break;
      case "condo_auth_individual":
        dispatch(
          actions.setTextField({
            path: "section_2.condo_auth",
            value: "Individual",
          })
        );
        break;
      case "condo_auth_attorney":
        dispatch(
          actions.setTextField({
            path: "section_2.condo_auth",
            value: "Power-of-Attorney",
          })
        );
        break;
    }
  }

  return (
    <div className="border-l border-r border-b flex flex-wrap">
      <div className="sectionHeader">
        <div>
          2. APPLICANT - The Applicant must be an owner or other person directly
          affected by the assessment.
        </div>
        <div className="text-center w-full">
          An attorney or agent, other than the board of managers of a condo,
          cannot be the Applicant.
        </div>
      </div>
      <div className="w-full">
        <div className="flex p-3">
          <div className="arial font-bold">a) APPLICANT’S NAME: </div>{" "}
          <input
            id="section_2.applicant_name"
            className="inputTopAddress w-1/2"
            value={applicant_name ? applicant_name : ""}
            onChange={(e) => handleInput(e, dispatch)}
          />
        </div>
        <div className="arial font-bold px-3">
          b) APPLICANT DESCRIPTION (CHECK ONE):
        </div>{" "}
        <div className="px-3 text-xl">
          <input
            type="checkbox"
            id="applicant_descr_owner"
            name="applicant_descr_owner"
            className="boldCheckbox"
            checked={applicant_descr === "Owner"}
            onChange={(e) => handleApplicantDescr(e)}
          />
          <label htmlFor="applicant_descr_owner">Owner</label>
        </div>
        <div className="px-3 text-xl">
          <input
            type="checkbox"
            id="applicant_descr_tenant"
            name="applicant_descr_tenant"
            className="boldCheckbox"
            checked={applicant_descr === "Tenant"}
            onChange={(e) => handleApplicantDescr(e)}
          />
          <label htmlFor="applicant_descr_tenant">
            Tenant paying all taxes
          </label>
        </div>
        <div className="px-3 text-xl">
          <input
            type="checkbox"
            id="applicant_descr_other"
            name="applicant_descr_other"
            className="boldCheckbox"
            checked={applicant_descr === "Other"}
            onChange={(e) => handleApplicantDescr(e)}
          />
          <label htmlFor="applicant_descr_other">Other (specify):</label>
          <input
            id="section_2.other_descr"
            readOnly = {applicant_descr !== "Other"}
            className={`inputTopAddress ${applicant_descr !== "Other" ? "text-gray-500" : ""}`}
            style={{ width: "24rem" }}
            value={other_descr ? other_descr : ""}
            onChange={(e) => handleInput(e, dispatch)}
          />
          <span>
            (<b>Attach TC200</b> and documentation specified in Part 2 of
            TC200.)
          </span>
          <br />
          <span className="font-bold text-base mx-8">
            IF YOU DON’T SUBMIT FORM TC200, YOUR APPLICATION WILL NOT BE
            REVIEWED.
          </span>
        </div>
        <div className="px-3 text-xl">
          <input
            type="checkbox"
            id="applicant_descr_condo"
            name="applicant_descr_condo"
            className="boldCheckbox"
            checked={applicant_descr === "Condo"}
            onChange={(e) => handleApplicantDescr(e)}
          />
          <label htmlFor="applicant_descr_condo">
            Condo board of managers designated as agent for condo unit owner to
            contest assessment (Attach list of covered lots).
          </label>
        </div>
        <div className="px-3 text-xl flex flex-wrap items-center arialMT">
          <div>
            Source of Board’s authority{" "}
            <span className="arial font-bold mr-4">(check one):</span>
          </div>
          <input
            type="checkbox"
            id="condo_auth_bylaws"
            name="condo_auth_bylaws"
            className="boldCheckbox"
            checked={condo_auth === "By-laws"}
            onChange={(e) => handleCondoAuthority(e)}
          />
          <label htmlFor="condo_auth_bylaws" className="mr-4">
            By-laws
          </label>
          <input
            type="checkbox"
            id="condo_auth_individual"
            name="condo_auth_individual"
            className="boldCheckbox"
            checked={condo_auth === "Individual"}
            onChange={(e) => handleCondoAuthority(e)}
          />
          <label htmlFor="condo_auth_individual" className="mr-4">
            Individual authorization, valid under applicable law
          </label>
          <input
            type="checkbox"
            id="condo_auth_attorney"
            name="condo_auth_attorney"
            className="boldCheckbox"
            checked={condo_auth === "Power-of-Attorney"}
            onChange={(e) => handleCondoAuthority(e)}
          />
          <label htmlFor="condo_auth_attorney" className="mr-4">
            Power-of-Attorney
          </label>
        </div>
      </div>
    </div>
  );
}

```

- Added conditional class to `section_2.other_descr` input so it shows gray text when not editable.

```152:157:components/Section_2.tsx
            readOnly = {applicant_descr !== "Other"}
            className={`inputTopAddress ${applicant_descr !== "Other" ? "text-gray-500" : ""}`}
            style={{ width: "24rem" }}
            value={other_descr ? other_descr : ""}
            onChange={(e) => handleInput(e, dispatch)}
```

All good—no linter issues.

```typescriptreact
            readOnly = {applicant_descr !== "Other"}
            className={`inputTopAddress ${applicant_descr !== "Other" ? "text-gray-500" : ""}`}
            style={{ width: "24rem" }}
            value={other_descr ? other_descr : ""}
            onChange={(e) => handleInput(e, dispatch)}
```

