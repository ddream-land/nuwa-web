"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";

import { useChara, getChara } from "../../_lib/utils";
import {
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import NuwaButton from "../components/NuwaButton";
import { TypeChara } from "../../_lib/definitions";
import CharacterPreview from "../components/CharacterPreview";

function Preview() {
  const t = useTranslations();
  let chara = getChara();
  const previewModal = useDisclosure();
  
  return (
    <>
      <Button
        className="bg-black text-white" startContent={<PaperAirplaneIcon className="h-4 w-4"/>}
        onClick={() => {
          let chara = getChara();
          previewModal.onOpen();
        }}
      >{t('Navigation.previews')}</Button>

      <Modal 
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
                  
                  <Button className="h-16 w-48 text-xl" color="default" variant="bordered">仅导出</Button>
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
