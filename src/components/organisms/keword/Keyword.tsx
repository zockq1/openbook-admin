import { List, Space, Input, Button, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { KeywordModel } from "../../../types/keywordType";
import { useUpdateKeywordMutation } from "../../../store/api/keywordApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled from "styled-components";
import DeleteKeywordButton from "./DeleteKeywordButton";
import ImageUpload from "../../molecules/ImageUpload";
const KeywordGridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 32px 100px;
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

interface KeywordProps {
  data: KeywordModel;
}

function Keyword({ data }: KeywordProps) {
  const [updateKeyword] = useUpdateKeywordMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(data.name);
  const [editComment, setEditComment] = useState(data.comment);
  const [editFile, setEditFile] = useState(data.file);

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
            placeholder="키워드"
          />
          <ImageUpload
            setImgFile={setEditFile}
            imgFile={editFile}
            htmlFor={data.name}
          />
          <Input.TextArea
            value={editComment}
            onChange={handleCommentChange}
            placeholder="설명"
          />
        </KeywordGridContainer>
      ) : (
        <KeywordGridContainer>
          <KeywordNameBox>{data.name}</KeywordNameBox>
          <Image src={data.file} height="100%" />
          <KeywordCommentBox>{data.comment}</KeywordCommentBox>
        </KeywordGridContainer>
      )}
    </List.Item>
  );
}

export default Keyword;
