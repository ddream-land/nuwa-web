"use client";
import React from "react";
import { useTranslations } from "next-intl";

import InforMation_Personality_Modal from "./InforMation_Personality_Modal";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import NuwaTextarea from "../components/NuwaTextarea";

function InforMation_Personality() {
  const t = useTranslations();
  
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();

 
  const handlePersonalityChange = (e:any) => {
    const newValue = e.target.value;
    setPersonalityNewValue(newValue);
  };
  const setPersonalityNewValue = (newValue:any) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            personality: newValue,
          }
        }
      },
    })
  }

  return (
    <div className="relative group">
      <NuwaTextarea
        label={t('Character.personalitysummary')}
        placeholder={t('Character.personalitysummarytoken')}
        value={charaListItem.chara.data.personality}
        onChange={handlePersonalityChange}
      />
      <div className="z-40 hidden group-hover:block absolute -top-2 right-0 pl-4 sm:top-auto sm:-right-44 sm:bottom-0 sm:pt-20">
        <InforMation_Personality_Modal setPersonalityNewValue={setPersonalityNewValue} oldPersonalityValue={charaListItem.chara.data.personality}/>
      </div>
    </div>
  );
}

export default InforMation_Personality;
