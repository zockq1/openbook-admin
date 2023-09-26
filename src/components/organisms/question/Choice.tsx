import { List, Space, Input, Button, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled from "styled-components";
import ImageUpload from "../../molecules/ImageUpload";
import { ChoiceType } from "../../../types/questionTypes";
import { useUpdateChoiceMutation } from "../../../store/api/choicesApi";
import { GetChoiceModel } from "../../../types/choiceType";
import ChoiceCommentForm from "./ChoiceCommentForm";
import ChoiceCommentList from "./ChoiceCommentList";
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
  data: GetChoiceModel;
  choiceType: ChoiceType;
}

function Choice({ data, choiceType }: ChoiceProps) {
  const [updateChoice] = useUpdateChoiceMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editChoice, setEditChoice] = useState(data.choice);

  const handleEdit = async () => {
    try {
      await updateChoice({
        choiceId: data.choiceId,
        choice: {
          choice: editChoice,
          choiceType,
          choiceNumber: data.choiceNumber,
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

  return (
    <>
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
            {choiceType === "Image" ? (
              <Image src={data.choice} />
            ) : (
              <ChoiceNameBox>{data.choice}</ChoiceNameBox>
            )}
          </ChoiceGridContainer>
        )}
      </List.Item>
      <ChoiceCommentForm choiceId={data.choiceId} />
      <ChoiceCommentList
        choiceId={data.choiceId}
        commentList={data.commentList}
      />
    </>
  );
}

export default Choice;
