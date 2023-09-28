import { EditOutlined } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import { useState } from "react";
import {
  useAddDescriptionCommentMutation,
  useDeleteDescriptionCommentMutation,
  useUpdateDescriptionMutation,
} from "../../../store/api/descriptionApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import ImageUpload from "../../molecules/ImageUpload";
import styled from "styled-components";
import {
  CommentType,
  GetDescriptionModel,
} from "../../../types/descriptionType";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";

const DescriptionImage = styled.div``;

interface DescriptionProps {
  descriptionInfo: GetDescriptionModel;
}

function Description({ descriptionInfo }: DescriptionProps) {
  const [updateDescription] = useUpdateDescriptionMutation();
  const [addDescriptionComment] = useAddDescriptionCommentMutation();
  const [deleteDescriptionComment] = useDeleteDescriptionCommentMutation();
  const { commentList, descriptionId, description } = descriptionInfo;
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState<string>(description);

  const handleEdit = async () => {
    try {
      await updateDescription({
        descriptionId,
        description: newDescription,
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleSave = () => {
    handleEdit();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewDescription(description);
    setIsEditing(false);
  };

  const addComment = async (id: number, type: CommentType) => {
    try {
      addDescriptionComment({
        descriptionId,
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
      await deleteDescriptionComment({
        descriptionId,
        comment: { id, type },
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <>
      <DescriptionImage>
        <Space style={{ float: "right" }}>
          {!isEditing && <EditOutlined onClick={() => setIsEditing(true)} />}
          {isEditing && (
            <div>
              <Button onClick={handleSave}>저장</Button>
              <Button onClick={handleCancel}>취소</Button>
            </div>
          )}
        </Space>
        {isEditing ? (
          <ImageUpload
            setImgFile={setNewDescription}
            imgFile={newDescription}
            htmlFor="edit-description"
          />
        ) : (
          <Image width="100%" src={description} />
        )}
      </DescriptionImage>
      <CommentForm addComment={addComment} />
      <CommentList commentList={commentList} deleteComment={deleteComment} />
    </>
  );
}

export default Description;
