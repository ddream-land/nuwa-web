"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "@/app/lib/definitions";
import { Button, Chip, Input, Textarea } from "@nextui-org/react";
import { textareaProps } from "../components/NuwaTextarea";
import { useState } from "react";
import { trim } from "lodash-es";
import { TagIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function WorldBook_Entry_Keys({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();


  const handleTagsChange = (newValue: string[]) => {

    onChange({
      ...value,
      keys: newValue
    } as TypeWorldBookEntriy)
  };

  const [tagsList, setTagsList ] = useState<string[]>(value?.keys.filter((item) => (trim(item) !== '')) || []);
  const [inputVal, setInputVal ] = useState<string>("");
  
  return (
    <div className="h-full w-full">
      <div className="flex flex-row items-center">
        <label className={`${textareaProps.classNames.label}`}>
          {t('WorldBook.primarykeywords')}
        </label>
      </div>
      <div className="">  
        <Input
          placeholder={t('WorldBook.primarykeywordstoken')}
          classNames={{
            base: 'mb-2 w-[400px]',
            inputWrapper: 'bg-zinc-100'
          }}
          size="sm"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          startContent={
            <TagIcon className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
          endContent={
            <Button
              size="sm"
              variant="ghost"
              className="border-none"
              isIconOnly
              onClick={() => {
                const newTagsList = [...tagsList, inputVal]
                setTagsList(newTagsList);
                handleTagsChange(newTagsList)
                setInputVal("");
              }}>
                <PlusCircleIcon className="h-8 w-8" aria-hidden="true" />
              </Button>
          }
        />

        <div className="flex flex-wrap gap-4">
          {tagsList.map((item: string, index: number) => (
            <Chip
              key={index}
              classNames={{
                base: "h-9 cursor-pointer bg-zinc-300 bg-opacity-40 rounded-[11px] w-auto px-4",
              }}
              endContent={<XMarkIcon className="h-4 w-4" onClick={() => {
                tagsList.splice(index, 1)
                setTagsList(tagsList);
                handleTagsChange(tagsList)
              }} />}
              variant="flat" 
            >
              {item}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
