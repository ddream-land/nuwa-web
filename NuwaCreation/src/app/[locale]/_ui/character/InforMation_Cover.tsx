"use client";
import React from "react";
import Image from "next/image";
import { useCoverHandler } from "../../_lib/utils";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import UploadCoverIcon from "../icons/UploadCoverIcon";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";

function InforMation_Cover() {
  const t = useTranslations();
  const { isReplacingTheCoverLoding, handleReplacingTheCover } = useCoverHandler();

  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();

  return (
    <div className="flex flex-row justify-start items-start gap-x-8 relative group">
      <Image
        src={charaListItem.cover}
        width={384}
        height={384}
        alt=""
        className="h-auto w-full flex-none rounded-[40px] object-cover"
      />
      <div className="w-full h-full absolute top-0 bg-gray-50/50 hidden group-hover:block" />
      <div className="group-hover:flex absolute top-0 right-0 hidden items-center justify-center cursor-pointer w-full h-full rounded-bl-xl">
        <input
          accept=".jpg,.jpeg,.png,.webp,.gif"
          type="file"
          id="ReplacingTheCover"
          style={{ display: 'none' }}
          className="h-12 w-12"
          onChange={(e) => handleReplacingTheCover(e, (newCover: string) => {
            charaListItemDispatch({
              type: "changed",
              payload: {
                ...charaListItem,
                cover: newCover
              },
            })
          })}
        />
        <Button
          isLoading={isReplacingTheCoverLoding}
          onClick={() => {
            const ReplacingTheCover = document.getElementById("ReplacingTheCover");
            if (ReplacingTheCover) {
              ReplacingTheCover.click();
            }
          }}
          className="group h-28 w-28 bg-transparent p-0 rounded-full relative"
          type="button"
          color="default"
          variant="flat"
          isIconOnly
        >
          <UploadCoverIcon className="hover:scale-105 h-28 w-28 fill-black font-black absolute" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

export default InforMation_Cover;
