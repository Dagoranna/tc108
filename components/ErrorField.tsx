"use client";
import React from "react";

export default function ErrorField({ title }: { title: string }) {
  return (
    <div className="errorField" title={title}>
      !
    </div>
  );
}
