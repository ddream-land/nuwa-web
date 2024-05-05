"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import {
  XMarkIcon
} from '@heroicons/react/24/outline';
import NuwaButton from "../components/NuwaButton";
import { TypeCharaListItem } from "@/app/lib/definitions";
import AlterMessage from "../components/AlterMessage";
import CharacterEditWrapper from "./CharacterEditWrapper";
import { CharaProvider } from "@/app/contexts/CharasContextProvider";
import CharacterPreview from "./CharacterPreview";
import { publishCharacter } from "@/app/lib/character.api";
import { getIsLogin } from "@/app/lib/base.api";
import { useRouter } from "@/navigation";
import { deleteCharacterByUid, getCharacterByUid } from "@/app/lib/utils";
import { useAmDispatch } from "../components/AlterMessageContextProvider";

function CharacterEdit({ onDone, onPublish, chara }: {
  onDone?: () => void,
  onPublish?: () => void,
  chara?: TypeCharaListItem | undefined
}) {
  const router = useRouter();
  const t = useTranslations();
  const editModal = useDisclosure();
  const [isMakeCharLoding, setIsMakeCharLoding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isRelease, setIsRelease] = useState(false);
  const publishCharacterApi = publishCharacter();
  const isLogin = getIsLogin();
  const amDispatch = useAmDispatch();


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
        isDismissable={false}
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
                    {chara && (
                      <Button
                        color="primary"
                        isLoading={isRelease}
                        size="md"
                        onClick={async () => {

                          const lastCharacter = getCharacterByUid(chara.uid);

                          if (!lastCharacter?.chara?.data?.name) {
                            amDispatch({
                              type: "add",
                              payload: t("Previews.charactercardnamesmust"),
                            })
                            return;
                          }
                          if (!lastCharacter?.chara?.data?.description) {
                            amDispatch({
                              type: "add",
                              payload: t("Previews.charactercarddescsmust"),
                            })
                            return;
                          }
                          if (!lastCharacter?.chara?.data?.first_mes) {
                            amDispatch({
                              type: "add",
                              payload: t("Previews.charactercardfirstmessmust"),
                            })
                            return;
                          }


                          if(!isLogin) {
                            router.push('/login')
                            return
                          }
                          setIsRelease(true);
    
                          if (lastCharacter) {
                            const res = await publishCharacterApi.send({
                              "uid": lastCharacter.uid,
                              "chara": lastCharacter.chara,
                              "cover": lastCharacter.cover,
                            })
                            if (res && res.code === 0) {
                              deleteCharacterByUid(chara.uid)
                              onClose();
                              onPublish && onPublish();
                            }
                          }
    
                          setIsRelease(false);
                        }}
                      >{t("Character.publishbtn")}</Button>
                    )}
                    
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
