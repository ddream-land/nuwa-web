
import { useTranslations } from "next-intl";
import { baseApiHander } from "./base.api";


const apiUrlList = {
  create: `/api/v1/world/create`,
  delete: `/api/v1/world/delete`,
  getAll: `/api/v1/world/get_all`
}

export function createWorldBook() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.create,
    mustLogin: true,
    successMsg: t("WorldBook.publishsuccess")
  })
}

export function deleteWorldBook() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.delete,
    mustLogin: true,
    successMsg: t("WorldBook.deletesuccess")
  })
}

export function getWorldBookAll() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.getAll,
    mustLogin: true
  })
}