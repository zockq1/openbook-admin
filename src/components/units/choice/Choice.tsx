import { List, Space, Input, Button, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled from "styled-components";
import ImageUpload from "../../commons/ImageUpload";
import { ChoiceType } from "../../../types/questionTypes";
import {
  useAddChoiceCommentMutation,
  useDeleteChoiceCommentMutation,
  useUpdateChoiceMutation,
} from "../../../store/api/choicesApi";
import { GetChoiceModel } from "../../../types/choiceType";
import ContentBox from "../../commons/ContentBox";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import { CommentType } from "../../../types/descriptionType";
interface ChoiceFormGridContainerProps {
  choiceType: ChoiceType;
}

const ChoiceGridContainer = styled.div<ChoiceFormGridContainerProps>`
  width: 100%;
`;

const ChoiceNameBox = styled.div`
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 4px 11px;
  overflow: auto;
`;

interface ChoiceProps {
  choiceInfo: GetChoiceModel;
}

function Choice({ choiceInfo }: ChoiceProps) {
  const [addChoiceComment] = useAddChoiceCommentMutation();
  const [deleteChoiceComment] = useDeleteChoiceCommentMutation();
  const { choice, choiceId, choiceNumber, commentList, choiceType } =
    choiceInfo;
  const [updateChoice] = useUpdateChoiceMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editChoice, setEditChoice] = useState(choice);

  const handleEdit = async () => {
    try {
      console.log("수정");
      await updateChoice({
        choiceId,
        choice: {
          choice: editChoice,
          choiceType,
          choiceNumber,
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

  const handleChoiceChange = (e: any) => {
    setEditChoice(e.target.value);
  };

  const addComment = async (id: number, type: CommentType) => {
    try {
      addChoiceComment({
        choiceId,
        comment: {
          type,
          id,
        },
      }).unwrap();
      return true;
    } catch (error) {
      mutationErrorNotification(error);
      return false;
    }
  };

  const deleteComment = async (id: number, type: CommentType) => {
    try {
      await deleteChoiceComment({
        choiceId,
        comment: { id, type },
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <ContentBox title={choiceNumber + "번 선지"}>
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
          </Space>,
        ]}
      >
        {isEditing ? (
          <ChoiceGridContainer choiceType={choiceType}>
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
              />
            )}
          </ChoiceGridContainer>
        ) : (
          <ChoiceGridContainer choiceType={choiceType}>
            {}
            {choiceType === "Image" ? (
              <Image src={choice} />
            ) : (
              <ChoiceNameBox>{choice}</ChoiceNameBox>
            )}
          </ChoiceGridContainer>
        )}
      </List.Item>
      <CommentForm addComment={addComment} />
      <CommentList commentList={commentList} deleteComment={deleteComment} />
    </ContentBox>
  );
}

export default Choice;
