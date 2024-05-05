"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "@/app/lib/definitions";
import NuwaInput from "../components/NuwaInput";

export default function WorldBook_Entry_Name({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();


  return (
    <NuwaInput
      label={t('WorldBook.title')}
      placeholder={t('WorldBook.titletoken')}
      value={value?.comment}
      onChange={ (e: { target: { value: any; }; }) => (
        onChange({ ...value, comment: e.target.value } as TypeWorldBookEntriy)
      )}
    />
  )
}
