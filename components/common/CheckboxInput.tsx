interface CheckboxInputProps {
  id: string;
  value: string;
  defaultChecked?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  id,
  value,
  defaultChecked = false,
}) => {
  return (
    <div className="flex items-center gap-2 mb-1 p-1">
      <input
        type="checkbox"
        id={id}
        name="instruments"
        value={value}
        defaultChecked={defaultChecked}
        className="accent-blue-500 h-4 w-4 rounded focus:ring-main"
      />
      <label
        htmlFor={id}
        className=" text-sm sm:text-base font-normal cursor-pointer"
      >
        {value}
      </label>
    </div>
  );
};

export default CheckboxInput;
