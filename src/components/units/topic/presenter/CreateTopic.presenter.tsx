import { useNavigate, useParams } from "react-router-dom";
import { useAddTopicMutation } from "../../../../store/api/topicApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { ExtraDateModel, TopicModel } from "../../../../types/topicTypes";
import { Spin } from "antd";
import { useGetCategoryListQuery } from "../../../../store/api/categoryApi";
import { useGetEraListQuery } from "../../../../store/api/eraApi";
import TopicFormUI from "../container/TopicFormUI.container";
import { useGetChaptersQuery } from "../../../../store/api/chapterApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";

function CreateTopic() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const chapterNumber = Number(chapter);
  const [addTopic, { isLoading }] = useAddTopicMutation();
  const { data: chapterList, error: chapterError } = useGetChaptersQuery();
  const { data: categoryList, error: categoryListError } =
    useGetCategoryListQuery();
  const { data: eraList, error: eraListError } = useGetEraListQuery();

  useNotificationErrorList([
    setError(categoryListError, "분류 목록"),
    setError(eraListError, "시대 목록"),
    setError(chapterError, "단원 목록"),
  ]);

  const onFinish = async (values: any) => {
    const {
      chapter,
      title,
      category,
      era,
      detail,
      dateComment,
      extraDateList,
    } = values;
    let newTopic: TopicModel = {
      chapter,
      title,
      category,
      era,
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

  if (!categoryList || !eraList || !chapterList) {
    return <Spin />;
  }

  return (
    <TopicFormUI
      onFinish={onFinish}
      categoryList={categoryList}
      eraList={eraList}
      chapterList={[...chapterList].sort((a, b) => a.number - b.number)}
      initialValue={{
        chapter: chapterNumber,
        category: "",
        era: "",
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
