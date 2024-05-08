import { IconProps } from ".";

interface XMarkProps extends IconProps {
  position?: "absolute" | "relative";
}

export const IconXMark: React.FC<XMarkProps> = ({
  size,
  onClick,
  position = "absolute",
}) => {
  return (
    <div
      onClick={onClick}
      className={`${position} ${
        position === "absolute" ? `top-5 right-5` : ""
      } cursor-pointer`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        width={size}
        height={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};
