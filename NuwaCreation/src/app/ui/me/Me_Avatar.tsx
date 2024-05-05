"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCoverHandler } from "@/app/lib/utils";
import { Avatar, Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import UploadCoverIcon from "@/app/icons/UploadCoverIcon";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

function Me_Avatar({avatar, onChange}:{avatar: string, onChange: (newAvatar: string) => void}) {
  const t = useTranslations();
  const { isReplacingTheCoverLoding, handleReplacingTheCover } = useCoverHandler();

  return (
    <div className="flex flex-row justify-center items-start gap-x-8 relative group">
      <div className="h-[200px] w-[200px] rounded-full overflow-hidden bg-black">
        <Avatar
          src={avatar}
          alt="avatar"
          className="h-full w-full"
        />
      </div>
      <div className="flex absolute bottom-0 items-end justify-center cursor-pointer w-full h-full">
        <input
          accept=".jpg,.jpeg,.png,.webp,.gif"
          type="file"
          id="ReplacingTheCover"
          style={{ display: 'none' }}
          className="h-12 w-12"
          onChange={(e) => handleReplacingTheCover(e, (newCover: string) => {
            onChange(newCover)
          })}
        />
        <div className="w-[69px] h-[34px] -mb-4 bg-white rounded-[18px] shadow group">
          <Button
            isLoading={isReplacingTheCoverLoding}
            onClick={() => {
              const ReplacingTheCover = document.getElementById("ReplacingTheCover");
              if (ReplacingTheCover) {
                ReplacingTheCover.click();
              }
            }}
            className="w-full h-full bg-white shadow rounded-full"
            type="button"
            color="default"
            variant="solid"
            isIconOnly
          >
            <ArrowUpCircleIcon className="hover:scale-105 h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        
      </div>
    </div>
  );
}

export default Me_Avatar;
