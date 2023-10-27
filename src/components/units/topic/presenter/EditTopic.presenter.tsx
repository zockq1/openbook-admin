import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTopicQuery,
  useUpdateTopicMutation,
} from "../../../../store/api/topicApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import {
  AddTopicModel,
  ExtraDateModel,
  TopicFormModel,
} from "../../../../types/topicTypes";
import { Spin } from "antd";
import TopicFormUI from "../container/TopicFormUI.container";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useGetChaptersQuery } from "../../../../store/api/chapterApi";
import { useGetQuestionCategoryListQuery } from "../../../../store/api/questionCategoryApi";

function EditTopic() {
  const navigate = useNavigate();
  const { topic } = useParams();
  const topicTitle = String(topic);
  const [updateTopic, { isLoading }] = useUpdateTopicMutation();
  const { data: questionCategoryList, error: questionCategoryListError } =
    useGetQuestionCategoryListQuery();
  const { data: chapterList, error: chapterError } = useGetChaptersQuery();
  const { data: topicInfo, error: topicInfoError } =
    useGetTopicQuery(topicTitle);
  useNotificationErrorList([
    setError(questionCategoryListError, "문제 분류 목록"),
    setError(topicInfoError, "주제 정보"),
    setError(chapterError, "단원 목록"),
  ]);

  const onFinish = async (values: TopicFormModel) => {
    if (!topicInfo) return;
    const {
      chapter,
      title,
      questionCategory,
      detail,
      dateComment,
      extraDateList,
    } = values;

    let updatedTopic: AddTopicModel = {
      chapter,
      title,
      questionCategory: { id: questionCategory },
      detail: detail ? detail : "",
      dateComment,
      extraDateList: [],
      number: topicInfo.number,
    };

    if (extraDateList) {
      extraDateList.forEach((item: ExtraDateModel) => {
        const newExtraDate: ExtraDateModel = {
          extraDate: item.extraDate,
          extraDateComment: String(item.extraDateComment),
        };
        updatedTopic.extraDateList.push(newExtraDate);
      });
    }

    try {
      await updateTopic({ updatedTopic, prevTitle: topicTitle }).unwrap();
      navigate(`/topic/${chapter}/${title}/topic-info`);
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  if (!questionCategoryList || !topicInfo || !chapterList) {
    return <Spin />;
  }

  return (
    <TopicFormUI
      onFinish={onFinish}
      questionCategoryList={[...questionCategoryList].sort(
        (a, b) => a.number - b.number
      )}
      chapterList={[...chapterList].sort((a, b) => a.number - b.number)}
      initialValue={topicInfo}
      isLoading={isLoading}
    />
  );
}

export default EditTopic;
