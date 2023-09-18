import { List } from "antd";
import Choice from "./Choice";
import { ChoiceListModel } from "../../../types/choiceType";
import { ChoiceType } from "../../../types/questionTypes";

interface ChoiceListProps {
  choiceList: ChoiceListModel[];
  choiceType: ChoiceType;
}

function ChoiceList({ choiceList, choiceType }: ChoiceListProps) {
  return (
    <List
      dataSource={choiceList}
      renderItem={(item) => <Choice data={item} choiceType={choiceType} />}
    />
  );
}

export default ChoiceList;
