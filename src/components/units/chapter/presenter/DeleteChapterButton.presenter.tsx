import { Modal } from "antd";
import { useDeleteChapterMutation } from "../../../../store/api/chapterApi";
import { useNavigate, useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import DeleteChapterButtonUI from "../container/DeleteChapterButtonUI.container";
import { useGetChapterTopicListQuery } from "../../../../store/api/topicApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";

function DeleteChapterButton() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const chapterNumber = Number(chapter);
  const { data: topicList, error: topicListError } =
    useGetChapterTopicListQuery(chapterNumber);
  const [deleteChapter, { isLoading }] = useDeleteChapterMutation();
  useNotificationErrorList([setError(topicListError, "주제 목록")]);

  const handleDelete = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        if (!topicList) {
          window.alert("해당 단원에 주제가 있는지 불러오지 못했습니다.");
          return;
        }
        if (topicList.length === 0) {
          try {
            await deleteChapter({ number: chapterNumber }).unwrap();
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
    <DeleteChapterButtonUI handleDelete={handleDelete} isLoading={isLoading} />
  );
}

export default DeleteChapterButton;
