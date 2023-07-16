import { useParams } from "react-router-dom";
import { queryErrorNotification } from "../../services/errorNotification";
import { useEffect } from "react";
import { useGetKeywordListQuery } from "../../store/api/keywordApi";
import { List } from "antd";
import Keyword from "./Keyword";

function KeywordList() {
  const { title } = useParams();
  const { data: keywordList, error: keywordListError } = useGetKeywordListQuery(
    String(title)
  );

  useEffect(() => {
    queryErrorNotification(keywordListError, "키워드 목록");
  }, [keywordListError]);

  return (
    <List
      dataSource={keywordList}
      renderItem={(item) => <Keyword data={item} />}
    />
  );
}

export default KeywordList;
