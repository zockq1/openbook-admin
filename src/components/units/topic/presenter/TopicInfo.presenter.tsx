import { Spin } from "antd";
import TopicInfoUI from "../container/TopicInfoUI.container";
import { useGetTopicQuery } from "../../../../store/api/topicApi";
import { useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";

function TopicInfo() {
  const { topic } = useParams();
  const topicTitle = String(topic);
  const { data: topicInfo, error: topicInfoError } =
    useGetTopicQuery(topicTitle);
  useNotificationErrorList([setError(topicInfoError, "주제 정보")]);

  if (!topicInfo) {
    return <Spin />;
  }
  return <TopicInfoUI topicInfo={topicInfo} />;
}

export default TopicInfo;
