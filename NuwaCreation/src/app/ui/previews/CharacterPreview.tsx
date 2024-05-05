"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Preview_BaseInfo from "./Preview_BaseInfo";
import Preview_PristMessage from "./Preview_FirstMessage";
import Preview_BaseContent from "./Preview_BaseContent";
import Preview_MesExample from "./Preview_MesExample";
import Preview_Avatar from "./Preview_Avatar";
import Preview_Voice from "./Preview_Voice";
import { TypeVoiceType } from "@/app/lib/definitions.voice";
import Preview_AdvancedSet from "./Preview_AdvancedSet";
import Preview_WorldBook from "./Preview_WorldBook";
import { TypeCharaListItem } from "@/app/lib/definitions";
import Preview_Plot from "./Preview_Plot";

function CharacterPreview({charaItem}: {charaItem: TypeCharaListItem}) {
  const t = useTranslations();
  const { chara } = charaItem;

  const [selectedVoiceType, setSelectedVoiceType] = React.useState<TypeVoiceType>(chara.data.extensions.voice?.type as TypeVoiceType || TypeVoiceType.None);
  
  return (
  
    <div className="space-y-20 px-4 sm:px-12 md:px-24 lg:px-38 xl:px-52 2xl:px-72">
      <Preview_BaseInfo charaItem={charaItem} />
      {(chara.data.first_mes.length + chara.data.alternate_greetings.length) > 0 &&  <Preview_PristMessage/>}
      {(chara.data.description || chara.data.personality) &&  <Preview_BaseContent/>}
      {chara.data.scenario &&  <Preview_Plot/>}
      {chara.data.character_book && <Preview_WorldBook worldBook={chara.data.character_book} />}
      {chara.data.mes_example && <Preview_MesExample />}
      {chara.data.extensions.avatars && chara.data.extensions.avatars.length > 0 && <Preview_Avatar />}
      {selectedVoiceType !== TypeVoiceType.None && <Preview_Voice />}
      <Preview_AdvancedSet />
      
    </div>
  );
}

export default CharacterPreview;
