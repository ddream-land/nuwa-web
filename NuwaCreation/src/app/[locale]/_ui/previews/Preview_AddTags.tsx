"use client";
import React, { useState } from "react";
import { Button, Chip, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { TagIcon } from "@heroicons/react/24/solid";
import NuwaButton from "../components/NuwaButton";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { trim } from "lodash-es";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import { TypeCharaListItem } from "../../_lib/definitions";

function Preview_AddTags() {
  const t = useTranslations();

  const charaListItem = useCharaListItem();
  const charaDispatch = useCharaListItemDispatch();


  const handleTagsChange = (newValue: string) => {
    const newChara:TypeCharaListItem = {
      ...charaListItem,
      chara: {
        ...charaListItem.chara,
        name: newValue,
        data: {
          ...charaListItem.chara.data,
          tags: newValue
        }
      }
    };

    charaDispatch({
      type: "changed",
      payload: newChara,
    })
  };

  
  const [tagsList, setTagsList ] = useState<string[]>(charaListItem.chara.data.tags.toString().split(',').filter((item) => (trim(item) !== '')) || []);
  const [inputVal, setInputVal ] = useState<string>("");
  
  return (
    <>   
      <div className="flex flex-col items-start mb-2">
        <div className="text-black text-2xl font-semibold leading-[54.36px] tracking-tight mr-4 shrink-0">{t('Preview.tags')}</div>
        <div className="text-sm font-normal leading-relaxed tracking-tight text-neutral-500">{t('Preview.tagTip')}</div>
      </div>

      <div>
        <Input
          placeholder={t('Preview.tagsinputplaceholder')}
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
                handleTagsChange(newTagsList.join(','))
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
              handleTagsChange(tagsList.join(','))
            }} />}
            variant="flat" 
          >
            {item}
          </Chip>
        ))}
      </div>
      </div>
    </>
  );
}

export default Preview_AddTags;
