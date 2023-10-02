import { Button, Modal } from "antd";
import { useDeleteTopicMutation } from "../../../store/api/topicApi";
import { useNavigate } from "react-router-dom";
import { mutationErrorNotification } from "../../../services/errorNotification";

interface DeleteTopicProps {
  topicTitle: string;
  chapterNumber: number;
}

function DeleteTopicButton({ topicTitle, chapterNumber }: DeleteTopicProps) {
  const navigate = useNavigate();
  const [deleteTopic] = useDeleteTopicMutation();

  const handleDeleteClick = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteTopic({ title: topicTitle }).unwrap();
          navigate(`/topic/${chapterNumber}/chapter-info`);
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };
  return (
    <Button danger type="primary" onClick={handleDeleteClick}>
      삭제
    </Button>
  );
}

export default DeleteTopicButton;
