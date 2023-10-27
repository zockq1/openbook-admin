import { Modal } from "antd";
import { useDeleteQuestionMutation } from "../../../../store/api/questionApi";
import { useNavigate, useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import DeleteQuestionButtonUI from "../container/DeleteQuestionButtonUI.container";

function DeleteQuestionButton() {
  const navigate = useNavigate();
  const { round, question } = useParams();
  const questionNumber = Number(question);
  const roundNumber = Number(round);
  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleDelete = async () => {
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
          navigate(`/exam/${roundNumber}/question-list`);
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return <DeleteQuestionButtonUI onDelete={handleDelete} />;
}

export default DeleteQuestionButton;
