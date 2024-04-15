"use client";
import React from "react";
import Image from "next/image";
import { useChara,useCover,useCoverHandler } from "../../_lib/utils";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import {
  ArrowUpIcon,
} from '@heroicons/react/24/outline'

function InforMation_Cover() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const { cover , setCover } = useCover();
  const { isReplacingTheCoverLoding, handleReplacingTheCover } = useCoverHandler();

  return (
    <div className="flex flex-row justify-center items-center gap-x-8 relative">
      <Image
        src={cover}
        width={384}
        height={384}
        alt=""
        className="h-full w-full flex-none rounded-[40px] object-cover"
      />
      <div className="absolute top-0 right-0 flex content-start justify-end cursor-pointer w-16 h-16 bg-[url('/character-avatar-btn-bg.png')] bg-cover rounded-bl-xl">
        <input
          accept=".jpg,.jpeg,.png,.webp,.gif"
          type="file"
          id="ReplacingTheCover"
          style={{ display: 'none' }}
          className="h-12 w-12"
          onChange={(e) => handleReplacingTheCover(e, setCover)}
        />
        <Button
          isLoading={isReplacingTheCoverLoding}
          onClick={() => {
            const ReplacingTheCover = document.getElementById("ReplacingTheCover");
            if (ReplacingTheCover) {
              ReplacingTheCover.click();
            }
          }}
          className="h-12 w-12 p-0 rounded-full bg-black relative"
          type="button"
          color="default"
          variant="flat"
          isIconOnly
        >
          <ArrowUpIcon className="h-8 w-8 text-white font-black absolute" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

export default InforMation_Cover;
