import { useRef, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../services/errorNotification";
import { Button, Input, Space } from "antd";
import { useUpdateQuestionMutation } from "../../store/api/questionApi";
import { QuestionModel } from "../../types/questionTypes";

const ChoiceFormGridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100px 1fr 56.23px;
  grid-template-rows: 32px 100px;
`;

const ImageFileUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
`;
const ImagePreview = styled.img`
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

interface ChoiceFormProps {
  questionInfo: QuestionModel;
}

function ImageChoiceForm({ questionInfo }: ChoiceFormProps) {
  const { round } = useParams();
  const [updateTopic] = useUpdateQuestionMutation();
  const [key, setKey] = useState("");
  const [comment, setComment] = useState("");
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    if (
      imgRef.current &&
      imgRef.current.files &&
      imgRef.current.files.length === 1
    ) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setImgFile(reader.result.toString());
        }
      };
    }
  };

  const handleSubmit = async () => {
    try {
      let newQuestion: QuestionModel = {
        number: questionInfo.number,
        description: questionInfo.description,
        descriptionComment: questionInfo.descriptionComment,
        answer: questionInfo.answer,
        score: questionInfo.score,
        choiceList: [
          ...questionInfo.choiceList,
          { choice: imgFile, comment: comment, key: key },
        ],
        choiceType: questionInfo.choiceType,
      };
      updateTopic({
        roundNumber: Number(round),
        currentQuestionNumber: questionInfo.number,
        updatedQuestion: newQuestion,
      });
      setKey("");
      setComment("");
      setImgFile("");
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
  return (
    <Space.Compact style={{ width: "100%" }}>
      <ChoiceFormGridContainer>
        <Input.TextArea
          placeholder="주제"
          value={key}
          onChange={handleKeyChange}
          style={{
            gridColumn: "1/3",
          }}
        />
        <Button type="primary" onClick={handleSubmit}>
          추가
        </Button>

        <div>
          {imgFile ? (
            <ImageFileUploadLabel htmlFor="imgFileUpload">
              <ImagePreview src={imgFile} alt="img" />
            </ImageFileUploadLabel>
          ) : (
            <ImageFileUploadLabel htmlFor="imgFileUpload">
              <div>+</div>
              <div>이미지 추가</div>
            </ImageFileUploadLabel>
          )}

          <input
            type="file"
            accept="image/*"
            id="imgFileUpload"
            style={{ visibility: "hidden" }}
            onChange={saveImgFile}
            ref={imgRef}
          />
        </div>
        <Input.TextArea
          placeholder="해설"
          value={comment}
          onChange={handleCommentChange}
        />
      </ChoiceFormGridContainer>
    </Space.Compact>
  );
}

const StringChoiceFormGridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 56.23px;
  grid-template-rows: 1fr 1fr 1fr;
`;

function StringChoiceForm({ questionInfo }: ChoiceFormProps) {
  const { round } = useParams();
  const [updateTopic] = useUpdateQuestionMutation();
  const [key, setKey] = useState("");
  const [comment, setComment] = useState("");
  const [choice, setChoice] = useState("");

  const handleSubmit = async () => {
    try {
      let newQuestion: QuestionModel = {
        number: questionInfo.number,
        description: questionInfo.description,
        descriptionComment: questionInfo.descriptionComment,
        answer: questionInfo.answer,
        score: questionInfo.score,
        choiceList: [
          ...questionInfo.choiceList,
          { choice: choice, comment: comment, key: key },
        ],
        choiceType: questionInfo.choiceType,
      };
      updateTopic({
        roundNumber: Number(round),
        currentQuestionNumber: questionInfo.number,
        updatedQuestion: newQuestion,
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
    <Space.Compact style={{ width: "100%" }}>
      <StringChoiceFormGridContainer>
        <Input.TextArea
          placeholder="주제"
          value={key}
          onChange={handleKeyChange}
        />
        <Button type="primary" onClick={handleSubmit}>
          추가
        </Button>

        <Input.TextArea
          placeholder="선지"
          value={choice}
          onChange={handleChoiceChange}
        />
        <div></div>
        <Input.TextArea
          placeholder="해설"
          value={comment}
          onChange={handleCommentChange}
        />
      </StringChoiceFormGridContainer>
    </Space.Compact>
  );
}

export { ImageChoiceForm, StringChoiceForm };
