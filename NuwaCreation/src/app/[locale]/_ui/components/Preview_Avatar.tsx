"use client";
import React, { useState } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

import PreviewTitle from "../components/PreviewTitle";
import IconCard from "./IconCard";

function Preview_Avatar() {
  const t = useTranslations();
  const { chara , setChara } = useChara();

  return (
    <div>   
      <PreviewTitle>{t('Character.avatar')}</PreviewTitle>
      <div className="flex flex-col flex-wrap gap-[42px] mt-[20px]">
   
          {chara.data.extensions.avatars.map((item, index) => {
            return (
              <div className="w-full flex flex-row justify-between items-center">
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
