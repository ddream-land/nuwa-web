"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "@/app/lib/definitions";
import NuwaInput from "../components/NuwaInput";

export default function WorldBook_Entry_Insertion_Order({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();


  return (
    <NuwaInput
      label={t('WorldBook.orfer')}
      placeholder={t('WorldBook.orfer')}
      value={value?.insertion_order as number}
      onChange={(e: { target: { value: any; }; }) => (
        onChange({ ...value, insertion_order: e.target.value } as TypeWorldBookEntriy)
      )}
      type="number"
      max={1000}
      min={0}
      step={1}
    />
  );
}
