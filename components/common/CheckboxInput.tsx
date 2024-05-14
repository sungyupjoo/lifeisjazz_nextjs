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
        className="accent-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={id} className="text-base font-normal cursor-pointer">
        {value}
      </label>
    </div>
  );
};

export default CheckboxInput;
