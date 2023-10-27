import { useState } from "react";
import {
  useAddDescriptionCommentMutation,
  useDeleteDescriptionCommentMutation,
  useGetDescriptionQuery,
  useUpdateDescriptionMutation,
} from "../../../../store/api/descriptionApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import DescriptionUI from "../container/DescriptionUI.container";
import { useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";

function Description() {
  const { round, question } = useParams();
  const questionNumber = Number(question);
  const roundNumber = Number(round);
  const [updateDescription] = useUpdateDescriptionMutation();
  const [addDescriptionComment] = useAddDescriptionCommentMutation();
  const [deleteDescriptionComment] = useDeleteDescriptionCommentMutation();
  const { data: descriptionInfo, error: descriptionInfoError } =
    useGetDescriptionQuery({ questionNumber, roundNumber });
  const [isEditing, setIsEditing] = useState(false);
  useNotificationErrorList([setError(descriptionInfoError, "보기")]);

  const [newDescription, setNewDescription] = useState<string>("");

  if (!descriptionInfo) return <></>;
  const { description, descriptionId, commentList } = descriptionInfo;

  const handleEdit = async () => {
    setNewDescription(description);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateDescription({
        descriptionId,
        description: newDescription,
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewDescription(description);
    setIsEditing(false);
  };

  const addComment = async (id: number) => {
    try {
      addDescriptionComment({
        descriptionId,
        comment: {
          id,
        },
      }).unwrap();
      return true;
    } catch (error) {
      mutationErrorNotification(error);
      return false;
    }
  };

  const deleteComment = async (id: number) => {
    try {
      await deleteDescriptionComment({
        descriptionId,
        comment: { id },
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <DescriptionUI
      description={description}
      newDescription={newDescription}
      setNewDescription={setNewDescription}
      onCancel={handleCancel}
      onEdit={handleEdit}
      onSave={handleSave}
      isEditing={isEditing}
      addComment={addComment}
      deleteComment={deleteComment}
      commentList={commentList}
    />
  );
}

export default Description;
