"use client";
import React from "react";
import { useTranslations } from "next-intl";

import PreviewTitle from "./PreviewTitle";
import IconCard from "../components/IconCard";
import { useCharaListItem } from "@/app/contexts/CharasContextProvider";

function Preview_Avatar() {
  const t = useTranslations();
  const charaListItem = useCharaListItem();
  const { chara } = charaListItem;

  return (
    <div>   
      <PreviewTitle>{t('Character.avatar')}</PreviewTitle>
      <div className="flex flex-col flex-wrap gap-[42px] mt-[20px]">
   
          {chara.data.extensions.avatars.map((item, index) => {
            return (
              <div key={index} className="w-full flex flex-row justify-between items-center">
                <IconCard 
                  onClick={() => {}}
                  isActive={true}
                  iconType={item.type}
                />
                <div className="text-black text-[32px] font-['SF Pro'] leading-[57.98px] tracking-tight">
                  {t(`Character.avatartip4`, {type: t(`Character.${item.type}`)})}
                </div>
              </div>
            )
          })}
          
        </div>
    </div>
  );
}

export default Preview_Avatar;
