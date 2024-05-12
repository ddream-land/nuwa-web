"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button, useDisclosure } from "@nextui-org/react";

import { pushWorldBookList, createWorldBook, getWorldBookList } from "@/app/lib/utils";

import { TypeWorldBookItem } from "@/app/lib/definitions";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAmDispatch } from "../components/AlterMessageContextProvider";

function WorldBookCreate({ onCreateDone }: {
  onCreateDone?: (newWorldBook: TypeWorldBookItem) => void
}) {
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const worldBookList  = getWorldBookList();

  
  return (
    <>
      <Button
        className="bg-black text-white"
        startContent={<PlusIcon className="h-4 w-4"/>}
        size="md"
        onClick={() => {
          const newWorldBook = createWorldBook();
          newWorldBook.worldBook.name = t("WorldBook.untitledbook")
          newWorldBook.worldBook.entries[Object.keys(newWorldBook.worldBook.entries)[0]].comment = t("WorldBook.untitledbookEntry")


          const pushRes = pushWorldBookList([...worldBookList, newWorldBook]);
          if (pushRes.success) {
            onCreateDone && onCreateDone(newWorldBook as TypeWorldBookItem)
          } else {
            amDispatch({
              type: "add",
              payload: t(pushRes.message),
            })
          }
        }}
      >{t('CharacterList.createbutton')}</Button>

    </>
  );
}

export default WorldBookCreate;
