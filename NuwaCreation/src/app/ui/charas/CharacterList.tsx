"use client"

import React, { useEffect, useState } from "react";
import { getCharaList, pushCharaList } from "@/app/lib/utils";
import { useTranslations } from "next-intl";
import CharacterCreate from "./CharacterCreate";
import { TypeCharaList, TypeCharaListItem } from "@/app/lib/definitions";
import CharacterEdit from "./CharacterEdit";
import CharacterListItem from "./CharacterListItem";
import { getIsLogin } from "@/app/lib/base.api";
import { deleteCharacter, getCharacterAll } from "@/app/lib/character.api";
import { CircularProgress } from "@nextui-org/react";


export default function CharacterList() {
  const t = useTranslations();
  let initCharaList = getCharaList();
  const [charaList, setCharaList] = useState<TypeCharaList>(initCharaList);
  const [ editChara, setEditChara ] = useState<TypeCharaListItem>();


  const [ characterPublishList, setCharacterPublishList ] = useState<{
    uid: string,
    ai: {
      uid: string,
      cover: string,
      cover_url: string,
      chara: any,
    }
  }[]>([]);
  const [isInit, setIsInit] = useState(false);
  const [startInit, setStartInit] = useState(true);
  const isLogin = getIsLogin();
  const getCharacterAllApi = getCharacterAll()
  const deleteCharacterApi = deleteCharacter()

  const [isLoading, setIsLoading] = useState(false);

  if (isLogin) {

    useEffect(() => {
      if (!isInit) {
        setIsInit(true)
      }
    }, [])

    useEffect(() => {
      const init = async () => {
        const res = await getCharacterAllApi.send();
        if (res && res.code === 0) {
          setCharacterPublishList(res.data);
        }
        
        setIsInit(false);
        setStartInit(false)
      }
      if (isInit) {
        init();
      }
      
    }, [isInit])
  
  }

  const deleteChara = ({index}: {index: number}) => {
    const newCharaList = charaList.filter((_, i) => i !== index);
    pushCharaList(newCharaList);
    setCharaList(newCharaList);
  }


  return (
    <>
      <div className="relative bg-white h-full w-full pt-0 pb-40 rounded-[40px] flex flex-col justify-center">
        <div className="flex flex-row justify-end mt-2 z-4 mb-8">
          <CharacterCreate
            onCreateDone={(newChara) => {
              setCharaList(getCharaList())
              setEditChara(newChara);
            }}
          />
        </div>
        <div className="text-black text-3xl font-semibold">{t("Character.drafts")}</div>
        <div className="py-10 flex flex-wrap flex-row gap-4 min-h-[60vh]">
          {charaList.map((chara, index) => (
            <div className="w-[212px]" key={chara.uid}>
              <CharacterListItem
                chara={chara}
                onEdit={() => {
                  setEditChara(chara);
                }}
                onDelete={() => {
                  deleteChara({index})
                }} />
            </div>
          ))}
        </div>
          {isLogin && (
            <>
              <div className="text-black text-3xl font-semibold">{t("Character.published")}</div>
              {(startInit || isLoading) ? (
                <div className="w-full h-[300px] flex justify-center items-center">
                  <CircularProgress size="md" aria-label="Loading..."/>
                </div>
              ) : (
                <div className="py-10 flex flex-wrap flex-row gap-4 min-h-[60vh]">
                  {characterPublishList.map((characterItem, index) => (
                    <div key={characterItem.uid} className="w-auto h-[280px]">
                      <CharacterListItem
                        chara={characterItem.ai}
                        isPublished={true}
                        onDelete={async () => {
                          setIsLoading(true);
                          const res = await deleteCharacterApi.send({
                            uid: characterItem.ai.uid,
                          })
                          if (res && res.code === 0) {
                            const res2 = await getCharacterAllApi.send();
                            if (res2 && res2.code === 0) {
                              setCharacterPublishList(res2.data);
                            }
                          }
                          setIsLoading(false);
                          return res;
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        <CharacterEdit
          chara={editChara}
          onDone={() => {
            setEditChara(undefined);
            setCharaList(getCharaList());
          }}
          onPublish={async () => {
            setIsLoading(true);
            const res = await getCharacterAllApi.send();
            if (res && res.code === 0) {
              setCharacterPublishList(res.data);
            }
            setIsLoading(false);
          }}
        />
      </div>
    </>
  );
}
