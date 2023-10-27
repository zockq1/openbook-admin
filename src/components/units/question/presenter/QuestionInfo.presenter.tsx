import { Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useGetQuestionQuery } from "../../../../store/api/questionApi";
import QuestionInfoUI from "../container/QuestionInfoUI.container";

function QuestionInfo() {
  const navigate = useNavigate();
  const { round, question } = useParams();
  const questionNumber = Number(question);
  const roundNumber = Number(round);
  const { data: questionInfo, error: questionInfoError } = useGetQuestionQuery({
    questionNumber,
    roundNumber,
  });
  useNotificationErrorList([setError(questionInfoError, "문제 정보")]);

  if (!questionInfo) {
    return <Spin />;
  }

  return (
    <QuestionInfoUI
      questionInfo={questionInfo}
      toEditQuestion={() =>
        navigate(`/exam/${round}/${question}/edit-question`)
      }
    />
  );
}

export default QuestionInfo;
