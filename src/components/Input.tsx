import { ChangeEvent, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
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
  const [showPassword, setShowPassword] = useState(false);
  const eyeStyle =
    "text-xl cursor-pointer absolute right-2 top-1/2 -translate-y-1/2";
  return (
    <div className=" w-full relative">
      <input
        id={id}
        type={showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        className={twMerge(
          "flex-1 border rounded-lg px-2 py-3 3xl:px-3 3xl:py-4 w-full outline-primary-500",
          className
        )}
        value={value}
        onChange={onChange}
        {...field}
        {...rest}
      />
      {type === "password" && showPassword && (
        <IoMdEye
          className={eyeStyle}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
      {type === "password" && !showPassword && (
        <IoMdEyeOff
          className={eyeStyle}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
};

export default Input;
