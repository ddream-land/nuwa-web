"use client";
import React from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

import PreviewTitle from "../components/PreviewTitle";
import PreviewWrapper from "../components/PreviewWrapper";
import { Divider } from "@nextui-org/react";

function Preview_BaseContent() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  
  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>   
      <PreviewTitle>{t('Preview.basecontent')}</PreviewTitle>
      <div className="grid grid-rows-5 grid-flow-col gap-4 w-full">
        <div className="row-span-5 min-h-[436px]">
          <PreviewWrapper>
            <div className="h-full px-9 py-7">
              <div className="text-neutral-800 text-2xl font-semibold leading-[43.49px] tracking-tight">{t('Character.description')}</div>
              <Divider className="mb-4" />
              <div>{chara.data.description}</div>
            </div>
          </PreviewWrapper>
        </div>
        <div className="row-span-2 col-span-1">
          <PreviewWrapper>
            <div className="h-full px-9 py-7 flex flex-col justify-between">
              <div className="grow">{chara.data.personality}</div>
              <div className="text-neutral-800 text-2xl font-semibold leading-[43.49px] tracking-tight text-right">{t('Character.personalitysummary')}</div>
            </div>
          </PreviewWrapper>
        </div>
        <div className="row-span-3 col-span-1">
          <PreviewWrapper>
            <div className="h-full px-9 py-7">
              <div className="text-neutral-800 text-2xl font-semibold leading-[43.49px] tracking-tight">{t('Character.scenario')}</div>
              <div>{chara.data.scenario}</div>
            </div>
          </PreviewWrapper>
        </div>
      </div>
    </div>
  );
}

export default Preview_BaseContent;
