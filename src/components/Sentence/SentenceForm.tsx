import { Button, Input, Space } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../services/errorNotification";
import { useAddSentenceMutation } from "../../store/api/sentenceApi";

function SentenceForm() {
  const [content, setContent] = useState("");
  const [addSentence] = useAddSentenceMutation();
  const { title } = useParams();

  const handleSubmit = async () => {
    if (typeof title === "string") {
      try {
        await addSentence({ name: content, topic: title }).unwrap();
        setContent("");
      } catch (error) {
        mutationErrorNotification(error);
      }
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
