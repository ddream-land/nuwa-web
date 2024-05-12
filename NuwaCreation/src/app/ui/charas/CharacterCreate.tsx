"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";
import { pushCharaList, createChara, getCharaList } from "@/app/lib/utils";
import { TypeCharaListItem } from "@/app/lib/definitions";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAmDispatch } from "../components/AlterMessageContextProvider";

function CharacterCreate({ onCreateDone }: {
  onCreateDone?: (newChara: TypeCharaListItem) => void
}) {
  const t = useTranslations();
  const charaList  = getCharaList();
  const amDispatch = useAmDispatch();

  return (
    <>
      <Button
        className="bg-black text-white"
        startContent={<PlusIcon className="h-4 w-4"/>}
        size="md"
        onClick={() => {
          const newChara = createChara();

          const pushRes = pushCharaList([...charaList, newChara]);
          if (pushRes.success) {
            onCreateDone && onCreateDone(newChara as TypeCharaListItem)
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

export default CharacterCreate;
