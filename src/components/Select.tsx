import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  name?: string;
  field?: any;
  selectOptions: {
    label: string;
    value: string;
  }[];
  className?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ name, field, selectOptions, className, onChange }: Props) => {
  const inputStyle =
    "border rounded-lg px-2 py-3 3xl:px-3 3xl:py-4 w-full outline-primary-500";
  return (
    <select
      id={name}
      defaultValue={selectOptions[0].value}
      className={twMerge(inputStyle, className)}
      onChange={onChange}
      {...field}
    >
      {selectOptions?.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
