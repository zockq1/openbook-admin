import { EditOutlined } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import { useState } from "react";
import { useUpdateDescriptionMutation } from "../../../store/api/descriptionApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import ImageUpload from "../../molecules/ImageUpload";
import styled from "styled-components";

const DescriptionImage = styled.div``;

interface DescriptionProps {
  descriptionId: number;
  description: string;
}

function Description({ descriptionId, description }: DescriptionProps) {
  const [updateDescription] = useUpdateDescriptionMutation();
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

  return (
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
  );
}

export default Description;
