"use client";
import React from "react";
import Image from "next/image";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";
// import DateField from "../components/DateField";
//import { PayloadAction } from "@reduxjs/toolkit";
/*
      <DateField path="section_9.sale_1.date" />
      <DateField path="section_9.sale_2.date" />
*/
export default function SectionIntro({ year }: { year: string }) {
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

  return (
    <>
      <div className="whiteSection arialMT flex flex-wrap justify-between">
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
            className="inputTopAddress"
            value={borough ? borough : ""}
            onChange={(e) =>
              dispatch(
                actions.setTextField({
                  path: "section_address.borough",
                  value: e.target.value,
                })
              )
            }
          />
        </div>
        <div className="topAddress">
          <div>BLOCK</div>
          <input
            className="inputTopAddress"
            style={{ width: "5rem" }}
            value={block ? block : ""}
            onChange={(e) =>
              dispatch(
                actions.setTextField({
                  path: "section_address.block",
                  value: e.target.value,
                })
              )
            }
          />
        </div>
        <div className="topAddress">
          <div>LOT</div>
          <input
            className="inputTopAddress"
            style={{ width: "4rem" }}
            value={lot ? lot : ""}
            onChange={(e) =>
              dispatch(
                actions.setTextField({
                  path: "section_address.lot",
                  value: e.target.value,
                })
              )
            }
          />
        </div>
        <div className="topAddress">
          <div>GROUP #</div>
          <input
            className="inputTopAddress"
            style={{ width: "5rem" }}
            value={group ? group : ""}
            onChange={(e) =>
              dispatch(
                actions.setTextField({
                  path: "section_address.group",
                  value: e.target.value,
                })
              )
            }
          />
        </div>
        <div className="topAddress" style={{ marginRight: "5rem" }}>
          <div>REVIEWED BY</div>
          <input
            className="inputTopAddress"
            value={reviewed_by ? reviewed_by : ""}
            onChange={(e) =>
              dispatch(
                actions.setTextField({
                  path: "section_address.reviewed_by",
                  value: e.target.value,
                })
              )
            }
          />
        </div>
      </div>
      <div className="arial flex justify-between">
        <div className="relative w-40 h-36 mt-4">
          <Image src="/seal.jpg" alt="Seal" fill />
        </div>
        <div className="arial text-3xl text-center font-bold mt-3">
          <span style={{ letterSpacing: "-0.02em" }}>
            TAX COMMISSION OF THE CITY OF NEW YORK{" "}
          </span>
          <br />1 Centre Street, Room 2400, New York, NY 10007
        </div>
        <div className="flex flex-col justify-center items-center w-48 h-32 mt-[3px] border-[15px] border-solid borderGray font-bold">
          <div className="arial text-2xl">TC108</div>
          <div className="arial text-base line-1rem">{year}</div>
        </div>
      </div>
    </>
  );
}
