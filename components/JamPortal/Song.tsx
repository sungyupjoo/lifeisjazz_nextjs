import React from "react";
import { Button } from "../common";
import { InstrumentType, SongProps, UserProps } from "../common/types";

interface SongFCProps {
  requestedSongs: SongProps[];
  updateParticipant: (songId: string, instrument: InstrumentType) => void;
  selectedDate: Date;
  onCancel: (songId: string) => void;
}

const Song: React.FC<SongFCProps> = ({
  requestedSongs,
  updateParticipant,
  selectedDate,
  onCancel,
}) => {
  const isJamDay = requestedSongs
    .map((song) => song.date)
    .includes(selectedDate.toDateString());

  return (
    <div className="flex flex-col items-center sm:grid sm:grid-cols-2 ">
      {isJamDay ? (
        requestedSongs
          .filter((song) => song.date === selectedDate.toDateString())
          .map((song, index) => (
            <div
              key={song.title}
              className="w-4/5 bg-backgroundGray rounded-lg p-4 mb-8 justify-self-center align-middle"
            >
              <h3 className="text-lg font-semibold">
                #{index + 1} {song.title}
              </h3>
              <div className="pt-3 pb-3 border-b-[1px] border-borderGray flex justify-between items-center">
                <p>
                  신청자{" "}
                  <span className="font-semibold">{song.requester?.name}</span>
                </p>
                <Button
                  text="곡 취소"
                  backgroundColor="sub"
                  onClick={() => onCancel(song.id)}
                />
              </div>
              <div className="my-4">
                {song.instruments.map((instrument, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg cursor-pointer hover:bg-borderGray border-[1px] border-borderGray mb-2"
                    onClick={() => updateParticipant(song.id, instrument.name)}
                  >
                    <span className="font-semibold ">{instrument.name}</span>
                    {instrument.participants.map((participant: UserProps) => (
                      <div
                        key={participant.email}
                        className="flex items-center gap-2 bg-borderGray rounded-md px-2 py-1.5"
                      >
                        <img
                          className="w-8 h-8 rounded-full"
                          src={participant.image}
                          alt={participant.name}
                        />
                        <span className="text-sm text-black">
                          {participant.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t-[1px] border-borderGray">
                <p className="mb-2 font-semibold">신청자 comment</p>
                <p>{song.details}</p>
              </div>
            </div>
          ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <h3>잼데이 날이 아닙니다</h3>
        </div>
      )}
    </div>
  );
};

export default Song;
