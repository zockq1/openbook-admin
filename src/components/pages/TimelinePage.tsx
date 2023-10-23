import { RowFlex } from "../commons/FlexLayout";
import JJHList from "../units/jjh/JJHList.presenter";
import TimelineList from "../units/timeline/presenter/TimelineList.presenter";

function TimelinePage() {
  return (
    <RowFlex>
      <TimelineList />
      <JJHList />
    </RowFlex>
  );
}

export default TimelinePage;
