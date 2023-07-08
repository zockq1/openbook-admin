import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { mutationErrorNotification } from "../../services/errorNotification";
import { useDeleteDescriptionMutation } from "../../store/api/descriptionApi";

interface DeleteDescriptionButtonProps {
  descriptionId: number;
}

function DeleteDescriptionButton({
  descriptionId,
}: DeleteDescriptionButtonProps) {
  const [deleteDescription] = useDeleteDescriptionMutation();

  const handleDelete = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 보기를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteDescription(descriptionId).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return <DeleteOutlined onClick={handleDelete} />;
}

export default DeleteDescriptionButton;
