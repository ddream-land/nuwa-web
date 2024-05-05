"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import { md5 } from "js-md5"
import { useRouter } from "@/navigation";
import { deleteLoginCookie } from "@/app/lib/base.api";
import { deleteUser, mailCode } from "../../utils/login.api";
import { useAmDispatch } from "@/app/ui/components/AlterMessageContextProvider";


const CountLimit = 60;

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

export default function DeleteUser() {
  const t = useTranslations();
  const router = useRouter();
  const [ email, setEmail ] = useState('');
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ requestId, setRequestId] = useState('');
  const [ count, setCount ] = useState(CountLimit);

  const mailCodeApi = mailCode();
  const deleteUserApi = deleteUser();
  const amDispatch = useAmDispatch();

  const FormSchema = z.object({
    email: z.string().email({ message: t("UserFormSchema.email") }),
    code: z.string().length(5, { message: t("UserFormSchema.code") }),
    password: z.string().min(6, { message: t("UserFormSchema.password") }),
    requestId: z.string()
  });

  useEffect(() => {
    if (count === CountLimit) {
      return;
    }
    if (count === 0) {
      setCount(CountLimit)
    } else {
      setTimeout(() => {
        setCount(count - 1)
      }, 1000)
    }
  }, [count])

  return (
    <div className="flex flex-row justify-center items-center h-full w-full">
      <div className="w-[360px] flex flex-col gap-5">
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <Image width={37} height={50} src="/registerIcon1.png" alt="" />
          <Image width={149} height={50} src="/registerIcon2.png" alt="" />
        </div>
        <div className="w-full text-center text-white text-2xl font-bold mb-8 mt-5">{t("User.deleteusertitle")}</div>
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
          endContent={
          <Button
            variant="solid"
            className="text-white bg-transparent"
            color="default"
            isLoading={mailCodeApi.loading}
            isDisabled={count !== CountLimit}
            onClick={async () => {
              const res = await mailCodeApi.send({email: email});
              if (res && res.code === 0) {
                setRequestId(res.data.request_id)
                setCount(CountLimit - 1)
              }
            }}
          >
            {(count !== CountLimit) ? `${count}s` : t("User.deleteusersend")}
          </Button>
          }
        />
        <Input
          color="default"
          type="text"
          size="md"
          classNames={InputClassNames}
          placeholder={t('User.code')}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
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
        <Button
          color="default"
          size="lg"
          isDisabled={(!code || !email || !password)}
          isLoading={deleteUserApi.loading}
          className="mt-16 w-full bg-zinc-800 rounded-2xl text-white"
          onClick={async () => {
            const validatedFields = FormSchema.safeParse({
              email: email,
              code: code,
              password: password,
              requestId: requestId,
            });


            if (validatedFields.success) {
              const res = await deleteUserApi.send({
                email: email,
                code: code,
                passwd: md5(password),
                request_id: requestId,
              });
              if (res && res.code === 0) {
                deleteLoginCookie();
                router.replace("/");
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
          {t("User.deleteusersubmit")}
        </Button>
      </div>
    </div>
    
  );
}
