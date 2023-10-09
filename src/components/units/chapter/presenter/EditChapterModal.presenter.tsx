import { Form, Spin } from "antd";
import {
  useGetChapterDateQuery,
  useGetChapterTitleQuery,
  useUpdateChapterMutation,
} from "../../../../store/api/chapterApi";
import { useEffect, useState } from "react";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { useNavigate, useParams } from "react-router-dom";
import EditChapterModalUI from "../container/EditChapterModalUI.container";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";

function EditChapterModal() {
  const { chapter } = useParams();
  const chapterNumber = Number(chapter);
  const { data: chapterTitle, error: chapterTitleError } =
    useGetChapterTitleQuery(chapterNumber);
  const { data: dateComment, error: dateCommentError } =
    useGetChapterDateQuery(chapterNumber);
  const navigate = useNavigate();
  const [updateChapter, { isLoading }] = useUpdateChapterMutation();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useNotificationErrorList([
    setError(chapterTitleError, "단원 제목"),
    setError(dateCommentError, "단원 년도"),
  ]);

  useEffect(() => {
    form.setFieldsValue({
      chapterTitle: chapterTitle?.title,
      chapterNumber: chapterNumber,
      dateComment: dateComment?.dateComment,
    });
  }, [form, chapterTitle, chapterNumber, dateComment]);

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

  if (!chapterTitle || !dateComment) {
    return (
      <Form form={form}>
        <Spin />
      </Form>
    );
  }

  return (
    <EditChapterModalUI
      showModal={showModal}
      handleCancel={handleCancel}
      onSubmit={onSubmit}
      isModalOpen={isModalOpen}
      form={form}
      chapterNumber={chapterNumber}
      chapterTitle={chapterTitle.title}
      dateComment={dateComment.dateComment}
      isLoading={isLoading}
    />
  );
}

export default EditChapterModal;
