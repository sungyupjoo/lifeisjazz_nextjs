import React, { useState } from "react";
import { Button, Container, Title, StyledModal } from "../common";
import KakaoMap from "../KakaoMap";
import Rules from "../contents/Rules";

const Contact = () => {
  const [ruleModalVisible, setRuleModalVisible] = useState(false);
  const [buttonText, setButtonText] = useState<string>("계좌번호 복사");

  const showRuleModal = () => setRuleModalVisible(true);
  const copyAccount = () => {
    const accountNumber = "25821572902001";
    navigator.clipboard.writeText(accountNumber).then(
      () => {
        setButtonText("복사 완료!");
        setTimeout(() => setButtonText("계좌번호 복사"), 2000);
      },
      (err: Error) => {
        console.error("클립보드 복사 실패: ", err);
      }
    );
  };

  return (
    <Container innerPadding>
      <Title titleText="연락 및 문의" subTitle="행사 요청 및 기타 문의" />
      <div className="flex flex-col md:flex-row gap-4">
        <KakaoMap />
        <div className="mt-6 w-full">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">연습실</h3>
              <Button
                backgroundColor="sub"
                text="이용수칙"
                onClick={showRuleModal}
              />
            </div>
            <p className="break-words">서울 서초구 서초대로25길 62, 지하 1층</p>
            <p className="break-words">
              <span className="bg-[#747f00] text-white rounded-full px-1 inline-flex items-center justify-center w-5 h-5 text-sm">
                7
              </span>
              내방역 7번 출구에서 320m 레몬네일 왼쪽 문에서 비밀번호 입력
            </p>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">연락처</h3>
            </div>
            <p className="break-words">
              <span className="text-white px-2 py-1 bg-gray rounded mr-1">
                대표
              </span>
              조성제 010-2278-4351
            </p>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">계좌</h3>
              <Button
                backgroundColor={
                  buttonText === "계좌번호 복사" ? "sub" : "main"
                }
                text={buttonText}
                onClick={copyAccount}
              />
            </div>
            <p className="break-words">우리은행 258-21572-902001 조성제</p>
          </div>
        </div>
      </div>
      {ruleModalVisible && (
        <StyledModal
          isModalVisible={ruleModalVisible}
          closeModal={() => setRuleModalVisible(false)}
        >
          <Rules />
        </StyledModal>
      )}
    </Container>
  );
};

export default Contact;
