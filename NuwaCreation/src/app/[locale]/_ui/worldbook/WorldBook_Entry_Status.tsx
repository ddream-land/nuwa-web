"use client";
import React from "react";
import { useMessages, useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "../../_lib/definitions";
import { textareaProps } from "../components/NuwaTextarea";
import NuwaRadio from "../components/NuwaRadio";

export default function WorldBook_Entry_Status({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();
  const messages = useMessages();
  const { ConstantOptions } = messages;


  return (
    <div className="h-full w-full">
      <div className="flex flex-row items-center">
        <label className={`${textareaProps.classNames.label} mb-0 mr-4`}>
          {t('WorldBook.status')}
        </label>
      </div>
      <div className="mt-10">  
        <NuwaRadio
          items={ConstantOptions as unknown as {name: string, value: Number}[]}
          value={value?.constant}
          onChange={(e: any) => {
            if (e) {
              onChange({ ...value, constant: Boolean(e.target.value === 'true') } as TypeWorldBookEntriy)
            } else {
              onChange({ ...value, constant: null } as TypeWorldBookEntriy)
            }
          }}
        />
      </div>
    </div>
  );
}
