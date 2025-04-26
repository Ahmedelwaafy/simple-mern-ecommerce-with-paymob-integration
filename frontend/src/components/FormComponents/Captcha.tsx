import { forwardRef, Ref } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type CaptchaProps = {
  lang: string;
};

const Captcha = forwardRef(function Captcha(
  { lang }: CaptchaProps,
  ref: Ref<ReCAPTCHA>
) {
  return (
    <div>
      <ReCAPTCHA
        badge="bottomright"
        hl={lang}
        size="invisible"
        ref={ref}
        sitekey={(import.meta.env.VITE_RECAPTCHA_KEY as string) || ""}
      />{" "}
    </div>
  );
});

export default Captcha;
