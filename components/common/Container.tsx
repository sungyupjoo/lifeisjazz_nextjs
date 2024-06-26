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
  const paddingClass = innerPadding ? "px-5 py-12 md:p-10" : "";
  const backgroundColor = backgroundGray ? "bg-backgroundGray" : "bg-white";
  return (
    <div>
      <section
        className={`relative lg:left-[329px] lg:w-[calc(100%-329px)] overflow-hidden lg:h-screen flex-1 ${paddingClass} ${backgroundColor} border-solid border-b-[0.5px] border-borderGray`}
      >
        {children}
      </section>
    </div>
  );
};

export default Container;
