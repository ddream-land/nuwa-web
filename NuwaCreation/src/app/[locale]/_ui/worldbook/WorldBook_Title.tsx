"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import NuwaTextareaWrapper from "../components/NuwaTextareaWrapper";

function WorldBook_Title() {
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
 

  return (
    <NuwaTextareaWrapper
      label={t('WorldBook.titlememo')}
      textareaProps={{
        ref: descTextareaRef,
        placeholder: "Description",
        value: chara.data.description,
        onChange: handleDescriptionChange,
      }}
    >
    </NuwaTextareaWrapper>
  );
}

export default WorldBook_Title;
