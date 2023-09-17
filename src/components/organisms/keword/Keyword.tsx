import { List, Space, Input, Button, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { KeywordModel } from "../../../types/keywordType";
import { useUpdateKeywordMutation } from "../../../store/api/keywordApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled from "styled-components";
import DeleteKeywordButton from "./DeleteKeywordButton";
const KeywordGridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 32px 100px;
`;

const ImagePreview = styled.img`
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
`;

const KeywordNameBox = styled.div`
  grid-column: 1/3;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 4px 11px;
  overflow: auto;
`;

const KeywordCommentBox = styled.div`
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  padding: 4px 11px;
  overflow: auto;
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

interface KeywordProps {
  data: KeywordModel;
}

function Keyword({ data }: KeywordProps) {
  const [updateKeyword] = useUpdateKeywordMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(data.name);
  const [editComment, setEditComment] = useState(data.comment);
  const [editFile, setEditFile] = useState(data.file);

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
          setEditFile(reader.result.toString());
        }
      };
    }
  };

  const handleEdit = async () => {
    try {
      await updateKeyword({
        name: editName,
        comment: editComment,
        file: editFile,
        id: data.id,
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const onEdit = () => {
    setEditName(data.name);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    handleEdit();
    setIsEditing(false);
  };

  const handleNameChange = (e: any) => {
    setEditName(e.target.value);
  };

  const handleCommentChange = (e: any) => {
    setEditComment(e.target.value);
  };

  return (
    <List.Item
      actions={[
        <Space>
          {!isEditing && <EditOutlined onClick={onEdit} />}
          {isEditing && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button onClick={handleSave}>저장</Button>
              <br />
              <Button onClick={handleCancel}>취소</Button>
            </div>
          )}
          <DeleteKeywordButton keywordId={data.id} />
        </Space>,
      ]}
    >
      {isEditing ? (
        <KeywordGridContainer>
          <Input.TextArea
            value={editName}
            onChange={handleNameChange}
            style={{ gridColumn: "1/3" }}
          />
          <div>
            {editFile ? (
              <ImageFileUploadLabel htmlFor={`${data.id}`}>
                <ImagePreview src={editFile} alt="img" />
              </ImageFileUploadLabel>
            ) : (
              <ImageFileUploadLabel htmlFor={`${data.id}`}>
                <div>+</div>
                <div>이미지 추가</div>
              </ImageFileUploadLabel>
            )}

            <input
              type="file"
              accept="image/*"
              id={`${data.id}`}
              style={{ visibility: "hidden" }}
              onChange={saveImgFile}
              ref={imgRef}
            />
          </div>
          <Input.TextArea value={editComment} onChange={handleCommentChange} />
        </KeywordGridContainer>
      ) : (
        <KeywordGridContainer>
          <KeywordNameBox>{data.name}</KeywordNameBox>
          <Image src={data.file} />
          <KeywordCommentBox>{data.comment}</KeywordCommentBox>
        </KeywordGridContainer>
      )}
    </List.Item>
  );
}

export default Keyword;
