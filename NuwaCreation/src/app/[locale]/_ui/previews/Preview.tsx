"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";


import NuwaButton from "../components/NuwaButton";
import { TypeCharaListItem } from "../../_lib/definitions";
import CharacterPreview from "./CharacterPreview";
import AlterMessage from "../components/AlterMessage";

function Preview({charaItem}: {charaItem: TypeCharaListItem}) {
  const t = useTranslations();
  const previewModal = useDisclosure();
  const [isMakeCharLoding, setIsMakeCharLoding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleMakeChar = async (e: any) => {
    setIsMakeCharLoding(true)
    if (!charaItem.chara?.data?.name) {
      setMessage(t("Previews.charactercardnamesmust"));
      setIsOpen(true);
      setIsMakeCharLoding(false)
      return;
    }
    if (!charaItem.chara?.data?.description) {
      setMessage(t("Previews.charactercarddescsmust"));
      setIsOpen(true);
      setIsMakeCharLoding(false)
      return;
    }
    if (!charaItem.chara?.data?.first_mes) {
      setMessage(t("Previews.charactercardfirstmessmust"));
      setIsOpen(true);
      setIsMakeCharLoding(false)
      return;
    }
    try {
      const charDataRes = await fetch("/api/makechar", {
        method: "POST",
        body: JSON.stringify({
          cover: charaItem.cover,
          chara: charaItem.chara,
        }),
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
        a.download = charaItem.chara.data.name + charaItem.chara.data.character_version + ".png";
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
      <NuwaButton
        color="black"
        size="md"
        // startContent={<PaperAirplaneIcon className="h-4 w-4"/>}
        onClick={() => {
          previewModal.onOpen();
        }}
      >{t('Navigation.previews')}</NuwaButton>

      <Modal
        isDismissable={!isOpen}
        size="full"
        isOpen={previewModal.isOpen}
        placement={'bottom'}
        scrollBehavior="inside"
        onOpenChange={previewModal.onOpenChange}
        classNames={{
          base: "h-11/12 bg-transparent ",
          body: "h-full bg-neutral-100 rounded-t-3xl",
        }}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className=" relative h-2 bg-transparent flex flex-row justify-between items-center py-1">
                <div></div>
                <div
                  className="flex flex-row items-center justify-center gap-4 absolute right-10 top-6"
                >
                  
                  <Button isLoading={isMakeCharLoding} color="default" variant="bordered" onPress={handleMakeChar}>{t("Preview.exportbtn")}</Button>
                  {/* <NuwaButton className="h-16 w-48 text-xl" color="black" variant="flat">导出并发布</NuwaButton> */}
                </div>
              </ModalHeader>
              <ModalBody>
                <CharacterPreview charaItem={charaItem} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Preview;
