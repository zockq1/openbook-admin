import { Typography } from "antd";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useUpdateChapterMutation } from "../store/api/chapterApi";
import { useParams } from "react-router-dom";
import { setChapter } from "../store/slices/chapterSlice";

function ChapterTitle() {
  const dispatch = useDispatch();
  const { currentChapterTitle } = useSelector(
    (state: RootState) => state.chapter
  );
  const [chapterTitle, setChapterTitle] = useState(currentChapterTitle);
  const isFirstRender = useRef(true);
  const [updateChapter] = useUpdateChapterMutation();
  const { chapter } = useParams();

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
          dispatch(
            setChapter({
              title: chapterTitle || "",
              number: Number(chapter),
            })
          );
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [chapterTitle]);

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
