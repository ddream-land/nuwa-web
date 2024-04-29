"use client";
import React from "react";
import { useTranslations } from "next-intl";

import PreviewTitle from "./PreviewTitle";
import PreviewWrapper from "./PreviewWrapper";
import { Divider } from "@nextui-org/react";
import { useCharaListItem } from "../charas/CharaContext";

function Preview_BaseContent() {
  const t = useTranslations();
  const charaListItem = useCharaListItem();
  const { chara } = charaListItem;
  
  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>   
      <PreviewTitle>{t('Preview.basecontent')}</PreviewTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="min-h-[100px]">
          <PreviewWrapper>
            <div className="h-full px-6 py-10">
              <div className="text-neutral-800 text-xl font-semibold leading-[30px] tracking-tight">{t('Character.description')}</div>
              <Divider className="mb-4 mt-2" />
              <div className="text-neutral-800 text-sm font-normal leading-relaxed tracking-tight overflow-wrap break-words">{chara.data.description}</div>
            </div>
          </PreviewWrapper>
        </div>
        <div className="">
          <PreviewWrapper>
            <div className="h-full px-6 py-10">
              <div className="text-neutral-800 text-xl font-semibold leading-[30px] tracking-tight">{t('Character.personalitysummary')}</div>
              <Divider className="mb-4 mt-2" />
              <div className="text-neutral-800 text-sm font-normal leading-relaxed tracking-tight overflow-wrap break-words">{chara.data.personality}</div>
            </div>
          </PreviewWrapper>
        </div>
      </div>
    </div>
  );
}

export default Preview_BaseContent;
