import { Button, Input, Space } from "antd";
import { useState } from "react";
import { mutationErrorNotification } from "../../../services/errorNotification";
import { useAddSentenceMutation } from "../../../store/api/sentenceApi";

interface SentenceFormProps {
  topicTitle: string;
}

function SentenceForm({ topicTitle }: SentenceFormProps) {
  const [content, setContent] = useState("");
  const [addSentence] = useAddSentenceMutation();

  const handleSubmit = async () => {
    try {
      await addSentence({ name: content, topic: topicTitle }).unwrap();
      setContent("");
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleChange = (e: any) => {
    setContent(e.target.value);
  };
  return (
    <Space.Compact style={{ width: "100%" }}>
      <Input value={content} onChange={handleChange} />
      <Button type="primary" onClick={handleSubmit}>
        추가
      </Button>
    </Space.Compact>
  );
}

export default SentenceForm;
