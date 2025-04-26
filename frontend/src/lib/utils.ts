import { LocalizedField } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { getI18n } from "react-i18next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function avatarFallbackName(name: string) {
  return name
    ? name?.split(" ")?.length > 1
      ? name?.split(" ")?.[0]?.charAt(0) + name?.split(" ")?.[1]?.charAt(0)
      : name?.split(" ")?.[0]?.charAt(0) + name?.split(" ")?.[0]?.charAt(1)
    : "";
}

export function getLocalizedField(field: LocalizedField) {
  const locale = getI18n().language as keyof LocalizedField;
  return field?.[locale] || field?.en || "N/A";
}
