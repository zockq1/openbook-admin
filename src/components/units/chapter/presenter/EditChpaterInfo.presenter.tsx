import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetChapterInfoQuery,
  useUpdateChapterInfoMutation,
} from "../../../../store/api/chapterApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import EditChapterInfoUI from "../container/EditChapterInfoUI.container";

function EditChapterInfo() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const chapterNumber = Number(chapter);
  const { data: chapterInfo, error: chapterInfoError } =
    useGetChapterInfoQuery(chapterNumber);
  useNotificationErrorList([setError(chapterInfoError, "단원 정보")]);
  const [updateChapterInfo] = useUpdateChapterInfoMutation();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (chapterInfo) {
      setContent(String(chapterInfo.content));
    }
  }, [chapterInfo, setContent]);

  const handleSubmit = async () => {
    try {
      await updateChapterInfo({
        chapterNumber: chapterNumber,
        content: content,
      }).unwrap();
      navigate(`/topic/${chapterNumber}/chapter-info`);
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <EditChapterInfoUI
      handleSubmit={handleSubmit}
      content={content}
      setContent={setContent}
    />
  );
}

export default EditChapterInfo;
