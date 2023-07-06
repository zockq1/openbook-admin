import { useParams } from "react-router-dom";
import { List, Modal } from "antd";
import {
  useDeleteDescriptionMutation,
  useGetDescriptionsQuery,
  useUpdateDescriptionMutation,
} from "../../store/api/descriptionApi";
import Description from "./Description";
import {
  mutationErrorNotification,
  queryErrorNotification,
} from "../../services/errorNotification";
import { useEffect } from "react";

function DescriptionList() {
  const { title } = useParams();
  const { data: descriptionList, error: descriptionListError } =
    useGetDescriptionsQuery(String(title));
  const [updateDescription] = useUpdateDescriptionMutation();
  const [deleteDescription] = useDeleteDescriptionMutation();

  useEffect(() => {
    queryErrorNotification(descriptionListError, "보기 목록");
  }, [descriptionListError]);

  const handleEdit = async (id: number, content: string) => {
    try {
      await updateDescription({ descriptionId: id, content }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 보기를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteDescription(id).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return (
    <List
      dataSource={descriptionList}
      renderItem={(item) => (
        <Description data={item} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    />
  );
}

export default DescriptionList;
