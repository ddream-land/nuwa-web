import React, { createRef, RefObject, useRef } from "react";
import { Button, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import dynamic from 'next/dynamic';
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import { textareaProps } from "../components/NuwaTextarea";
import NuwaButton from "../components/NuwaButton";
const InsertUserOrChar = dynamic(() => import("../components/InsertUserOrChar"), { ssr: false })

export default function Mes_Example() {
  const descTextareaRefs = useRef<{ [key: string]: RefObject<HTMLElement> | null }>({});
  const t = useTranslations();
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();

  let initNewMesExampleList = charaListItem.chara.data.mes_example.split('<START>');
  initNewMesExampleList = initNewMesExampleList.filter((_, index: number) => {
    return index !== 0;
  })
  
  initNewMesExampleList.map((item, index)=> {
    descTextareaRefs.current[index] = createRef<HTMLElement>();
    return item;
  });
  const [mesExampleList, setMesExampleList] = React.useState(initNewMesExampleList);

  const setCharaListItem = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            mes_example: newValue,
          }
        }
      },
    })
  }

  const saveMesExample = (newMesExampleList: string[]) => {
    // 保存到chara
    setCharaListItem(mesExampleListToMesExample(newMesExampleList));

  }

  const mesExampleListToMesExample = (mesExampleList: string[]) => {
    const newMesExample = mesExampleList.map((item) => {
      return `<START>${item}`;
    }).join('');
    return newMesExample;
  }


  const insertNewMesExample = () => {
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
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-10 mb-20">
      {/* <div
        onClick={() => {
          insertNewMesExample();
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
      </div> */}
      <div className="sm:col-start-3 sm:col-end-9 grid gap-2">
        {mesExampleList.map((item, index) => (
          <div className="relative group" key={index}>
            <Textarea
              {...textareaProps as any}
              ref={r => { (descTextareaRefs.current[index] as any) = r; }}
              placeholder={t('Character.mesexampletoken')}
              value={item}
              onChange={e => {
                updateMesExamplePlist(e.target.value, index)
              }}
            />
            <div className="z-40 hidden group-hover:block absolute -top-16 right-0 pl-10 sm:top-auto sm:-right-44 sm:bottom-0 sm:pt-20">
              <Popover placement="top" color='danger'>
                <PopoverTrigger>
                  <NuwaButton
                    shadowghost="black"
                    className="mb-2 w-full hidden"
                  >
                    {t('Character.insertuserorchardelete')}
                  </NuwaButton>
                </PopoverTrigger>
                <PopoverContent>
                  <Button 
                    className="w-full font-semibold" 
                    size="sm" 
                    color="danger"
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
            <NuwaButton
              shadowghost="black"
              className="mb-2 w-full"
              onClick={(e) => {
                e.stopPropagation();
                const newMesExampleList = mesExampleList.filter((_, i) => i !== index);
                setMesExampleList(newMesExampleList);
                saveMesExample(newMesExampleList);
              }}
                >
                  {t('Character.insertuserorchardelete')}
            </NuwaButton>
                <InsertUserOrChar getTextRef={()=>{return descTextareaRefs.current[index] as any}} onDone={(newValue) => {
                  updateMesExamplePlist(newValue, index);
                }} />
            </div>
          </div>
        ))}
        <div className="flex flex-row-reverse mt-2">   
          <Button onClick={insertNewMesExample} variant="ghost" className="w-full h-20 border-dashed border border-zinc-800"><PlusIcon className="h-32 w-32 text-black"/></Button>  
        </div>   
      </div>
    </div>
  );
}
