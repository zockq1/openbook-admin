import { useState } from "react";
import { ChoiceType } from "../types/choiceType";
import { Form, FormInstance } from "antd";
import { QuestionModel } from "../types/questionTypes";

export interface QuestionFormHandler {
  choiceType: ChoiceType;
  setChoiceType: React.Dispatch<React.SetStateAction<ChoiceType>>;
  answer: number;
  setAnswer: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<QuestionModel>;
}

function useQuestionFormHandler() {
  const [choiceType, setChoiceType] = useState<ChoiceType>("String");
  const [answer, setAnswer] = useState<number>(1);
  const [score, setScore] = useState<number>(2);
  const [form] = Form.useForm<QuestionModel>();

  return {
    choiceType,
    setChoiceType,
    answer,
    setAnswer,
    score,
    setScore,
    form,
  };
}

export default useQuestionFormHandler;
