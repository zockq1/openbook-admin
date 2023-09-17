import { useEffect } from "react";
import QuestionTemplate from "../templates/QuestionTemplate";
import {
  useGetRoundsQuery,
  useLazyGetRoundDateQuery,
} from "../../store/api/roundApi";
import { queryErrorNotification } from "../../services/errorNotification";
import { useParams } from "react-router-dom";
import {
  useLazyGetQuestionQuery,
  useLazyGetRoundQuestionListQuery,
} from "../../store/api/questionApi";

function QuestionPage() {
  const { round, question } = useParams();
  const { data: roundList, error: roundError } = useGetRoundsQuery();
  const [getRoundDateTrigger, { data: roundDate, error: roundDateError }] =
    useLazyGetRoundDateQuery();
  const [getQuestionTrigger, { data: questionInfo, error: questionInfoError }] =
    useLazyGetQuestionQuery();
  const [
    getQuestionListTrigger,
    { data: questionList, error: questionListError },
  ] = useLazyGetRoundQuestionListQuery();

  useEffect(() => {
    if (round) {
      getRoundDateTrigger(Number(round));
      getQuestionListTrigger(Number(round));
    }
  }, [round, getRoundDateTrigger, getQuestionListTrigger]);

  useEffect(() => {
    if (question) {
      getQuestionTrigger({
        roundNumber: Number(round),
        questionNumber: Number(question),
      });
    }
  }, [question, round, getQuestionTrigger]);

  useEffect(() => {
    if (roundError) {
      queryErrorNotification(roundError, "회차 목록");
    }
  }, [roundError]);

  useEffect(() => {
    if (roundDateError) {
      queryErrorNotification(roundDateError, "회차 년도");
    }
  }, [roundDateError]);

  useEffect(() => {
    if (questionInfoError) {
      queryErrorNotification(questionInfoError, "문제 정보");
    }
  }, [questionInfoError]);

  useEffect(() => {
    if (questionListError) {
      queryErrorNotification(questionListError, "문제 목록");
    }
  }, [questionListError]);

  return (
    <QuestionTemplate
      roundList={roundList}
      roundDate={roundDate}
      questionList={
        questionList ? [...questionList].sort((a, b) => a - b) : undefined
      }
      questionInfo={questionInfo}
    />
  );
}

export default QuestionPage;
