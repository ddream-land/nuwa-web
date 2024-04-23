"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Preview_BaseInfo from "./Preview_BaseInfo";
import Preview_PristMessage from "./Preview_FirstMessage";
import Preview_BaseContent from "./Preview_BaseContent";
import Preview_MesExample from "./Preview_MesExample";
import Preview_Avatar from "./Preview_Avatar";
import Preview_Voice from "./Preview_Voice";
import { TypeVoiceType } from "../../_lib/definitions.voice";
import Preview_AdvancedSet from "./Preview_AdvancedSet";
import Preview_WorldBook from "./Preview_WorldBook";
import { TypeChara } from "../../_lib/definitions";

function CharacterPreview({chara}: {chara: TypeChara}) {
  const t = useTranslations();

  const [selectedVoiceType, setSelectedVoiceType] = React.useState<TypeVoiceType>(chara.data.extensions.voice?.type as TypeVoiceType || TypeVoiceType.None);
  
  return (
  
    <div className="space-y-8 divide-y">
      <Preview_BaseInfo />
      <Preview_PristMessage />
      <Preview_BaseContent />
      {chara.data.mes_example && <Preview_MesExample />}
      {chara.data.extensions.avatars && chara.data.extensions.avatars.length > 0 && <Preview_Avatar />}
      {selectedVoiceType !== TypeVoiceType.None && <Preview_Voice />}
      <Preview_AdvancedSet />
      {chara.data.character_book && <Preview_WorldBook />}
      
    </div>
  );
}

export default CharacterPreview;
