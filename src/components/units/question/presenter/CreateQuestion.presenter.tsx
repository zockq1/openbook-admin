import QuestionFormUI from "../container/QuestionFormUI.container";
import useQuestionFormHandler from "../../../../hooks/useQuestionFormHandler";
import { useParams } from "react-router-dom";
import {
  useAddQuestionMutation,
  useGetRoundQuestionListQuery,
} from "../../../../store/api/questionApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useEffect } from "react";
import { QuestionModel } from "../../../../types/questionTypes";
import { mutationErrorNotification } from "../../../../services/errorNotification";

function CreateQuestion() {
  const { round } = useParams();
  const roundNumber = Number(round);
  const { data: questionList, error: questionListError } =
    useGetRoundQuestionListQuery(roundNumber);
  const [addQuestion] = useAddQuestionMutation();
  const questionFormHandler = useQuestionFormHandler();
  const { answer, score, choiceType } = questionFormHandler;

  useNotificationErrorList([setError(questionListError, "문제 목록")]);

  useEffect(() => {
    if (questionList === undefined) return;
    questionFormHandler.form.setFieldsValue({
      number: questionList.length + 1,
    });
  }, [questionList, questionFormHandler]);

  const onFinish = async (values: any) => {
    const { number } = values;
    let newQuestion: QuestionModel = {
      number,
      answer,
      score,
      choiceType,
    };

    try {
      await addQuestion({
        roundNumber: Number(round),
        question: newQuestion,
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <QuestionFormUI
      onFinish={onFinish}
      questionFormhandler={questionFormHandler}
    />
  );
}

export default CreateQuestion;
