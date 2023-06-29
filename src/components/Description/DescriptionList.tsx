import { useParams } from "react-router-dom";
import { List, Modal } from "antd";
import {
  useDeleteDescriptionMutation,
  useGetDescriptionsQuery,
  useUpdateDescriptionMutation,
} from "../../store/api/descriptionApi";
import Description from "./Description";

function DescriptionList() {
  const { title } = useParams();
  const { data } = useGetDescriptionsQuery(title || "");
  const [updateDescription] = useUpdateDescriptionMutation();
  const [deleteDescription] = useDeleteDescriptionMutation();

  const handleEdit = async (id: number, content: string) => {
    try {
      await updateDescription({ descriptionId: id, content });
    } catch (error) {
      console.log(error);
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
          await deleteDescription(id);
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <Description data={item} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    />
  );
}

export default DescriptionList;
