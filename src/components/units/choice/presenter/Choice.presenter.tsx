import { useState } from "react";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import {
  useAddChoiceCommentMutation,
  useDeleteChoiceCommentMutation,
  useUpdateChoiceMutation,
} from "../../../../store/api/choicesApi";
import { GetChoiceModel } from "../../../../types/choiceType";
import ChoiceUI from "../container/ChoiceUI.container";

interface ChoiceProps {
  choiceInfo: GetChoiceModel;
}

function Choice({ choiceInfo }: ChoiceProps) {
  const [addChoiceComment] = useAddChoiceCommentMutation();
  const [deleteChoiceComment] = useDeleteChoiceCommentMutation();
  const { choice, choiceId, choiceNumber, choiceType } = choiceInfo;
  const [updateChoice] = useUpdateChoiceMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editChoice, setEditChoice] = useState(choice);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
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
    setIsEditing(false);
  };

  const addComment = async (id: number) => {
    try {
      addChoiceComment({
        choiceId,
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
      await deleteChoiceComment({
        choiceId,
        comment: { id },
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <ChoiceUI
      choiceInfo={choiceInfo}
      isEditing={isEditing}
      editChoice={editChoice}
      setEditChoice={setEditChoice}
      onCancel={handleCancel}
      onEdit={handleEdit}
      onSave={handleSave}
      addComment={addComment}
      deleteComment={deleteComment}
    />
  );
}

export default Choice;
