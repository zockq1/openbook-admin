import { useParams } from "react-router-dom";
import {
  useDeleteChoiceMutation,
  useGetChoicesQuery,
  useUpdateChoiceMutation,
} from "../../store/api/choicesApi";
import { List, Modal } from "antd";
import Choice from "./Choice";
import {
  mutationErrorNotification,
  queryErrorNotification,
} from "../../services/errorNotification";
import { useEffect } from "react";

function ChoiceList() {
  const { title } = useParams();
  const { data: choiceList, error: choiceListError } = useGetChoicesQuery(
    String(title)
  );
  const [updateChoice] = useUpdateChoiceMutation();
  const [deleteChoice] = useDeleteChoiceMutation();

  useEffect(() => {
    queryErrorNotification(choiceListError, "선지 목록");
  }, [choiceListError]);

  const handleEdit = async (id: number, content: string) => {
    try {
      await updateChoice({ id, content }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
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
          await deleteChoice(id).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return (
    <List
      dataSource={choiceList}
      renderItem={(item) => (
        <Choice data={item} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    />
  );
}

export default ChoiceList;
