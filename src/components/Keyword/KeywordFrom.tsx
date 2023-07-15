import { Button, Input, Space } from "antd";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAddKeywordMutation } from "../../store/api/keywordApi";
import { mutationErrorNotification } from "../../services/errorNotification";
import styled from "styled-components";

const GridContainer = styled.div`
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

function KeywordForm() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [addKeyword] = useAddKeywordMutation();
  const { title } = useParams();

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
    if (typeof title === "string") {
      try {
        addKeyword({
          name,
          comment,
          topic: title,
          file: imgFile ? imgRef : null,
        });
        setName("");
        setComment("");
        setImgFile("");
      } catch (error) {
        mutationErrorNotification(error);
      }
    }
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };
  return (
    <Space.Compact style={{ width: "100%" }}>
      <GridContainer>
        <Input.TextArea value={name} onChange={handleNameChange} />
        <Input.TextArea
          value={comment}
          onChange={handleCommentChange}
          style={{
            gridRow: "1/3",
            gridColumn: "2/3",
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
      </GridContainer>
    </Space.Compact>
  );
}

export default KeywordForm;
