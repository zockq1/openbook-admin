import { List, Space, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { DescriptionModel } from "../../types/descriptionType";
import DescriptionModal from "./DescriptionModal";
import { useUpdateDescriptionMutation } from "../../store/api/descriptionApi";
import { mutationErrorNotification } from "../../services/errorNotification";
import DeleteDescriptionButton from "./DeleteDescriptionButton";

interface DescriptionProps {
  data: DescriptionModel;
}

function Description({ data }: DescriptionProps) {
  const [updateDescription] = useUpdateDescriptionMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(data.content);

  const handleEdit = async (id: number, content: string) => {
    try {
      await updateDescription({ descriptionId: id, content }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const onEdit = () => {
    setEditContent(data.content);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    handleEdit(data.id, editContent);
    setIsEditing(false);
  };

  const handleChange = (e: any) => {
    setEditContent(e.target.value);
  };

  return (
    <List.Item
      actions={[
        <Space>
          {!isEditing && <EditOutlined onClick={onEdit} />}
          {isEditing && (
            <>
              <Button onClick={handleSave}>저장</Button>
              <Button onClick={handleCancel}>취소</Button>
            </>
          )}
          <DeleteDescriptionButton descriptionId={data.id} />
        </Space>,
      ]}
    >
      {isEditing ? (
        <Input.TextArea rows={5} value={editContent} onChange={handleChange} />
      ) : (
        <DescriptionModal content={data.content} descriptionId={data.id} />
      )}
    </List.Item>
  );
}

export default Description;
