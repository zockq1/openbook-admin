import { Button, Form, FormInstance, Input, Modal } from "antd";
import { ModalHandler } from "../../../../hooks/useModalHandler";

interface CreateRoundModalUIProps {
  modalHandler: ModalHandler;
  form: FormInstance<any>;
  onSubmit: (values: any) => Promise<void>;
}

function CreateRoundModalUI({
  modalHandler,
  onSubmit,
  form,
}: CreateRoundModalUIProps) {
  const { showModal, closeModal, isModalOpen } = modalHandler;
  return (
    <>
      <Button onClick={showModal}>회차 추가</Button>
      <Modal
        title="회차 추가"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={() => {
          form.resetFields();
          closeModal();
        }}
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

export default CreateRoundModalUI;
