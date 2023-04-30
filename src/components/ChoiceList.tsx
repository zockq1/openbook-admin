import { useParams } from "react-router-dom";
import {
  useDeleteChoiceMutation,
  useGetChoicesQuery,
  useUpdateChoiceMutation,
} from "../store/api/choicesApi";
import { List } from "antd";
import Choice from "./Choice";
import { updateChoiceModel } from "../types/choiceType";

function ChoiceList() {
  let { title } = useParams();
  const { data } = useGetChoicesQuery(title || "");
  const [updateChoice] = useUpdateChoiceMutation();
  const [deleteChoice] = useDeleteChoiceMutation();

  const handleEdit = async (id: number, content: string) => {
    try {
      const newChoice: updateChoiceModel = {
        choiceList: [{ content, id }],
      };
      await updateChoice(newChoice);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteChoice([id]);
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
