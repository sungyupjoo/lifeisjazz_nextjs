import React from "react";
import { Button } from "../common";
import { InstrumentType, Member, SongProps } from "../common/types";

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
    <div>
      {isJamDay ? (
        requestedSongs
          .filter((song) => song.date === selectedDate.toDateString())
          .map((song, index) => (
            <div key={song.title} className="bg-gray-100 rounded-lg p-4 m-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  #{index + 1} {song.title}
                </h3>
                <Button
                  text="Cancel"
                  backgroundColor="bg-gray-300"
                  onClick={() => onCancel(song.id)}
                />
              </div>
              <p>Requested by: {song.requester?.nickName}</p>
              <div className="mt-1">
                {song.instruments.map((instrument, i) => (
                  <div
                    key={i}
                    className="bg-white p-2 rounded-lg cursor-pointer hover:bg-gray-200"
                    onClick={() => updateParticipant(song.id, instrument.name)}
                  >
                    {instrument.name} - Participants:
                    {instrument.participants.map((participant: Member) => (
                      <div
                        key={participant.id}
                        className="flex items-center gap-2"
                      >
                        <img
                          className="w-8 h-8 rounded-full"
                          src={participant.profileImageUrl}
                          alt={participant.nickName}
                        />
                        <span>{participant.nickName}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <strong>Details:</strong>
                <p>{song.details}</p>
              </div>
            </div>
          ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <h3>There is no JamDay scheduled for this date.</h3>
        </div>
      )}
    </div>
  );
};

export default Song;
