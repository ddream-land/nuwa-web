"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

function Scenario_Scenario() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const descTextareaRef = useRef(null);

  const [scenarioValue, setScenarioValue] = React.useState(chara.data.scenario);

  const handleScenarioChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, scenario: newValue },
    }));
    setScenarioValue(newValue);
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
      data: { ...prevChara.data, scenario: newValue },
    }));
    setScenarioValue(newValue);
  };
 

  return (
    <div className="bg-[#333333] h-full w-full rounded-[40px] bg-[url('/character-scenario-bg1.png')] bg-no-repeat">
      <div className="flex flex-col h-full w-full py-12 px-7  rounded-[40px] bg-[url('/character-scenario-bg2.png')] bg-no-repeat bg-[bottom_right_-6rem]">
        <label
          className="text-white text-lg font-medium leading-8 mb-1"
        >
          {t('Character.scenario')}
        </label>
        <div className="flex flex-row items-end mt-10 grow">  
            <textarea
              ref={descTextareaRef}
              placeholder={`${t('Character.scenario')}`}
              value={chara.data.scenario}
              onChange={handleScenarioChange}
              className="mr-4 grow text-white border-none outline-none w-full h-full resize-none mb-6 bg-transparent"
            />
          <div className="shrink-0 w-32 h-32 flex flex-col bg-[#D5D5D5] text-center rounded-xl text-[10px] cursor-pointer">
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
              className="h-1/2 rounded-xl leading-[64px] bg-white text-black"
            >
              插入数字生命名称
            </div>
          </div>
        </div> 
      </div>    
    </div>
  );
}

export default Scenario_Scenario;
