import { Button } from "../common";
import { instruments } from "../common/types";

const Vote = () => {
  const exampleInstruments = [];
  return (
    <div className="p-6">
      <p>
        다음 주 잼데이 가능 일자를 투표하는 곳으로, 운영진의 판단하에 확정된
        일자엔 빨간 점이 표시됩니다.
      </p>
      <div className="flex items-center justify-center">
        <Button
          backgroundColor="sub"
          text="투표하기"
          big
          fontColor="white"
          onClick={() => {}}
        />
      </div>
      <div className="mt-4 rounded-xl bg-borderGray p-4 ">
        <h3>투표한 사람</h3>
        <div className="my-4">
          {instruments.map((instrument, i) => (
            <div
              key={i}
              className="p-2 rounded-lg cursor-pointer hover:bg-borderGray border-[1px] border-borderGray mb-2"
              onClick={() => {}}
            >
              <span className="font-semibold ">{instrument}</span>
              {/* {instrument.participants.map((participant: UserProps) => (
                <div
                  key={participant.email}
                  className="flex items-center gap-2 bg-borderGray rounded-md px-2 py-1.5"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={participant.image}
                    alt={participant.name}
                  />
                  <span className="text-sm text-black">{participant.name}</span>
                </div>
              ))} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vote;
