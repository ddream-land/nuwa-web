"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";

import { useChara, getChara, usePostChara, useCover, usePostCharaAll } from "../../_lib/utils";
import {
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import NuwaButton from "../components/NuwaButton";
import { TypeChara } from "../../_lib/definitions";
import CharacterPreview from "../components/CharacterPreview";
import AlterMessage from "../components/AlterMessage";

function Preview() {
  const t = useTranslations();
  const previewModal = useDisclosure();
  const chara = getChara();
  const {updateChara} = usePostCharaAll();
  const {cover,setCover} = useCover();
  const [isMakeCharLoding, setIsMakeCharLoding] = useState(false);
  const msgModal = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleMakeChar = async (e: any) => {
    setIsMakeCharLoding(true)
    const charData = {
      cover: cover,
      chara: updateChara,
    };
    if (!chara?.data?.name) {
      setMessage(t("Previews.charactercardnamesmust"));
      setIsOpen(true);
      setIsMakeCharLoding(false)
      return;
    }
    if (!chara?.data?.description) {
      setMessage(t("Previews.charactercarddescsmust"));
      setIsOpen(true);
      setIsMakeCharLoding(false)
      return;
    }
    if (!chara?.data?.first_mes) {
      setMessage(t("Previews.charactercardfirstmessmust"));
      setIsOpen(true);
      setIsMakeCharLoding(false)
      return;
    }
    try {
      const charDataRes = await fetch("/api/makechar", {
        method: "POST",
        body: JSON.stringify(charData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (charDataRes.ok) {
        const res = await charDataRes.text();
        const blob = await fetch(res).then((r) => r.blob());
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = chara.data.name + chara.data.character_version + ".png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsMakeCharLoding(false)
      } else {
        console.error("Failed to generate image");
        setIsMakeCharLoding(false)
      }
    } catch (error) {
      console.error("Error:", error);
      setIsMakeCharLoding(false)
    }
    setIsMakeCharLoding(false)
  };

  
  return (
    <>
      <AlterMessage isOpen={isOpen} message={message} onClose={() => {
        setIsOpen(false)
      }} />
      <Button
        className="bg-black text-white h-14" startContent={<PaperAirplaneIcon className="h-4 w-4"/>}
        onClick={() => {
          let chara = getChara();
          previewModal.onOpen();
        }}
      >{t('Navigation.previews')}</Button>

      <Modal
        isDismissable={!isOpen}
        size="full"
        isOpen={previewModal.isOpen}
        placement={'bottom'}
        scrollBehavior="inside"
        onOpenChange={previewModal.onOpenChange}
        classNames={{
          base: "h-11/12 bg-neutral-100 ",
        }}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1 py-6">
                <div></div>
                <div
                  className="flex flex-row items-center justify-center gap-4"
                >
                  
                  <Button isLoading={isMakeCharLoding} className="h-16 w-48 text-xl" color="default" variant="bordered" onPress={handleMakeChar}>仅导出</Button>
                  <NuwaButton className="h-16 w-48 text-xl" color="black" variant="flat">导出并发布</NuwaButton>
                </div>
              </ModalHeader>
              <ModalBody>
                <CharacterPreview chara={chara} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Preview;
