import { List } from "antd";
import Keyword from "../presenter/Keyword.presenter";
import { KeywordModel } from "../../../../types/keywordType";

interface KeywordListProps {
  keywordList: KeywordModel[];
}

function KeywordListUI({ keywordList }: KeywordListProps) {
  return (
    <List
      dataSource={keywordList}
      renderItem={(item) => <Keyword keywordInfo={item} />}
    />
  );
}

export default KeywordListUI;
