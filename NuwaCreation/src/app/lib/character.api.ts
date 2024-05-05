
import { useTranslations } from "next-intl";
import { baseApiHander } from "./base.api";


const apiUrlList = {
  create: `/api/v1/ai/create`,
  delete: `/api/v1/ai/delete`,
  getAll: `/api/v1/ai/get_all`,
  getInfo: `/api/v1/ai/get_info`
}

export function publishCharacter() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.create,
    mustLogin: true,
    successMsg: t("Character.publishsuccess")
  })
}

export function deleteCharacter() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.delete,
    mustLogin: true,
    successMsg: t("Character.deletesuccess")
  })
}

export function getCharacterAll() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.getAll,
    mustLogin: true,
  })
}

export function getCharacterInfo() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.getInfo,
    mustLogin: true,
  })
}