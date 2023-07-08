import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { mutationErrorNotification } from "../../services/errorNotification";
import { useDeleteChoiceMutation } from "../../store/api/choicesApi";

interface DeleteChoiceButtonProps {
  choiceId: number;
}

function DeleteChoiceButton({ choiceId }: DeleteChoiceButtonProps) {
  const [deleteChoice] = useDeleteChoiceMutation();

  const handleDelete = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 선지를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteChoice(choiceId).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return <DeleteOutlined onClick={handleDelete} />;
}

export default DeleteChoiceButton;
