import { useNavigate, useParams } from "react-router-dom";
import ChapterInfoUI from "../container/ChpaterInfoUI.container";
import { useGetChapterInfoQuery } from "../../../../store/api/chapterApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { Spin } from "antd";

function ChapterInfo() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const chapterNumber = Number(chapter);
  const { data: chapterInfo, error: chapterInfoError } =
    useGetChapterInfoQuery(chapterNumber);
  useNotificationErrorList([setError(chapterInfoError, "단원 정보")]);

  const toChapterInfoEdit = () => {
    navigate(`/topic/${chapter}/edit-chapter`);
  };

  if (!chapterInfo) {
    return <Spin />;
  }

  return (
    <ChapterInfoUI
      chapterInfo={chapterInfo}
      toChapterInfoEdit={toChapterInfoEdit}
    />
  );
}

export default ChapterInfo;
