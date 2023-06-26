import { Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  useGetChapterTitleQuery,
  useUpdateChapterMutation,
} from "../../store/api/chapterApi";
import { useParams } from "react-router-dom";

function ChapterTitle() {
  const { chapter } = useParams();
  const { data: currentChapterTitle } = useGetChapterTitleQuery(
    Number(chapter)
  );
  const [chapterTitle, setChapterTitle] = useState(currentChapterTitle);
  const isFirstRender = useRef(true);
  const [updateChapter] = useUpdateChapterMutation();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (chapterTitle !== currentChapterTitle) {
      const fetchData = async () => {
        try {
          await updateChapter({
            number: Number(chapter),
            title: chapterTitle,
          });
        } catch (error) {
          console.log(error);
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
      {currentChapterTitle}
    </Typography.Title>
  );
}
export default ChapterTitle;
