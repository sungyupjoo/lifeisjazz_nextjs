import React, { FC, HTMLInputTypeAttribute } from "react";

interface InputProps {
  id: string;
  type: HTMLInputTypeAttribute;
  name: string;
  required?: boolean;
  defaultValue?: string;
}

const CustomInput: FC<InputProps> = ({
  id,
  type,
  name,
  required = false,
  defaultValue,
}) => {
  return (
    <div className="w-auto sm:w-1/2">
      <input
        id={id}
        type={type}
        name={name}
        className="w-full block text-lg outline-none focus:outline-none transition ease-in-out sm:min-w-64 duration-300 text-black bg-transparent border-b-[1px] border-borderGray"
        required={required}
        defaultValue={defaultValue || ""}
      />
    </div>
  );
};

export default CustomInput;
