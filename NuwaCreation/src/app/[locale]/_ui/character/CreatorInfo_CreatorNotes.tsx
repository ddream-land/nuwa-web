"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import { textareaProps } from "../components/NuwaTextarea";
import { Textarea } from "@nextui-org/react";

function CreatorInfo_CreatorNotes() {
  const t = useTranslations();
 
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  
  const setCreatorNotes = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            creator_notes: newValue
          }
        }
      },
    })
  }

  return (
    <Textarea
      {...textareaProps as any}
      label={t('Character.creatorsnotes')}
      placeholder={t('Character.creatorsnotestoken')}
      value={charaListItem.chara.data.creator_notes}
      onChange={(e: { target: { value: string; }; }) => setCreatorNotes(e.target.value)}
    />
  );
}

export default CreatorInfo_CreatorNotes;
