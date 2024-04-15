"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

function InforMation_Description() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const descTextareaRef = useRef(null);

  const [descriptionValue, setDescriptionValue] = React.useState(chara.data.description);

  const handleDescriptionChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, description: newValue },
    }));
    setDescriptionValue(newValue);
  };


  const insertTextAtCursor = (text: string) => {
    const startPos = (descTextareaRef.current as any).selectionStart;
    const endPos = (descTextareaRef.current as any).selectionEnd;
    const value = (descTextareaRef.current as any).value;
    const textBefore = value.substring(0, startPos);
    const textAfter = value.substring(endPos, value.length);
    const newValue = textBefore + text + textAfter;

    (descTextareaRef.current as any).value = newValue;
    (descTextareaRef.current as any).selectionStart = startPos + text.length;
    (descTextareaRef.current as any).selectionEnd = startPos + text.length;

    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, description: newValue },
    }));
    setDescriptionValue(newValue);
  };
 

  return (
    <div className="h-6/12 py-4 flex flex-col">
      <label
        className="block text-lg font-medium leading-8 mb-1"
      >
        {t('Character.description')}
      </label>
      <div className="flex flex-row mt-2 grow">  
        <div className="mr-4 grow">
          <textarea
            ref={descTextareaRef}
            placeholder="Description"
            value={chara.data.description}
            onChange={handleDescriptionChange}
            className="border-none outline-none w-full h-full resize-none mb-6"
          />
        </div>
        <div className="w-32 h-32 flex flex-col bg-[#D5D5D5] text-center rounded-xl text-[10px] cursor-pointer">
          <div
            onClick={() => {
              insertTextAtCursor('{{user}}');
            }}
            className="h-1/2 rounded-xl leading-[64px] text-[#272727]"
          >插入玩家名称</div>
          <div
            onClick={() => {
              insertTextAtCursor('{{char}}');
            }}
            className="h-1/2 rounded-xl leading-[64px] bg-black text-white"
          >
            插入数字生命名称
          </div>
        </div>
      </div>     
    </div>
  );
}

export default InforMation_Description;
