import { List } from "antd";
import Choice from "./Choice";
import { ChoiceType } from "../../../types/questionTypes";
import { GetChoiceModel } from "../../../types/choiceType";

interface ChoiceListProps {
  choiceList: GetChoiceModel[];
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
