import { useState } from "react";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { Spin } from "antd";
import { useAddChoiceMutation } from "../../../../store/api/choicesApi";
import ChoiceFormUI from "../container/ChoiceFormUI.container";
import { useParams } from "react-router-dom";
import { useGetChoiceListQuery } from "../../../../store/api/choicesApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useGetQuestionQuery } from "../../../../store/api/questionApi";

function ChoiceForm() {
  const { round, question } = useParams();
  const roundNumber = Number(round);
  const questionNumber = Number(question);
  const { data: choiceList, error: choiceListError } = useGetChoiceListQuery({
    roundNumber,
    questionNumber,
  });
  const { data: questionInfo, error: questionInfoError } = useGetQuestionQuery({
    questionNumber,
    roundNumber,
  });
  useNotificationErrorList([
    setError(choiceListError, "선지 목록"),
    setError(questionInfoError, "문제"),
  ]);
  const [choice, setChoice] = useState("");
  const [addChoice] = useAddChoiceMutation();

  const handleSubmit = async () => {
    if (!choiceList || !questionInfo) return;

    if (!choice) {
      window.alert("정답 주제와 선지를 입력해 주십시오");
      return;
    }

    if (choiceList.length >= 5) {
      window.alert("선지는 5개를 초과할 수 없습니다.");
      return;
    }
    try {
      await addChoice({
        roundNumber: roundNumber,
        questionNumber: questionNumber,
        choice: {
          choice,
          choiceType: questionInfo.choiceType,
          choiceNumber: choiceList.length + 1,
        },
      });
      setChoice("");
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  if (!questionInfo) return <Spin />;

  return (
    <ChoiceFormUI
      choiceType={questionInfo.choiceType}
      choice={choice}
      setChoice={setChoice}
      onSubmit={handleSubmit}
    />
  );
}

export default ChoiceForm;
