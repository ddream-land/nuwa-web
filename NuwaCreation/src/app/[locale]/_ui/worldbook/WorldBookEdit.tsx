"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import NuwaButton from "../components/NuwaButton";
import { TypeWorldBookItem } from "../../_lib/definitions";
import AlterMessage from "../components/AlterMessage";
import WorldBook from "./WorldBook";
import { WorldBookProvider } from "./WorldBookContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import WorldBook_Title from "./WorldBook_Title";

function WorldBookEdit({ onDone, worldBook }: {
  onDone?: () => void,
  worldBook?: TypeWorldBookItem | undefined
}) {
  const t = useTranslations();
  const editModal = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    if(worldBook) {
      editModal.onOpen();
    }
  }, [worldBook])
  
  return (
    <>
      <AlterMessage isOpen={isOpen} message={message} onClose={() => {
        setIsOpen(false)
      }} />

      {worldBook && <WorldBookProvider value={worldBook}>
      <Modal
        isDismissable={!isOpen}
        size="5xl"
        isOpen={editModal.isOpen}
        onOpenChange={editModal.onOpenChange}
        hideCloseButton={true}
        scrollBehavior="inside"
        onClose={() => {
          onDone && onDone();
        }}
        classNames={{
          body: "px-2 py-0 overflow-y-hidden gap-0",
          backdrop: "",
          base: "",
          header: "",
          footer: "",
          closeButton: "",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="gap-1 py-6">
                <div
                  className="w-full flex flex-row items-center justify-between gap-4"
                >
                  <NuwaButton
                    isIconOnly
                    className="w-12 text-xl"
                    size="md" color="black"
                    variant="flat"
                    onPress={() => {
                    onClose();
                  }}>
                    <XMarkIcon className="h-6 w-6" />
                  </NuwaButton>

                  <div className="grow overflow-hidden">
                    <WorldBook_Title />
                  </div>
                  <div className="w-12">
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <WorldBook />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      </WorldBookProvider>}
    </>
  );
}

export default WorldBookEdit;
