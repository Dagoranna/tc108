"use client";
import React, { useState } from "react";
//import DateField from "../components/DateField";
//import { PayloadAction } from "@reduxjs/toolkit";
import SectionIntro from "../components/SectionIntro";

const ASSESSMENT_YEAR = "2025/26";

export default function Home() {
  return (
    <main>
      <SectionIntro year={ASSESSMENT_YEAR} />
    </main>
  );
}
