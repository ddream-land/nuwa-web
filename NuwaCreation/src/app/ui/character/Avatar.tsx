"use client"

import React from "react";
import { useTranslations } from "next-intl";
import { NoSymbolIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TypeAvatar, TypeAvatarType } from "@/app/lib/definitions.avatar";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import IconCard from "../components/IconCard";
import NuwaButton from "../components/NuwaButton";
import { useCharaListItem, useCharaListItemDispatch } from "@/app/contexts/CharasContextProvider";
import { textareaProps } from "../components/NuwaTextarea";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function Avatar() {
  const t = useTranslations();
  const uploadModal = useDisclosure();

  const [selectedAvatarType, setSelectedAvatarType] = React.useState<TypeAvatarType>(TypeAvatarType.LIVE2D);
  
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue: TypeAvatar[]) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            extensions: {
              ...charaListItem.chara.data.extensions,
              nuwa_avatars: {
                ...charaListItem.chara.data.extensions.nuwa_avatars,
                list: newValue,
              }
            }
          }
        }
      },
    })
  }

  const handleSetSelectedAvatarType = (avatarType : TypeAvatarType) => {
    setSelectedAvatarType(avatarType)
  }

  const clearAvatarList = () => {
    setCharaListItem([]);
  }

  const handleAddAvatar = () => {
    let newAvatars: any[] = [];
    if (charaListItem.chara.data.extensions. nuwa_avatars) {
      newAvatars = [
        ...charaListItem.chara.data.extensions.nuwa_avatars.list
      ]
    }
    newAvatars.push({
      url: "demo",
      type: selectedAvatarType
    })
    setCharaListItem(newAvatars);

    uploadModal.onClose();
  }

  const handerRemoveAvatar = (index: number) => {
    let newAvatars = [
      ...charaListItem.chara.data.extensions.nuwa_avatars.list
    ]
    newAvatars.splice(index, 1);
    setCharaListItem(newAvatars);
  }



  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-10 mb-20">
      <div className="sm:col-start-3 sm:col-end-9 grid gap-20">
        <div>
          <h2 className={textareaProps.classNames.label}>{t('Character.avatartitle')}</h2>
          <div className="text-stone-500 text-sm font-normal leading-none tracking-tight -mt-4">{t('Character.avatartip')}</div>
          <div className="flex flex-row flex-wrap gap-[42px] mt-8">
          <div
              onClick={() => {
                clearAvatarList();
              }}
              className={classNames('group hover:bg-black shrink-0 flex flex-col items-center justify-center border border-neutral-400 border-opacity-50 cursor-pointer w-[174px] h-[206px] rounded-[14px]')}
            >
              <NoSymbolIcon className={classNames('h-32 w-32  font-black group-hover:text-white')} aria-hidden="true" />
              <div className={classNames('text-center text-base font-normal leading-[29px] tracking-tight group-hover:text-white')} >{t('Character.none')}</div>
            </div>
            <div
              onClick={() => {
                uploadModal.onOpen();
              }}
              className={classNames('group hover:bg-black shrink-0 flex flex-col items-center justify-center border border-neutral-400 border-opacity-50 cursor-pointer w-[174px] h-[206px] rounded-[14px]')}
            >
              <PlusIcon className={classNames('h-32 w-32  font-black group-hover:text-white')} aria-hidden="true" />
              <div className={classNames('text-center text-base font-normal leading-[29px] tracking-tight group-hover:text-white')} >{t('Character.plus')}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-wrap gap-[42px] mt-[20px]">
          {charaListItem.chara.data.extensions.nuwa_avatars && charaListItem.chara.data.extensions.nuwa_avatars.list.map((item, index) => {
            return (
              <div>
                <div className="text-black text-[32px] font-['SF Pro'] leading-[57.98px] tracking-tight">
                  {t(`Character.avatartip3`, {index: index + 1, type: t(`Character.${item.type}`)})}
                </div>
                <div className="w-full">
                <div className="w-fit group relative">
                  <IconCard 
                    onClick={() => {}}
                    isActive={true}
                    iconType={item.type}
                  />

                <Popover placement="top" color='danger'>
                  <PopoverTrigger>
                    <Button
                      className=" absolute top-2 right-2 bg-white text-black opacity-0 group-hover:opacity-100"
                      startContent={<TrashIcon className="h-5 w-5"/>}
                      isIconOnly
                    ></Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Button 
                      className="w-full font-semibold" 
                      size="sm" 
                      color="danger"
                      onClick={() => {
                        handerRemoveAvatar(index);
                      }}
                    >    
                      {t('Previews.mymindismadeup')}
                    </Button>
                  </PopoverContent>
                </Popover>
                </div>
                </div>
              </div>
            )
          })}         
        </div>
      </div>
      
      <Modal 
          isOpen={uploadModal.isOpen}
          hideCloseButton={true}
          onOpenChange={uploadModal.onOpenChange}
          placement="bottom-center"
          size="3xl"
          scrollBehavior="inside"
          classNames={{
            body: "bg-transparent py-6 h-full",
            backdrop: "h-full",
            base: "border-none shadow-none bg-white rounded-[40px] px-14 pt-16",
            footer: "justify-center pt-10 pb-10",
            header: "justify-center text-black text-center text-[32px] font-semibold leading-[57.98px] tracking-tight"
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <div className="">{t('Character.avatartip2')}</div>
                </ModalHeader>
                <ModalBody>
                  <div className="">
                    <div className="flex flex-row flex-wrap gap-[42px] mt-[20px]">
                      <div
                        className="shrink-0"
                      >
                        <IconCard 
                          onClick={() => handleSetSelectedAvatarType(TypeAvatarType.IMAGE)}
                          isActive={selectedAvatarType === TypeAvatarType.IMAGE }
                          iconType="IMAGE"
                        />
                        <div></div>
                      </div>
                      <div
                        className="shrink-0"
                      >
                        <IconCard 
                          onClick={() => handleSetSelectedAvatarType(TypeAvatarType.LIVE2D)}
                          isActive={selectedAvatarType === TypeAvatarType.LIVE2D }
                          iconType="LIVE2D"
                        />
                      </div>
                      <div
                        className="shrink-0"
                      >
                        <IconCard 
                          onClick={() => handleSetSelectedAvatarType(TypeAvatarType["VRM"])}
                          isActive={selectedAvatarType === TypeAvatarType["VRM"] }
                          iconType="VRM"
                          disabled={true}
                        />
                        <div className="w-full text-center text-sm py-2 text-gray-400">{t('Character.3Dtip2')}</div>
                      </div>
                    </div>
                    {selectedAvatarType === TypeAvatarType.LIVE2D && (
                      <div className="h-20">
                        <div className="mt-2 text-black text-sm leading-relaxed tracking-tight">{t(`Character.LIVE2Dtip`)}</div>
                        <div className="mt-2 text-black text-sm leading-relaxed tracking-tight">{t(`Character.LIVE2Dlinktip`)}{t(`Character.LIVE2Dlink`)}</div>
                      </div>
                    )}
                    {selectedAvatarType === TypeAvatarType["VRM"] && (
                      <div className="h-20">
                        <div className="mt-2 text-black text-sm leading-relaxed tracking-tight">{t(`Character.3Dtiptip`)}</div>
                        <div className="mt-2 text-black text-sm leading-relaxed tracking-tight">{t(`Character.3Dtiplink`)}</div>
                      </div>
                    )}
                    {selectedAvatarType === TypeAvatarType.IMAGE && (
                      <div className="h-20">
                        <div className="mt-2 text-black text-sm leading-relaxed tracking-tight">{t(`Character.IMAGEtip`)}</div>
                        <div className="mt-2 text-black text-sm leading-relaxed tracking-tight">{t(`Character.IMAGElink`)}</div>
                      </div>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <NuwaButton className="h-16 w-48 text-xl" color="gray" variant="flat" onPress={uploadModal.onClose}>{t(`Character.avatarmodalcancelbtn`)}</NuwaButton>
                  <NuwaButton className="h-16 w-48 text-xl" color="black" onPress={handleAddAvatar}>{t(`Character.avatarmodaladdbtn`)}</NuwaButton>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

    </div>
  );
}
