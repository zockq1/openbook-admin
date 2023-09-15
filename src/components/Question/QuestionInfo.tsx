import { Button, Card } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { queryErrorNotification } from "../../services/errorNotification";
import { useGetQuestionQuery } from "../../store/api/questionApi";
import DeleteQuestionButton from "./DeleteQuestionButton";
import { ImageChoiceForm, StringChoiceForm } from "./ChoiceFrom";

function QuestionInfo() {
  const navigate = useNavigate();
  const { round, question } = useParams();
  const { data: questionInfo, error: questionError } = useGetQuestionQuery({
    roundNumber: Number(round),
    questionNumber: Number(question),
  });

  useEffect(() => {
    queryErrorNotification(questionError, "문제 정보");
  }, [questionError]);

  const handleUpdateClick = () => {
    navigate(`/question/${round}/${question}/edit`);
  };

  return (
    <Card
      title={questionInfo?.number + "번 문제"}
      style={{ width: "700px", margin: "0 auto" }}
      extra={
        <div>
          <Button onClick={handleUpdateClick}>수정</Button>
          <DeleteQuestionButton />
        </div>
      }
    >
      <p>보기: {questionInfo?.description}</p>
      <p>보기 해설: {questionInfo?.descriptionComment}</p>
      <p>정답 주제: {questionInfo?.answer}</p>
      <p>배점: {questionInfo?.score}</p>
      <div
        style={{
          border: "1px solid rgba(5, 5, 5, 0.06)",
          borderRadius: 12,
          padding: 12,
        }}
      >
        <div
          style={{
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
            paddingBottom: 12,
          }}
        >
          선지
        </div>
        <br />
        {questionInfo && <ImageChoiceForm questionInfo={questionInfo} />}
        {questionInfo && <StringChoiceForm questionInfo={questionInfo} />}
      </div>
    </Card>
  );
}

export default QuestionInfo;
