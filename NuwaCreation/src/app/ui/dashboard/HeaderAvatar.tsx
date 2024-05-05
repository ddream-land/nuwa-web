'use client'
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TypeUser } from "../../lib/definitions.user";
import { getUserInfo } from "../../lib/user.api";
import { getIsLogin } from "@/app/lib/base.api";

export default function HeaderAvatar() {
  const getUserInfoApi = getUserInfo()
  const [isInit, setIsInit] = useState(false);
  const [userInfo, setUserInfo] = useState<TypeUser>({
    uid: '',
    username: '',
    email: '',
    wallet: '',
    avatar: ''
  });

  const isLogin = getIsLogin();

  useEffect(() => {
    if (!isInit) {
      setIsInit(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      if (isLogin) {
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
        
      }
      setIsInit(false);
    }
    if (isInit) {
      init();
    }
    
  }, [isInit])
  
  return (
    <Link href="/me" className="w-10 h-10 bg-zinc-800 rounded-full mx-10">
      <Avatar src={userInfo.avatar} alt="avatar" className="h-full w-full" />
    </Link>
  )
}
