"use client";
import React from "react";
import { Button } from "@nextui-org/react";

function InsertUserOrChar({getTextRef, onDone}: {getTextRef: () => any, onDone: (value: string) => void}) {
  const insertTextAtCursor = (text: string) => {
    const textRef = getTextRef();
    const startPos = (textRef as any).selectionStart;
    const endPos = (textRef as any).selectionEnd;
    const value = (textRef as any).value;
    const textBefore = value.substring(0, startPos);
    const textAfter = value.substring(endPos, value.length);
    const newValue = textBefore + text + textAfter;

    (textRef as any).value = newValue;
    (textRef as any).selectionStart = startPos + text.length;
    (textRef as any).selectionEnd = startPos + text.length;

    (textRef as any).focus();
    onDone(newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="ghost"
        className="border w-36 h-14 text-[10px] font-normal rounded-[20px] justify-start bg-white"
        onClick={() => {
          insertTextAtCursor('{{user}}');
        }}
        startContent={ 
          <div className="rounded-full overflow-hidden w-6 h-6 cursor-pointer text-xl flex items-center justify-center bg-no-repeat bg-right-bottom bg-cover bg-[url('/character-mesExample-user-avator.png')]"></div>}
      >
          &nbsp;&nbsp;插入玩家名称&nbsp;&nbsp;
      </Button>
      <Button
        variant="ghost"
        className="border w-36 h-14 text-[10px] font-normal rounded-[20px] bg-white"
        onClick={() => {
          insertTextAtCursor('{{char}}');
        }}
        startContent={<div className="rounded-full overflow-hidden w-6 h-6 cursor-pointer text-xl flex items-center justify-center bg-no-repeat bg-right-bottom bg-cover bg-[url('/character-mesExample-char-avator.png')]"></div>}
      >
          插入数字生命名称
      </Button>
  </div>
  );
}

export default InsertUserOrChar;
