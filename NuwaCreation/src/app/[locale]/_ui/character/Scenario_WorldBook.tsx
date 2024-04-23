"use client";
import React, { useEffect, useRef, useState } from "react";
import { useChara, useCharacterBook, usePostCharaFun } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import NuwaButton from "../components/NuwaButton";
import Scenario_CreateWorldBook from "./Scenario_CreateWorldBook";
import { TypeCharacterBook } from "../../_lib/definitions";
import { Link } from "@/navigation";
import Image from "next/image";

// const worldbookList = [{
//   name: "一本世界书1",
//   entries: [{
//     comment: "一本世界书11",
//   }, {
//     comment: "一本世界书11",
//   }]
// }, {
//   name: "一本世界书2",
//   entries: [{
//     comment: "一本世界书22",
//   }, {
//     comment: "一本世界书22",
//   }]
// }, {
//   name: "一本世界书3",
//   entries: [{
//     comment: "一本世界书33",
//   }, {
//     comment: "一本世界书33",
//   }]
// }, {
//   name: "一本世界书3",
//   entries: [{
//     comment: "一本世界书33",
//   }, {
//     comment: "一本世界书33",
//   }]
// }, {
//   name: "一本世界书3",
//   entries: [{
//     comment: "一本世界书33",
//   }, {
//     comment: "一本世界书33",
//   }]
// }]
function Scenario_WorldBook() {
  const t = useTranslations();
  const { chara , setChara } = useChara();

  const selectWorldBookModal = useDisclosure();
  const createWorldBookModal = useDisclosure();
  const [myWorldBooks , setMyWorldBooks] = useState([] as Array<TypeCharacterBook>);
  const isLogin = false;

  const handleRemoveSelectedWorldBook = () => {
    setChara({
      ...chara,
      data: { ...chara.data, character_book: undefined },
    });
  };

  const handleCloseCreateWorldBookModal = () => {
    let character_book = null
    if(typeof window !== "undefined" ){
      const character_booked = localStorage.getItem('character_book') || '';
      character_book = JSON.parse(character_booked);
    }
    
    const {updateChara} = usePostCharaFun(chara, character_book);
    
    setChara(updateChara)
    if(isLogin) {
      selectWorldBookModal.onClose();
    } else {
      createWorldBookModal.onClose();
    }
  }

  return (
    <div className="relative bg-white h-full w-full py-12 rounded-[40px] bg-[url('/character-worldbook-bg.png')] bg-no-repeat bg-right-top">
      <label
        className="text-[#0C0C0C] text-lg font-medium leading-8 mb-1 px-7"
      >
        {t('Character.scenarioWorldbookTitle')}
      </label>

      <NuwaButton
        color="black"
        onClick={() => {
          if(isLogin) {
            selectWorldBookModal.onOpen();
          } else {
            createWorldBookModal.onOpen();
          }
        }}
        startContent={<LinkIcon className="h-4 w-4"/>}
        className="absolute top-4 right-4 h-10 w-32 p-0 z-40"
        type="button"
        variant="flat"
        >
          关联世界书
      </NuwaButton>
      <Modal 
        size="full"
        isOpen={selectWorldBookModal.isOpen}
        placement={'bottom'}
        scrollBehavior="inside"
        onOpenChange={selectWorldBookModal.onOpenChange}
        classNames={{
          base: "h-11/12",
        }}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1 py-6">
                <div>选择一本世界书</div>
                <div
                  className="cursor-pointer flex flex-row items-center justify-center h-12 w-52 z-40 bg-[url('/character-inforMation-personality-model-insert-bg.png')] bg-no-repeat bg-center bg-contain"
                  onClick={() => {
                    createWorldBookModal.onOpen();
                  }}
                >
                  <span className="text-black text-lg ont-semibold">创建新世界书</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-10 py-10 px-7 overflow-visible h-auto">
                  {myWorldBooks && myWorldBooks.map((worldbook, index) => (
                    <div
                      key={`${worldbook.name}+${index}`}
                      onClick={() => {
                        const {updateChara} = usePostCharaFun(chara, worldbook);
                        setChara(updateChara)
                        onClose();
                      }}
                      className="cursor-pointer relative bg-[#979797] w-auto h-[340px] rounded-lg shadow-lg shadow-black/25 py-8 px-3"
                    >
                      <div className="border-y border-solid border-white text-white font-semibold text-2xl overflow-hidden text-overflow-ellipsis">{worldbook.name}</div>
                      <div className="pt-14 pb-4 h-full overflow-y-scroll w-auto text-white break-words">
                      {worldbook.entries && worldbook.entries.map((entry, index) => (
                        <p key={`entries${index}`}>{entry.comment}</p>
                      ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal 
        size="full"
        isOpen={createWorldBookModal.isOpen}
        placement={'bottom'}
        scrollBehavior="inside"
        onOpenChange={createWorldBookModal.onOpenChange}
        classNames={{
          base: "h-3/4 bg-[#F6F6F6]",
        }}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1 py-6">
                <div>创建新世界书</div>

                <NuwaButton
                  color="black"
                  onClick={()=>{
                    handleCloseCreateWorldBookModal();
                  }}
                  startContent={<LinkIcon className="h-4 w-4"/>}
                  className="h-10 w-32 p-0 z-40"
                  type="button"
                  variant="flat"
                  >
                    保存
                </NuwaButton>
              </ModalHeader>
              <ModalBody>
                <Scenario_CreateWorldBook />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="overflow-y-scroll w-full h-full">
        <div className="grid 2xl:grid-cols-3 3xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 py-10 px-7 overflow-visible h-auto">
          
            {chara.data.character_book && (
              <div className="relative bg-[#979797] w-auto h-[340px] rounded-lg shadow-lg shadow-black/25 py-8 px-3">
                <Button
                  onClick={() => {
                    handleRemoveSelectedWorldBook();
                  }}
                  className="absolute -top-4 -right-4 h-10 w-5 p-0 rounded-full bg-black z-40"
                  type="button"
                  color="default"
                  variant="flat"
                  isIconOnly
                >
                  <XMarkIcon className="h-6 w-6 text-white font-black absolute" aria-hidden="true" />
              </Button>
                <div className="border-y border-solid border-white text-white font-semibold text-2xl line-clamp-1">{chara.data.character_book.name}</div>
                <div className="pt-14 pb-4 h-full overflow-y-scroll w-auto text-white break-words">
                {chara.data.character_book.entries.map((entry, index) => (
                  <p key={`entries${index}`}>{entry.comment}</p>
                ))}
                </div>
              </div>
            )}
        </div>
        {/* <Divider />
        <Link href='/character/mesexample'>
          <Image className=" absolute -right-2 -bottom-3 cursor-pointer" width={120} height={114} src="/character-nexttab.png" alt="" />
        </Link>  */}
      </div>
    </div>
  );
}

export default Scenario_WorldBook;
