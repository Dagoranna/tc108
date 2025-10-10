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
    }, state.main)
  ) as DateObj | undefined;

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const [monthError, setMonthError] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [dateError, setDateError] = useState(false);

  function changeHandle(
    val: string,
    num: number,
    setFunc: SetFunction,
    fieldType: "month" | "day" | "year"
  ) {
    if (val.length > num) return;
    setFunc(val);

    const newValue: DateObj = {
      month:
        fieldType === "month"
          ? val
            ? Number(val)
            : null
          : Number(month) || null,
      day:
        fieldType === "day" ? (val ? Number(val) : null) : Number(day) || null,
      year:
        fieldType === "year"
          ? val
            ? Number(val)
            : null
          : Number(year) || null,
    };

    dispatch(actions.setData({ path, value: newValue }));
  }

  function addZero(
    val: string,
    num: number,
    setFunc: SetFunction,
    fieldType: "month" | "day" | "year"
  ) {
    if (val.length === 1) {
      const paddedVal = "0" + val;
      setFunc(paddedVal);

      const newValue: DateObj = {
        month:
          fieldType === "month" ? Number(paddedVal) : reduxValue?.month || null,
        day: fieldType === "day" ? Number(paddedVal) : reduxValue?.day || null,
        year:
          fieldType === "year" ? Number(paddedVal) : reduxValue?.year || null,
      };

      dispatch(actions.setData({ path, value: newValue }));
    }
  }

  function setFromCalendar(date: Date | undefined) {
    if (!date) return;

    const monthFromCalendar = date.getMonth() + 1;
    setMonth(String(monthFromCalendar));
    const dayFromCalendar = date.getDate();
    setDay(String(dayFromCalendar));
    const yearFromCalendar = date.getFullYear();
    setYear(String(yearFromCalendar));
    setOpen(false);
    setMonthError(handleError(String(monthFromCalendar), /^\d{1,2}$/));
    setDayError(handleError(String(dayFromCalendar), /^\d{1,2}$/));
    setDateError(
      !isValidDate(monthFromCalendar, dayFromCalendar, yearFromCalendar)
    );
    dispatch(
      actions.setData({
        path,
        value: {
          month: monthFromCalendar,
          day: dayFromCalendar,
          year: yearFromCalendar,
        },
      })
    );
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
    if (
      reduxValue &&
      Number(month) === reduxValue.month &&
      Number(day) === reduxValue.day &&
      Number(year) === reduxValue.year
    ) {
      return;
    }

    setDay(reduxValue && reduxValue.day !== null ? String(reduxValue.day) : "");
    setMonth(
      reduxValue && reduxValue.month !== null ? String(reduxValue.month) : ""
    );
    setYear(
      reduxValue && reduxValue.year !== null ? String(reduxValue.year) : ""
    );
  }, [reduxValue]);

  return (
    <div className="flex items-end relative">
      <input
        className="dateField border-b border-black w-8"
        type="text"
        value={month}
        placeholder="MM"
        onChange={(e) => changeHandle(e.target.value, 2, setMonth, "month")}
        onBlur={(e) => {
          addZero(e.target.value, 2, setMonth, "month");
          setMonthError(handleError(e.target.value, /^\d{1,2}$/));
        }}
      />
      /
      <input
        className="dateField border-b border-black w-8"
        type="text"
        value={day}
        placeholder="DD"
        onChange={(e) => changeHandle(e.target.value, 2, setDay, "day")}
        onBlur={(e) => {
          addZero(e.target.value, 2, setDay, "day");
          setDayError(handleError(e.target.value, /^\d{1,2}$/));
        }}
      />
      /
      <input
        className="dateField border-b border-black w-12"
        type="text"
        value={year}
        placeholder="YYYY"
        onChange={(e) => changeHandle(e.target.value, 4, setYear, "year")}
        onBlur={(e) => {
          setDateError(
            !isValidDate(Number(month), Number(day), Number(e.target.value))
          );
        }}
      />
      <button onClick={() => setOpen(!open)}>&#x1F4C5;</button>
      {open && (
        <div className="absolute z-10 bg-white shadow-lg mt-1">
          <DayPicker mode="single" onSelect={(date) => setFromCalendar(date)} />
        </div>
      )}
      {(monthError || dayError || dateError) && (
        <ErrorField title="Enter a date in the format MM/DD/YYYY" />
      )}
    </div>
  );
}
