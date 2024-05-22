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
  const paddingClass = innerPadding ? "p-5 md:p-10" : "";
  const backgroundColor = backgroundGray ? "bg-backgroundGray" : "bg-white";
  return (
    <section
      className={`relative lg:left-[329px] lg:w-[calc(100%-329px)] overflow-hidden lg:h-screen flex-1 ${paddingClass} ${backgroundColor} border-solid border-b-[0.5px] border-borderGray`}
    >
      {children}
    </section>
  );
};

export default Container;
