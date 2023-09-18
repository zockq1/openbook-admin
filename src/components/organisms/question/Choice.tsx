import { List, Space, Input, Button, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ChoiceListModel } from "../../../types/choiceType";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled, { css } from "styled-components";
import ImageUpload from "../../molecules/ImageUpload";
import { ChoiceType } from "../../../types/questionTypes";
import { useUpdateChoiceMutation } from "../../../store/api/choicesApi";
interface ChoiceFormGridContainerProps {
  choiceType: ChoiceType;
}

const ChoiceGridContainer = styled.div<ChoiceFormGridContainerProps>`
  display: grid;
  width: 100%;
  ${({ choiceType }) =>
    choiceType === "Image"
      ? css`
          grid-template-columns: 100px 1fr;
          grid-template-rows: 32px 100px;
        `
      : css`
          grid-template-columns: 1fr;
          grid-template-rows: 32px 32px 32px;
        `}
`;

const ChoiceNameBox = styled.div`
  grid-column: 1/3;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 4px 11px;
  overflow: auto;
`;

const ChoiceCommentBox = styled.div`
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  padding: 4px 11px;
  overflow: auto;
`;

interface ChoiceProps {
  data: ChoiceListModel;
  choiceType: ChoiceType;
}

function Choice({ data, choiceType }: ChoiceProps) {
  const [updateChoice] = useUpdateChoiceMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editKey, setEditKey] = useState(data.key);
  const [editComment, setEditComment] = useState(data.comment);
  const [editChoice, setEditChoice] = useState(data.choice);

  const handleEdit = async () => {
    try {
      await updateChoice({
        choiceId: data.id,
        choice: {
          choice: editChoice,
          key: editKey,
          comment: editComment,
          choiceType,
        },
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
    setEditKey(e.target.value);
  };

  const handleCommentChange = (e: any) => {
    setEditComment(e.target.value);
  };

  const handleChoiceChange = (e: any) => {
    setEditChoice(e.target.value);
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
          {/* <DeleteChoiceButton choiceId={data.id} /> */}
        </Space>,
      ]}
    >
      {isEditing ? (
        <ChoiceGridContainer choiceType={choiceType}>
          <Input.TextArea
            value={editKey}
            onChange={handleNameChange}
            style={{ gridColumn: "1/3" }}
            placeholder="키워드"
          />
          {choiceType === "Image" ? (
            <ImageUpload
              setImgFile={setEditChoice}
              imgFile={editChoice}
              htmlFor="choice-form"
            />
          ) : (
            <Input.TextArea
              value={editChoice}
              onChange={handleChoiceChange}
              placeholder="선지"
              style={{
                gridColumn: "1/3",
              }}
            />
          )}
          {choiceType === "Image" ? (
            <Input.TextArea
              value={editComment}
              onChange={handleCommentChange}
              placeholder="해설"
            />
          ) : (
            <Input.TextArea
              value={editComment}
              onChange={handleCommentChange}
              placeholder="해설"
              style={{
                gridColumn: "1/3",
              }}
            />
          )}
        </ChoiceGridContainer>
      ) : (
        <ChoiceGridContainer choiceType={choiceType}>
          <ChoiceNameBox>{data.key}</ChoiceNameBox>
          {choiceType === "Image" ? (
            <Image src={data.choice} />
          ) : (
            <ChoiceNameBox>{data.choice}</ChoiceNameBox>
          )}
          <ChoiceCommentBox>{data.comment}</ChoiceCommentBox>
        </ChoiceGridContainer>
      )}
    </List.Item>
  );
}

export default Choice;
