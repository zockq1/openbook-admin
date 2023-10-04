import { useEffect } from "react";
import {
  useGetChaptersQuery,
  useLazyGetChapterDateQuery,
  useLazyGetChapterInfoQuery,
  useLazyGetChapterTitleQuery,
} from "../../store/api/chapterApi";
import TopicTemplate from "../templates/TopicTemplate";
import { queryErrorNotification } from "../../services/errorNotification";
import { useParams } from "react-router-dom";
import { useLazyGetChapterTopicListQuery } from "../../store/api/topicApi";
import { useLazyGetKeywordListQuery } from "../../store/api/keywordApi";

function TopicPage() {
  const { chapter, topic } = useParams();
  const { data: chapterList, error: chapterError } = useGetChaptersQuery();
  const [
    getChapterTitleTrigger,
    { data: chapterTitle, error: chapterTitleError },
  ] = useLazyGetChapterTitleQuery();
  const [
    getChapterDateTrigger,
    { data: chapterDate, error: chapterDateError },
  ] = useLazyGetChapterDateQuery();
  const [
    getChapterInfoTrigger,
    { data: chapterInfo, error: chapterInfoError },
  ] = useLazyGetChapterInfoQuery();
  const [getTopicListTrigger, { data: topicList, error: topicListError }] =
    useLazyGetChapterTopicListQuery();
  const [
    getKeywordListTrigger,
    { data: keywordList, error: keywordListError },
  ] = useLazyGetKeywordListQuery();

  useEffect(() => {
    if (chapter) {
      getTopicListTrigger(Number(chapter));
      getChapterTitleTrigger(Number(chapter));
      getChapterDateTrigger(Number(chapter));
      getChapterInfoTrigger(Number(chapter));
    }
  }, [
    chapter,
    getTopicListTrigger,
    getChapterDateTrigger,
    getChapterTitleTrigger,
    getChapterInfoTrigger,
  ]);

  useEffect(() => {
    if (topic) {
      getKeywordListTrigger(topic);
    }
  }, [topic, getKeywordListTrigger]);

  useEffect(() => {
    if (chapterInfoError) {
      queryErrorNotification(chapterInfoError, "단원 학습");
    }
  }, [chapterInfoError]);

  useEffect(() => {
    if (chapterTitleError) {
      queryErrorNotification(chapterTitleError, "단원 제목");
    }
  }, [chapterTitleError]);

  useEffect(() => {
    if (chapterDateError) {
      queryErrorNotification(chapterDateError, "단원 년도");
    }
  }, [chapterDateError]);

  useEffect(() => {
    if (keywordListError) {
      queryErrorNotification(keywordListError, "키워드 목록");
    }
  }, [keywordListError]);

  useEffect(() => {
    if (topicListError) {
      queryErrorNotification(topicListError, "주제 목록");
    }
  }, [topicListError]);

  useEffect(() => {
    if (chapterError) {
      queryErrorNotification(chapterError, "단원 목록");
    }
  }, [chapterError]);

  return (
    <TopicTemplate
      chapterList={chapterList}
      topicList={
        topicList
          ? [...topicList].sort((a, b) => a.number - b.number)
          : undefined
      }
      chapterTitle={chapterTitle}
      chapterDate={chapterDate}
      chapterInfo={chapterInfo}
      keywordList={keywordList}
    />
  );
}

export default TopicPage;
