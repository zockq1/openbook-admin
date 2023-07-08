import { useParams } from "react-router-dom";
import { List } from "antd";
import { useGetDescriptionsQuery } from "../../store/api/descriptionApi";
import Description from "./Description";
import { queryErrorNotification } from "../../services/errorNotification";
import { useEffect } from "react";

function DescriptionList() {
  const { title } = useParams();
  const { data: descriptionList, error: descriptionListError } =
    useGetDescriptionsQuery(String(title));

  useEffect(() => {
    queryErrorNotification(descriptionListError, "보기 목록");
  }, [descriptionListError]);

  return (
    <List
      dataSource={descriptionList}
      renderItem={(item) => <Description data={item} />}
    />
  );
}

export default DescriptionList;
