"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import { md5 } from "js-md5"
import { setCookie } from 'typescript-cookie'
import { NUWASESSION, NUWAUID } from "../../utils/base.api";
import { login } from "../../utils/login.api";
import { InputClassNames } from "../InputStyle";
import { useAlterDispatch } from "../Alter/AlterContextProvider";
import { useLabels } from "../../context/LabelsContext";


export default function Login({
  gotoRegister,
  gotoResetPassword,
  onLogin,
}: {
  gotoRegister?: () => void,
  gotoResetPassword?: () => void,
  onLogin?: () => void;
}) {
  
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const alterDispatch = useAlterDispatch();
  const labels = useLabels();

  const FormSchema = z.object({
    email: z.string().email({ message: labels.UserFormSchema.email })
  });

  const loginApi = login();


  return (
    <div className="flex flex-row justify-center items-center h-full w-full">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-row justify-center items-center gap-2">
            <Image width={37} height={50} src="/registerIcon1.png" alt="" />
            <Image width={149} height={50} src="/registerIcon2.png" alt="" />
          </div>
          <div className="w-full text-center text-white text-2xl font-bold mb-8 mt-5">{labels.User.logintitle}</div>
          <div className="w-full text-center text-white text-sm font-normal]">{labels.User.logintitle2}</div>
          <Input
            color="default"
            type="email"
            size="md"
            classNames={InputClassNames}
            isInvalid={false}
            errorMessage=""
            placeholder={labels.User.email}
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
            placeholder={labels.User.password}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div>
            <div
              className="w-full text-blue-400 text-xs font-normal cursor-pointer"
              onClick={() => {
                gotoResetPassword && gotoResetPassword();
              }}
            >{labels.User.loginforgotpassword}</div>
            <div className="w-full mt-4">
              <span className="text-white text-xs font-normal mr-2">{labels.User.loginsignuptitle}</span>
              <span
                className="text-blue-400 text-xs font-normal cursor-pointer"
                onClick={() => {
                  gotoRegister && gotoRegister();
                }}
              >{labels.User.loginsignuplink}</span>
            </div>
          </div>
        </div>
        <Button
          color="default"
          size="lg"
          isDisabled={(!email || !password)}
          isLoading={loginApi.loading}
          className="w-full bg-zinc-800 rounded-2xl text-white"
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
                onLogin && onLogin();
              }
            } else {
              validatedFields.error.issues.map((item) => {
                alterDispatch({
                  type: "add",
                  payload: item.message,
                })
              })
            }
          }}
        >
          {labels.User.loginsubmit}
        </Button>
      </div>
    </div>
    
  );
}
