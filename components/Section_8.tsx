"use client";
import React from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";
import DateField from "../components/DateField";

export default function Section_8() {
  const dispatch: AppDispatch = useDispatch();
  const a_bought_after = useSelector(
    (state: RootState) => state.main.section_8.a.bought_after
  );
  const a_sellers_info_name = useSelector(
    (state: RootState) => state.main.section_8.a.sellers_info.name
  );
  const a_sellers_info_price = useSelector(
    (state: RootState) => state.main.section_8.a.sellers_info.price
  );

  const b_signed_for_sell = useSelector(
    (state: RootState) => state.main.section_8.b.signed_for_sell
  );
  const b_buyers_info_name = useSelector(
    (state: RootState) => state.main.section_8.b.buyers_info.name
  );
  const b_buyers_info_price = useSelector(
    (state: RootState) => state.main.section_8.b.buyers_info.price
  );

  const c_offered_for_sale = useSelector(
    (state: RootState) => state.main.section_8.c.offered_for_sale
  );
  const c_details = useSelector(
    (state: RootState) => state.main.section_8.c.details
  );

  const d_refinanced_after = useSelector(
    (state: RootState) => state.main.section_8.d.refinanced_after
  );

  const e_alteration_after = useSelector(
    (state: RootState) => state.main.section_8.e.alteration_after
  );
  const e_details_what_done = useSelector(
    (state: RootState) => state.main.section_8.e.details.what_done
  );

  const e_details_cost = useSelector(
    (state: RootState) => state.main.section_8.e.details.cost
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

  function handleBoughtAfter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "section_8_a_bought_after_no":
        dispatch(
          actions.setBooleanField({
            path: "section_8.a.bought_after",
            value: false,
          })
        );
        break;
      case "section_8_a_bought_after_yes":
        dispatch(
          actions.setBooleanField({
            path: "section_8.a.bought_after",
            value: true,
          })
        );
        break;
    }
  }

  function handleSignedForSell(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "section_8_b_signed_for_sell_no":
        dispatch(
          actions.setBooleanField({
            path: "section_8.b.signed_for_sell",
            value: false,
          })
        );
        break;
      case "section_8_b_signed_for_sell_yes":
        dispatch(
          actions.setBooleanField({
            path: "section_8.b.signed_for_sell",
            value: true,
          })
        );
        break;
    }
  }

  function handleOfferedForSale(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "section_8_c_offered_for_sale_no":
        dispatch(
          actions.setBooleanField({
            path: "section_8.c.offered_for_sale",
            value: false,
          })
        );
        break;
      case "section_8_c_offered_for_sale_yes":
        dispatch(
          actions.setBooleanField({
            path: "section_8.c.offered_for_sale",
            value: true,
          })
        );
        break;
    }
  }

  function handleRefinanced(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "section_8_d_refinanced_after_no":
        dispatch(
          actions.setBooleanField({
            path: "section_8.d.refinanced_after",
            value: false,
          })
        );
        break;
      case "section_8_d_refinanced_after_yes":
        dispatch(
          actions.setBooleanField({
            path: "section_8.d.refinanced_after",
            value: true,
          })
        );
        break;
    }
  }

  function handleAlterationAter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.id;
    switch (value) {
      case "section_8_e_alteration_after_no":
        dispatch(
          actions.setBooleanField({
            path: "section_8.e.alteration_after",
            value: false,
          })
        );
        break;
      case "section_8_e_alteration_after_yes":
        dispatch(
          actions.setBooleanField({
            path: "section_8.e.alteration_after",
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
          8. SALE, CONSTRUCTION, DEMOLITION OR REFINANCING – COMPLETE ALL ITEMS.{" "}
          <i>Attach extra pages if needed.</i>
        </div>
      </div>
      <div className="arialMT flex flex-col w-full ml-3 leading-tight mb-3">
        <div className="flex flex-wrap place-items-center text-base basis-full">
          <div>
            a) Did the current owner buy this property after January 5, 2023?
          </div>
          <div className="basis-full"></div>
          <div className="px-3">
            <input
              type="checkbox"
              id="section_8_a_bought_after_no"
              name="section_8_a_bought_after_no"
              className="smallCheckbox"
              checked={!a_bought_after}
              onChange={(e) => handleBoughtAfter(e)}
            />
            <label htmlFor="section_8_a_bought_after_no">No</label>
          </div>
          <div className="px-3">
            <input
              type="checkbox"
              id="section_8_a_bought_after_yes"
              name="section_8_a_bought_after_yes"
              className="smallCheckbox"
              checked={a_bought_after}
              onChange={(e) => handleBoughtAfter(e)}
            />
            <label htmlFor="section_8_a_bought_after_yes">Yes</label>
          </div>
          <div className="ml-2">
            <b>IF YES:</b> Seller’s Name:
          </div>
          <input
            type="text"
            id="section_8.a.sellers_info.name"
            value={a_sellers_info_name ? a_sellers_info_name : ""}
            onChange={(e) => handleInput(e)}
            className="border-b border-black flex-grow"
          />
          <div className="ml-2">Closing Date:</div>
          <DateField path="a.sellers_info.closing_date" />
          <div className="ml-2">Price:$</div>
          <input
            type="text"
            id="section_8.a.sellers_info.price"
            value={a_sellers_info_price ? a_sellers_info_price : ""}
            onChange={(e) => handleInput(e)}
            className="border-b border-black w-20 mr-4"
          />
        </div>
        <div className="flex flex-wrap place-items-center text-base basis-full">
          <div>
            b) Has the current owner of this property signed a contract to sell
            it?
          </div>
          <div className="basis-full"></div>
          <div className="px-3">
            <input
              type="checkbox"
              id="section_8_b_signed_for_sell_no"
              name="section_8_b_signed_for_sell_no"
              className="smallCheckbox"
              checked={!b_signed_for_sell}
              onChange={(e) => handleSignedForSell(e)}
            />
            <label htmlFor="section_8_b_signed_for_sell_no">No</label>
          </div>
          <div className="px-3">
            <input
              type="checkbox"
              id="section_8_b_signed_for_sell_yes"
              name="section_8_b_signed_for_sell_yes"
              className="smallCheckbox"
              checked={b_signed_for_sell}
              onChange={(e) => handleSignedForSell(e)}
            />
            <label htmlFor="section_8_b_signed_for_sell_yes">Yes</label>
          </div>
          <div className="ml-2">
            <b>IF YES:</b> Buyer’s Name:
          </div>
          <input
            type="text"
            id="section_8.b.buyers_info.name"
            value={b_buyers_info_name ? b_buyers_info_name : ""}
            onChange={(e) => handleInput(e)}
            className="border-b border-black flex-grow"
          />
          <div className="ml-2">Closing Date:</div>
          <DateField path="b.buyers_info.closing_date" />
          <div className="ml-2">Price:$</div>
          <input
            type="text"
            id="section_8.b.buyers_info.price"
            value={b_buyers_info_price ? b_buyers_info_price : ""}
            onChange={(e) => handleInput(e)}
            className="border-b border-black w-20 mr-4"
          />
        </div>
        <div className="flex flex-wrap place-items-center text-base basis-full">
          <div>c) Is the property being offered for sale now?</div>
          <div className="basis-full"></div>
          <div className="px-3">
            <input
              type="checkbox"
              id="section_8_c_offered_for_sale_no"
              name="section_8_c_offered_for_sale_no"
              className="smallCheckbox"
              checked={!c_offered_for_sale}
              onChange={(e) => handleOfferedForSale(e)}
            />
            <label htmlFor="section_8_c_offered_for_sale_no">No</label>
          </div>
          <div className="px-3">
            <input
              type="checkbox"
              id="section_8_c_offered_for_sale_yes"
              name="section_8_c_offered_for_sale_yes"
              className="smallCheckbox"
              checked={c_offered_for_sale}
              onChange={(e) => handleOfferedForSale(e)}
            />
            <label htmlFor="section_8_c_offered_for_sale_yes">Yes</label>
          </div>
          <div className="ml-2">
            <b>IF YES,</b> report the details of offering, including asking
            price:
          </div>
          <input
            type="text"
            id="section_8.c.details"
            value={c_details ? c_details : ""}
            onChange={(e) => handleInput(e)}
            className="border-b border-black flex-grow"
          />
        </div>
        <div className="flex flex-wrap place-items-center text-base basis-full">
          <div>d) Is the property being offered for sale now?</div>
          <div className="basis-full"></div>
          <div className="px-3">
            <input
              type="checkbox"
              id="section_8_d_refinanced_after_no"
              name="section_8_d_refinanced_after_no"
              className="smallCheckbox"
              checked={!d_refinanced_after}
              onChange={(e) => handleRefinanced(e)}
            />
            <label htmlFor="section_8_d_refinanced_after_no">No</label>
          </div>
          <div className="px-3">
            <input
              type="checkbox"
              id="section_8_d_refinanced_after_yes"
              name="section_8_d_refinanced_after_yes"
              className="smallCheckbox mr-5"
              checked={d_refinanced_after}
              onChange={(e) => handleRefinanced(e)}
            />
            <label htmlFor="section_8_d_refinanced_after_yes">Yes</label>
          </div>
          <div className="ml-2">
            <b>IF YES,</b> attach documents showing what the property was
            appraised at when it was refinanced.
          </div>
        </div>
        <div className="flex flex-wrap place-items-center text-base basis-full">
          <div>
            e) Since January 5, 2023 has there been any construction, demolition
            or major alteration work or have plans for demolition or a new
            building been filed with the Buildings Dept.?
          </div>
          <div className="basis-full"></div>
          <div className="flex">
            <div className="px-3 gap-1 whitespace-nowrap">
              <input
                type="checkbox"
                id="section_8_e_alteration_after_no"
                name="section_8_e_alteration_after_no"
                className="smallCheckbox"
                checked={!e_alteration_after}
                onChange={(e) => handleAlterationAter(e)}
              />
              <label htmlFor="section_8_e_alteration_after_no">No</label>
            </div>
            <div className="px-3 gap-1 whitespace-nowrap">
              <input
                type="checkbox"
                id="section_8_e_alteration_after_yes"
                name="section_8_e_alteration_after_yes"
                className="smallCheckbox mr-5"
                checked={e_alteration_after}
                onChange={(e) => handleAlterationAter(e)}
              />
              <label htmlFor="section_8_e_alteration_after_yes">Yes</label>
            </div>
            <div className="ml-2 flex flex-grow">
              <div className="gap-1 whitespace-nowrap">
                <b>IF YES:</b>
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex flex-grow mx-2 flex-wrap">
                  (1) what work was done?
                  <input
                    type="text"
                    id="section_8.e.details.what_done"
                    value={e_details_what_done ? e_details_what_done : ""}
                    onChange={(e) => handleInput(e)}
                    className="border-b border-black flex-grow"
                  />
                </div>
                <div className="flex flex-grow mx-2 flex-wrap items-center">
                  <div>(2) Date the work started:</div>
                  <DateField path="section_8.e.details.start_date" />
                  <div className="ml-2">
                    Date the work was, or will be, completed:
                  </div>
                  <DateField path="section_8.e.details.finish_date" />
                </div>
                <div className="flex flex-grow mx-2 flex-wrap items-center">
                  <div>(3) the total direct and indirect cost: $</div>
                  <input
                    type="text"
                    id="section_8.e.details.cost"
                    value={e_details_cost ? e_details_cost : ""}
                    onChange={(e) => handleInput(e)}
                    className="border-b border-black flex-grow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
