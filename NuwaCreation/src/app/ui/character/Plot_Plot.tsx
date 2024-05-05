"use client";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import InsertUserOrChar from "../components/InsertUserOrChar";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import { Textarea } from "@nextui-org/react";
import { textareaProps } from "../components/NuwaTextarea";

function Plot_Plot() {
  const t = useTranslations();
  const descTextareaRef = useRef(null);
  
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue:string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            scenario: newValue,
          }
        }
      },
    })
  }

  const handlePlotChange = (newValue:string) => {
    setCharaListItem(newValue);
  };
 

  return (
    <div className="relative group">
      <Textarea
        {...textareaProps as any}
        label={<div>{t('Character.plot')}</div>}
        ref={descTextareaRef}
        placeholder={`${t('Character.plottoken')}`}
        value={charaListItem.chara.data.scenario}
        onChange={(e) => (handlePlotChange(e.target.value))}
      />
      <div className="z-40 hidden group-hover:block absolute -top-16 right-0 pl-10 sm:top-auto sm:-right-44 sm:bottom-0 sm:pt-20">
          <InsertUserOrChar getTextRef={() => {
            return descTextareaRef.current
          }} onDone={(newValue) => {
            handlePlotChange(newValue);
          }} />
      </div>
    </div>
  );
}

export default Plot_Plot;
