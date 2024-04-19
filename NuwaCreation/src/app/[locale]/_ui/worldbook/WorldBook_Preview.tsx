"use client";
import React from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

import WorldBook from "./WorldBook";
import { TypeCharacterBook } from "../../_lib/definitions";

function Preview_WorldBook({characterBook}: {characterBook: TypeCharacterBook | undefined}) {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  
  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>   
        <WorldBook isPreview={true} characterBook={characterBook}/>
    </div>
  );
}

export default Preview_WorldBook;
