import { List } from "antd";
import Choice from "./Choice";
import { GetChoiceModel } from "../../../types/choiceType";

interface ChoiceListProps {
  choiceList: GetChoiceModel[];
}

function ChoiceList({ choiceList }: ChoiceListProps) {
  return (
    <List
      dataSource={choiceList}
      renderItem={(item) => <Choice choiceInfo={item} />}
    />
  );
}

export default ChoiceList;
