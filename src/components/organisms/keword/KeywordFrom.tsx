import { useState } from "react";
import { useAddKeywordMutation } from "../../../store/api/keywordApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled from "styled-components";
import { Button, Input } from "antd";
import ImageUpload from "../../molecules/ImageUpload";

const KeywordFormGridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100px 1fr 56.23px;
  grid-template-rows: 32px 100px;
`;

interface KeywordFormProps {
  topicTitle: string;
}

function KeywordForm({ topicTitle }: KeywordFormProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [addKeyword] = useAddKeywordMutation();

  const handleSubmit = async () => {
    try {
      addKeyword({
        name,
        comment,
        topic: topicTitle,
        file: imgFile,
      });
      setName("");
      setComment("");
      setImgFile("");
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  return (
    <KeywordFormGridContainer>
      <Input.TextArea
        value={name}
        onChange={handleNameChange}
        style={{
          gridColumn: "1/3",
        }}
        placeholder="키워드"
      />
      <Button type="primary" onClick={handleSubmit}>
        추가
      </Button>

      <ImageUpload
        setImgFile={setImgFile}
        imgFile={imgFile}
        htmlFor="keyword-form"
      />

      <Input.TextArea
        value={comment}
        onChange={handleCommentChange}
        placeholder="설명"
      />
    </KeywordFormGridContainer>
  );
}

export default KeywordForm;
