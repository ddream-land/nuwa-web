"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, useDisclosure } from "@nextui-org/react";

import { pushCharaList, createChara, getCharaList } from "../../_lib/utils";

import { TypeCharaList, TypeCharaListItem } from "../../_lib/definitions";
import AlterMessage from "../components/AlterMessage";
import { PlusIcon } from "@heroicons/react/24/outline";

function CharacterCreate({ onCreateDone }: {
  onCreateDone?: (newChara: TypeCharaListItem) => void
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const charaList  = getCharaList();

  
  return (
    <>
      <AlterMessage isOpen={isOpen} message={message} onClose={() => {
        setIsOpen(false)
      }} />
      <Button
        className="bg-black text-white"
        startContent={<PlusIcon className="h-4 w-4"/>}
        size="md"
        onClick={() => {
          const newChara = createChara();
          try {
            pushCharaList([...charaList, newChara]);
          } catch (e: any) {
            setMessage("本地存储空间已满，请删除后在操作");
            setIsOpen(true);
            return
          }
          onCreateDone && onCreateDone(newChara as TypeCharaListItem)
        }}
      >{t('CharacterList.createbutton')}</Button>

    </>
  );
}

export default CharacterCreate;
