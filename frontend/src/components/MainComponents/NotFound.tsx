import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HelmetTags, LangLink } from ".";
import { Button } from "../ui/button";
//import img from "/assets/images/404-img.png";
export function Component() {
  const { t, i18n } = useTranslation("Pages_NotFound");

  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/${lang}`);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [lang, navigate]);

  return (
    <section className="flex-col flex items-center justify-center w-full min-h-[calc(100vh-180px)] py-10">
      <HelmetTags
        title={t("tab.title")}
        description={t("tab.description")}
        index={false}
      />
      <h2 className="text-4xl  font-semibold max-w-6xl mx-auto text-center text-balance ">
        {t("txt")}
      </h2>
      <img
        style={{ maxWidth: "600px" }}
        className="max-w-[500px] max-h-[500px] "
        src={"/assets/404-img.png"}
        alt="404-img"
        width={700}
        height={500}
      />
      <Button asChild>
        <LangLink className="mx-auto" href="">
          {t("CTA_txt")}
        </LangLink>
      </Button>
    </section>
  );
}
