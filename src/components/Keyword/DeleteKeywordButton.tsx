import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { mutationErrorNotification } from "../../services/errorNotification";
import { useDeleteKeywordMutation } from "../../store/api/keywordApi";

interface DeleteKeywordButtonProps {
  keywordId: number;
}

function DeleteKeywordButton({ keywordId }: DeleteKeywordButtonProps) {
  const [deleteKeyword] = useDeleteKeywordMutation();

  const handleDelete = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 키워드를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteKeyword(keywordId).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return <DeleteOutlined onClick={handleDelete} />;
}

export default DeleteKeywordButton;
