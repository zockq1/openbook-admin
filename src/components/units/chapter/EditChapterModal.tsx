import { Button, Form, Input, Modal } from "antd";
import { useUpdateChapterMutation } from "../../../store/api/chapterApi";
import { useEffect, useState } from "react";
import { mutationErrorNotification } from "../../../services/errorNotification";
import { useNavigate } from "react-router-dom";

interface EditChapterModalProps {
  chapterNumber: number;
  title: string;
  dateComment: string;
}

function EditChapterModal({
  chapterNumber,
  title,
  dateComment,
}: EditChapterModalProps) {
  const navigate = useNavigate();
  const [updateChapter] = useUpdateChapterMutation();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    form.setFieldsValue({
      chapterTitle: title,
      chapterNumber: chapterNumber,
      dateComment: dateComment,
    });
  }, [form, title, chapterNumber, dateComment]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    try {
      const {
        chapterTitle: newChapterTitle,
        chapterNumber: newChapterNumber,
        dateComment: newDateComment,
      } = values;
      await updateChapter({
        editedChapter: {
          number: newChapterNumber,
          title: newChapterTitle,
          dateComment: newDateComment,
        },
        currentChapterNumber: chapterNumber,
      }).unwrap();
      navigate(`/topic/${newChapterNumber}/chapter-info`);
    } catch (error) {
      mutationErrorNotification(error);
    }
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button onClick={showModal}>단원 수정</Button>
      <Modal
        title="단원 수정"
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
            initialValue={title}
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
            initialValue={chapterNumber}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="dateComment"
            label="시작 년도"
            rules={[
              {
                required: true,
                message: "년도를 입력해주세요.",
              },
            ]}
            initialValue={dateComment}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              저장
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditChapterModal;
