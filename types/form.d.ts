declare type TInputUserFormKeys =
  | "email"
  | "username"
  | "password"
  | "firstName"
  | "lastName";

declare type TInput = {
  type:
    | "text"
    | "password"
    | "email"
    | "tel"
    | "number"
    | "radio"
    | "hidden"
    | "checkbox";
  placeholder?: string;
  name: string;
  checked?: boolean;
  autoComplete?: string;
  pattern?: string;
  required?: boolean;
  title?: string;
  inputMode?: "numeric";
  hidden?: boolean;
  value?: string;
  id?: string;
  defaultValue?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  validate?: (value: string) => string;
  readOnly?: boolean;
  defaultChecked?: boolean;
};

declare interface ISelect extends TInput {
  options: readonly string[];
}
