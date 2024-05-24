import React from "react";
import { StyledModal, Input, CheckboxInput, Button } from "../common";
import Select from "react-select";
import { keyOptions, rhythmOptions } from "../common/types";

interface AddSongModalProps {
  isVisible: boolean;
  closeHandler: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AddSongModal: React.FC<AddSongModalProps> = ({
  isVisible,
  closeHandler,
  handleSubmit,
}) => {
  return (
    <StyledModal closeModal={closeHandler} isModalVisible={isVisible}>
      <form onSubmit={handleSubmit} className="font-semibold text-lg mt-8">
        <div className="flex mb-4 sm:mb-6 items-center">
          <label htmlFor="title" className="w-1/3 min-w-24 text-lg">
            곡 제목
          </label>
          <Input id="title" type="text" name="title" required />
        </div>
        <div className="flex mb-4 sm:mb-6 items-center">
          <label htmlFor="key" className="w-1/3 min-w-24 text-lg">
            키
          </label>
          <Select
            options={keyOptions}
            inputId="key"
            name="key"
            className="w-2/3 cursor-pointer text-sm"
            required
          />
        </div>
        <div className="flex mb-4 sm:mb-6 items-center">
          <label htmlFor="rhythm" className="w-1/3 min-w-24 text-lg">
            리듬
          </label>
          <Select
            options={rhythmOptions}
            inputId="rhythm"
            name="rhythm"
            className="w-2/3 cursor-pointer text-sm"
            required
          />
        </div>
        <fieldset className="mb-4 sm:mb-6">
          <legend className="mb-4">악기 구성</legend>
          <div className="grid grid-cols-3 gap-2">
            <CheckboxInput id="bass" value="베이스" defaultChecked />
            <CheckboxInput id="drums" value="드럼" defaultChecked />
            <CheckboxInput id="piano" value="피아노" defaultChecked />
            <CheckboxInput id="horn" value="관악기" />
            <CheckboxInput id="guitar" value="기타" />
            <CheckboxInput id="vocals" value="보컬" />
            <CheckboxInput id="etc" value="그외" />
          </div>
        </fieldset>
        <div className="flex mb-4 sm:mb-6 items-center">
          <label htmlFor="details" className="w-1/3 min-w-28 text-lg">
            하고 싶은 말
          </label>
          <Input id="details" type="text" name="details" textarea />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-sub text-white rounded-md px-4 py-2 w-1/2 mt-2 hover:bg-subShade"
          >
            신청
          </button>
        </div>
      </form>
    </StyledModal>
  );
};

export default AddSongModal;
