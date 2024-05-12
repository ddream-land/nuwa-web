"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "@/app/lib/definitions";
import WorldBook_Entry_Content from "./WorldBook_Entry_Content";
import WorldBook_Entry_Keys from "./WorldBook_Entry_Keys";
import WorldBook_Entry_Name from "./WorldBook_Entry_Name";
import WorldBook_Entry_Secondary_Keys from "./WorldBook_Entry_Secondary_Keys";
import WorldBook_Entry_Insertion_Order from "./WorldBook_Entry_Insertion_Order";
import WorldBook_Entry_Depth from "./WorldBook_Entry_Depth";
import WorldBook_Entry_Position from "./WorldBook_Entry_Position";
import WorldBook_Entry_Status from "./WorldBook_Entry_Status";

export default function WorldBook_Entry({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();


  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-10">
      <div className="sm:col-start-3 sm:col-end-9 grid gap-20 mb-20 pt-10">
        {/* <WorldBook_Entry_Name value={value} isPreview={isPreview} onChange={onChange}/> */}
        <WorldBook_Entry_Content value={value} isPreview={isPreview} onChange={onChange}/>
        <WorldBook_Entry_Keys value={value} isPreview={isPreview} onChange={onChange}/>
        {/* <WorldBook_Entry_Secondary_Keys value={value} isPreview={isPreview} onChange={onChange}/>
        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
          <WorldBook_Entry_Insertion_Order value={value} isPreview={isPreview} onChange={onChange}/>
          <WorldBook_Entry_Depth value={value} isPreview={isPreview} onChange={onChange}/>
        </div>
        <WorldBook_Entry_Position value={value} isPreview={isPreview} onChange={onChange}/>
        <WorldBook_Entry_Status value={value} isPreview={isPreview} onChange={onChange}/> */}
      </div>
    </div>
  );
}
