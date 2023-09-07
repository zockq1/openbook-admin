import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useAddRoundMutation } from "../../store/api/roundApi";
import { mutationErrorNotification } from "../../services/errorNotification";

function CreateRoundModal() {
  const [addRound] = useAddRoundMutation();
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
      const { date, number } = values;
      await addRound({
        date: date,
        number: number,
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
        title="회차 추가"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="round-form"
          form={form}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item
            name="number"
            label="회차"
            rules={[
              {
                required: true,
                message: "회차 입력해주세요.",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="date"
            label="회차 년도"
            rules={[
              {
                required: true,
                message: "회차 년도를 입력해주세요.",
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

export default CreateRoundModal;
