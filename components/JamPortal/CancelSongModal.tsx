import React from "react";
import { StyledModal } from "../common";

interface CancelSongModalProps {
  isVisible: boolean;
  closeHandler: () => void;
}

const CancelSongModal: React.FC<CancelSongModalProps> = ({
  isVisible,
  closeHandler,
}) => {
  return (
    <StyledModal isModalVisible={isVisible} closeModal={closeHandler}>
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-xl font-medium">
          Are you sure you want to cancel this song?
        </p>
        <div className="mt-4 flex justify-around w-full">
          <button
            onClick={closeHandler}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Yes, Cancel
          </button>
          <button
            onClick={closeHandler}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
          >
            No, Go Back
          </button>
        </div>
      </div>
    </StyledModal>
  );
};

export default CancelSongModal;
