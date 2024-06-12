import { IconProps } from ".";

export const IconCrown: React.FC<IconProps> = ({ size, onClick }) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="5" width="14" height="5" fill="#FF922E" />
      <path d="M0 0V5H5L0 0Z" fill="#FF922E" />
      <path d="M14 0V5H9L14 0Z" fill="#FF922E" />
      <path d="M4 5L7 0L10 5H4Z" fill="#FF922E" />
    </svg>
  );
};
