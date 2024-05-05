"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import NuwaButton from "../components/NuwaButton";
import Me_Avatar from "./Me_Avatar";
import { Button, Input } from "@nextui-org/react";
import { EnvelopeIcon, LockClosedIcon, PowerIcon, UserIcon, WalletIcon } from "@heroicons/react/24/outline";
import { WalletModalProvider } from "@/app/solana/components/WalletModalProvider";
import WalletContextProvider from "@/app/solana/contexts/WalletContextProvider";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useEffect } from "react";
import { editUserInfo, getUserInfo } from "@/app/lib/user.api";
import { TypeUser } from "@/app/lib/definitions.user";
import { trim } from "lodash-es";
import { removeCookie } from 'typescript-cookie'
import { deleteLoginCookie, getIsLogin, NUWASESSION, NUWAUID } from "@/app/lib/base.api";
import { logout } from "@/app/login/utils/login.api";
const MintNFTButton = dynamic(() => import('@/app/solana/components/MintNFTButton'), { ssr: false })
const WalletMultiButton  = dynamic(() => import('@/app/solana/components/WalletMultiButton'), { ssr: false })

const styles = {
  item: "flex flex-row justify-between items-center h-20"
}

export default function Me() {
  const router = useRouter();
  const getUserInfoApi = getUserInfo()
  const editUserInfoApi = editUserInfo()
  const logoutApi = logout()

  const t = useTranslations();
  const [ usernameIsEdit, setUsernameIsEdit ] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [isInit, setIsInit] = useState(false);
  const [startInit, setStartInit] = useState(true);
  const [isSaving, setIsSaving] =  useState(false);
  const isLogin = getIsLogin();

  if (!isLogin) {
    router.push('/login')
  }

  const [userInfo, setUserInfo] = useState<TypeUser>({
    uid: '',
    username: '',
    email: '',
    wallet: '',
    avatar: ''
  });

  const setAvatar = (avatar: string) => {
    setUserInfo({
      ...userInfo,
      avatar: avatar
    })
  }

  const saveUserInfo = () => {
    setIsSaving(true)
    editUserInfoApi.send({
      uid: userInfo.uid,
      name: userInfo.username,
      avatar: userInfo.avatar
    }).then((res) => {
      setIsSaving(false)
    })
  }

  useEffect(() => {
    if (!isInit) {
      setIsInit(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      const res = await getUserInfoApi.send();
      if (res && res.code === 0) {
        setUserInfo({
          uid: res.data.uid,
          username: res.data.name,
          email: res.data.email,
          wallet: res.data.wallet,
          avatar: res.data.avatar
        } as TypeUser)
      }
      
      setIsInit(false);
      setStartInit(false)
    }
    if (isInit) {
      init();
    }
    
  }, [isInit])

  useEffect(() => {
    if (usernameIsEdit) {
      usernameRef.current?.focus();
    }
  }, [usernameIsEdit])

  return (
    <div className="px-4 md:px-10 lg:px-16 xl:px-36 relative min-h-[80vh]">
      <div className="absolute right-6 top-6">
        <Button
          isLoading={isSaving}
          isDisabled={startInit}
          className="bg-black text-white z-40"
          size="sm"
          onClick={() => {
            saveUserInfo();
          }}
        >{t('Me.savebtn')}</Button>
      </div>
      <div className="gap-8 flex flex-col sm:flex-row mb-20 pt-10">
        <div className="w-full sm:w-[200px]">
          <Me_Avatar avatar={userInfo.avatar} onChange={setAvatar} />
        </div>
        
        <div
          className="w-full sm:grow"
        >
          <div
            className="mb-16 w-full h-[30px] text-black text-3xl font-bold leading-[54px] tracking-tight"
          >
            {t('Me.title')}
          </div>
          <div className="grid grid-cols-1 divide-y">
            <div className={styles.item}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <UserIcon className={""} />
                </div>
                <div className="mr-10 opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.usename')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight flex flex-row">
                {!startInit ? (
                  <>
                    <Input
                      ref={usernameRef}
                      type="text"
                      size="sm"
                      variant="underlined"
                      placeholder={t('Me.usenametoken')}
                      className={`${usernameIsEdit ? "flex" : "hidden"}`}
                      value={userInfo.username}
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          username: trim(e.target.value)
                        })
                      }}
                      onBlur={() => {
                        setUsernameIsEdit(false);
                      }}
                    />
                      <div
                      className={`${!usernameIsEdit ? "block" : "hidden"}`}
                        onClick={() => {
                          setUsernameIsEdit(true);
                        }}
                      >{userInfo.username || t('Me.usenametoken')}</div>
                  </>
                ): (
                  <Button variant="light" isLoading />
                )}
                
              </div>
            </div>
            <div className={styles.item}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <EnvelopeIcon className={""} />
                </div>
                <div className="mr-10 opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.email')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                {!startInit ? (
                    <div>{userInfo.email}</div>
                ): (
                  <Button variant="light" isLoading />
                )}
              </div>
            </div>
            <div className={styles.item}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <WalletIcon className={""} />
                </div>
                <div className="mr-10 opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.web3wallet')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">

                <WalletContextProvider>
                  <WalletModalProvider>
                    <WalletMultiButton
                      size="sm"
                      shadowghost="black"
                      className="w-[140px]"
                    />
                  </WalletModalProvider>
                  {/* <MintNFTButton /> */}
                </WalletContextProvider>
              </div>
            </div>
            <div className={styles.item}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <LockClosedIcon className={""} />
                </div>
                <div className="mr-10 opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.updatepassword')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <NuwaButton
                  size="sm"
                  shadowghost="black"
                  className="w-[140px]"
                  onClick={() => {
                    router.push('/resetpassword')
                  }}
                >{t('Me.updatepasswordbtn')}</NuwaButton>
              </div>
            </div>
            <div className={styles.item}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <PowerIcon className={""} />
                </div>
                <div className="mr-10 opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.deleteaccount')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <NuwaButton
                  size="sm"
                  shadowghost="black"
                  className="w-[140px]"
                  onClick={() => {
                    router.push('/deleteuser')
                  }}
                >{t('Me.deleteaccountbtn')}</NuwaButton>
              </div>
            </div>
            <div className={styles.item}>
              <div></div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <NuwaButton
                  size="sm"
                  shadowghost="black"
                  className="w-[140px]"
                  onClick={() => {
                    logoutApi.send();
                    deleteLoginCookie();
                    router.replace('/');
                  }}
                >{t('Me.logoutbtn')}</NuwaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
