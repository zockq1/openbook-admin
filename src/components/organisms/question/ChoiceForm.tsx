import { useState } from "react";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled from "styled-components";
import { Button, Input } from "antd";
import ImageUpload from "../../molecules/ImageUpload";
import { ChoiceType } from "../../../types/questionTypes";
import { useAddChoiceMutation } from "../../../store/api/choicesApi";

const ChoiceFormGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 56.23px;
  width: 100%;
`;

interface ChoiceFormProps {
  choiceCount: number;
  choiceType: ChoiceType;
  questionNumber: number;
  roundNumber: number;
}

function ChoiceForm({
  choiceType,
  questionNumber,
  roundNumber,
  choiceCount,
}: ChoiceFormProps) {
  const [choice, setChoice] = useState("");
  const [addChoice] = useAddChoiceMutation();

  const handleSubmit = async () => {
    if (!choice) {
      window.alert("정답 주제와 선지를 입력해 주십시오");
      return;
    }

    if (choiceCount >= 5) {
      window.alert("선지는 5개를 초과할 수 없습니다.");
      return;
    }
    try {
      addChoice({
        roundNumber: roundNumber,
        questionNumber: questionNumber,
        choice: { choice, choiceType, choiceNumber: choiceCount + 1 },
      });
      setChoice("");
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleChoiceChange = (e: any) => {
    setChoice(e.target.value);
  };

  return (
    <ChoiceFormGridContainer>
      {choiceType === "Image" ? (
        <ImageUpload
          setImgFile={setChoice}
          imgFile={choice}
          htmlFor="choice-form"
        />
      ) : (
        <Input.TextArea
          value={choice}
          onChange={handleChoiceChange}
          placeholder="선지"
        />
      )}
      <Button type="primary" onClick={handleSubmit}>
        추가
      </Button>
    </ChoiceFormGridContainer>
  );
}

export default ChoiceForm;
