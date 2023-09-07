import { Button, Modal } from "antd";
import { useDeleteQuestionMutation } from "../../store/api/questionApi";
import { useNavigate, useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../services/errorNotification";

function DeleteQuestionButton() {
  const navigate = useNavigate();
  const { question, round } = useParams();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleDeleteClick = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 문제를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteQuestion({
            roundNumber: Number(round),
            questionNumber: Number(question),
          }).unwrap();
          navigate(`/question/${round}`);
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

export default DeleteQuestionButton;
