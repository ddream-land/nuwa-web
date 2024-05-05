"use client";
import React from "react";
import { useCharaListItem } from "@/app/contexts/CharasContextProvider";
import Preview from "../previews/Preview";

function CharacterPreview() {
  
  const charaListItem = useCharaListItem();
  
  return (
    <>
      <Preview charaItem={charaListItem} /> 
    </>
  );
}

export default CharacterPreview;
