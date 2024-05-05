"use client";
import React from "react";
import NuwaButton from "./NuwaButton";
import { useTranslations } from "next-intl";

function InsertUserOrChar({getTextRef, onDone}: {getTextRef: () => any, onDone: (value: string) => void}) {
  const t = useTranslations();
  
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
      <NuwaButton
        shadowghost="black"
        onPress={
          () => {
            insertTextAtCursor('{{char}}');
          }
        }
      >
        {t('Character.insertuserorcharuser')}
      </NuwaButton>
      <NuwaButton
        shadowghost="black"
        onPress={
          () => {
            insertTextAtCursor('{{user}}');
          }
        }
      >
        {t('Character.insertuserorcharchat')}
      </NuwaButton>
    </div>
  );
}

export default InsertUserOrChar;
