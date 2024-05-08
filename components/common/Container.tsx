import { ReactNode } from "react";

interface ContainerProps {
  innerPadding?: boolean;
  backgroundGray?: boolean;
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  innerPadding = false,
  backgroundGray = false,
}) => {
  const paddingClass = innerPadding ? "p-16 md:p-6" : "";
  const backgroundColor = backgroundGray ? "bg-backgroundGray" : "bg-white";
  return (
    <section
      className={`relative lg:left-[329px] lg:w-[calc(100%-329px)] h-screen flex-1 ${paddingClass} ${backgroundColor} border-solid border-b border-borderGray md:left-0 md:w-full md:h-auto md:border-none`}
    >
      {children}
    </section>
  );
};

export default Container;
