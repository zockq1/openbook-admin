import { List, Space, Input, Button } from "antd";
import { SentenceModel } from "../../../types/sentenceType";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useUpdateSentenceMutation } from "../../../store/api/sentenceApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import DeleteSentenceButton from "./DeleteSentenceButton";

interface SentenceProps {
  data: SentenceModel;
}

function Sentence({ data }: SentenceProps) {
  const [updateSentence] = useUpdateSentenceMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(data.name);

  const handleEdit = async (id: number, name: string) => {
    try {
      await updateSentence({ id, name }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const onEdit = () => {
    setEditContent(data.name);
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
          <DeleteSentenceButton sentenceId={data.id} />
        </Space>,
      ]}
    >
      {isEditing ? (
        <Input value={editContent} onChange={handleChange} />
      ) : (
        <div>{data.name}</div>
      )}
    </List.Item>
  );
}

export default Sentence;
