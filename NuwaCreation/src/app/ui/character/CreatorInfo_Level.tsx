"use client";
import React from "react";
import { useTranslations, useMessages } from "next-intl";
import NuwaRadio from "../components/NuwaRadio";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import { textareaProps } from "../components/NuwaTextarea";


function CreatorInfo_Level() {
  const t = useTranslations();
  const messages = useMessages();
  const { LevelsOptions } = messages;

  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            extensions: {
              ...charaListItem.chara.data.extensions,
              level: newValue
            }
          }
        }
      },
    })
  }
  
 
  return (
    <div className="h-full w-full">
      <div className="flex flex-col">

        <label className={`${textareaProps.classNames.label} mb-0 mr-4`}>
          {t('Character.level')}
        </label>

        <div className="text-neutral-500 text-sm font-normal tracking-tight -mt-4">{t('Character.leveltip')}</div>
      </div>
      <div className="mt-10">  
        <NuwaRadio
          items={LevelsOptions as unknown as {name: string, value: string}[]}
          value={charaListItem.chara.data.extensions.level}
          onChange={(e: any) => {
            if (e) {
              setCharaListItem(e.target.value)
            } else {
              setCharaListItem("")
            }
          }}
        />
      </div>
    </div>
  );
}

export default CreatorInfo_Level;
