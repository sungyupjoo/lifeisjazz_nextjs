import { Session } from "next-auth";
import { Button } from "../common";

interface VoteProps {
  formattedDate: string;
  setJamdayHandler: () => void;
  jamdays: string[];
  cancelJamdayHandler: () => void;
  hasUserVoted: boolean;
  voteHandler: () => void;
  voters: Session["user"][];
}

const Vote: React.FC<VoteProps> = ({
  formattedDate,
  setJamdayHandler,
  jamdays,
  cancelJamdayHandler,
  hasUserVoted,
  voteHandler,
  voters,
}) => {
  return (
    <div className="p-6">
      <p className="font-[1rem]">
        다음 주 잼데이 가능 일자를 투표하는 곳으로, 운영진의 판단하에 확정된
        일자엔 빨간 점이 표시됩니다.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button
          backgroundColor="sub"
          text={!hasUserVoted ? "투표하기" : "투표취소"}
          fontColor="white"
          onClick={voteHandler}
        />
        <Button
          backgroundColor="sub"
          text={jamdays.includes(formattedDate) ? "잼데이 취소" : "잼데이 지정"}
          onClick={
            jamdays.includes(formattedDate)
              ? cancelJamdayHandler
              : setJamdayHandler
          }
        />
      </div>
      <div className="mt-4 rounded-xl bg-borderGray p-4 ">
        <h3>투표한 사람 ({voters.length}명)</h3>
        <div className="my-4 grid grid-cols-2 sm:grid-cols-4 gap-y-6 justify-items-center items-center">
          {voters?.map((voter) => (
            <div
              className="flex items-center py-1.5 px-2 rounded-2xl w-3/4 bg-backgroundGray"
              key={voter.email}
            >
              <img
                className="h-10 w-10 rounded-full mr-2 object-cover"
                src={voter.image || ""}
              />
              <p>{voter.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vote;
