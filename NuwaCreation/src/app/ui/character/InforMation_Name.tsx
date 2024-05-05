"use client";
import React, { useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import { TypeCharaListItem } from "@/app/lib/definitions";
import { Input } from "@nextui-org/react";
import NuwaInput from "../components/NuwaInput";

function InforMation_Name() {
  const t = useTranslations();

  const charaListItem = useCharaListItem();
  const charaDispatch = useCharaListItemDispatch();
  
  const handleNameChange = (e:any) => {
    const newValue = e.target.value;
    const newChara:TypeCharaListItem = {
      ...charaListItem,
      chara: {
        ...charaListItem.chara,
        name: newValue,
        data: {
          ...charaListItem.chara.data,
          name: newValue
        }
      }
    };

    charaDispatch({
      type: "changed",
      payload: newChara,
    })
  };

  return (
    <NuwaInput
      placeholder={t('Character.characternametoken')}
      label={<div>{t('Character.charactername')}<span className="text-red-500">*</span></div>}
      value={charaListItem.chara.data.name}
      onChange={handleNameChange}
    />
  );
}

export default InforMation_Name;
