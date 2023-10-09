import { Button, Form, FormInstance, Input, Modal } from "antd";
interface CreateChapterModalProps {
  showModal: () => void;
  handleCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  form: FormInstance<any>;
  isModalOpen: boolean;
  isLoading: boolean;
}

function CreateChapterModalUI({
  showModal,
  handleCancel,
  onSubmit,
  form,
  isModalOpen,
  isLoading,
}: CreateChapterModalProps) {
  return (
    <>
      <Button onClick={showModal}>단원 추가</Button>
      <Modal
        title="단원 추가"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={handleCancel}
        footer={null}
        forceRender
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
          <Form.Item name="dateComment" label="년도">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ float: "right" }}
              loading={isLoading}
            >
              저장
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateChapterModalUI;
