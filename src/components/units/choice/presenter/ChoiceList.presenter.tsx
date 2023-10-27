import { List } from "antd";
import Choice from "./Choice.presenter";
import { useParams } from "react-router-dom";
import { useGetChoiceListQuery } from "../../../../store/api/choicesApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";

function ChoiceList() {
  const { round, question } = useParams();
  const roundNumber = Number(round);
  const questionNumber = Number(question);
  const { data: choiceList, error: choiceListError } = useGetChoiceListQuery({
    roundNumber,
    questionNumber,
  });
  useNotificationErrorList([setError(choiceListError, "선지 목록")]);

  return (
    <List
      dataSource={choiceList}
      renderItem={(item) => <Choice choiceInfo={item} />}
    />
  );
}

export default ChoiceList;
