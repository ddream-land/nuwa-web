import { useLabels } from "../context/LabelsContext";
import { baseApiHander } from "./base.api";


const apiUrlList = {
  register: `/api/v1/user/registered`,
  mailCode: `/api/v1/user/mail_code`,
  login: `/api/v1/user/passwd_login`,
  logout: `/api/v1/user/logout`,
  resetPassword: `/api/v1/user/reset_passwd`,
  deleteUser: `/api/v1/user/delete`
}

export function mailCode() {
  const labels = useLabels();
  return baseApiHander({
    url: apiUrlList.mailCode,
    successMsg: labels.User.mailcodesuccess
  })
}

export function register() {
  const labels = useLabels();
  return baseApiHander({
    url: apiUrlList.register,
    successMsg: labels.User.registersuccess
  })
}

export function resetPassword() {
  const labels = useLabels();
  return baseApiHander({
    url: apiUrlList.resetPassword,
    successMsg: labels.User.resetpasswordsuccess
  })
}

export function deleteUser() {
  const labels = useLabels();
  return baseApiHander({
    url: apiUrlList.deleteUser,
    mustLogin: true,
    successMsg: labels.User.deleteusersuccess
  })
}

export function login() {
  return baseApiHander({
    url: apiUrlList.login
  })
}

export function logout() {
  return baseApiHander({
    url: apiUrlList.logout
  })
}