import { useParams } from "react-router-dom";
import { useGetChoicesQuery } from "../../store/api/choicesApi";
import { List } from "antd";
import Choice from "./Choice";
import { queryErrorNotification } from "../../services/errorNotification";
import { useEffect } from "react";

function ChoiceList() {
  const { title } = useParams();
  const { data: choiceList, error: choiceListError } = useGetChoicesQuery(
    String(title)
  );

  useEffect(() => {
    queryErrorNotification(choiceListError, "선지 목록");
  }, [choiceListError]);

  return (
    <List
      dataSource={choiceList}
      renderItem={(item) => <Choice data={item} />}
    />
  );
}

export default ChoiceList;
