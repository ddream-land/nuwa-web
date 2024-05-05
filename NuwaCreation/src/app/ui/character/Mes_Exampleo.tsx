import React, { useEffect } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Textarea, useDisclosure } from "@nextui-org/react";
import { useChara } from "@/app/lib/utils";
import { useTranslations } from "next-intl";
import { trim } from "lodash-es";
import NuwaButton from "../components/NuwaButton";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";

type TypeChatMesExample = {
  user: string;
  char: string;
};

export default function Mes_Example() {
  const t = useTranslations();
  const { chara, setChara } = useChara();
  const [newMesExample, setNewMesExample] = React.useState({
    user: '',
    char: '',
  } as TypeChatMesExample);


  const getInitNewMesExampleList = () => {
    let aNewMesExampleList = [] as TypeChatMesExample[];
    const { mes_example } = chara.data;
    const mes_example_list = mes_example.split('\n')
    
    if (mes_example_list.length <= 1) {
      return aNewMesExampleList;
    }
    
    mes_example_list.map((item: string, index: number) => {
      if (index % 2 === 0 && mes_example_list[index + 1]) {
        aNewMesExampleList.push({
          user: item.split(':')[1],
          char: mes_example_list[index + 1].split(':')[1],
        })
      }
    })

    return aNewMesExampleList;
  }

  const initNewMesExampleList = getInitNewMesExampleList();
  const [mesExampleList, setMesExampleList] = React.useState(initNewMesExampleList);
  const [isEditIndex, setIsEditIndex] = React.useState(-1);

  const addMesModal = useDisclosure();


  const saveMesExample = () => {
    // 保存到chara
    setChara({
      ...chara,
      data: {
        ...chara.data,
        mes_example: mesExampleListToMesExample(mesExampleList)
      }
    })
  }

  useEffect(() => {
    saveMesExample();
  }, [mesExampleList])


  const mesExampleListToMesExample = (mesExampleList: TypeChatMesExample[]) => {
    const newMesExample = mesExampleList.map((item) => {
      return `{{user}}:${item.user}\n{{char}}:${item.char}`;
    }).join('\n');
    return newMesExample;
  }


  const handleModalOnClose = () => {
    addMesModal.onClose();
  }

  const insertNewMesExamplePlist = () => {
    let newMesExampleList = [] as TypeChatMesExample[];
    if (isEditIndex > -1) {
      newMesExampleList = mesExampleList.map((item, index) => {
        if (index === isEditIndex) {
          return newMesExample;
        }
        return item;
      });
    } else {
      newMesExampleList = [
        ...mesExampleList,
        newMesExample,
      ]
    }
    setMesExampleList(newMesExampleList);
    // saveMesExample(newMesExampleList);

    setNewMesExample({
      user: '',
      char: '',
    })
    setIsEditIndex(-1)
    addMesModal.onClose();
  }

  return (
    <>
      {mesExampleList.length === 0 && (
        <div
          onClick={() => {
            addMesModal.onOpen();
          }}
          className=" cursor-pointer text-xl border border-black border-solid rounded-[30px] w-full h-[236px] flex items-center justify-center bg-no-repeat bg-[bottom_0.5rem_right_1rem] bg-white bg-[url('/character-mesExample-add-first-bg.png')]">
          添加对话示例
        </div>
      )}


      {mesExampleList.map((item, index) =>(
        <div className="flex flex-row gap-4 mt-4">
          <div
            className=" p-16 flex flex-col cursor-pointer text-xl bg-black rounded-[40px] w-full min-h-[300px] bg-no-repeat bg-right-bottom bg-cover bg-[url('/character-mesExample-list-item-bg.png')]"
          >
            <div className="flex flex-row justify-end items-center self-end w-11/12 mb-10">
              <div className="mr-3 text-black bg-white min-h-[50px] rounded-b-xl rounded-tl-xl px-5 py-3 text-base">{item.user}</div>
              <div className="flex flex-col shrink-0 items-center ">
                <div className="rounded-full overflow-hidden w-9 h-9 cursor-pointer text-xl flex items-center justify-center bg-no-repeat bg-right-bottom bg-cover bg-[url('/character-mesExample-char-avator.png')]"></div>
                <div className="text-white text-xs mt-1">玩家</div>
              </div>
            </div>
            <div className="flex flex-row justify-start items-center self-start w-11/12">
              <div className="flex flex-col shrink-0 items-center ">
                <div className="rounded-full overflow-hidden w-9 h-9 cursor-pointer text-xl flex items-center justify-center bg-no-repeat bg-right-bottom bg-cover bg-[url('/character-mesExample-char-avator.png')]"></div>
                <div className="text-white text-xs mt-1">数字生命</div>
              </div>
              <div className="ml-3 text-black bg-white min-h-[50px] rounded-b-xl rounded-tr-xl px-5 py-3 text-base">{item.char}</div>
            </div>
          </div>
          <div className="w-[114px] flex flex-col gap-4">

          <Popover placement="top" color="danger">
            <PopoverTrigger>
              <Button className="w-full rounded-[40px] h-[174px] bg-white border border-solid border-black flex items-center justify-center" size="sm" isIconOnly>
                <XMarkIcon className="h-4 w-4 text-black" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>  
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setMesExampleList(mesExampleList.filter((_, i) => i !== index));
                }}
                size="sm"
                color="danger"
              >
                {t('Previews.mymindismadeup')}
              </Button>
            </PopoverContent>
          </Popover>
            <Button onPress={() => {
              setIsEditIndex(index);
              addMesModal.onOpen();
              setNewMesExample({
                user: trim(item.user),
                char: trim(item.char),
              });
            }} className="w-full rounded-[40px] h-[112px] bg-white border border-solid border-black flex items-center justify-center">编辑</Button>
          </div> 
        </div>
      ))}
        
    
      {mesExampleList.length > 0 && (
        <div className="flex flex-row-reverse mt-2">
          <Button
            onClick={() => {
              addMesModal.onOpen();
            }} variant="light" className="w-[200px]" endContent={<PlusIcon className="h-4 w-4 text-black"/>}>增加对话</Button> 
        </div>
      )}
      
      <Modal 
        isOpen={addMesModal.isOpen} 
        onOpenChange={addMesModal.onOpenChange}
        placement="top-center"
        className="rounded-[30px]"
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap- text-4xl text-center py-8">添加对话示例</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="玩家"
                  labelPlacement="outside-left"
                  classNames={{
                    label: "text-[#171717] w-20 text-lg",
                    input: [
                      "text-lg",
                      "bg-transparent",
                      "text-black/90",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "shadow-none",
                      "bg-transparent",
                      "border-none",
                    ],
                  }}
                  placeholder=""
                  variant="bordered"
                  value={newMesExample.user}
                  onChange={(e) => {
                    setNewMesExample({
                      user: e.target.value,
                      char: newMesExample.char,
                    });
                  }}
                />
                <Input
                  label="数字生命"
                  labelPlacement="outside-left"
                  classNames={{
                    label: "text-[#171717] w-20 text-lg",
                    input: [
                      "text-lg",
                      "bg-transparent",
                      "text-black/90",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "shadow-none",
                      "bg-transparent",
                      "border-none",
                    ],
                  }}
                  variant="bordered"
                  value={newMesExample.char}
                  onChange={(e) => {
                    setNewMesExample({
                      user: newMesExample.user,
                      char: e.target.value,
                    });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <NuwaButton className="h-16 w-48 text-xl" color="black" variant="flat" onPress={handleModalOnClose}>取消</NuwaButton>
                <NuwaButton className="h-16 w-48 text-xl" color="gray" onPress={insertNewMesExamplePlist}>添加</NuwaButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* <Textarea
        variant="underlined"
        labelPlacement="outside"
        placeholder="<START>"
        value={chara.data.mes_example}
        onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, mes_example: e.target.value } }))}
        maxRows={100}
      /> */}
    </>
  );
}
