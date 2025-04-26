import { setUserSession } from "@/app/Features/AuthenticationSlice";
import { useAppDispatch } from "@/app/reduxHooks";
import { CustomInput } from "@/components/FormComponents";
import Captcha from "@/components/FormComponents/Captcha";
import { HelmetTags, LangLink, Logo } from "@/components/MainComponents";
import { Button } from "@/components/ui/button";
import { routes } from "@/Constants/Routes";
import { usePostData } from "@/Hooks/useFetch";
import { GET_CART, SIGNIN } from "@/services/api/queries";
import { IUserData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signInSchema, signInType } from "./auth.schema";

export function Component() {
  const { t, i18n } = useTranslation("Pages_Login");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const dispatchRedux = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const schema = signInSchema(t);
  const methods = useForm<signInType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: sigIn, isPending } = usePostData<IUserData, signInType>(
    SIGNIN,
    {
      onSuccess: () => {
        captchaRef?.current?.reset();
        Cookies.set("Auth-State", "true");
        dispatchRedux(setUserSession("true"));
        queryClient.clear();
        methods.reset();
        navigate(`/${lang}`);
      },
      onError: () => {
        captchaRef?.current?.reset();
      },
    }
  );

  const onSubmit = async (body: signInType) => {
    try {
      console.log(body);
      //await captchaRef?.current?.executeAsync();
      sigIn({
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
        <h1 className="text-2xl font-semibold mb-1 mt-8">
          {t("LoginForm.heading")}
        </h1>
        <p className="text-lg font-thin opacity-90">
          {t("LoginForm.welcome_msg")}
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          method="post"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 flex-1 p-6 mt-5"
        >
          {/** Email  */}
          <CustomInput
            type="email"
            name="email"
            label={t("LoginForm.email.label")}
            placeholder={t("LoginForm.email.placeholder")}
          />{" "}
          {/** Password  */}
          <CustomInput
            type="password"
            name="password"
            label={t("LoginForm.password.label")}
            placeholder={t("LoginForm.password.placeholder")}
          />
          <Captcha ref={captchaRef} lang={lang} />
          {/** Submit Button */}
          <Button
            disabled={!methods.formState.isValid || isPending}
            isPending={isPending}
            className="w-full rounded-full text-white bg-accent mt-auto"
          >
            {t("LoginForm.SubmitBtnComponent.value")}
          </Button>
          <div className="w-full flex justify-center items-center gap-1 text-sm  ">
            {t("LoginForm.have_no_account")}
            <LangLink
              href={routes.signup}
              className=" text-base cursor-pointer text-accent font-medium hover:underline"
            >
              {t("LoginForm.register")}{" "}
            </LangLink>
          </div>
        </form>{" "}
      </FormProvider>{" "}
    </section>
  );
}
