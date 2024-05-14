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
    <div className="w-1/2">
      <input
        id={id}
        type={type}
        name={name}
        className="w-full block text-lg outline-none focus:outline-none transition ease-in-out min-w-64 duration-300 text-gray-700 bg-transparent border-b-2 border-borderGray"
        required={required}
        defaultValue={defaultValue || ""}
      />
      <div className="bg-gray-400 h-0.5 mt-2"></div>
    </div>
  );
};

export default CustomInput;
