"use client";
import React from "react";
import { useTranslations } from "next-intl";

import PreviewTitle from "./PreviewTitle";
import PreviewWrapper from "./PreviewWrapper";
import { useCharaListItem } from "../charas/CharaContext";
import { Divider } from "@nextui-org/react";

function Preview_AdvancedSet() {
  const t = useTranslations();
  const charaListItem = useCharaListItem();
  const { chara } = charaListItem;

  return (
    <div>   
      <PreviewTitle>{t('Character.advancedset')}</PreviewTitle>
      <div className="grid grid-rows-2 grid-cols-2 gap-4 w-full">
        <div className="row-span-1 col-span-1 min-h-[156px]">
          <PreviewWrapper>
            <div className="h-full px-7 py-7 flex flex-row justify-between">
              <div className="grow text-neutral-800 text-2xl font-semibold leading-[43.49px] tracking-tight text-left">{t('Character.depthprompt')}</div>
              <div className="text-[50px] font-semibold pt-2">{chara.data.extensions.depth_prompt.depth}</div>
            </div>
          </PreviewWrapper>
        </div>
        <div className="row-span-1 col-span-1 min-h-[156px]">
          <PreviewWrapper>
            <div className="h-full px-7 py-7 flex flex-row justify-between">
              <div className="grow text-neutral-800 text-2xl font-semibold leading-[43.49px] tracking-tight text-left">{t('Character.talkativeness')}</div>
              <div className="text-[50px] font-semibold pt-2">{chara.data.extensions.talkativeness}</div>
            </div>
          </PreviewWrapper>
        </div>
        <div className="row-span-1 col-span-1 min-h-[156px]">
          <PreviewWrapper>
            <div className="h-full px-6 py-10">
              <div className="text-neutral-800 text-xl font-semibold leading-[30px] tracking-tight">{t('Character.jailbreak')}</div>
              <Divider className="mb-4 mt-2" />
              <div className="text-neutral-800 text-sm font-normal leading-relaxed tracking-tight overflow-wrap break-words">{chara.data.post_history_instructions}</div>
            </div>
          </PreviewWrapper>
        </div>
        <div className="row-span-1 col-span-1 min-h-[156px]">
          <PreviewWrapper>
            <div className="h-full px-6 py-10">
              <div className="text-neutral-800 text-xl font-semibold leading-[30px] tracking-tight">{t('Character.mainprompt')}</div>
              <Divider className="mb-4 mt-2" />
              <div className="text-neutral-800 text-sm font-normal leading-relaxed tracking-tight overflow-wrap break-words">{chara.data.system_prompt}</div>
            </div>
          </PreviewWrapper>
        </div>
      </div>
    </div>
  );
}

export default Preview_AdvancedSet;
