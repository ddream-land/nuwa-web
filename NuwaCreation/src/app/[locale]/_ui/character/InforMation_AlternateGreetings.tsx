"use client";
import React, { useState } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function InforMation_AlternateGreetings() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const [deleteCount, setDeleteCount] = useState(1);

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
          <div className="flex flex-col grow mt-6" key={deleteCount + index}>
            <div className="py-4 flex flex-col bg-white h-32 rounded-[40px] p-7">
              <label
                className="block text-lg font-medium leading-8 mb-1"
              >
                {t('Character.firstmessage')}{index + 1}*
              </label>
              <div className="flex flex-row mt-2 grow shrink">  
                <div className="mr-4 grow">
                  <textarea
                    placeholder=''
                    value={item}
                    onChange={e => {
                      setChara(prev => ({
                        ...prev,
                        data: {
                          ...prev.data, 
                          alternate_greetings: prev.data.alternate_greetings.map((greet, i) => 
                            i === index ? e.target.value : greet  
                          )
                        }
                      }))
                    }}
                    className="border-none outline-none w-full resize-none mb-6"
                  />
                </div>
                <Popover placement="top" color='warning'>
                  <PopoverTrigger>
                    <Button className="bg-black text-white">{t('Greetings.deletegreetings')}</Button>
                    {/* <div className="w-32 h-12 flex flex-col text-center rounded-xl text-[10px] cursor-pointer">
                      <div
                        className="h-full rounded-xl leading-[48px] bg-black text-white"
                      >
                        {t('Greetings.deletegreetings')}
                      </div>
                    </div> */}
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <Popover placement="top" color='warning'>
                        <PopoverTrigger>
                          <Button size="sm" color="warning">
                            {t('Greetings.thisoperationcannotbewithdrawn')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Popover placement="top" color='danger'>
                            <PopoverTrigger>
                              <Button size="sm" color="warning">
                                {t('Previews.mymindismadeup')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                            <Button 
                              className="w-full" 
                              size="sm" 
                              color="danger"
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
                              Delete
                            </Button>
                            </PopoverContent>
                          </Popover>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex flex-row-reverse">
          <Button onClick={handleAddGreetingsClick} variant="light" className="w-[200px]" endContent={<PlusIcon className="h-4 w-4 text-black"/>}>增加额外首条消息</Button> 
        </div>   
      </div>
  );
}

export default InforMation_AlternateGreetings;
