import { useEffect } from "react";
import { Button, Card } from "antd";
import {
  useGetChapterInfoQuery,
  useGetChapterTitleQuery,
} from "../../store/api/chapterApi";
import { queryErrorNotification } from "../../services/errorNotification";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

function ChapterInfo() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const { data: chapterInfo, error: chapterInfoError } = useGetChapterInfoQuery(
    Number(chapter)
  );
  const { data: currentChapterTitle, error: chapterTitleError } =
    useGetChapterTitleQuery(Number(chapter));

  useEffect(() => {
    queryErrorNotification(chapterInfoError, "단원 학습");
  }, [chapterInfoError]);

  useEffect(() => {
    queryErrorNotification(chapterTitleError, "단원 이름");
  }, [chapterTitleError]);

  const handleUpdateClick = () => {
    navigate(`/topic/${chapter}/edit-chapter`);
  };

  return (
    <Card
      title={currentChapterTitle?.title}
      style={{ width: "700px", margin: "0 auto" }}
      extra={
        <div>
          <Button onClick={handleUpdateClick}>수정</Button>
        </div>
      }
    >
      {parse(String(chapterInfo?.content))}
    </Card>
  );
}

export default ChapterInfo;