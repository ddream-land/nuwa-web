"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "../../_lib/definitions";
import { Textarea } from "@nextui-org/react";
import { textareaProps } from "../components/NuwaTextarea";

export default function WorldBook_Entry_Keys({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();

  return (
    <Textarea
      {...textareaProps as any}
      label={t('WorldBook.primarykeywords')}
      placeholder={t('WorldBook.primarykeywordstoken')}
      value={value?.keys}
      onChange={(e: { target: { value: any; }; }) => (

        onChange({ ...value, keys: e.target.value } as TypeWorldBookEntriy)
      )}
    />
  );
}
