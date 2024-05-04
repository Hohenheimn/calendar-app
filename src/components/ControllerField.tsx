import { Controller } from "react-hook-form";

import Input from "./Input";
import Select from "./Select";

type Props = {
  control: any;
  errors: any;
  name: string;
  rules?: any;
  label?: string;
  placeholder?: string;
  type: "select" | "text" | "password" | "email" | "date";
  selectOptions?: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
};

function ControllerField({
  control,
  errors,
  name,
  rules,
  label,
  placeholder,
  type,
  selectOptions,
  ...rest
}: Props) {
  const inputStyle =
    "border rounded-lg px-2 py-3 3xl:px-3 3xl:py-4 w-full outline-primary-500";

  const labelStyle = "text-gray-500 text-[.9rem]";

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <aside>
          {label && (
            <label htmlFor={name} className={labelStyle}>
              {label}
            </label>
          )}
          {type !== "select" && (
            <Input
              field={field}
              rest={rest}
              id={name}
              type={type}
              placeholder={placeholder}
              name={name}
              className={inputStyle}
            />
          )}

          {type === "select" && selectOptions && (
            <Select selectOptions={selectOptions} name={name} field={field} />
          )}

          {errors[name]?.message && (
            <p className=" text-[.9rem] text-[#dd0000] text-start ml-2">
              {errors[name]?.message}
            </p>
          )}
        </aside>
      )}
    />
  );
}

export default ControllerField;
