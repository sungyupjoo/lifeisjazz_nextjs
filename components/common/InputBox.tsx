import React, { useState, FC } from "react";

interface IconProps {
  size: number;
  onClick?: () => void;
}

interface InputBoxProps {
  icon?: FC<IconProps>;
  placeholder: string;
  onClick?: () => void;
  height?: string;
}

const InputBox: FC<InputBoxProps> = ({
  icon: Icon,
  placeholder,
  onClick,
  height = "h-8",
}) => {
  const [value, setValue] = useState<string>("");

  return (
    <div
      className={`flex items-center border rounded border-gray-300 p-2 ${height} focus-within:border-blue-500 focus-within:border-2 mb-2`}
    >
      {Icon && <Icon size={24} onClick={onClick} />}
      <input
        type="text"
        placeholder={placeholder}
        className="ml-2 bg-transparent flex-grow outline-none w-full placeholder-gray-400"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputBox;
