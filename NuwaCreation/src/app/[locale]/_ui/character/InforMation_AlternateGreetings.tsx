"use client";
import React, { RefObject, useRef, useState } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import InsertUserOrChar from "../components/InsertUserOrChar";

function InforMation_AlternateGreetings() {
  const descTextareaRefs = useRef<{ [key: string]: RefObject<HTMLElement> | null }>({});
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const [deleteCount, setDeleteCount] = useState(1);

  const updateAlternateGreetings = (newValue: string, index: number) => {
    setChara(prev => ({
      ...prev,
      data: {
        ...prev.data, 
        alternate_greetings: prev.data.alternate_greetings.map((greet, i) => 
          i === index ? newValue : greet  
        )
      }
    }))
  }

  const handleAddGreetingsClick = () => {
    
    setChara(prev => ({
      ...prev,
      data: {
        ...prev.data,
        alternate_greetings: [
          ...prev.data.alternate_greetings,
          `New Greetings`  
        ]
      }
    }));
  };

  return (
      <div>
        {chara.data.alternate_greetings.map((item, index) => (
          <div className="group relative flex flex-col grow mt-6" key={deleteCount + index}>
            <div className="py-4 flex flex-col bg-white h-52 rounded-[40px] p-7">
              <label
                className="block text-lg font-medium leading-8 mb-1"
              >
                {t('Character.firstmessage')}{index + 1}*
              </label>
              <div className="flex flex-row items-end mt-2 grow shrink">  
                <div className="mr-4 grow h-full">
                  <textarea
                    ref={r => { (descTextareaRefs.current[index] as any) = r; }}
                    placeholder=''
                    value={item}
                    onChange={e => {
                      updateAlternateGreetings(e.target.value, index)
                    }}
                    className="border-none h-full outline-none w-full resize-none mb-6 break-all"
                  />
                </div>
                <Popover placement="top" color='warning'>
                  <PopoverTrigger>
                    <Button
                      className=" absolute top-4 right-4 bg-black text-white opacity-0 group-hover:opacity-100"
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
                        setChara(prev => ({
                          ...prev,
                          data: {
                            ...prev.data,
                            alternate_greetings: prev.data.alternate_greetings.filter((_, i) => i !== index)  
                          }
                        }))
                        setDeleteCount(deleteCount + 1);
                      }}
                    >    
                      {t('Previews.mymindismadeup')}
                    </Button>
                  </PopoverContent>
                </Popover>

                <div className="opacity-0 group-hover:opacity-100">
                  <InsertUserOrChar getTextRef={()=>{return descTextareaRefs.current[index] as any}} onDone={(newValue) => {
                    updateAlternateGreetings(newValue, index);
                  }} />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex flex-row-reverse mt-2">
          <Button onClick={handleAddGreetingsClick} variant="light" className="w-[200px]" endContent={<PlusIcon className="h-4 w-4 text-black"/>}>增加额外首条消息</Button> 
        </div>   
      </div>
  );
}

export default InforMation_AlternateGreetings;
