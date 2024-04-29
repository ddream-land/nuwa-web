"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "../../_lib/definitions";
import NuwaInput from "../components/NuwaInput";

export default function WorldBook_Entry_Depth({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();


  return (
    <NuwaInput
      label={t('WorldBook.depth')}
      placeholder={t('WorldBook.depth')}
      value={value?.depth as number}
      onChange={(e: { target: { value: any; }; }) => (
        onChange({ ...value, depth: e.target.value } as TypeWorldBookEntriy)
      )}
      type="number"
      max={1000}
      min={0}
      step={1}
    />
  );
}
