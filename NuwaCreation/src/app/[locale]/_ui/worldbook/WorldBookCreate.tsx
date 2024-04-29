"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, useDisclosure } from "@nextui-org/react";

import { pushWorldBookList, createWorldBook, getWorldBookList } from "../../_lib/utils";

import { TypeWorldBookList, TypeWorldBookItem } from "../../_lib/definitions";
import AlterMessage from "../components/AlterMessage";
import { PlusIcon } from "@heroicons/react/24/outline";

function WorldBookCreate({ onCreateDone }: {
  onCreateDone?: (newWorldBook: TypeWorldBookItem) => void
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const worldBookList  = getWorldBookList();

  
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
          const newWorldBook = createWorldBook();
          newWorldBook.worldBook.name = t("WorldBook.untitledbook")
          newWorldBook.worldBook.entries[Object.keys(newWorldBook.worldBook.entries)[0]].comment = t("WorldBook.untitledbookEntry")

          try {
            pushWorldBookList([...worldBookList, newWorldBook]);
          } catch (e: any) {
            setMessage("本地存储空间已满，请删除后在操作");
            setIsOpen(true);
            return
          }
          onCreateDone && onCreateDone(newWorldBook as TypeWorldBookItem)
        }}
      >{t('CharacterList.createbutton')}</Button>

    </>
  );
}

export default WorldBookCreate;
