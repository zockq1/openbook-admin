import { Button, Form, Input, Modal } from "antd";
import { useParams } from "react-router-dom";
import {
  useGetRoundDateQuery,
  useUpdateRoundMutation,
} from "../../store/api/roundApi";
import { useEffect, useState } from "react";
import {
  mutationErrorNotification,
  queryErrorNotification,
} from "../../services/errorNotification";

function EditRoundModal() {
  const { round } = useParams();
  const { data: currentRoundDate, error: roundDateError } =
    useGetRoundDateQuery(Number(round));
  const [updateRound] = useUpdateRoundMutation();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    queryErrorNotification(roundDateError, "회차 년도");
  }, [roundDateError]);

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
        roundNumber: Number(round),
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>수정</Button>
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
            initialValue={Number(round)}
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
            initialValue={Number(currentRoundDate)}
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
