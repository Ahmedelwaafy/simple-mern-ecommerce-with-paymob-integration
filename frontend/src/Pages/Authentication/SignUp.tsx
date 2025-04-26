import { CustomInput } from "@/components/FormComponents";
import Captcha from "@/components/FormComponents/Captcha";
import { HelmetTags, LangLink, Logo } from "@/components/MainComponents";
import { Button } from "@/components/ui/button";
import { routes } from "@/Constants/Routes";
import { usePostData } from "@/Hooks/useFetch";
import { SIGNUP } from "@/services/api/queries";
import { IUserData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signUpSchema, signUpType } from "./auth.schema";

export function Component() {
  const { t, i18n } = useTranslation("Register_Page");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const navigate = useNavigate();

  const captchaRef = useRef<ReCAPTCHA | null>(null);
  const schema = signUpSchema(t);

  const methods = useForm<signUpType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: sigUp, isPending } = usePostData<IUserData, signUpType>(
    SIGNUP,
    {
      onSuccess: () => {
        captchaRef?.current?.reset();
        methods.reset();
        navigate(`/${lang}${routes.signin}`);
      },
      onError: () => {
        captchaRef?.current?.reset();
      },
    }
  );
  const onSubmit = async (body: signUpType) => {
    try {
      //await captchaRef?.current?.executeAsync();
      sigUp({
        body,
      });
    } catch (error) {
      toast.error(
        "Cannot contact reCAPTCHA. Check your connection and try again."
      );
    }
  };

  return (
    <section className="flex flex-col min-h-screen">
      <HelmetTags
        title={t("tab.title")}
        description={t("tab.description")}
        canonical="login"
      />

      <div className="bg-accent text-white p-8  bg-[url(/assets/images/login-bg.png)] h-[30vh]">
        <Logo />
        <h1 className="text-2xl font-semibold mb-1 mt-8">{t("heading")}</h1>
        <p className="text-lg font-thin opacity-90">{t("welcome_msg")}</p>
      </div>
      <FormProvider {...methods}>
        <form
          method="post"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 flex-1 p-6 mt-5"
        >
          {/** Name  */}
          <CustomInput
            name="name"
            className="w-full"
            label={t("form.name.label")}
            placeholder={t("form.name.placeholder")}
          />{" "}
          {/**   Email */}
          <CustomInput
            type="email"
            name="email"
            className="w-full"
            label={t("form.email.label")}
            placeholder={t("form.email.placeholder")}
          />{" "}
          {/** Password  */}
          <CustomInput
            type="password"
            name="password"
            className="w-full"
            label={t("form.password.label")}
            placeholder={t("form.password.placeholder")}
          />
          <Captcha ref={captchaRef} lang={lang} />
          {/** Submit Button */}
          <Button
            disabled={!methods.formState.isValid || isPending}
            isPending={isPending}
            className="w-full rounded-full text-white bg-accent mt-auto"
          >
            {t("form.SubmitBtnComponent.value")}
          </Button>
          <div className="w-full flex justify-center items-center gap-1 text-sm ">
            {t("form__bottom.have_an_account")}
            <LangLink
              href={routes.signin}
              className=" text-base cursor-pointer text-accent font-medium hover:underline"
            >
              {t("form__bottom.Login")}
            </LangLink>
          </div>
        </form>{" "}
      </FormProvider>
    </section>
  );
}
