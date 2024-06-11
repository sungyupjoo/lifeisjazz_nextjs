import React, { ReactNode } from "react";

interface FlexWrapperProps {
  children: ReactNode;
  className?: string;
}

const FlexWrapper: React.FC<FlexWrapperProps> = ({ children, className }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export default FlexWrapper;
