import { Button, Input, Space } from "antd";
import { useState } from "react";
import { useAddChoicesMutation } from "../store/api/choicesApi";
import { useParams } from "react-router-dom";

function ChoiceForm() {
  const [content, setContent] = useState("");
  const [addChoices] = useAddChoicesMutation();
  const { title } = useParams();

  const handleSubmit = async () => {
    if (typeof title === "string") {
      try {
        await addChoices({ choiceArr: [content], topicTitle: title });
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
      <Input value={content} onChange={handleChange} />
      <Button type="primary" onClick={handleSubmit}>
        추가
      </Button>
    </Space.Compact>
  );
}

export default ChoiceForm;
