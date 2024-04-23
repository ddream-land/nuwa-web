"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import A3DIcon from "../icons/A3DIcon";

import { useTranslations } from "next-intl";


function AlterMessage({message, isOpen = false, onClose}: {message: string, isOpen?: boolean, onClose: () => void }) {


  const msgModal = useDisclosure();
  useEffect(() => {
    if(isOpen) {
      msgModal.onOpen();
    } else {
      msgModal.onClose();
    }
  }, [isOpen])


  const t = useTranslations();
  return ( 
    <Modal placement={"top"} backdrop="blur" isOpen={msgModal.isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>{message}</ModalBody>
            </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AlterMessage;
