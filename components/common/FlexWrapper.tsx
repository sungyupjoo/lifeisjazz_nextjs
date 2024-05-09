import React, { ReactNode } from "react";

interface FlexWrapperProps {
  children: ReactNode;
  className?: string;
}

const FlexWrapper: React.FC<FlexWrapperProps> = ({ children, className }) => {
  return (
    <div className={`flex gap-8 flex-col md:flex-row ${className}`}>
      {children}
    </div>
  );
};

export default FlexWrapper;
