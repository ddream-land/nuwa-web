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
import NoData from "./NoData";

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
  const [firstInit, setFirstInit] = useState(true);
  const isLogin = getIsLogin();
  const getWorldBookAllApi = getWorldBookAll()
  const deleteWorldBookApi = deleteWorldBook2()

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLogin) {
      !isInit && setIsInit(true)
    } else {
      setFirstInit(false)
    }
  }, [])

  useEffect(() => {

    if (isInit && isLogin) {
      init();
    }
    
  }, [isInit])

  const init = async () => {
    const res = await getWorldBookAllApi.send();
    if (res && res.code === 0) {
      setWorldBookPublishList(res.data);
    }
    
    setIsInit(false);
    setFirstInit(false)
  }

  const deleteWorldBook = ({index}: {index: number}) => {
    const newWorldBookList = worldBookList.filter((_, i) => i !== index);
    pushWorldBookList(newWorldBookList);
    setWorldBookList(newWorldBookList);
  }

  return (
    <>
      <div className="relative bg-white h-full w-full pb-40 rounded-[40px] min-h-[80vh]">
        <div className="flex flex-row justify-end z-40 absolute right-0 top-0 mt-2">
          <WorldBookCreate
            onCreateDone={(newWorldBook) => {
              setWorldBookList(getWorldBookList());
              setEditWorldBook(newWorldBook);
            }} />
        </div>

        {(worldBookList.length !== 0) ? (
          <>
            <div className="text-black text-3xl font-semibold">{t("WorldBook.drafts")}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 3xl:grid-cols-4 gap-4 py-10 overflow-visible h-auto">
              {worldBookList.map((worldBookItem, index) => (
                <div key={`drafts-${worldBookItem.uid}`} className="w-auto h-[280px]">
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
          </>
        ) : (
          <>
            {!isLogin && (
              <NoData />
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
                {worldBookPublishList.length === 0 && worldBookList.length === 0 && (
                  <NoData />
                )}
              </>
            ) }

            {worldBookPublishList.length !== 0 && (
              <>
                <div className="text-black text-3xl font-semibold">{t("WorldBook.published")}</div>
                <div className="relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 3xl:grid-cols-4 gap-4 py-10 overflow-visible h-auto">
                      {worldBookPublishList.map((worldBookItem, index) => (
                        <div key={`publish-${worldBookItem.world.uid}`} className="w-auto h-[280px]">
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
                </div>
              </>
            )}

            
          </div>
        )}
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
