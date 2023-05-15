import { useParams } from "react-router-dom";
import {
  useDeleteChoiceMutation,
  useGetChoicesQuery,
  useUpdateChoiceMutation,
} from "../store/api/choicesApi";
import { List } from "antd";
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
    try {
      await deleteChoice(id);
    } catch (error) {
      console.log(error);
    }
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
