"use client";

import React, { ReactNode, useEffect } from "react";
import { IconXMark } from "./icons";

interface StyledModalProps {
  isModalVisible: boolean;
  closeModal: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
}

const StyledModal: React.FC<StyledModalProps> = ({
  isModalVisible,
  closeModal,
  children,
  width = "20rem",
  height = "15rem",
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`relative bg-white rounded-2xl w-80 h-60 flex flex-col`}
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
