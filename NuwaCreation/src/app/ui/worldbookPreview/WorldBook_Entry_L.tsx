"use client";
import React from "react";
import { useTranslations } from "next-intl";
import NuwaTextareaWrapper from "../components/NuwaTextareaWrapper";
import { TypeWorldBookEntriy } from "@/app/lib/definitions";

export default function WorldBook_Entry_L({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();


  return (
    <div className="min-h-[620px] flex flex-col divide-y px-8">
      <div className="h-[120px] w-full flex items-center flex-row text-neutral-950 text-2xl font-semibold font-['PingFang SC'] tracking-tight">
        <div>{value?.comment}</div>
      </div>
      <div className="py-6 grow text-neutral-800 text-base font-normal font-['PingFang SC'] leading-[29px] tracking-tight">
        <div>{value?.content}</div>
      </div>
    </div>
  );
}
