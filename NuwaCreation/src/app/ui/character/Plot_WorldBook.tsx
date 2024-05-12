"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { usePostCharaFun, getWorldBookList } from "@/app/lib/utils";
import { useTranslations } from "next-intl";
import { Button, CircularProgress, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { TypeChara, TypeWorldBook } from "@/app/lib/definitions";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import WorldBookItem from "../worldbook/WorldBookItem";
import UnLinkIcon from "@/app/icons/UnLinkIcon";
import { LinkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { getIsLogin } from "@/app/nuwa-login-ui/utils/base.api";
import { getWorldBookAll } from "@/app/lib/worldbook.api";

function Plot_WorldBook() {
  const router = useRouter();
  const t = useTranslations();

  const selectWorldBookModal = useDisclosure();

  const charaList = getWorldBookList();
  const [myWorldBooks , setMyWorldBooks] = useState(charaList || [] as Array<TypeWorldBook>);

  const [isInit, setIsInit] = useState(false);
  const [firstInit, setFirstInit] = useState(true);
  const isLogin = getIsLogin();
  const getWorldBookAllApi = getWorldBookAll();
  const [isLoading, setIsLoading] = useState(false);
  const [ worldBookPublishList, setWorldBookPublishList ] = useState<{
    world: {
      data: TypeWorldBook,
      uid: string,
    }
  }[]>([]);

  useEffect(() => {
    if (isLogin) {
      !isInit && setIsInit(true)
    } else {
      setFirstInit(false)
    }
  }, [])

  useEffect(() => {

    if (isInit && isLogin) {
      init();
    }
    
  }, [isInit])

  const init = async () => {
    const res = await getWorldBookAllApi.send();
    if (res && res.code === 0) {
      setWorldBookPublishList(res.data);
    }
    
    setIsInit(false);
    setFirstInit(false)
  }

  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue:TypeChara | undefined) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: newValue
      },
    })
  }
  const setCharaListItemCleareWorldBook = (newValue:string | undefined) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            character_book: newValue,
          }
        }
      },
    })
  }
  
  const handleRemoveSelectedWorldBook = () => {
    setCharaListItemCleareWorldBook(undefined)
  };

  return (
    <div className="relative h-full w-full">
      <label
        className="text-2xl text-neutral-800 font-bold tracking-tight"
      >
        {t('Character.plotWorldbookTitle')}
      </label>
      {!charaListItem.chara.data.character_book && (
        <div className="mt-8">
            <Button
            onClick={() => {
              selectWorldBookModal.onOpen();
            }}
            startContent={<LinkIcon className="h-4 w-4"/>}
            type="button"
            color="primary"
            >
              {t('Character.plotWorldbooklinkbtn')}
          </Button>
        </div>
      )}
      
      <Modal 
        size="full"
        isOpen={selectWorldBookModal.isOpen}
        placement={'bottom'}
        scrollBehavior="inside"
        onOpenChange={selectWorldBookModal.onOpenChange}
        classNames={{
          base: "h-11/12 rounded-t-lg overflow-hidden",
          header: "rounded-t-lg overflow-hidden"
        }}
        hideCloseButton={true}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                opacity: {
                  duration: 0.15,
                },
              },
            },
            exit: {
              y: "50%",
              opacity: 0,
              transition: {
                opacity: {
                  duration: 0.1,
                },
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1 py-6">
                <div>{t('Character.plotWorldbookchoose')}</div>
                <Button
                  className="bg-black text-white"
                  startContent={<PlusIcon className="h-4 w-4"/>}
                  size="md"
                  onClick={() => {
                    router.replace('/worldbook');
                  }}
                >{t('WorldBook.addnewbook')}</Button>
              </ModalHeader>
              <ModalBody>
                <>
                  {(myWorldBooks.length !== 0) ? (
                    <>
                      <div className="text-black text-3xl font-semibold">{t("WorldBook.drafts")}</div>
                      <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-10 py-10 px-7 overflow-visible h-auto min-h-[400px]">
                        {myWorldBooks && myWorldBooks.map((worldBookItem, index) => (
                          <div
                            key={`${worldBookItem.uid}+${index}`}
                            onClick={() => {
                              const {updateChara} = usePostCharaFun(charaListItem.chara, worldBookItem.worldBook);
                              setCharaListItem(updateChara);
                              onClose();
                            }}
                            className="cursor-pointer relative w-auto h-[340px]"
                          >
                            <WorldBookItem worldBookItem={worldBookItem.worldBook} />
                          </div>
                        ))}
                      </div>
                    </>
                  ): (
                    <>
                      {!isLogin && (
                        <div className="w-full h-full flex justify-center items-center  md:col-span-4 sm:col-span-4 col-span-1">
                          {t("WorldBook.worldbooknull")}
                        </div>
                      )}
                    </> 
                  )}

                  {(firstInit || isLoading) ? (
                    <div className="absolute left-0 top-0 w-full h-full min-h-[300px] flex justify-center items-center z-10 bg-gray-50/50">
                      <CircularProgress size="md" aria-label="Loading..."/>
                    </div>
                  ) : (
                    <>
                      {worldBookPublishList.length === 0 && myWorldBooks.length === 0 && (
                        <div className="w-full min-h-[400px] h-full flex justify-center items-center  md:col-span-4 sm:col-span-4 col-span-1">
                          {t("WorldBook.worldbooknull")}
                        </div>
                      )}
                    </>
                  ) }

                  {(worldBookPublishList.length !== 0) && (
                    <>
                      <div className="text-black text-3xl font-semibold">{t("WorldBook.published")}</div>
                      <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-10 py-10 px-7 overflow-visible h-auto min-h-[400px]">
                        {worldBookPublishList && worldBookPublishList.map((worldBookItem, index) => (
                          <div
                            key={`${worldBookItem.world.uid}+${index}`}
                            onClick={() => {
                              const {updateChara} = usePostCharaFun(charaListItem.chara, worldBookItem.world.data);
                              setCharaListItem(updateChara);
                              onClose();
                            }}
                            className="cursor-pointer relative w-auto h-[340px]"
                          >
                            <WorldBookItem worldBookItem={worldBookItem.world.data} />
                          </div>
                        ))}
                        {!worldBookPublishList || worldBookPublishList.length === 0 && (
                          <div className="w-full h-full min-h-[400px] flex justify-center items-center  md:col-span-4 sm:col-span-4 col-span-1">
                            {t("WorldBook.worldbooknull")}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
                
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full h-full">
        <div className="grid 2xl:grid-cols-3 3xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 py-10 overflow-visible h-auto">
          
            {charaListItem.chara.data.character_book && (
              <div className="relative w-auto h-[340px]">
                <WorldBookItem
                  worldBookItem={charaListItem.chara.data.character_book}
                  btns={
                    <Button
                      onClick={() => {
                        handleRemoveSelectedWorldBook();
                      }}
                      className=""
                      type="button"
                      color="primary"
                      variant="bordered"
                      size="sm"
                      startContent={
                        <UnLinkIcon className="h-6 w-6" aria-hidden="true" />
                      }
                    >
                      {t('Character.plotWorldbookunlinkbtn')}
                    </Button>
                  }
                  />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Plot_WorldBook;
