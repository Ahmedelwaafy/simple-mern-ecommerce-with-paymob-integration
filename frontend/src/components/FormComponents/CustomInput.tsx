"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { get } from "lodash";
import { Lock, Mail, User } from "lucide-react";
import { ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getI18n } from "react-i18next";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import FieldError from "./FieldError";

interface CustomInputProps extends IFormElementProps {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

function CustomInput({
  name,
  label = "",
  placeholder,
  required = true,
  ServerErrors,
  inputStyle,
  disabled = false,
  className,
  type = "text",
  icon,
  iconPosition = "right",
  classNameFn,
}: CustomInputProps) {
  const {
    register,
    formState: { errors, dirtyFields },
    watch,
  } = useFormContext();
  const [hide, setHide] = useState(false);

  const error =
    get(errors, name)?.message || // Correctly accesses nested errors like name.en
    ServerErrors?.response?.data?.errors?.[name]?.[0];

  const locale = getI18n().language;
  const dir = getI18n().dir(locale);

  const getInputPadding = () => {
    if (icon) {
      return iconPosition === "right" ? "pr-8" : "pl-8";
    }
    return "";
  };
  const formValues = watch();

  return (
    <Label
      className={cn(
        `w-full flex flex-col items-start rtl:items-end gap-1.5 `,
        label ? "min-h-[86px]" : "min-h-[56px]",
        className,
        dir === "rtl" && "items-end",
        classNameFn?.(formValues)
      )}
      htmlFor={name}
    >
      {label && (
        <h3
          className={cn(
            `text-foreground text-base font-medium flex rtl:flex-row-reverse items-center whitespace-nowrap  trns `,
            error && " text-destructive "
          )}
        >
          {type === "email" ? (
            <Mail className="h-[17px] mb-px" />
          ) : type === "password" ? (
            <Lock className="h-[14px] mb-[2px]" />
          ) : (
            <User className="h-[14px] mb-[2px]" />
          )}
          {label}
        </h3>
      )}
      <div className="w-full relative">
        <Input
          dir={dir}
          disabled={disabled}
          className={cn(
            `w-full h-input bg-muted px-3.5 rounded-lg text-base  placeholder:text-sm placeholder:font-normal rtl:placeholder:text-end placeholder:text-gray-400`,
            error &&
              "focus-visible:ring-destructive focus-visible:border-destructive border-destructive",
            getInputPadding(),
            inputStyle
          )}
          type={type === "password" ? (hide ? "text" : "password") : "text"}
          inputMode={type === "number" ? "numeric" : "text"}
          id={name}
          placeholder={placeholder}
          autoComplete="off"
          {...register(`${name}`, { valueAsNumber: type === "number" })}
        />

        {error && type !== "password" ? (
          <div
            className={cn(
              `absolute right-3 rtl:right-auto rtl:left-3 -translate-y-1/2 top-1/2 h-4 w-4  text-destructive`
            )}
          >
            <MdErrorOutline />
          </div>
        ) : type === "password" ? (
          <button
            disabled={disabled}
            type="button"
            onClick={() => setHide(!hide)}
            className={cn(
              `absolute right-3 rtl:right-auto rtl:left-3 -translate-y-1/2 top-1/2 h-4 w-4 cursor-pointer disabled:cursor-not-allowed`,
              error && "text-destructive"
            )}
          >
            {!hide ? <LuEyeOff /> : <LuEye />}
          </button>
        ) : icon ? (
          <div
            className={cn(
              `absolute -translate-y-1/2 top-1/2 h-4 w-4`,
              iconPosition === "right"
                ? "right-3 rtl:right-auto rtl:left-3"
                : "left-3 rtl:left-auto rtl:right-3"
            )}
          >
            {icon}
          </div>
        ) : null}
      </div>
      <FieldError error={error} />
    </Label>
  );
}

export default CustomInput;
