import { Button, Form, Input, Modal } from "antd";
import { useUpdateRoundMutation } from "../../../store/api/roundApi";
import { useState } from "react";
import { mutationErrorNotification } from "../../../services/errorNotification";
import { RoundDateModel } from "../../../types/roundTypes";

interface EditRoundModalProps {
  roundNumber: number;
  roundDate: RoundDateModel;
}

function EditRoundModal({ roundNumber, roundDate }: EditRoundModalProps) {
  const [updateRound] = useUpdateRoundMutation();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    try {
      const { number, date } = values;
      await updateRound({
        updatedRound: {
          number,
          date,
        },
        roundNumber: roundNumber,
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>회차 수정</Button>
      <Modal
        title="회차 수정"
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
            initialValue={roundNumber}
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
            initialValue={roundDate.date}
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

export default EditRoundModal;
