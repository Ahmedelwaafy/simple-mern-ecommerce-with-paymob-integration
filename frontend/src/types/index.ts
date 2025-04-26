import { FieldValues } from "react-hook-form";
export * from "./api";
export * from "./items";
export * from "./category";
export * from "./order";

export interface IFormElementProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  ServerErrors?: any;
  inputStyle?: string;
  disabled?: boolean;
  className?: string;
  className2?: string;
  className3?: string;
  classNameFn?: (formValues: FieldValues) => string;
  horizontal?: boolean;
  type?: string;
  rows?: number;
  options?: {
    label: string;
    value: string;
  }[];
  ControlledValue?: string;
  onControlledValueChange?: (value: string) => void;
}

export interface IUserData {
  _id: number;
  name: string;
  email: string;
  image: string;
}

export interface IHeadingsProps {
  children: React.ReactNode | string;
  className?: string;
  colored?: true | false;
}

export type LocalizedField = {
  ar: string;
  en: string;
};
