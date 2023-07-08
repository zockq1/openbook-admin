import { Button, Modal } from "antd";
import { useDeleteChapterMutation } from "../../store/api/chapterApi";
import { useNavigate, useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../services/errorNotification";

interface DeleteChapterButtonProps {
  topicListLength: number | undefined;
}
function DeleteChapterButton({ topicListLength }: DeleteChapterButtonProps) {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const [deleteChapter] = useDeleteChapterMutation();

  const handleDelete = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        if (topicListLength === 0) {
          try {
            await deleteChapter({ number: Number(chapter) }).unwrap();
            navigate(`/topic`);
          } catch (error) {
            mutationErrorNotification(error);
          }
        } else {
          window.alert("해당 단원에 주제가 없을 때만 삭제 가능합니다.!");
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
      현재 단원 삭제
    </Button>
  );
}

export default DeleteChapterButton;
