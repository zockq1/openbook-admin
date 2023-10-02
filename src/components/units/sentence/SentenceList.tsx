import { List } from "antd";
import Sentence from "./Sentence";
import { SentenceModel } from "../../../types/sentenceType";

interface SentenceListProps {
  sentenceList: SentenceModel[];
}

function SentenceList({ sentenceList }: SentenceListProps) {
  return (
    <List
      dataSource={sentenceList}
      renderItem={(item) => <Sentence data={item} />}
    />
  );
}

export default SentenceList;
