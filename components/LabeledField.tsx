"use client";
import React from "react";
import type { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../app/store/slices/mainSlice";

interface LabeledFieldProps {
  title: string;
  styleObj?: Record<string, string>;
  additionalClass?: string;
  children?: React.ReactNode;
}

export default function LabeledField({
  title,
  styleObj,
  additionalClass,
  children,
}: LabeledFieldProps) {
  const newClass = `flex flex-col flex-grow p-0.5 ${additionalClass}`;
  return (
    <div className={newClass} style={styleObj}>
      <div className="arialMT text-xs">{title}</div>
      {children}
    </div>
  );
}
