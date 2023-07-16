import { List, Space, Input, Button } from "antd";
import { ChoiceModel } from "../../types/choiceType";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useUpdateChoiceMutation } from "../../store/api/choicesApi";
import { mutationErrorNotification } from "../../services/errorNotification";
import DeleteChoiceButton from "./DeleteChoiceButton";

interface ChoiceProps {
  data: ChoiceModel;
}

function Choice({ data }: ChoiceProps) {
  const [updateChoice] = useUpdateChoiceMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(data.content);

  const handleEdit = async () => {
    try {
      await updateChoice({ id: data.id, content: editContent }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditContent(data.content);
    setIsEditing(false);
  };

  const handleSave = () => {
    handleEdit();
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
          <DeleteChoiceButton choiceId={data.id} />
        </Space>,
      ]}
    >
      {isEditing ? (
        <Input value={editContent} onChange={handleChange} />
      ) : (
        <div>{data.content}</div>
      )}
    </List.Item>
  );
}

export default Choice;
