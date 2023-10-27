import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { useUpdateQuestionMutation } from "../../../../store/api/questionApi";
import { QuestionModel } from "../../../../types/questionTypes";
import useQuestionFormHandler from "../../../../hooks/useQuestionFormHandler";
import { useGetQuestionQuery } from "../../../../store/api/questionApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import QuestionFormUI from "../container/QuestionFormUI.container";

function EditQuestion() {
  const navigate = useNavigate();
  const { round, question } = useParams();
  const questionNumber = Number(question);
  const roundNumber = Number(round);

  const [updateQuestion] = useUpdateQuestionMutation();
  const { data: questionInfo, error: questionInfoError } = useGetQuestionQuery({
    questionNumber,
    roundNumber,
  });
  useNotificationErrorList([setError(questionInfoError, "문제 정보")]);
  const questionFormHandler = useQuestionFormHandler();
  const { answer, score, choiceType } = questionFormHandler;

  useEffect(() => {
    if (questionInfo === undefined) return;
    const { answer, score, choiceType, number } = questionInfo;
    questionFormHandler.form.setFieldsValue({
      number,
      score,
      answer,
      choiceType,
    });
  }, [questionInfo, questionFormHandler]);

  const onFinish = async (values: any) => {
    const { number } = values;
    let newQuestion: QuestionModel = {
      number,
      answer,
      score,
      choiceType,
    };

    try {
      await updateQuestion({
        updatedQuestion: newQuestion,
        currentQuestionNumber: questionNumber,
        roundNumber: roundNumber,
      }).unwrap();
      navigate(`/exam/${roundNumber}/${questionNumber}/question-info`);
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <QuestionFormUI
      questionFormhandler={questionFormHandler}
      onFinish={onFinish}
    />
  );
}

export default EditQuestion;
