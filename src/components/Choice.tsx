import { List, Space, Input, Button } from "antd";
import { ChoiceModel } from "../types/choiceType";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";

interface ChoiceProps {
  data: ChoiceModel;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

function Choice({ data, onEdit, onDelete }: ChoiceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(data.content);

  const handleEdit = () => {
    setEditContent(data.content);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    onEdit(data.id, editContent);
    setIsEditing(false);
  };

  const handleChange = (e: any) => {
    setEditContent(e.target.value);
  };

  return (
    <List.Item
      actions={[
        <Space>
          {!isEditing && <EditOutlined onClick={handleEdit} />}
          {isEditing && (
            <>
              <Button onClick={handleSave}>저장</Button>
              <Button onClick={handleCancel}>취소</Button>
            </>
          )}
          <DeleteOutlined onClick={() => onDelete(data.id)} />
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
