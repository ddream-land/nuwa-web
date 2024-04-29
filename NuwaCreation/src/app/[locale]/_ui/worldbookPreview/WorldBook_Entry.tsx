"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "../../_lib/definitions";
import WorldBook_Entry_Wrapper from "./WorldBook_Entry_Wrapper";
import WorldBook_Entry_L from "./WorldBook_Entry_L";
import WorldBook_Entry_R from "./WorldBook_Entry_R";
import PreviewWrapper from "../previews/PreviewWrapper";

export default function WorldBook_Entry({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();


  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-y-4 gap-x-4">
      {isPreview ? (
        <>
          <PreviewWrapper>
            <WorldBook_Entry_L value={value} isPreview={isPreview} onChange={onChange}/>
          </PreviewWrapper>
          {/* <PreviewWrapper>
            <WorldBook_Entry_R value={value} isPreview={isPreview} onChange={onChange}/>
          </PreviewWrapper> */}
        </>
      ): (
        <>
          <WorldBook_Entry_Wrapper>
            <WorldBook_Entry_L value={value} isPreview={isPreview} onChange={onChange}/>
          </WorldBook_Entry_Wrapper>
          {/* <WorldBook_Entry_Wrapper>
            <WorldBook_Entry_R value={value} isPreview={isPreview} onChange={onChange}/>
          </WorldBook_Entry_Wrapper>   */}
        </>
      )}  
    </div>
  );
}
