"use client"

import React from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations, useMessages } from "next-intl";
import { NoSymbolIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Link } from "@/navigation";
import { TypeAvatarType } from "../../_lib/definitions.avatar";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import IconCard from "../components/IconCard";
import NuwaButton from "../components/NuwaButton";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function Avatar() {
  // const initAvatarList = [{
  //   url: 'LIVE2D',
  //   type: TypeAvatarType.LIVE2D
  // }, {
  //   url: '3D',
  //   type: TypeAvatarType["3D"]
  // }, {
  //   url: 'image',
  //   type: TypeAvatarType.IMAGE
  // }]
  const t = useTranslations();
  const messages = useMessages();
  const { chara , setChara } = useChara();
  const uploadModal = useDisclosure();

  const [selectedAvatarType, setSelectedAvatarType] = React.useState<TypeAvatarType>(TypeAvatarType.LIVE2D);
  

  const handleSetSelectedAvatarType = (avatarType : TypeAvatarType) => {
    setSelectedAvatarType(avatarType)
  }

  const clearAvatarList = () => {
    setChara((prevChara) => ({
      ...prevChara,
      data: {
        ...prevChara.data,
        extensions: {
          ...prevChara.data.extensions,
          avatars: []
        }
      },
    }));
  }

  const handleAddAvatar = () => {
    let newAvatars: any[] = [];
    if (chara.data.extensions.avatars) {
      newAvatars = [
        ...chara.data.extensions.avatars
      ]
    }
    newAvatars.push({
      url: "demo",
      type: selectedAvatarType
    })

    setChara((prevChara) => ({
      ...prevChara,
      data: {
        ...prevChara.data,
        extensions: {
          ...prevChara.data.extensions,
          avatars: newAvatars
        }
      },
    }));

    uploadModal.onClose();
  }

  const handerRemoveAvatar = (index: number) => {
    let newAvatars = [
      ...chara.data.extensions.avatars
    ]
    newAvatars.splice(index, 1);
    setChara((prevChara) => ({
      ...prevChara,
      data: {
        ...prevChara.data,
        extensions: {
          ...prevChara.data.extensions,
          avatars: newAvatars
        }
      },
    }));
  }


 

  return (
    <div className="relative bg-white h-full w-full pt-20 pb-40 rounded-[40px]">
      <div className="px-7">
        <h2 className="text-lg font-semibold">{t('Character.avatar')}</h2>
        <div className="text-stone-500 text-[8.50px] font-normal leading-none tracking-tight mt-2">{t('Character.avatartip')}</div>
        <div className="flex flex-row flex-wrap gap-[42px] mt-[20px]">
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

        <div className="flex flex-col flex-wrap gap-[42px] mt-[20px]">
   
          {chara.data.extensions.avatars && chara.data.extensions.avatars.map((item, index) => {
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

                <Popover placement="top" color='warning'>
                  <PopoverTrigger>
                    <Button
                      className=" absolute top-2 right-2 bg-white text-black opacity-0 group-hover:opacity-100"
                      startContent={<TrashIcon className="h-5 w-5"/>}
                      isIconOnly
                    ></Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Button 
                      className="w-full" 
                      size="sm" 
                      color="warning"
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
                          onClick={() => handleSetSelectedAvatarType(TypeAvatarType.LIVE2D)}
                          isActive={selectedAvatarType === TypeAvatarType.LIVE2D }
                          iconType="LIVE2D"
                        />
                      </div>
                      <div
                        className="shrink-0"
                      >
                        <IconCard 
                          onClick={() => handleSetSelectedAvatarType(TypeAvatarType["3D"])}
                          isActive={selectedAvatarType === TypeAvatarType["3D"] }
                          iconType="3D"
                        />
                      </div>
                      <div
                        className="shrink-0"
                      >
                        <IconCard 
                          onClick={() => handleSetSelectedAvatarType(TypeAvatarType.IMAGE)}
                          isActive={selectedAvatarType === TypeAvatarType.IMAGE }
                          iconType="IMAGE"
                        />
                      </div>
                    </div>
                    {selectedAvatarType === TypeAvatarType.LIVE2D && (
                      <div className="mt-10 text-black text-sm leading-relaxed tracking-tight">{t(`Character.LIVE2Dtip`)}</div>
                    )}
                    {selectedAvatarType === TypeAvatarType["3D"] && (
                      <div className="mt-10 text-black text-sm leading-relaxed tracking-tight">{t(`Character.3Dtip`)}</div>
                    )}
                    {selectedAvatarType === TypeAvatarType.IMAGE && (
                      <div className="mt-10 text-black text-sm leading-relaxed tracking-tight">{t(`Character.IMAGEtip`)}</div>
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

      {/* <Link href='/character/voice'>
        <Image className=" absolute right-10 -bottom-1 cursor-pointer" width={120} height={114} src="/character-nexttab.png" alt="" />
      </Link> */}
    </div>
  );
}
