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
import NoData from "./NoData";


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
  const [firstInit, setFirstInit] = useState(true);
  const isLogin = getIsLogin();
  const getCharacterAllApi = getCharacterAll()
  const deleteCharacterApi = deleteCharacter()

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLogin) {
      !isInit && setIsInit(true)
    } else {
      setFirstInit(false)
    }
  }, [])

  useEffect(() => {
    if (isInit) {
      init();
    }
  }, [isInit])

  const init = async () => {
    const res = await getCharacterAllApi.send();
    if (res && res.code === 0) {
      setCharacterPublishList(res.data);
    }
    setFirstInit(false)
    setIsInit(false);
    return res;
  }

  const deleteChara = ({index}: {index: number}) => {
    const newCharaList = charaList.filter((_, i) => i !== index);
    pushCharaList(newCharaList);
    setCharaList(newCharaList);
  }


  return (
    <>
      <div className="relative bg-white h-full w-full pt-0 pb-40 rounded-[40px] flex flex-col justify-center min-h-[80vh]">
        <div className="flex flex-row justify-end z-40 absolute right-0 top-0 mt-2">
          <CharacterCreate
            onCreateDone={(newChara) => {
              setCharaList(getCharaList())
              setEditChara(newChara);
            }}
          />
        </div>

        {(charaList.length !== 0) ? (
          <>
            <div className="text-black text-3xl font-semibold">{t("Character.drafts")}</div>
            <div className="py-10 flex flex-wrap flex-row gap-4 min-h-[60vh]">
              {charaList.map((chara, index) => (
                <div className="w-[212px]" key={`drafts-${chara.uid}`}>
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
          </>
        ): (
          <>
            {!isLogin && (
              <>
              <NoData />
              </>
            )}
          </>
        )}
        
        {isLogin && (
          <div className="relative">
            {(firstInit || isLoading) ? (
              <div className="absolute left-0 top-0 w-full h-full min-h-[300px] flex justify-center items-center z-10 bg-gray-50/50">
                <CircularProgress size="md" aria-label="Loading..."/>
              </div>
            ) : (
              <>
                {characterPublishList.length === 0 && charaList.length === 0 && (
                  <>
                  <NoData />
                  </>
                )}
              </>
            )}

            {characterPublishList.length !== 0 && (
              <>
                <div className="text-black text-3xl font-semibold">{t("Character.published")}</div>
                <div className="py-10 flex flex-wrap flex-row gap-4 min-h-[60vh]">
                  {characterPublishList.map((characterItem, index) => (
                    <div key={`pulish-${characterItem.ai.uid}`} className="w-auto h-[280px]">
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
              </>
            )}

          </div>
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
