"use client";
import React from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";
import LabeledField from "../components/LabeledField";

/*
  section_6: {
    kitchens: number | null;
    baths: number | null;
    bedrooms: number | null;
    other_rooms: number | null;
    stories: number | null;
    year_of_construction: number | null; //TODO: 4 digits
    parking: {
      indoor: number | null;
      outdoor: number | null;
    };
    last_alteration: string;
    property_descr: {
      property_is: PropertyType | null;
      other_info: {
        descr: string;
        resid_units: number | null;
        commerc_units: number | null;
      };
      have_basement: "no" | "yes_unfinished" | "yes_finished" | null;
    };
  };

  type PropertyType =
  | "family_1"
  | "family_2"
  | "family_3"
  | "vacant"
  | "class_one_condo"
  | "other";
*/
export default function Section_6() {
  const dispatch: AppDispatch = useDispatch();
  const kitchens = useSelector(
    (state: RootState) => state.main.section_6.kitchens
  );
  const baths = useSelector((state: RootState) => state.main.section_6.baths);
  const bedrooms = useSelector(
    (state: RootState) => state.main.section_6.bedrooms
  );
  const other_rooms = useSelector(
    (state: RootState) => state.main.section_6.other_rooms
  );
  const stories = useSelector(
    (state: RootState) => state.main.section_6.stories
  );
  const year_of_construction = useSelector(
    (state: RootState) => state.main.section_6.year_of_construction
  );
  const parking_indoor = useSelector(
    (state: RootState) => state.main.section_6.parking.indoor
  );
  const parking_outdoor = useSelector(
    (state: RootState) => state.main.section_6.parking.outdoor
  );

  const last_alteration = useSelector(
    (state: RootState) => state.main.section_6.last_alteration
  );
  const property_descr_type = useSelector(
    (state: RootState) => state.main.section_6.property_descr.property_is
  );
  const property_descr_other_info = useSelector(
    (state: RootState) => state.main.section_6.property_descr.other_info.descr
  );
  const property_descr_other_info_resid_units = useSelector(
    (state: RootState) =>
      state.main.section_6.property_descr.other_info.resid_units
  );
  const property_descr_other_info_commerc_units = useSelector(
    (state: RootState) =>
      state.main.section_6.property_descr.other_info.commerc_units
  );
  const property_descr_have_basement = useSelector(
    (state: RootState) => state.main.section_6.property_descr.have_basement
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

  function handleBasement(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "section_6_property_descr_have_basement_no":
        dispatch(
          actions.setTextField({
            path: "section_6.property_descr.have_basement",
            value: "no",
          })
        );
        break;
      case "section_6_property_descr_have_basement_yes_unfinished":
        dispatch(
          actions.setTextField({
            path: "section_6.property_descr.have_basement",
            value: "yes_unfinished",
          })
        );
        break;
      case "section_6_property_descr_have_basement_yes_finished":
        dispatch(
          actions.setTextField({
            path: "section_6.property_descr.have_basement",
            value: "yes_finished",
          })
        );
        break;
    }
  }

  function handlePropertyType(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "section_6_property_descr_family_1":
        dispatch(
          actions.setTextField({
            path: "section_6.property_descr.property_is",
            value: "family_1",
          })
        );
        break;
      case "section_6_property_descr_family_2":
        dispatch(
          actions.setTextField({
            path: "section_6.property_descr.property_is",
            value: "family_2",
          })
        );
        break;
      case "section_6_property_descr_family_3":
        dispatch(
          actions.setTextField({
            path: "section_6.property_descr.property_is",
            value: "family_3",
          })
        );
        break;
      case "section_6_property_descr_vacant":
        dispatch(
          actions.setTextField({
            path: "section_6.property_descr.property_is",
            value: "vacant",
          })
        );
        break;
      case "section_6_property_descr_class_one_condo":
        dispatch(
          actions.setTextField({
            path: "section_6.property_descr.property_is",
            value: "class_one_condo",
          })
        );
        break;
      case "section_6_property_descr_other":
        dispatch(
          actions.setTextField({
            path: "section_6.property_descr.property_is",
            value: "other",
          })
        );
        break;
    }
  }

  return (
    <div className="border-l border-r border-b flex flex-wrap text-base">
      <div className="sectionHeader">
        <div>
          6. PROPERTY DESCRIPTION AS OF JANUARY 5, 2025 – Complete every item.
          Note: The Tax Commission cannot change the physical description of
          your property that appears on your Notice of Property Value. See
          Instructions.
        </div>
      </div>
      <div className="flex flex-wrap">
        <LabeledField
          title="NUMBER OF KITCHENS"
          additionalClass="border-r border-b basis-1/4"
        >
          <input
            id="section_6.kitchens"
            value={kitchens ? kitchens : ""}
            onChange={(e) => handleInput(e)}
          />
        </LabeledField>
        <LabeledField
          title="NUMBER OF BATHS"
          additionalClass="border-r border-b basis-1/4"
        >
          <input
            id="section_6.baths"
            value={baths ? baths : ""}
            onChange={(e) => handleInput(e)}
          />
        </LabeledField>
        <LabeledField
          title="NUMBER OF BEDROOMS"
          additionalClass="border-r border-b basis-1/4"
        >
          <input
            id="section_6.bedrooms"
            value={bedrooms ? bedrooms : ""}
            onChange={(e) => handleInput(e)}
          />
        </LabeledField>
        <LabeledField
          title="NUMBER OF OTHER ROOMS"
          additionalClass="border-r border-b basis-1/4"
        >
          <input
            id="section_6.other_rooms"
            value={other_rooms ? other_rooms : ""}
            onChange={(e) => handleInput(e)}
          />
        </LabeledField>
        <LabeledField
          title="NUMBER OF STORIES (ABOVE BASEMENT)"
          additionalClass="border-r border-b basis-1/4"
        >
          <input
            id="section_6.stories"
            value={stories ? stories : ""}
            onChange={(e) => handleInput(e)}
          />
        </LabeledField>
        <LabeledField
          title="YEAR OF CONSTRUCTION (IF KNOWN)"
          additionalClass="border-r border-b basis-1/4"
        >
          <input
            id="section_6.year_of_construction"
            value={year_of_construction ? year_of_construction : ""}
            onChange={(e) => handleInput(e)}
          />
        </LabeledField>
        <LabeledField
          title="NUMBER OF PARKING SPACES ON THE PROPERTY"
          additionalClass="border-r border-b basis-1/2"
        >
          <div className="flex justify-between">
            <div>Indoor (garage):</div>
            <input
              id="section_6.parking.indoor"
              value={parking_indoor ? parking_indoor : ""}
              onChange={(e) => handleInput(e)}
              className="border-b border-black"
            />
            <div>Outdoor:</div>
            <input
              id="section_6.parking.outdoor"
              value={parking_outdoor ? parking_outdoor : ""}
              onChange={(e) => handleInput(e)}
              className="border-b border-black"
            />
          </div>
        </LabeledField>
        <LabeledField
          title="YEAR AND DESCRIPTION OF LAST PHYSICAL ALTERATION OR ADDITION SINCE APPLICANT ACQUIRED THE PROPERTY"
          additionalClass="border-r border-b basis-full"
        >
          <input
            id="section_6.last_alteration"
            value={last_alteration ? last_alteration : ""}
            onChange={(e) => handleInput(e)}
          />
        </LabeledField>
      </div>
      <div className="arialMT flex w-full ml-3 leading-tight mb-3">
        <div className="flex flex-wrap place-items-center text-base basis-full">
          <div>a) The property is:</div>
          <div className="basis-full"></div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_6_property_descr_family_1"
              name="section_6_property_descr_family_1"
              className="smallCheckbox"
              checked={property_descr_type === "family_1"}
              onChange={(e) => handlePropertyType(e)}
            />
            <label htmlFor="section_6_property_descr_family_1">
              1-family house{" "}
            </label>
          </div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_6_property_descr_family_2"
              name="section_6_property_descr_family_2"
              className="smallCheckbox"
              checked={property_descr_type === "family_2"}
              onChange={(e) => handlePropertyType(e)}
            />
            <label htmlFor="section_6_property_descr_family_2">
              2-family house{" "}
            </label>
          </div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_6_property_descr_family_3"
              name="section_6_property_descr_family_3"
              className="smallCheckbox"
              checked={property_descr_type === "family_3"}
              onChange={(e) => handlePropertyType(e)}
            />
            <label htmlFor="section_6_property_descr_family_3">
              3-family house{" "}
            </label>
          </div>
          <div className="px-3 basis-full">
            <input
              type="checkbox"
              id="section_6_property_descr_vacant"
              name="section_6_property_descr_vacant"
              className="smallCheckbox"
              checked={property_descr_type === "vacant"}
              onChange={(e) => handlePropertyType(e)}
            />
            <label htmlFor="section_6_property_descr_vacant">
              Vacant lot zoned residential and located outside Manhattan.
            </label>
          </div>
          <div className="px-3 basis-full">
            <input
              type="checkbox"
              id="section_6_property_descr_class_one_condo"
              name="section_6_property_descr_class_one_condo"
              className="smallCheckbox"
              checked={property_descr_type === "class_one_condo"}
              onChange={(e) => handlePropertyType(e)}
            />
            <label htmlFor="section_6_property_descr_class_one_condo">
              Class One condominium unit{" "}
              <span className="font-bold italic">
                (A condominium board filing for unit owners must attach a
                schedule including a detailed physical description and condition
                of each unit covered by the application. Include special
                features and alteration data.)
              </span>
            </label>
          </div>
          <div className="px-3 flex flex-wrap basis-full place-items-center">
            <input
              type="checkbox"
              id="section_6_property_descr_other"
              name="section_6_property_descr_other"
              className="smallCheckbox"
              checked={property_descr_type === "other"}
              onChange={(e) => handlePropertyType(e)}
            />
            <label htmlFor="section_6_property_descr_other">
              Other (describe):
            </label>
            <input
              id="section_6.property_descr.other_info.descr"
              value={property_descr_other_info ? property_descr_other_info : ""}
              onChange={(e) => handleInput(e)}
              className="border-b border-black flex-grow"
            />
            <div>
              If <b>OTHER</b>, enter number of residential units:
            </div>
            <input
              id="section_6.property_descr.other_info.resid_units"
              value={
                property_descr_other_info_resid_units
                  ? property_descr_other_info_resid_units
                  : ""
              }
              onChange={(e) => handleInput(e)}
              className="border-b border-black w-10"
            />
            <div>and number of commercial units:</div>
            <input
              id="section_6.property_descr.other_info.commerc_units"
              value={
                property_descr_other_info_commerc_units
                  ? property_descr_other_info_commerc_units
                  : ""
              }
              onChange={(e) => handleInput(e)}
              className="border-b border-black  w-10"
            />
          </div>
        </div>
      </div>
      <div className="arialMT flex w-full ml-3 leading-tight mb-3">
        <div className="flex flex-wrap place-items-center text-base basis-full">
          <div>b) Is there a basement?</div>
          <div className="basis-full"></div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_6_property_descr_have_basement_no"
              name="section_6_property_descr_have_basement_no"
              className="smallCheckbox"
              checked={property_descr_have_basement === "no"}
              onChange={(e) => handleBasement(e)}
            />
            <label htmlFor="section_6_property_descr_have_basement_no">
              No
            </label>
          </div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_6_property_descr_have_basement_yes_unfinished"
              name="section_6_property_descr_have_basement_yes_unfinished"
              className="smallCheckbox"
              checked={property_descr_have_basement === "yes_unfinished"}
              onChange={(e) => handleBasement(e)}
            />
            <label htmlFor="section_6_property_descr_have_basement_yes_unfinished">
              Yes, unfinished space only
            </label>
          </div>
          <div className="px-3 ">
            <input
              type="checkbox"
              id="section_6_property_descr_have_basement_yes_finished"
              name="section_6_property_descr_have_basement_yes_finished"
              className="smallCheckbox"
              checked={property_descr_have_basement === "yes_finished"}
              onChange={(e) => handleBasement(e)}
            />
            <label htmlFor="section_6_property_descr_have_basement_yes_finished">
              Yes, finished living space
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
/*  type PropertyType =
| "family_1"
| "family_2"
| "family_3"
| "vacant"
| "class_one_condo"
| "other";*/

/*
If OTHER, enter number of residential units: ___ and number of commercial units: ___
*/
