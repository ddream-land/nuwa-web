"use client";
import React from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

import PreviewTitle from "../components/PreviewTitle";
import PreviewWrapper from "../components/PreviewWrapper";
import { Divider } from "@nextui-org/react";
import WorldBook_Preview from "../worldbook/WorldBook_Preview";

function Preview_WorldBook() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  
  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>   
      <PreviewTitle>{t('Navigation.worldbook')}</PreviewTitle>
      <div className="w-full py-6">
        <WorldBook_Preview characterBook={chara.data.character_book} />
      </div>
    </div>
  );
}

export default Preview_WorldBook;
