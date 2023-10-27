import { Button, Form, FormInstance, Input, Modal } from "antd";
import { ModalHandler } from "../../../../hooks/useModalHandler";

interface EditRoundModalUIProps {
  modalHandler: ModalHandler;
  form: FormInstance<any>;
  onSubmit: (values: any) => Promise<void>;
  roundNumber?: number;
  roundDate?: number;
}

function EditRoundModalUI({
  modalHandler,
  form,
  onSubmit,
  roundNumber,
  roundDate,
}: EditRoundModalUIProps) {
  const { isModalOpen, closeModal, showModal } = modalHandler;
  return (
    <>
      <Button onClick={showModal}>회차 수정</Button>
      <Modal
        title="회차 수정"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={closeModal}
        footer={null}
        forceRender
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
            initialValue={roundDate}
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

export default EditRoundModalUI;
