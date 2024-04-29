"use client";
import React from "react";
import { useTranslations, useMessages } from "next-intl";
import NuwaCheckbox from "../components/NuwaCheckbox";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import { textareaProps } from "../components/NuwaTextarea";


function CreatorInfo_Language() {
  const t = useTranslations();
  const messages = useMessages();
  const { Languages } = messages;

  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue: string[]) => {
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
              languages: newValue
            }
          }
        }
      },
    })
  }

  return (
    <div className="h-full w-full">
      <label className={textareaProps.classNames.label}>
        {t('Character.language')}
      </label>
      <div className="mt-10">  
        <NuwaCheckbox
          items={Languages as unknown as {name: string, value: string}[]}
          value={charaListItem.chara.data.extensions.languages}
          onChange={(value: any) => {
            setCharaListItem(value)
          }}
        />
      </div>
    </div>
  );
}

export default CreatorInfo_Language;
