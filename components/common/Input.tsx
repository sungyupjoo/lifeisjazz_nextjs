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
        className="w-full block text-lg border-none outline-none focus:outline-none transition ease-in-out duration-300 text-gray-700 bg-transparent"
        required={required}
        defaultValue={defaultValue || ""}
      />
      <div className="bg-gray-400 h-0.5 mt-2"></div>
    </div>
  );
};

export default CustomInput;
