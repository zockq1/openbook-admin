import { Button, Modal } from "antd";
import { useDeleteRoundMutation } from "../../store/api/roundApi";
import { useNavigate, useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../services/errorNotification";

interface DeleteRoundButtonProps {
  questionListLength: number | undefined;
}
function DeleteRoundButton({ questionListLength }: DeleteRoundButtonProps) {
  const navigate = useNavigate();
  const { round } = useParams();
  const [deleteRound] = useDeleteRoundMutation();

  const handleDelete = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        if (questionListLength === 0) {
          try {
            await deleteRound(Number(round)).unwrap();
            navigate(`/question`);
          } catch (error) {
            mutationErrorNotification(error);
          }
        } else {
          window.alert("해당 회차에 문제가 없을 때만 삭제 가능합니다.!");
        }
      },
    });
  };

  return (
    <Button
      danger
      type="primary"
      onClick={handleDelete}
      style={{ width: "90%" }}
    >
      현재 회차 삭제
    </Button>
  );
}

export default DeleteRoundButton;
