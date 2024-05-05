import { baseApiHander } from "@/app/lib/base.api";
import { useTranslations } from "next-intl";


const apiUrlList = {
  register: `/api/v1/user/registered`,
  mailCode: `/api/v1/user/mail_code`,
  login: `/api/v1/user/passwd_login`,
  logout: `/api/v1/user/logout`,
  resetPassword: `/api/v1/user/reset_passwd`,
  deleteUser: `/api/v1/user/delete`
}

export function mailCode() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.mailCode,
    successMsg: t("User.mailcodesuccess")
  })
}

export function register() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.register,
    successMsg: t("User.registersuccess")
  })
}

export function resetPassword() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.resetPassword,
    successMsg: t("User.resetpasswordsuccess")
  })
}

export function deleteUser() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.deleteUser,
    mustLogin: true,
    successMsg: t("User.deleteusersuccess")
  })
}

export function login() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.login
  })
}

export function logout() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.logout
  })
}