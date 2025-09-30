"use client";
import React from "react";

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
  const newClass = `flex flex-col flex-grow relative ${additionalClass}`;
  return (
    <div className={newClass} style={styleObj}>
      <div className="arialMT text-xs">{title}</div>
      {children}
    </div>
  );
}
