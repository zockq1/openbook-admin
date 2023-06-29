import { useParams } from "react-router-dom";
import {
  useDeleteChoiceMutation,
  useGetChoicesQuery,
  useUpdateChoiceMutation,
} from "../../store/api/choicesApi";
import { List, Modal } from "antd";
import Choice from "./Choice";

function ChoiceList() {
  const { title } = useParams();
  const { data } = useGetChoicesQuery(title || "");
  const [updateChoice] = useUpdateChoiceMutation();
  const [deleteChoice] = useDeleteChoiceMutation();

  const handleEdit = async (id: number, content: string) => {
    try {
      await updateChoice({ id, content });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 선지를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteChoice(id);
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
        <Choice data={item} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    />
  );
}

export default ChoiceList;
