"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "@/app/lib/definitions";
import { Textarea } from "@nextui-org/react";
import { textareaProps } from "../components/NuwaTextarea";

export default function WorldBook_Entry_Secondary_Keys({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();


  return (
    <Textarea
      {...textareaProps as any}
      label={t('WorldBook.optionalfilter')}
      placeholder={t('WorldBook.optionalfiltertoken')}
      value={value?.secondary_keys}
      onChange={(e: { target: { value: any; }; }) => (
        onChange({ ...value, secondary_keys: e.target.value } as TypeWorldBookEntriy)
      )}
    />
  );
}
