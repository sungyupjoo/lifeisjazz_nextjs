import React, { useEffect, useState } from "react";
import { Button, StyledModal } from "../common";
import { InstrumentType, SongProps, rhythmName } from "../common/types";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { formatDate } from "date-fns";

interface SongFCProps {
  requestedSongs: SongProps[];
  updateParticipant: (songId: string, instrument: InstrumentType) => void;
  selectedDate: Date | undefined;
  onCancel: (songId: string) => void;
}

const Song: React.FC<SongFCProps> = ({
  requestedSongs,
  updateParticipant,
  selectedDate,
  onCancel,
}) => {
  const { data: session } = useSession();
  const formattedDate = formatDate(selectedDate!, "yyyy-MM-dd");
  const [isCancelSongModalVisible, setIsCancelSongModalVisible] =
    useState(false);
  return (
    <div className="flex flex-col items-center sm:grid sm:grid-cols-2 ">
      {session?.user &&
        requestedSongs
          .filter((song) => song.date === formattedDate)
          .map((song, index) => (
            <div
              key={song.title}
              className="w-[85%] truncate overflow-hidden bg-backgroundGray rounded-2xl p-1 mt-1 mb-1 justify-self-center align-middle collapse collapse-arrow"
              tabIndex={0}
            >
              <input type="checkbox" />
              <div className="collapse-title">
                <h3 className="text-lg font-semibold ">
                  #{index + 1} {song.title}
                </h3>
                <p className="text-sm">
                  {song.key} / {rhythmName[song.rhythm]}
                </p>
              </div>
              <div className="collapse-content">
                <div className="pt-3 pb-3 border-b-[1px] border-borderGray flex justify-between items-center">
                  <div className="flex text-black">
                    신청자
                    <div className="flex">
                      <img
                        src={song.requester?.image!}
                        alt={`Profile`}
                        className="ml-3 mr-1 h-6 w-6 rounded-md object-cover"
                      />
                      <span className="font-semibold">
                        {song.requester?.name}
                      </span>
                    </div>
                  </div>
                  {(song.requester?.email === session.user.email ||
                    session.user.isManager) && (
                    <Button
                      text="곡 취소"
                      backgroundColor="gray"
                      onClick={() => {
                        setIsCancelSongModalVisible(true);
                      }}
                    />
                  )}
                </div>
                <div className="my-4">
                  {song.instruments.map((instrument, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg cursor-pointer hover:bg-borderGray border-[1px] border-borderGray mb-2"
                      onClick={() =>
                        updateParticipant(song.id, instrument.name)
                      }
                    >
                      <span className="font-semibold text-gray">
                        {instrument.name}
                      </span>
                      {instrument.participants.map(
                        (participant: Session["user"]) => (
                          <div
                            key={participant.email}
                            className="flex items-center gap-2 bg-borderGray rounded-md px-2 py-1.5"
                          >
                            <img
                              className="w-8 h-8 rounded-full object-cover"
                              src={session?.user?.image!}
                              alt={session?.user?.name!}
                            />
                            <span className="text-sm text-black">
                              {participant.name}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t-[1px] border-borderGray">
                  <p className="mb-2 font-semibold">신청자 comment</p>
                  <p className="text-[1rem]">{song.details}</p>
                </div>
              </div>
              {isCancelSongModalVisible && (
                <StyledModal
                  isModalVisible={isCancelSongModalVisible}
                  closeModal={() => {
                    setIsCancelSongModalVisible(false);
                  }}
                >
                  <h3 className="mb-4">곡 취소</h3>
                  <div className="mb-4 flex w-full break-keep">
                    <p className="break-words w-full overflow-wrap-anywhere">
                      {song.title} 신청을 취소할까요?
                    </p>
                  </div>
                  <div className="flex justify-self-center  justify-between max-w-48">
                    <Button
                      backgroundColor="sub"
                      text="네, 취소합니다"
                      onClick={() => {
                        onCancel(song.id);
                        setIsCancelSongModalVisible(false);
                      }}
                    />
                    <Button
                      backgroundColor="main"
                      text="아니오"
                      onClick={() => {
                        setIsCancelSongModalVisible(false);
                      }}
                    />
                  </div>
                </StyledModal>
              )}
            </div>
          ))}
    </div>
  );
};

export default Song;
