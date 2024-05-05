"use client";
import React from "react";;
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import { textareaProps } from "../components/NuwaTextarea";
import { Textarea } from "@nextui-org/react";

function AdvancedSet_Jailbreak() {
  const t = useTranslations();
 
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setpost_history_instructionsListItem = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            post_history_instructions: newValue
          }
        }
      },
    })
  }

  return (
    <Textarea
      {...textareaProps as any}
      label={t('Character.jailbreak')}
      placeholder={`${t('Character.jailbreaktoken')}`}
      value={charaListItem.chara.data.post_history_instructions}
      onChange={(e: { target: { value: string; }; }) => setpost_history_instructionsListItem(e.target.value)}
    />
  );
}

export default AdvancedSet_Jailbreak;
