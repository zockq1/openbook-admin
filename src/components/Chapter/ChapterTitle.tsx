import { Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  useGetChapterTitleQuery,
  useUpdateChapterMutation,
} from "../../store/api/chapterApi";
import { useParams } from "react-router-dom";
import errorMessage from "../../services/errorMessage";

function ChapterTitle() {
  const { chapter } = useParams();
  const { data: currentChapterTitle } = useGetChapterTitleQuery(
    Number(chapter)
  );
  const [chapterTitle, setChapterTitle] = useState(currentChapterTitle?.title);
  const isFirstRender = useRef(true);
  const [updateChapter] = useUpdateChapterMutation();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (
      chapterTitle !== currentChapterTitle?.title &&
      chapterTitle !== undefined
    ) {
      const fetchData = async () => {
        try {
          await updateChapter({
            number: Number(chapter),
            title: chapterTitle,
          }).unwrap();
        } catch (error) {
          errorMessage(error);
        }
      };
      fetchData();
    }
  }, [chapterTitle, chapter, currentChapterTitle, updateChapter]);

  return (
    <Typography.Title
      editable={{
        onChange: setChapterTitle,
      }}
      level={5}
    >
      {currentChapterTitle?.title}
    </Typography.Title>
  );
}
export default ChapterTitle;
