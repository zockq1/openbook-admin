import { useState } from "react";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled, { css } from "styled-components";
import { Button, Input } from "antd";
import ImageUpload from "../../molecules/ImageUpload";
import { ChoiceType } from "../../../types/questionTypes";
import { useAddChoicesMutation } from "../../../store/api/choicesApi";

interface ChoiceFormGridContainerProps {
  choiceType: ChoiceType;
}

const ChoiceFormGridContainer = styled.div<ChoiceFormGridContainerProps>`
  display: grid;
  width: 100%;
  ${({ choiceType }) =>
    choiceType === "Image"
      ? css`
          grid-template-columns: 100px 1fr 56.23px;
          grid-template-rows: 32px 100px;
        `
      : css`
          grid-template-columns: 100px 1fr 56.23px;
          grid-template-rows: 32px 32px 32px;
        `}
`;

interface ChoiceFormProps {
  choiceType: ChoiceType;
  questionNumber: number;
  roundNumber: number;
}

function ChoiceForm({
  choiceType,
  questionNumber,
  roundNumber,
}: ChoiceFormProps) {
  const [key, setKey] = useState("");
  const [comment, setComment] = useState("");
  const [choice, setChoice] = useState("");
  const [updateQuestion] = useAddChoicesMutation();

  const handleSubmit = async () => {
    if (!choice || !key) {
      window.alert("정답 주제와 선지를 입력해 주십시오");
      return;
    }
    try {
      updateQuestion({
        roundNumber: roundNumber,
        questionNumber: questionNumber,
        choice: { choice, comment, key, choiceType },
      });
      setKey("");
      setComment("");
      setChoice("");
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleKeyChange = (e: any) => {
    setKey(e.target.value);
  };

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleChoiceChange = (e: any) => {
    setChoice(e.target.value);
  };

  return (
    <ChoiceFormGridContainer choiceType={choiceType}>
      <Input.TextArea
        value={key}
        onChange={handleKeyChange}
        style={{
          gridColumn: "1/3",
        }}
        placeholder="정답 주제"
      />
      <Button type="primary" onClick={handleSubmit}>
        추가
      </Button>

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
          style={{
            gridColumn: "1/3",
          }}
        />
      )}
      {choiceType === "Image" ? (
        <Input.TextArea
          value={comment}
          onChange={handleCommentChange}
          placeholder="해설"
        />
      ) : (
        <Input.TextArea
          value={comment}
          onChange={handleCommentChange}
          placeholder="해설"
          style={{
            gridColumn: "1/3",
          }}
        />
      )}
    </ChoiceFormGridContainer>
  );
}

export default ChoiceForm;
