"use client";

import React, { ReactNode, useEffect } from "react";
import { IconXMark } from "./icons";

interface StyledModalProps {
  isModalVisible: boolean;
  closeModal: () => void;
  children: ReactNode;
  width?: number;
  height?: number;
}

const StyledModal: React.FC<StyledModalProps> = ({
  isModalVisible,
  closeModal,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  if (!isModalVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60  overflow-y-auto z-10">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`p-6 relative bg-white rounded-2xl w-auto h-auto flex flex-col`}
        >
          <button onClick={closeModal} className="absolute top-2 right-2">
            <IconXMark size={24} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default StyledModal;
