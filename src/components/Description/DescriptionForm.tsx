import { Button, Input, Space } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddDescriptionMutation } from "../../store/api/descriptionApi";

function DescriptionForm() {
  const [content, setContent] = useState("");
  const [addDescription] = useAddDescriptionMutation();
  const { title } = useParams();

  const handleSubmit = async () => {
    if (typeof title === "string") {
      try {
        await addDescription({ contentList: [content], topicTitle: title });
        setContent("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e: any) => {
    setContent(e.target.value);
  };
  return (
    <Space.Compact style={{ width: "100%" }}>
      <Input.TextArea rows={5} value={content} onChange={handleChange} />
      <Button type="primary" onClick={handleSubmit}>
        추가
      </Button>
    </Space.Compact>
  );
}

export default DescriptionForm;
