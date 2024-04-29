"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import NuwaInput from "../components/NuwaInput";

function CreatorInfo_CreatedBy() {
  const t = useTranslations();
 
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCreator = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            creator: newValue
          }
        }
      },
    })
  }

  return (
    <NuwaInput
      label={`${t('Character.createdby')}`}
      placeholder={`${t('Character.createdbytoken')}`}
      value={charaListItem.chara.data.creator}
      onChange={(e: { target: { value: string; }; }) => setCreator(e.target.value)}
      maxLength={64}
    />
  );
}

export default CreatorInfo_CreatedBy;
