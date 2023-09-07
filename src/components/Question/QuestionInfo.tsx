import { Button, Card } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { queryErrorNotification } from "../../services/errorNotification";
import { useGetQuestionQuery } from "../../store/api/questionApi";
import DeleteQuestionButton from "./DeleteQuestionButton";

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
      {questionInfo?.choiceList &&
        questionInfo?.choiceList.map((item, index) => {
          return (
            <Card key={index} title={item.key}>
              <p>선지: {item.choice}</p>
              <p>해설: {item.comment}</p>
            </Card>
          );
        })}
    </Card>
  );
}

export default QuestionInfo;
