import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useAddChapterMutation } from "../../store/api/chapterApi";
import { mutationErrorNotification } from "../../services/errorNotification";

function CreateChapterModal() {
  const [addChapter] = useAddChapterMutation();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    try {
      const { chapterTitle, chapterNumber } = values;
      await addChapter({
        number: chapterNumber,
        title: chapterTitle,
      }).unwrap();
      form.resetFields();
    } catch (error) {
      mutationErrorNotification(error);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} style={{ width: "90%" }}>
        +
      </Button>
      <Modal
        title="단원 추가"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="chapter-form"
          form={form}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item
            name="chapterTitle"
            label="단원명"
            rules={[
              {
                required: true,
                message: "단원명을 입력해주세요.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="chapterNumber"
            label="단원 순서"
            rules={[
              {
                required: true,
                message: "단원 순서를 입력해주세요.",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              저장
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateChapterModal;
