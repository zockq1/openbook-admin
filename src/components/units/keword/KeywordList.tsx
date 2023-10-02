import { List } from "antd";
import Keyword from "./Keyword";
import { KeywordModel } from "../../../types/keywordType";

interface KeywordListProps {
  keywordList: KeywordModel[];
}

function KeywordList({ keywordList }: KeywordListProps) {
  return (
    <List
      dataSource={keywordList}
      renderItem={(item) => <Keyword data={item} />}
    />
  );
}

export default KeywordList;
