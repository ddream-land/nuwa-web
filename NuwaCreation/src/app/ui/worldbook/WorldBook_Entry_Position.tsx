"use client";
import React from "react";
import { useMessages, useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "@/app/lib/definitions";
import { Textarea } from "@nextui-org/react";
import { textareaProps } from "../components/NuwaTextarea";
import NuwaRadio from "../components/NuwaRadio";

export default function WorldBook_Entry_Position({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();
  const messages = useMessages();
  const { PositionOptions } = messages;


  return (
    <div className="h-full w-full">
      <div className="flex flex-row items-center">
        <label className={`${textareaProps.classNames.label} mb-0 mr-4`}>
          {t('WorldBook.position')}
        </label>
      </div>
      <div className="mt-10">  
        <NuwaRadio
          items={PositionOptions as unknown as {name: string, value: Number}[]}
          value={value?.position}
          onChange={(e: any) => {
            if (e) {
              onChange({ ...value, position: Number(e.target.value) } as TypeWorldBookEntriy)
            } else {
              onChange({ ...value, position: null } as TypeWorldBookEntriy)
            }
          }}
        />
      </div>
    </div>
  );
}
