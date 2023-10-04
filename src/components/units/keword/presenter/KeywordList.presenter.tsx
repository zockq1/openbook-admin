import { Empty } from "antd";
import { useGetKeywordListQuery } from "../../../../store/api/keywordApi";
import { useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import KeywordListUI from "../container/KeywordListUI.container";
import ContentBox from "../../../commons/ContentBox";

function KeywordList() {
  const { topic } = useParams();
  const topicTitle = String(topic);
  const { data: keywordList, error: keywordListError } =
    useGetKeywordListQuery(topicTitle);
  useNotificationErrorList([setError(keywordListError, "키워드 목록")]);

  if (!keywordList) {
    return (
      <ContentBox title="키워드">
        <Empty />
      </ContentBox>
    );
  }

  return <KeywordListUI keywordList={keywordList} />;
}

export default KeywordList;
