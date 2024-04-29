"use client";
import React from "react";;
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import NuwaInput from "../components/NuwaInput";

function AdvancedSet_Mainprompt() {
  const t = useTranslations();
 
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setsystem_promptListItem = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            system_prompt: newValue,
          }
        }
      },
    })
  }

  return (
    <NuwaInput
      label={`${t('Character.mainprompt')}`}
      placeholder={`${t('Character.mainprompttoken')}`}
      value={charaListItem.chara.data.system_prompt}
      onChange={(e: { target: { value: string; }; }) => setsystem_promptListItem(e.target.value)}
    />
  );
}

export default AdvancedSet_Mainprompt;
