"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
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
import LoginModal from "@/app/nuwa-login-ui/components/LoginModal";

function CharacterEdit({ onDone, onPublish, chara }: {
  onDone?: () => void,
  onPublish?: () => void,
  chara?: TypeCharaListItem | undefined
}) {
  const locale = useLocale();
  const t = useTranslations();
  const editModal = useDisclosure();

  const [isRelease, setIsRelease] = useState(false);
  const publishCharacterApi = publishCharacter();
  const isLogin = getIsLogin();
  const amDispatch = useAmDispatch();
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if(chara) {
      editModal.onOpen();
    }
  }, [chara])

  async function publishCharacterToServer(lastCharacter: TypeCharaListItem, onClose: () => void) {
    setIsRelease(true);

    if (lastCharacter) {
      const res = await publishCharacterApi.send({
        "uid": lastCharacter.uid,
        "chara": lastCharacter.chara,
        "cover": lastCharacter.cover,
      });
      if (res && res.code === 0) {
        deleteCharacterByUid(lastCharacter.uid);
        onClose();
        onPublish && onPublish();
      }
    }

    setIsRelease(false);
  }
  
  return (
    <>
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
                            setIsOpen(true);
                            return
                          }
                          await publishCharacterToServer(lastCharacter, onClose);
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


      <LoginModal
        locale={locale}
        isOpen={isOpen}
        openPage="login"
        onClose={() => {
          setIsOpen(false);
        }}
        onLogin={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}

export default CharacterEdit;
