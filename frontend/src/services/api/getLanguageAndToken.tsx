import Cookies from "js-cookie";

export const getLanguageAndToken = async () => {
  return {
    lang: Cookies.get("i18next") || "en",
    token: Cookies.get("Auth-State") || "",
  };
};
