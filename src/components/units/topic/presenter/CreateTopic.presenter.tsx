import { useNavigate, useParams } from "react-router-dom";
import {
  useAddTopicMutation,
  useGetChapterTopicListQuery,
} from "../../../../store/api/topicApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import {
  AddTopicModel,
  ExtraDateModel,
  TopicFormModel,
} from "../../../../types/topicTypes";
import { Spin } from "antd";
import TopicFormUI from "../container/TopicFormUI.container";
import { useGetChaptersQuery } from "../../../../store/api/chapterApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useGetQuestionCategoryListQuery } from "../../../../store/api/questionCategoryApi";

function CreateTopic() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const chapterNumber = Number(chapter);
  const [addTopic, { isLoading }] = useAddTopicMutation();
  const { data: chapterList, error: chapterError } = useGetChaptersQuery();
  const { data: questionCategoryList, error: questionCategoryListError } =
    useGetQuestionCategoryListQuery();
  const { data: topicList, error: topicListError } =
    useGetChapterTopicListQuery(chapterNumber);

  useNotificationErrorList([
    setError(questionCategoryListError, "문제 분류 목록"),
    setError(chapterError, "단원 목록"),
    setError(topicListError, "주제 목록"),
  ]);

  const onFinish = async (values: TopicFormModel) => {
    if (!topicList) {
      return;
    }
    const {
      chapter,
      title,
      questionCategory,
      detail,
      dateComment,
      extraDateList,
    } = values;

    let newTopic: AddTopicModel = {
      number: topicList.length,
      chapter,
      title,
      questionCategory: { id: questionCategory },
      detail: detail ? detail : "",
      dateComment,
      extraDateList: [],
    };
    if (extraDateList) {
      extraDateList.forEach((item: ExtraDateModel) => {
        const newExtraDate: ExtraDateModel = {
          extraDate: item.extraDate,
          extraDateComment: String(item.extraDateComment),
        };
        newTopic.extraDateList.push(newExtraDate);
      });
    }

    try {
      await addTopic(newTopic).unwrap();
      navigate(`/topic/${chapterNumber}/${values.title}/topic-info`);
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  if (!questionCategoryList || !chapterList || !topicList) {
    return <Spin />;
  }

  return (
    <TopicFormUI
      onFinish={onFinish}
      questionCategoryList={questionCategoryList}
      chapterList={[...chapterList].sort((a, b) => a.number - b.number)}
      initialValue={{
        chapter: chapterNumber,
        questionCategory: { id: null, title: "" },
        dateComment: "",
        detail: "",
        extraDateList: [],
        title: "",
      }}
      isLoading={isLoading}
    />
  );
}

export default CreateTopic;
