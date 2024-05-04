import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  type?: string;
  name?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  field?: any;
  rest?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const Input = ({
  type,
  name,
  className,
  id,
  placeholder,
  field,
  rest,
  value,
  onChange,
}: Props) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      className={twMerge(
        "border rounded-lg px-2 py-3 3xl:px-3 3xl:py-4 w-full outline-primary-500",
        className
      )}
      value={value}
      onChange={onChange}
      {...field}
      {...rest}
    />
  );
};

export default Input;
