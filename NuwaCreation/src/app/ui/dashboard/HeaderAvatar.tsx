'use client'
import { useRouter } from "@/navigation";
import { Avatar } from "@nextui-org/react";
import { useUser } from "@/app/contexts/UserContextProvider";
import { getIsLogin } from "@/app/lib/base.api";
import LoginModal from "@/app/nuwa-login-ui/components/LoginModal";
import { useState } from "react";
import { useLocale } from "next-intl";

export default function HeaderAvatar() {
  const router = useRouter();
  const locale = useLocale();

  const user = useUser();
  const isLogin = getIsLogin();
  const [isOpen, setIsOpen] = useState(false);
  
  const gotoMePage = () => {
    router.push('/me');
  }
  return (
    <>
      <div onClick={() => {
        if (isLogin) {
          gotoMePage()
        } else {
          setIsOpen(true);
        }
      }} className="w-10 h-10 bg-zinc-800 rounded-full mx-10">
        <Avatar src={user?.avatar} alt="avatar" className="h-full w-full" />
      </div>
      <LoginModal
        isOpen={isOpen}
        locale={locale}
        onClose={() => {
          setIsOpen(false);
        }}
        onLogin={() => {
          setIsOpen(false);
          gotoMePage()
        }}
      />
    </>
    
  )
}
