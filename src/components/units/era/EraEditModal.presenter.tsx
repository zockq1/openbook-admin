import { Form, Modal, Spin } from "antd";
import { useState } from "react";
import {
  useAddEraMutation,
  useDeleteEraMutation,
  useGetEraListQuery,
} from "../../../store/api/eraApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import ItemEditModalUI from "../common/ItemEditModalUI.container";
import useNotificationErrorList from "../../../hooks/useNotificationErrorList";
import setError from "../../../services/setError";

function EraEditModal() {
  const { data: eraList, error: eraListError } = useGetEraListQuery();
  useNotificationErrorList([setError(eraListError, "시대 목록")]);
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
      const { name } = values;
      await addEra(name).unwrap();
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
          await deleteEra(item).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  if (!eraList) {
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
      title="시대"
      itemList={eraList}
    />
  );
}

export default EraEditModal;
