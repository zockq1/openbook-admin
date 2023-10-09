import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTopicQuery,
  useUpdateTopicMutation,
} from "../../../../store/api/topicApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { ExtraDateModel, TopicModel } from "../../../../types/topicTypes";
import { Spin } from "antd";
import TopicFormUI from "../container/TopicFormUI.container";
import { useGetCategoryListQuery } from "../../../../store/api/categoryApi";
import { useGetEraListQuery } from "../../../../store/api/eraApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useGetChaptersQuery } from "../../../../store/api/chapterApi";

function EditTopic() {
  const navigate = useNavigate();
  const { topic } = useParams();
  const topicTitle = String(topic);
  const [updateTopic, { isLoading }] = useUpdateTopicMutation();
  const { data: chapterList, error: chapterError } = useGetChaptersQuery();
  const { data: topicInfo, error: topicInfoError } =
    useGetTopicQuery(topicTitle);
  const { data: categoryList, error: categoryListError } =
    useGetCategoryListQuery();
  const { data: eraList, error: eraListError } = useGetEraListQuery();
  useNotificationErrorList([
    setError(categoryListError, "분류 목록"),
    setError(eraListError, "시대 목록"),
    setError(topicInfoError, "주제 정보"),
    setError(chapterError, "단원 목록"),
  ]);

  const onFinish = async (values: any) => {
    if (!topicInfo) return;
    const {
      chapter,
      title,
      category,
      era,
      detail,
      dateComment,
      extraDateList,
    } = values;

    let updatedTopic: TopicModel = {
      chapter,
      title,
      category,
      era,
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
      await updateTopic({ updatedTopic, title: topicTitle }).unwrap();
      navigate(`/topic/${chapter}/${title}/topic-info`);
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  if (!categoryList || !eraList || !topicInfo || !chapterList) {
    return <Spin />;
  }

  return (
    <TopicFormUI
      onFinish={onFinish}
      categoryList={categoryList}
      eraList={eraList}
      chapterList={[...chapterList].sort((a, b) => a.number - b.number)}
      initialValue={topicInfo}
      isLoading={isLoading}
    />
  );
}

export default EditTopic;
