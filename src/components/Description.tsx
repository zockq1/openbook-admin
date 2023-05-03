import { List, Space, Input, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { DescriptionModel } from "../types/descriptionType";

interface DescriptionProps {
  data: DescriptionModel;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

function Description({ data, onEdit, onDelete }: DescriptionProps) {
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
        <Input.TextArea rows={5} value={editContent} onChange={handleChange} />
      ) : (
        <div>{data.content}</div>
      )}
    </List.Item>
  );
}

export default Description;
