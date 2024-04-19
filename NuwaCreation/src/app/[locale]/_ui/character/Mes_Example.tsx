import React, { createRef, RefObject, useEffect, useRef } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Textarea, useDisclosure } from "@nextui-org/react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { trim } from "lodash-es";
import NuwaButton from "../components/NuwaButton";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "@/navigation";
import Image from "next/image";

export default function Mes_Example() {
  const descTextareaRefs = useRef<{ [key: string]: RefObject<HTMLElement> | null }>({});
  const t = useTranslations();
  const { chara, setChara } = useChara();

  let initNewMesExampleList = chara.data.mes_example.split('<START>');
  initNewMesExampleList = initNewMesExampleList.filter((_, index: number) => {
    return index !== 0;
  })
  
  initNewMesExampleList.map((item, index)=> {
    descTextareaRefs.current[index] = createRef<HTMLElement>();
    return item;
  });
  const [mesExampleList, setMesExampleList] = React.useState(initNewMesExampleList);



  const insertTextAtCursor = (text: string, index: number) => {
    const currentDescTextareaRef = descTextareaRefs.current[index];
    const startPos = (currentDescTextareaRef as any).selectionStart;
    const endPos = (currentDescTextareaRef as any).selectionEnd | 0;
    const value = (currentDescTextareaRef as any).value;
    const textBefore = value?.substring(0, startPos);
    const textAfter = value?.substring(endPos, value.length);
    const newValue = textBefore + text + textAfter;

    (currentDescTextareaRef as any).value = newValue;
    (currentDescTextareaRef as any).selectionStart = startPos + text.length;
    (currentDescTextareaRef as any).selectionEnd = startPos + text.length;

    updateMesExamplePlist(newValue, index);
    // setChara((prevChara) => ({
    //   ...prevChara,
    //   data: { ...prevChara.data, description: newValue },
    // }));
    // setDescriptionValue(newValue);
  };

  const saveMesExample = (newMesExampleList: string[]) => {
    // 保存到chara
    setChara({
      ...chara,
      data: {
        ...chara.data,
        mes_example: mesExampleListToMesExample(newMesExampleList)
      }
    })
  }

  // useEffect(() => {
  //   saveMesExample();
  // }, [mesExampleList])


  const mesExampleListToMesExample = (mesExampleList: string[]) => {
    const newMesExample = mesExampleList.map((item) => {
      return `<START>${item}`;
    }).join('');
    return newMesExample;
  }


  const insertNewMesExamplePlist = () => {
    descTextareaRefs.current[mesExampleList.length] = createRef<HTMLElement>();
    const newMesExampleList = [
      ...mesExampleList,
      ''
    ]
    setMesExampleList(newMesExampleList);
    saveMesExample(newMesExampleList);
  }


  const updateMesExamplePlist = (newMesExample: string, index: number) => {
    let newMesExampleList = [] as string[];
    newMesExampleList = mesExampleList.map((item, index2) => {
      if (index === index2) {
        return newMesExample;
      }
      return item;
    });
    setMesExampleList(newMesExampleList);
    saveMesExample(newMesExampleList);
}

  return (
    <>
      <div
        onClick={() => {
          insertNewMesExamplePlist();
        }}
        className=" relative cursor-pointer text-xl border border-black border-solid rounded-[30px] w-full h-[236px] flex items-center justify-center bg-no-repeat bg-[bottom_0.5rem_right_1rem] bg-white bg-[url('/character-mesExample-add-first-bg.png')]">

        <div className=" absolute left-4 text-sm">
          <p>Tips：请按玩家、数字生命的顺序依次添加对话。</p> 
          <p>例如：</p>
          <p>{`{{user}}:你好`}</p>
          <p>{`{{char}}:我很好谢谢！`}</p>
        </div>
        <div className="shrink-0">
          添加对话示例
        </div>
      </div>


      {mesExampleList.map((item, index) =>{
        return (
        <div className="flex flex-row gap-4 mt-4" key={index}>
          <div
            className=" p-16 flex flex-col cursor-pointer text-xl bg-black rounded-[40px] w-full min-h-[300px] bg-no-repeat bg-right-bottom bg-cover bg-[url('/character-mesExample-list-item-bg.png')]"
          >
            <textarea
              ref={r => { (descTextareaRefs.current[index] as any) = r; }}
              placeholder="请在这里填写对话示例"
              value={item}
              onChange={e => {
                updateMesExamplePlist(e.target.value, index)
              }}
              className="border-none outline-none w-full h-full resize-none mb-6 bg-transparent text-white"
            />
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
                  const newMesExampleList = mesExampleList.filter((_, i) => i !== index);
                  setMesExampleList(newMesExampleList);
                  saveMesExample(newMesExampleList);
                }}
                size="sm"
                color="danger"
              >
                {t('Previews.mymindismadeup')}
              </Button>
            </PopoverContent>
          </Popover>

            <div className="w-full h-32 flex flex-col bg-[#D5D5D5] text-center rounded-xl text-[10px] cursor-pointer">
              <div
                onClick={() => {
                  insertTextAtCursor('{{user}}', index);
                }}
                className="h-1/2 rounded-xl leading-[64px] text-[#272727]"
              >插入玩家名称</div>
              <div
                onClick={() => {
                  insertTextAtCursor('{{char}}', index);
                }}
                className="h-1/2 rounded-xl leading-[64px] bg-black text-white"
              >
                插入数字生命名称
              </div>
            </div>
          </div> 
        </div>
      )})}


      <div className="flex justify-end mt-10 w-full">
        <Link href='/character/avatar'>
          <Image className="cursor-pointer" width={120} height={114} src="/character-nexttab.png" alt="" />
        </Link> 
      </div>
     
    </>
  );
}
