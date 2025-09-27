"use client";
import React from "react";
//import DateField from "../components/DateField";
//import { PayloadAction } from "@reduxjs/toolkit";
import SectionIntro from "../components/SectionIntro";
import Section_1 from "../components/Section_1";
import Section_2 from "../components/Section_2";
import Section_3 from "../components/Section_3";

export default function Home() {
  return (
    <main>
      <SectionIntro />
      <Section_1 />
      <Section_2 />
      <Section_3 />
    </main>
  );
}
