"use client"

import React, { useEffect, useState } from "react";
import { getWorldBookList, pushWorldBookList } from "@/app/lib/utils";
import { useTranslations } from "next-intl";
import WorldBookEdit from "./WorldBookEdit";
import { TypeWorldBook, TypeWorldBookItem, TypeWorldBookList } from "@/app/lib/definitions";
import WorldBookCreate from "./WorldBookCreate";
import WorldBookOperateWrapper from "./WorldBookOperateWrapper";
import { getIsLogin } from "@/app/lib/base.api";
import { getWorldBookAll, deleteWorldBook as deleteWorldBook2 } from "@/app/lib/worldbook.api";
import { CircularProgress } from "@nextui-org/react";

export default function WorldBookList() {
  const t = useTranslations();

  const initWorldBookList = getWorldBookList();
  const [ worldBookList, setWorldBookList ] = useState<TypeWorldBookList>(initWorldBookList);
  const [ worldBookPublishList, setWorldBookPublishList ] = useState<{
    world: {
      data: TypeWorldBook,
      uid: string,
    }
  }[]>([]);
  const [ editWorldBook, setEditWorldBook ] = useState<TypeWorldBookItem>();

  const [isInit, setIsInit] = useState(false);
  const [startInit, setStartInit] = useState(true);
  const isLogin = getIsLogin();
  const getWorldBookAllApi = getWorldBookAll()
  const deleteWorldBookApi = deleteWorldBook2()

  const [isLoading, setIsLoading] = useState(false);

  if (isLogin) {

    useEffect(() => {
      if (!isInit) {
        setIsInit(true)
      }
    }, [])

    useEffect(() => {
      const init = async () => {
        const res = await getWorldBookAllApi.send();
        if (res && res.code === 0) {
          setWorldBookPublishList(res.data);
        }
        
        setIsInit(false);
        setStartInit(false)
      }
      if (isInit) {
        init();
      }
      
    }, [isInit])
  
  }

  const deleteWorldBook = ({index}: {index: number}) => {
    const newWorldBookList = worldBookList.filter((_, i) => i !== index);
    pushWorldBookList(newWorldBookList);
    setWorldBookList(newWorldBookList);
  }

  return (
    <>
      <div className="relative bg-white h-full w-full pb-40 rounded-[40px] min-h-[80vh]">
        <div className="flex flex-row justify-end mt-2 z-40 mr-8">
          <WorldBookCreate
            onCreateDone={(newWorldBook) => {
              setWorldBookList(getWorldBookList());
              setEditWorldBook(newWorldBook);
            }} />
        </div>

        <div>
          <div className="text-black text-3xl font-semibold">{t("WorldBook.drafts")}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 3xl:grid-cols-4 gap-4 py-10 overflow-visible h-auto">
            {worldBookList.map((worldBookItem, index) => (
              <div key={worldBookItem.uid} className="w-auto h-[280px]">
                <WorldBookOperateWrapper
                  worldBookItem={worldBookItem.worldBook}
                  onEdit={() => {
                    setEditWorldBook(worldBookItem);
                  }}
                  onDelete={() => {
                    deleteWorldBook({index})
                  }}
                />
              </div>
            ))}
          </div>
          {isLogin && (
            <>
              <div className="text-black text-3xl font-semibold">{t("WorldBook.published")}</div>
              {(startInit || isLoading) ? (
                <div className="w-full h-[300px] flex justify-center items-center">
                  <CircularProgress size="md" aria-label="Loading..."/>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 3xl:grid-cols-4 gap-4 py-10 overflow-visible h-auto">
                  {worldBookPublishList.map((worldBookItem, index) => (
                    <div key={worldBookItem.world.uid} className="w-auto h-[280px]">
                      <WorldBookOperateWrapper
                        worldBookItem={worldBookItem.world.data}
                        onDelete={async () => {
                          setIsLoading(true);
                          const res = await deleteWorldBookApi.send({
                            uid: worldBookItem.world.uid,
                          })
                          if (res && res.code === 0) {
                            const res2 = await getWorldBookAllApi.send();
                            if (res2 && res2.code === 0) {
                              setWorldBookPublishList(res2.data);
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
        </div>
      </div>

      <WorldBookEdit
        worldBook={editWorldBook}
        onDone={() => {
          setEditWorldBook(undefined);
          setWorldBookList(getWorldBookList());
        }}
        onPublish={async () => {
          setIsLoading(true);
          const res = await getWorldBookAllApi.send();
          if (res && res.code === 0) {
            setWorldBookPublishList(res.data);
          }
          setIsLoading(false);
        }}
      />
    </>
  );
}
