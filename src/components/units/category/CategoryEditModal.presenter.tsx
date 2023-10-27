import { Form, Modal, Spin } from "antd";
import { useState } from "react";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryListQuery,
} from "../../../store/api/categoryApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import ItemEditModalUI from "../common/ItemEditModalUI.container";
import useNotificationErrorList from "../../../hooks/useNotificationErrorList";
import setError from "../../../services/setError";

function CategoryEditModal() {
  const { data: categoryList, error: categoryListError } =
    useGetCategoryListQuery();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  useNotificationErrorList([setError(categoryListError, "분류 목록")]);

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
      const { name } = values;
      await addCategory(name).unwrap();
      form.resetFields();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleDelete = async (item: string) => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteCategory(item).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  if (!categoryList) {
    return <Spin />;
  }

  return (
    <ItemEditModalUI
      handleCancel={handleCancel}
      handleDelete={handleDelete}
      handleOk={handleOk}
      showModal={showModal}
      isModalOpen={isModalOpen}
      onSubmit={onSubmit}
      form={form}
      title="분류"
      itemList={categoryList}
    />
  );
}

export default CategoryEditModal;
