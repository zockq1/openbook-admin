import { Button, Modal } from "antd";
import { useDeleteQuestionMutation } from "../../../store/api/questionApi";
import { useNavigate } from "react-router-dom";
import { mutationErrorNotification } from "../../../services/errorNotification";

interface DeleteQuestionButtonProps {
  roundNumber: number;
  questionNumber: number;
}

function DeleteQuestionButton({
  roundNumber,
  questionNumber,
}: DeleteQuestionButtonProps) {
  const navigate = useNavigate();
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
            roundNumber: roundNumber,
            questionNumber: questionNumber,
          }).unwrap();
          navigate(`/question/${roundNumber}/question-list`);
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
