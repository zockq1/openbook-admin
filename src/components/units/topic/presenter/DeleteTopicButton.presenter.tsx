import { Modal } from "antd";
import { useDeleteTopicMutation } from "../../../../store/api/topicApi";
import { useNavigate, useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import DeleteTopicButtonUI from "../container/DeleteTopicButtonUI.container";

function DeleteTopicButton() {
  const { chapter, topic } = useParams();
  const chapterNumber = Number(chapter);
  const topicTitle = String(topic);
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
  return <DeleteTopicButtonUI handleDeleteClick={handleDeleteClick} />;
}

export default DeleteTopicButton;
