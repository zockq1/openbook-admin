import { Button, Modal } from "antd";
import { useDeleteTopicMutation } from "../../store/api/topicApi";
import { useNavigate, useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../services/errorNotification";

function DeleteTopic() {
  const navigate = useNavigate();
  const { title, chapter } = useParams();
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
          await deleteTopic({ title }).unwrap();
          navigate(`/topic/${chapter}`);
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

export default DeleteTopic;
