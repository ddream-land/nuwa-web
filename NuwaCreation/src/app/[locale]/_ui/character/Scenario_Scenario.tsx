"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import InsertUserOrChar from "../components/InsertUserOrChar";

function Scenario_Scenario() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const descTextareaRef = useRef(null);

  const [scenarioValue, setScenarioValue] = React.useState(chara.data.scenario);

  const handleScenarioChange = (newValue:string) => {
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
        <div className="flex flex-col items-end mt-10 grow">  
            <textarea
              ref={descTextareaRef}
              placeholder={`${t('Character.scenario')}`}
              value={chara.data.scenario}
              onChange={(e) => (handleScenarioChange(e.target.value))}
              className="grow text-white border-none outline-none w-full h-full resize-none mb-6 bg-transparent break-all"
            />
          <div className="shrink-0">
            <InsertUserOrChar getTextRef={() => {
              return descTextareaRef.current
            }} onDone={(newValue) => {
              handleScenarioChange(newValue);
            }} />
          </div>
        </div> 
      </div>    
    </div>
  );
}

export default Scenario_Scenario;
