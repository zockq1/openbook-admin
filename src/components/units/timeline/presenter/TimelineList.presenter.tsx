import { useGetTimelineListQuery } from "../../../../store/api/timelineApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import TimelineListUI from "../container/TimelineListUI.container";
import ContentBox from "../../../commons/ContentBox";
import EraEditModal from "../../era/EraEditModal";

function TimelineList() {
  const { data: timelineList, error: timelineListError } =
    useGetTimelineListQuery();
  useNotificationErrorList([setError(timelineListError, "키워드 목록")]);

  if (!timelineList) {
    return (
      <ContentBox title="연표" width="half">
        <TimelineListUI timelineList={[]} />
      </ContentBox>
    );
  }

  return (
    <ContentBox title="연표" width="half" option={<EraEditModal />}>
      <TimelineListUI
        timelineList={[...timelineList].sort(
          (a, b) => a.startDate - b.startDate
        )}
      />
    </ContentBox>
  );
}

export default TimelineList;
