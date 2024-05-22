import { startOfDay } from "date-fns";
import { Button } from "../common";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

interface VoteProps {
  selectedDate: Date;
  loginMember: Session["user"];
  setJamdayHandler: () => void;
}

const Vote: React.FC<VoteProps> = ({
  selectedDate,
  loginMember,
  setJamdayHandler,
}) => {
  const formattedSelectedDate = startOfDay(selectedDate).toDateString();
  const [voters, setVoters] = useState<Session["user"][]>([]);
  const [hasUserVoted, setHasUserVoted] = useState<boolean>(false);

  // 투표 관련
  const voteRef = doc(db, "vote", formattedSelectedDate);
  const voteHandler = async () => {
    if (!loginMember) return;
    const docSnap = await getDoc(voteRef);
    let currentVoters: Session["user"][] = [];
    if (docSnap.exists()) {
      currentVoters = docSnap.data().voter || [];
    }
    if (!hasUserVoted) {
      currentVoters.push(loginMember);
      try {
        await setDoc(voteRef, { voter: currentVoters }, { merge: true });
      } catch (error) {
        console.warn(error, "투표 과정 중 오류");
      }
    } else {
      const updatedVoters = currentVoters.filter(
        (voter) => voter.email !== loginMember.email
      );
      try {
        await setDoc(voteRef, { voter: updatedVoters }, { merge: true });
      } catch (error) {
        console.warn(error, "투표 취소 과정 중 오류");
      }
    }
  };
  // 데이터 받아오기
  useEffect(() => {
    const unsubscribeVoters = onSnapshot(voteRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const votersList: Session["user"][] = docSnapshot.data().voter;
        setHasUserVoted(
          votersList.some((voter) => voter.email === loginMember.email)
        );

        setVoters(votersList);
      } else {
        console.warn("voters 받아오는 중 오류");
      }
    });
    return () => unsubscribeVoters();
  }, []);

  return (
    <div className="p-6">
      <p>
        다음 주 잼데이 가능 일자를 투표하는 곳으로, 운영진의 판단하에 확정된
        일자엔 빨간 점이 표시됩니다.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button
          backgroundColor="sub"
          text={!hasUserVoted ? "투표하기" : "취소하기"}
          big
          fontColor="white"
          onClick={voteHandler}
        />
        <Button
          backgroundColor="sub"
          text="잼데이 지정"
          big
          onClick={setJamdayHandler}
        />
      </div>
      <div className="mt-4 rounded-xl bg-borderGray p-4 ">
        <h3>투표한 사람 ({voters.length}명)</h3>
        <div className="my-4 grid grid-cols-2 sm:grid-cols-4 gap-y-6 justify-items-center items-center">
          {voters?.map((voter) => (
            <div className="flex items-center py-1.5 px-2 rounded-2xl w-3/4 bg-backgroundGray">
              <img
                className="h-10 w-10 rounded-full mr-2"
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
