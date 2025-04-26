"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { useController, useFormContext } from "react-hook-form";
import FieldError from "./FieldError";
import { getI18n } from "react-i18next";

function CustomSelect({
  name,
  label = "",
  placeholder,
  required = true,
  ServerErrors,
  disabled = false,
  className,
  options,
  ControlledValue,
  onControlledValueChange,
}: IFormElementProps) {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
  });
  const error =
    ServerErrors?.response?.data?.errors?.[name]?.[0] || fieldError?.message;

  const IsControlled = ControlledValue !== undefined && onControlledValueChange;

  const locale = getI18n().language;
  const dir = getI18n().dir(locale);

  return (
    <div
      className={cn(
        `w-full flex flex-col rtl:items-end items-start gap-1.5 bg- red-300`,
        IsControlled ? "min-h-fit" : label ? "min-h-fit" : "min-h-[56px]",
        className,
        dir === "rtl" && "items-end"
      )}
    >
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            `text-sm text-secondary-700 font-medium flex rtl:flex-row-reverse items-center gap-0.5 whitespace-nowrap  trns `,
            error && " text-destructive "
          )}
        >
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}{" "}
      <div className="w-full relative">
        <Select
          onValueChange={IsControlled ? onControlledValueChange : onChange}
          //defaultValue={value}
          value={String(IsControlled ? ControlledValue : value ?? "")}
          disabled={disabled}
          dir={dir}
        >
          <SelectTrigger
            className={cn(
              "",
              error &&
                " focus-visible:ring-destructive focus:ring-destructive ring-1 ring-destructive  border-destructive",
              ControlledValue || value ? "" : "text-placeholder"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FieldError error={error} />
    </div>
  );
}

export default CustomSelect;
