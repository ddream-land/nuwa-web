"use client";
import React, { useState } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

import PreviewTitle from "../components/PreviewTitle";

function Preview_Avatar() {
  const t = useTranslations();
  const { chara , setChara } = useChara();

  return (
    <div>   
      <PreviewTitle>{t('Character.avatar')}</PreviewTitle>
      <div className="grid grid-flex-row gap-4 w-full">

      </div>
    </div>
  );
}

export default Preview_Avatar;
