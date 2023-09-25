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
import { useLazyGetChoicesQuery } from "../../store/api/choicesApi";
import { useLazyGetDescriptionQuery } from "../../store/api/descriptionApi";

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
  const [getChoiceListTrigger, { data: choiceList, error: choiceListError }] =
    useLazyGetChoicesQuery();
  const [
    getDescriptionTrigger,
    { data: description, error: descriptionError },
  ] = useLazyGetDescriptionQuery();

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
      getChoiceListTrigger({
        roundNumber: Number(round),
        questionNumber: Number(question),
      });
      getDescriptionTrigger({
        roundNumber: Number(round),
        questionNumber: Number(question),
      });
    }
  }, [
    question,
    round,
    getQuestionTrigger,
    getChoiceListTrigger,
    getDescriptionTrigger,
  ]);

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

  useEffect(() => {
    if (choiceListError) {
      queryErrorNotification(choiceListError, "선지 목록");
    }
  }, [choiceListError]);

  useEffect(() => {
    if (descriptionError) {
      queryErrorNotification(descriptionError, "보기");
    }
  }, [descriptionError]);

  return (
    <QuestionTemplate
      roundList={roundList}
      roundDate={roundDate}
      questionList={
        questionList ? [...questionList].sort((a, b) => a - b) : undefined
      }
      questionInfo={questionInfo}
      choiceList={choiceList?.choiceList}
      description={description}
    />
  );
}

export default QuestionPage;
