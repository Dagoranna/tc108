"use client";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { downloadJson } from "./utils/mainUtils";
import { useDispatch } from "react-redux";
import { uploadJsonFileAndDispatch } from "@/app/utils/mainUtils";
import SectionIntro from "../components/SectionIntro";
import Section_1 from "../components/Section_1";
import Section_2 from "../components/Section_2";
import Section_3 from "../components/Section_3";
import Section_4 from "../components/Section_4";
import Section_5 from "../components/Section_5";
import Section_6 from "../components/Section_6";
import Section_7 from "../components/Section_7";
import Section_8 from "../components/Section_8";
import Section_9 from "../components/Section_9";
import Section_10 from "../components/Section_10";

function ExportStateButton() {
  const mySliceState = useSelector((state: RootState) => state.main);

  const handleDownload = () => {
    downloadJson(mySliceState);
  };

  return (
    <button onClick={handleDownload} className="button-14">
      Save
    </button>
  );
}

function ImportButton() {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="application/json"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          try {
            await uploadJsonFileAndDispatch(file, dispatch);
          } catch (err) {
            alert((err as Error).message);
          }
        }}
      />
      <button type="button" onClick={handleClick} className="button-14">
        Import
      </button>
    </>
  );
}

function AttachButton() {
  const attachRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    attachRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={attachRef}
        className="hidden"
        multiple
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
        }}
      />
      <button type="button" onClick={handleClick} className="button-14">
        Add attach
      </button>
    </>
  );
}

export default function Home() {
  return (
    <main>
      <div className="flex justify-end">
        <ExportStateButton />
        <ImportButton />
        <AttachButton />
      </div>
      <SectionIntro />
      <Section_1 />
      <Section_2 />
      <Section_3 />
      <Section_4 />
      <Section_5 />
      <Section_6 />
      <Section_7 />
      <Section_8 />
      <Section_9 />
      <Section_10 />
    </main>
  );
}
