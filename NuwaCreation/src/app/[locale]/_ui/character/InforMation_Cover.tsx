"use client";
import React from "react";
import Image from "next/image";
import { useChara,useCover,useCoverHandler } from "../../_lib/utils";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import UploadCoverIcon from "../icons/UploadCoverIcon";

function InforMation_Cover() {
  const t = useTranslations();
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
      <div className="absolute top-0 right-0 flex items-center justify-center cursor-pointer w-full h-full rounded-bl-xl">
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
