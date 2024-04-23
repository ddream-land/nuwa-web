"use client"

import React from "react";
import { useChara, useCover } from "../../_lib/utils";
import { useTranslations, useMessages } from "next-intl";
import { NoSymbolIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Link } from "@/navigation";
import LIVE2DIcon from "../icons/LIVE2DIcon";
import { TypeAvatarType } from "../../_lib/definitions.avatar";
import A3DIcon from "../icons/A3DIcon";
import ImageIcon from "../icons/ImageIcon";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import IconCard, {IconCardType} from "../components/IconCard";
import NuwaButton from "../components/NuwaButton";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function CharacterList() {
  const t = useTranslations();
  const messages = useMessages();
  const { chara , setChara } = useChara();
  const { cover , setCover } = useCover();
  const initCharaList = [chara, chara, chara, chara, chara]
  const uploadModal = useDisclosure();


  return (
    <div className="relative bg-white h-full w-full pt-20 pb-40 rounded-[40px]">
      <div className="flex flex-wrap flex-row gap-4">
        {initCharaList.map((chara, index) => (
          <div className="w-[212px] h-[250px]" key={index}>
            <Image
              src={cover}
              width={384}
              height={384}
              alt=""
              className="h-full w-full flex-none object-cover rounded-[14px] border border-neutral-400 border-opacity-50"
            />
            <div className="w-full h-[36px] text-center text-stone-950 text-lg font-semibold leading-loose tracking-tight">名称</div>
          </div>
        ))}
      </div>
    </div>
  );
}
