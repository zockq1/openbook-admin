import { Form } from "antd";
import { useState } from "react";
import { useAddChapterMutation } from "../../../../store/api/chapterApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { useNavigate } from "react-router-dom";
import CreateChapterModalUI from "../container/CreateChapterModalUI.container";

function CreateChapterModal() {
  const navigate = useNavigate();
  const [addChapter, { isLoading }] = useAddChapterMutation();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    try {
      const { chapterTitle, chapterNumber, dateComment } = values;
      await addChapter({
        number: chapterNumber,
        title: chapterTitle,
        dateComment: dateComment,
      }).unwrap();
      form.resetFields();
      navigate(`/topic/${chapterNumber}/chapter-info`);
    } catch (error) {
      mutationErrorNotification(error);
    }
    setIsModalOpen(false);
  };

  return (
    <CreateChapterModalUI
      showModal={showModal}
      onSubmit={onSubmit}
      handleCancel={handleCancel}
      form={form}
      isModalOpen={isModalOpen}
      isLoading={isLoading}
    />
  );
}

export default CreateChapterModal;
