import { Button, Form, Input, Modal, Space } from "antd";
import { useState } from "react";
import {
  useAddEraMutation,
  useDeleteEraMutation,
} from "../../../store/api/eraApi";
import { EraModel } from "../../../types/eraType";
import { mutationErrorNotification } from "../../../services/errorNotification";

interface EraEditModalProps {
  eraList: EraModel[];
}

function EraEditModal({ eraList }: EraEditModalProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEra] = useAddEraMutation();
  const [deleteEra] = useDeleteEraMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    try {
      const { eraName } = values;
      await addEra(eraName).unwrap();
      form.resetFields();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleDelete = async (era: string) => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteEra(era).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return (
    <div style={{ display: "inline", marginLeft: "20px" }}>
      <Button type="primary" onClick={showModal}>
        시대 설정
      </Button>
      <Modal
        title="시대 설정"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="era-form" form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            name="eraName"
            label="시대명"
            rules={[
              {
                required: true,
                message: "분류명을 입력해주세요.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              저장
            </Button>
          </Form.Item>
        </Form>
        {eraList.map((era: EraModel) => (
          <Space key={era.name}>
            <span style={{ fontSize: 18 }}>{era.name}</span>
            <Button onClick={() => handleDelete(era.name)} danger>
              삭제
            </Button>
            <span> </span>
          </Space>
        ))}
      </Modal>
    </div>
  );
}

export default EraEditModal;
