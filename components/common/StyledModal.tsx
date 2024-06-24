"use client";

import { motion } from "framer-motion";
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
  width,
  height,
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
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60  overflow-y-auto z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed flex items-center justify-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4/5">
        <motion.div
          className={`p-6 relative bg-white rounded-2xl w-full sm:w-auto sm:min-w-96 h-auto flex flex-col max-w-[30rem] max-h-[38rem] sm:max-h-[30rem]`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <button onClick={closeModal} className="absolute top-2 right-2">
            <IconXMark size={24} />
          </button>
          <div className="overflow-y-scroll w-full">{children}</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StyledModal;
