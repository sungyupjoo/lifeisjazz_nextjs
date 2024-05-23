"use client";
import Link from "next/link";

interface ButtonProps {
  text: string;
  logoUrl?: string;
  backgroundColor: string;
  fontColor?: string;
  href?: string;
  link?: boolean;
  onClick?: () => void;
  big?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  logoUrl,
  backgroundColor,
  fontColor = "white",
  href,
  link = false,
  onClick,
  big = false,
}) => {
  const hoverBgColorClass = `${
    backgroundColor === "main" ? "hover:bg-mainShade" : "hover:bg-subShade"
  }`;
  return (
    <div
      className={`bg-${backgroundColor} inline-block cursor-pointer text-center rounded-lg px-2 ${
        big ? "py-3" : "py-1.5"
      } lg:px-5 ${hoverBgColorClass}`}
    >
      {logoUrl && (
        <img
          src={logoUrl}
          alt="logo"
          className="inline-block w-6 h-6 mr-2 align-middle"
        />
      )}
      {link ? (
        <Link
          href={href || "/JamPortal"}
          className={`text-white no-underline font-regular ${
            big ? "text-xl sm:text-lg" : "text-lg"
          }`}
        >
          {text}
        </Link>
      ) : (
        <a
          href={href}
          className={`no-underline text-${fontColor} align-middle break-keep ${
            big ? "text-xl sm:text-lg" : "text-lg"
          }`}
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              onClick();
            }
            return;
          }}
        >
          {text}
        </a>
      )}
    </div>
  );
};
