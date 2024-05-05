"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import { md5 } from "js-md5"
import { Link, usePathname, useRouter } from "@/navigation";
import { getCookie, setCookie } from 'typescript-cookie'
import { useAmDispatch } from "@/app/ui/components/AlterMessageContextProvider";
import { NUWASESSION, NUWAUID } from "@/app/lib/base.api";
import { login } from "../../utils/login.api";



const InputClassNames = {
  base: "w-full",
  input: [
    "text-white", 
    "bg-transparent",
    "group-data-[has-value=true]:text-white"
  ],
  innerWrapper: "bg-transparent",
  inputWrapper: [
    "rounded-2xl",
    "bg-zinc-800",
    "group-hover:bg-zinc-700",
    "focus-within:!bg-zinc-700/80",

  ]
}

export default function Login() {
  const t = useTranslations();
  const pathname = usePathname();
  let callbackUrl: string | null
  if (typeof window !== "undefined") {
    const params =  new URLSearchParams(window.location.search);
    callbackUrl = params.get('callbackUrl');
  }
  
  const router = useRouter();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const FormSchema = z.object({
    email: z.string().email({ message: t("UserFormSchema.email") }),
    password: z.string().min(6, { message: t("UserFormSchema.password") })
  });

  const loginApi = login();

  const amDispatch = useAmDispatch();

  return (
    <div className="flex flex-row justify-center items-center h-full w-full">
      <div className="w-[360px] flex flex-col gap-5">
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <Image width={37} height={50} src="/registerIcon1.png" alt="" />
          <Image width={149} height={50} src="/registerIcon2.png" alt="" />
        </div>
        <div className="w-full text-center text-white text-2xl font-bold mb-8 mt-5">{t("User.logintitle")}</div>
        <div className="w-full text-center text-white text-sm font-normal]">{t("User.logintitle2")}</div>
        <Input
          color="default"
          type="email"
          size="md"
          classNames={InputClassNames}
          isInvalid={false}
          errorMessage=""
          placeholder={t('User.email')}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          color="default"
          type="password"
          size="md"
          classNames={InputClassNames}
          placeholder={t('User.password')}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div>
          <Link href="/resetpassword" className="w-full text-blue-400 text-xs font-normal">{t("User.loginforgotpassword")}</Link>
          <div className="w-full mt-4">
            <span className="text-white text-xs font-normal">{t("User.loginsignuptitle")}</span>
            <Link href="/register" className="text-blue-400 text-xs font-normal cursor-pointer">{t("User.loginsignuplink")}</Link>
          </div>
        </div>
        
        <Button
          color="default"
          size="lg"
          isDisabled={(!email || !password)}
          isLoading={loginApi.loading}
          className="mt-10 w-full bg-zinc-800 rounded-2xl text-white"
          onClick={async () => {
            const validatedFields = FormSchema.safeParse({
              email: email,
              password: password
            });
            if (validatedFields.success) {
              const res = await loginApi.send({
                email: email,
                passwd: md5(password)
              });
              if (res && res && res.code === 0) {
                setCookie(NUWAUID, res.data.uid);
                setCookie(NUWASESSION, res.data.session);
                if (callbackUrl) {
                  window.location.href = callbackUrl;
                } else {
                  router.back();
                }
              }
            } else {
              validatedFields.error.issues.map((item) => {
                amDispatch({
                  type: "add",
                  payload: item.message,
                })
              })
            }
          }}
        >
          {t("User.loginsubmit")}
        </Button>
      </div>
    </div>
    
  );
}
