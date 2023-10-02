import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { mutationErrorNotification } from "../../../services/errorNotification";
import { useDeleteSentenceMutation } from "../../../store/api/sentenceApi";

interface DeleteSentenceButtonProps {
  sentenceId: number;
}

function DeleteSentenceButton({ sentenceId }: DeleteSentenceButtonProps) {
  const [deleteSentence] = useDeleteSentenceMutation();

  const handleDelete = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 문장을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteSentence(sentenceId).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return <DeleteOutlined onClick={handleDelete} />;
}

export default DeleteSentenceButton;
