import { Empty } from "antd";
import { useGetKeywordListQuery } from "../../../../store/api/keywordApi";
import { useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import KeywordListUI from "../container/KeywordListUI.container";
import ContentBox from "../../../commons/ContentBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useDispatch } from "react-redux";
import {
  keywordQuestionOff,
  keywordQuestionOn,
} from "../../../../store/slices/keywordSlice";

function KeywordList() {
  const dispatch = useDispatch();
  const isKeywordQuestion = useSelector(
    (state: RootState) => state.keyword.isKeywordQuestion
  );
  const { topic } = useParams();
  const topicTitle = String(topic);
  const { data: keywordList, error: keywordListError } =
    useGetKeywordListQuery(topicTitle);
  useNotificationErrorList([setError(keywordListError, "키워드 목록")]);

  const handleChange = () => {
    if (!isKeywordQuestion) dispatch(keywordQuestionOn());
    else dispatch(keywordQuestionOff());
  };

  if (!keywordList) {
    return (
      <ContentBox title="키워드">
        <Empty />
      </ContentBox>
    );
  }

  return (
    <KeywordListUI
      keywordList={[...keywordList].sort((a, b) => a.number - b.number)}
      onChange={handleChange}
      isKeywordQuestion={isKeywordQuestion}
    />
  );
}

export default KeywordList;
