"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store/store";
import * as actions from "../app/store/slices/mainSlice";
import type { DateObj } from "../app/store/slices/mainSlice";
import ErrorField from "../components/ErrorField";
import { handleError } from "../app/utils/mainUtils";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type SetFunction = (arg: string) => void;

export default function DateField({ path }: { path: string }) {
  const dispatch: AppDispatch = useDispatch();

  const reduxValue = useSelector((state: RootState) =>
    path.split(".").reduce((acc: unknown, key) => {
      if (typeof acc === "object" && acc !== null && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, state)
  ) as DateObj | undefined;

  const [selected, setSelected] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [dateError, setDateError] = useState(false);

  function changeHandle(val: string, num: number, setFunc: SetFunction) {
    if (val.length > num) return;
    setFunc(val);
  }

  function addZero(val: string, num: number, setFunc: SetFunction) {
    if (val.length === 1) setFunc("0" + val);
  }

  function setFromCalendar(date: Date | undefined) {
    if (!date) return;
    setSelected(date);
    setOpen(false);
  }

  function isValidDate(month: number, day: number, year: number): boolean {
    const date = new Date(year, month - 1, day);

    const checkJump =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    return checkJump;
  }

  useEffect(() => {
    if (!reduxValue) return;
    setMonth(reduxValue.month !== null ? String(reduxValue.month) : "");
    setDay(reduxValue.day !== null ? String(reduxValue.day) : "");
    setYear(reduxValue.year !== null ? String(reduxValue.year) : "");

    if (reduxValue.year && reduxValue.month && reduxValue.day) {
      setSelected(
        new Date(reduxValue.year, reduxValue.month - 1, reduxValue.day)
      );
    }
  }, [reduxValue]);

  useEffect(() => {
    if (!selected) return;
    const value: DateObj = {
      month: selected.getMonth() + 1,
      day: selected.getDate(),
      year: selected.getFullYear(),
    };

    setMonth(String(value.month));
    setDay(String(value.day));
    setYear(String(value.year));
    dispatch(actions.setData({ path, value }));
  }, [selected, dispatch, path]);

  return (
    <div className="flex items-end relative">
      <input
        className="dateField border-b border-black w-8"
        type="text"
        value={month}
        placeholder="MM"
        onChange={(e) => changeHandle(e.target.value, 2, setMonth)}
        onBlur={(e) => {
          addZero(e.target.value, 2, setMonth);
          setDateError(handleError(e.target.value, /^\d{1,2}$/));
        }}
      />
      /
      <input
        className="dateField border-b border-black w-8"
        type="text"
        value={day}
        placeholder="DD"
        onChange={(e) => changeHandle(e.target.value, 2, setDay)}
        onBlur={(e) => {
          addZero(e.target.value, 2, setDay);
          setDateError(handleError(e.target.value, /^\d{1,2}$/));
        }}
      />
      /
      <input
        className="dateField border-b border-black w-12"
        type="text"
        value={year}
        placeholder="YYYY"
        onChange={(e) => changeHandle(e.target.value, 4, setYear)}
        onBlur={(e) => {
          setDateError(
            !isValidDate(Number(month), Number(day), Number(e.target.value))
          );
        }}
      />
      <button onClick={() => setOpen(!open)}>&#x1F4C5;</button>
      {open && (
        <div className="absolute z-10 bg-white shadow-lg mt-1">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => setFromCalendar(date)}
          />
        </div>
      )}
      {dateError && (
        <ErrorField title="Enter a date in the format MM/DD/YYYY" />
      )}
    </div>
  );
}
