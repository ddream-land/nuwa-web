"use client";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import InsertUserOrChar from "../components/InsertUserOrChar";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import {textareaProps} from "../components/NuwaTextarea";
import { Textarea } from "@nextui-org/react";

function InforMation_Description() {
  const t = useTranslations();
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const descTextareaRef = useRef(null);


  const handleDescriptionChange = (e:any) => {
    const newValue = e.target.value;
    setDesc(newValue)
  };

  const setDesc = (desc:string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            description: desc,
          }
        }
      },
    })
  }
  

  return (
    <div className="relative group">
      <Textarea
        {...textareaProps as any}
        label={<div>{t('Character.description')}<span className="text-red-500">*</span></div>}
        ref={descTextareaRef}
        placeholder={t('Character.descriptiontoken')}
        value={charaListItem.chara.data.description}
        onChange={handleDescriptionChange}
      />
      <div className="z-40 hidden group-hover:block absolute -top-16 right-0 pl-10 sm:top-auto sm:-right-44 sm:bottom-0 sm:pt-20">
          <InsertUserOrChar getTextRef={() => {
            return descTextareaRef.current
          }} onDone={(newValue) => {
            setDesc(newValue)
          }} />
      </div>
    </div>
  );
}

export default InforMation_Description;
