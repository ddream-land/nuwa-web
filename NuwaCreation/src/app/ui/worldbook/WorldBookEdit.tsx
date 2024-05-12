"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { TypeWorldBookItem } from "@/app/lib/definitions";
import WorldBook from "./WorldBook";
import { WorldBookProvider } from "./WorldBookContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import WorldBook_Title from "./WorldBook_Title";
import { createWorldBook } from "@/app/lib/worldbook.api";
import { getIsLogin } from "@/app/lib/base.api";
import { deleteWorldBookByUid, getWorldBookByUid } from "@/app/lib/utils";
import LoginModal from "@/app/nuwa-login-ui/components/LoginModal";

function WorldBookEdit({ onDone, onPublish, worldBook }: {
  onDone?: () => void,
  onPublish?: () => void,
  worldBook?: TypeWorldBookItem | undefined
}) {
  const locale = useLocale();
  const t = useTranslations();
  const editModal = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isRelease, setIsRelease] = useState(false);
  const createWorldBookApi = createWorldBook();
  const isLogin = getIsLogin();
  


  useEffect(() => {
    if(worldBook) {
      editModal.onOpen();
    }
  }, [worldBook])

  async function publishWorldBookToServer(worldBook: TypeWorldBookItem, onClose: () => void) {
    setIsRelease(true);

    const lastWorldBook = getWorldBookByUid(worldBook.uid);
    if (lastWorldBook) {
      const res = await createWorldBookApi.send({
        "uid": lastWorldBook.uid,
        "data": lastWorldBook.worldBook,
      })
      if (res && res.code === 0) {
        deleteWorldBookByUid(worldBook.uid)
        onClose();
        onPublish && onPublish();
      }
    }

    setIsRelease(false);
  }
  
  return (
    <>
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
                <div className="w-full flex flex-col items-center justify-between">
                  <div
                    className="w-full flex flex-row items-center justify-between gap-4"
                  >
                    <Button
                      isIconOnly
                      className="w-12 text-xl"
                      size="md"
                      color="primary"
                      onPress={() => {
                        onClose();
                      }
                    }>
                      <XMarkIcon className="h-6 w-6" />
                    </Button>

                    <div className="grow overflow-hidden">
                      <WorldBook_Title />
                    </div>
                    <Button
                      color="primary"
                      isLoading={isRelease}
                      size="md"
                      onClick={async () => {
                        if(!isLogin) {
                          setIsOpen(true);
                          return
                        }
                        publishWorldBookToServer(worldBook, onClose)
                      }}
                      >{t("WorldBook.publishbtn")}</Button>
                    </div>
                  <div>
                  <div className="text-center text-neutral-400 text-[10px] font-normal font-['Saira'] leading-normal pr-12">{t("WorldBook.savetip")}</div>
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
      </WorldBookProvider>
      }
    </>
  );
}

export default WorldBookEdit;
