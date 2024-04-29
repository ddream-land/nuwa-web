"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import {
  XMarkIcon
} from '@heroicons/react/24/outline';
import NuwaButton from "../components/NuwaButton";
import { TypeCharaListItem } from "../../_lib/definitions";
import AlterMessage from "../components/AlterMessage";
import CharacterEditWrapper from "./CharacterEditWrapper";
import { CharaProvider } from "./CharaContext";
import CharacterPreview from "./CharacterPreview";

function CharacterEdit({ onDone, chara }: {
  onDone?: () => void,
  chara?: TypeCharaListItem | undefined
}) {
  const t = useTranslations();
  const editModal = useDisclosure();
  const [isMakeCharLoding, setIsMakeCharLoding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    if(chara) {
      editModal.onOpen();
    }
  }, [chara])
  
  return (
    <>
      <AlterMessage isOpen={isOpen} message={message} onClose={() => {
        setIsOpen(false)
      }} />

      <Modal
        isDismissable={!isOpen}
        size="full"
        isOpen={editModal.isOpen}
        onOpenChange={editModal.onOpenChange}
        hideCloseButton={true}
        onClose={() => {
          onDone && onDone();
        }}
        classNames={{
          body: "overflow-y-scroll py-0",
          backdrop: "",
          base: "h-full",
          header: "",
          footer: "",
          closeButton: "",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <CharaProvider value={chara || {} as TypeCharaListItem}>
              <ModalHeader className="gap-1 py-6">
                <div
                  className="w-full flex flex-row items-center justify-between gap-4"
                >
                  <NuwaButton isIconOnly className="text-xl" size="md" color="black" variant="flat" onPress={() => {
                    onClose();
                  }}><XMarkIcon className="h-6 w-6" /></NuwaButton>
                  <div className="flex flex-row items-center justify-center gap-4">
                    {chara && (
                        <CharacterPreview /> 
                    )}
                    <NuwaButton color="black" isLoading={isMakeCharLoding} className="hidden" size="md">发布</NuwaButton>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                {/* <CharaListProvider value={chara as any}> */}
                {chara && (
                    <CharacterEditWrapper/>
                )}
              </ModalBody>
              </CharaProvider>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CharacterEdit;
