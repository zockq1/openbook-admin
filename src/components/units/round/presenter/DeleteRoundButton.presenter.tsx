import { Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteRoundMutation } from "../../../../store/api/roundApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import DeleteRoundButtonUI from "../container/DeleteRoundButtonUI.container";

function DeleteRoundButton() {
  const { round } = useParams();
  const navigate = useNavigate();
  const [deleteRound, { isLoading }] = useDeleteRoundMutation();

  const handleDelete = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteRound(Number(round)).unwrap();
          navigate(`/question`);
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return <DeleteRoundButtonUI onDelete={handleDelete} isLoading={isLoading} />;
}

export default DeleteRoundButton;
