import { Spin } from "antd";
import TopicInfoUI from "../container/TopicInfoUI.container";
import { useGetTopicQuery } from "../../../../store/api/topicApi";
import { useNavigate, useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useGetKeywordListQuery } from "../../../../store/api/keywordApi";

function TopicInfo() {
  const navigate = useNavigate();
  const { topic, chapter } = useParams();
  const topicTitle = String(topic);
  const { data: topicInfo, error: topicInfoError } =
    useGetTopicQuery(topicTitle);
  const { data: keywordList, error: keywordListError } =
    useGetKeywordListQuery(topicTitle);
  useNotificationErrorList([
    setError(topicInfoError, "주제 정보"),
    setError(keywordListError, "키워드 목록"),
  ]);
  const toEditTopic = () => {
    navigate(`/topic/${chapter}/${topicTitle}/edit-topic`);
  };

  if (!topicInfo || !keywordList) {
    return <Spin />;
  }

  return (
    <TopicInfoUI
      topicInfo={topicInfo}
      keywordList={keywordList}
      toEditTopic={toEditTopic}
    />
  );
}

export default TopicInfo;
