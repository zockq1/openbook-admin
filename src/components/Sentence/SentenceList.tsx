import { useParams } from "react-router-dom";
import { List } from "antd";
import Sentence from "./Sentence";
import { queryErrorNotification } from "../../services/errorNotification";
import { useEffect } from "react";
import { useGetSentencesQuery } from "../../store/api/sentenceApi";

function SentenceList() {
  const { title } = useParams();
  const { data: sentenceList, error: sentenceListError } = useGetSentencesQuery(
    String(title)
  );

  useEffect(() => {
    queryErrorNotification(sentenceListError, "문장 목록");
  }, [sentenceListError]);

  return (
    <List
      dataSource={sentenceList}
      renderItem={(item) => <Sentence data={item} />}
    />
  );
}

export default SentenceList;
