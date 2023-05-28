import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddDescriptionMutation } from "../store/api/descriptionApi";

function DescriptionsAutoCompleteModal() {
  const [form] = Form.useForm();
  const { title } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addDescriptions] = useAddDescriptionMutation();
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const { content } = values;
      let text =
        content +
        "\n\n" +
        `위 내용을 바탕으로 ${title}에 대한 4문장 이상 6문장 이하의 문단을 만들어서 알려줘`;
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GPT_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: text,
              },
            ],
          }),
        }
      );
      const data = await response.json();
      let description = data.choices[0].message.content;

      if (typeof title === "string") {
        await addDescriptions({
          contentList: [description],
          topic: title,
        });
      }
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>자동 추가</Button>
      <Modal
        title="자동 보기 추가"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="gpt-form" form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            name="content"
            label="지문"
            rules={[
              {
                required: true,
                message: "지문을 입력해주세요.",
              },
            ]}
          >
            <Input.TextArea rows={10} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ float: "right" }}
            >
              확인
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default DescriptionsAutoCompleteModal;
