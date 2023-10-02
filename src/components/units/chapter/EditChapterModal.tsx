import { Button, Form, Input, Modal } from "antd";
import { useUpdateChapterMutation } from "../../../store/api/chapterApi";
import { useEffect, useState } from "react";
import { mutationErrorNotification } from "../../../services/errorNotification";
import { useNavigate } from "react-router-dom";

interface EditChapterModalProps {
  chapterNumber: number;
  title: string;
  startDate: number | null;
  endDate: number | null;
}

function EditChapterModal({
  chapterNumber,
  title,
  startDate,
  endDate,
}: EditChapterModalProps) {
  const navigate = useNavigate();
  const [updateChapter] = useUpdateChapterMutation();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    form.setFieldsValue({
      chapterTitle: title,
      chapterNumber: chapterNumber,
      startDate: startDate,
      endDate: endDate,
    });
  }, [form, title, chapterNumber, startDate, endDate]);

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
        startDate: newStartDate,
        endDate: newEndDate,
      } = values;
      await updateChapter({
        editedChapter: {
          number: newChapterNumber,
          title: newChapterTitle,
          startDate: newStartDate ? newStartDate : null,
          endDate: newStartDate ? newEndDate : null,
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
            name="startDate"
            label="시작 년도"
            initialValue={startDate}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="endDate" label="종료 년도" initialValue={endDate}>
            <Input type="number" />
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
