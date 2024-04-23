import React, { createRef, RefObject, useEffect, useRef } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Textarea, useDisclosure } from "@nextui-org/react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { trim } from "lodash-es";
import NuwaButton from "../components/NuwaButton";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "@/navigation";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { TrashIcon } from "@heroicons/react/24/outline";
const InsertUserOrChar = dynamic(() => import("../components/InsertUserOrChar"), { ssr: false })

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
            className="group relative p-10 flex flex-row items-end cursor-pointer text-xl bg-black rounded-[40px] w-full min-h-[300px] bg-no-repeat bg-right-bottom bg-cover bg-[url('/character-mesExample-list-item-bg.png')]"
          >
            <div className="mr-4 grow h-full">
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


            <Popover placement="top" color='warning'>
              <PopoverTrigger>
                <Button
                  className="absolute top-10 right-10 bg-white text-white opacity-0 group-hover:opacity-100"
                  startContent={<TrashIcon className="h-5 w-5 text-black"/>}
                  isIconOnly
                ></Button>
              </PopoverTrigger>
              <PopoverContent>
                <Button 
                  className="w-full" 
                  size="sm" 
                  color="warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newMesExampleList = mesExampleList.filter((_, i) => i !== index);
                    setMesExampleList(newMesExampleList);
                    saveMesExample(newMesExampleList);
                  }}
                >    
                  {t('Previews.mymindismadeup')}
                </Button>
              </PopoverContent>
            </Popover>

            <div className="opacity-0 group-hover:opacity-100">
              <InsertUserOrChar getTextRef={()=>{return descTextareaRefs.current[index] as any}} onDone={(newValue) => {
                updateMesExamplePlist(newValue, index);
              }} />
            </div>
            
          </div>
        </div>
      )})}


      {/* <div className="flex justify-end mt-10 w-full">
        <Link href='/character/avatar'>
          <Image className="cursor-pointer" width={120} height={114} src="/character-nexttab.png" alt="" />
        </Link> 
      </div> */}
     
    </>
  );
}
