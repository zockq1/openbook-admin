import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  useGetChapterDateQuery,
  useGetChapterTitleQuery,
  useUpdateChapterMutation,
} from "../../store/api/chapterApi";
import { useParams } from "react-router-dom";
import {
  mutationErrorNotification,
  queryErrorNotification,
} from "../../services/errorNotification";
import Title from "antd/es/typography/Title";

function ChapterTitle() {
  const { chapter } = useParams();
  const { data: currentChapterTitle, error: chapterTitleError } =
    useGetChapterTitleQuery(Number(chapter));
  const { data: currentChapterDate, error: chapterDateError } =
    useGetChapterDateQuery(Number(chapter));
  const [updateChapter] = useUpdateChapterMutation();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    queryErrorNotification(chapterTitleError, "단원 이름");
    queryErrorNotification(chapterDateError, "단원 년도");
  }, [chapterTitleError, chapterDateError]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    try {
      const { chapterTitle, chapterNumber, startDate, endDate } = values;
      await updateChapter({
        editedChapter: {
          number: chapterNumber,
          title: chapterTitle,
          startDate: startDate ? startDate : null,
          endDate: endDate ? endDate : null,
        },
        currentChapterNumber: Number(chapter),
      }).unwrap();
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
      <Title
        level={5}
        style={{
          margin: "5px",
        }}
      >
        {currentChapterTitle?.title}
      </Title>
      <Button onClick={showModal}>수정</Button>
      <Modal
        title="단원 수정"
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
            initialValue={currentChapterTitle?.title}
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
            initialValue={Number(chapter)}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="시작 년도"
            initialValue={currentChapterDate?.startDate}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="종료 년도"
            initialValue={currentChapterDate?.endDate}
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
    </div>
  );
}
export default ChapterTitle;
