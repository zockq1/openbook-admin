import { useParams } from "react-router-dom";
import { List } from "antd";
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
    try {
      await deleteDescription(id);
    } catch (error) {
      console.log(error);
    }
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
