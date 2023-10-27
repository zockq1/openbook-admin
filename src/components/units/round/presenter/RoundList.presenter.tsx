import { useNavigate, useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useGetRoundListQuery } from "../../../../store/api/roundApi";
import SmallItemListUI from "../../common/SmallItemListUI.container";
import CreateRoundModal from "./CreateRoundModal.presenter";
import { Spin } from "antd";

function RoundList() {
  const { round } = useParams();
  const navigate = useNavigate();
  const { data: roundList, error: roundError } = useGetRoundListQuery();
  useNotificationErrorList([setError(roundError, "회차 목록")]);

  if (!roundList) {
    return <Spin />;
  }

  return (
    <SmallItemListUI
      title="회차 선택"
      option={<CreateRoundModal />}
      currentItemKey={String(round)}
      itemList={[...roundList]
        .sort((a, b) => a.number - b.number)
        .map((item) => {
          return {
            name: item.number + "회차",
            key: item.number.toString(),
            onClick: () => navigate(`/exam/${item.number}/question-list`),
          };
        })}
    />
  );
}

export default RoundList;
