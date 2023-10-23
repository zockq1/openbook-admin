import styled from "styled-components";
import { TimelineModel } from "../../../../types/timelineTypes";
import CreateTimeline from "../presenter/CreateTimeline.presenter";
import Timeline from "../presenter/Timeline.presenter";

const StyledTimeline = styled.table`
  border-collapse: collapse;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  border-spacing: 0px;
  & tr {
    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.bg}; // hover 시 배경색 변경
    }
    border-bottom: 1pt solid ${({ theme }) => theme.colors.border};
  }

  & th {
    padding: 4px;
    text-align: left;
    border: 1pt solid ${({ theme }) => theme.colors.border};
  }

  & td {
    padding: 4px;
    vertical-align: middle;
    border-left: 1pt solid ${({ theme }) => theme.colors.border};
    border-right: 1pt solid ${({ theme }) => theme.colors.border};
  }

  .era {
    width: 30%;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  .startDate {
    width: 25%;
  }

  .endDate {
    width: 25%;
  }

  .option {
    width: 20%;
    text-align: center;
  }
`;

interface TimelineListProps {
  timelineList: TimelineModel[];
}

function TimelineListUI({ timelineList }: TimelineListProps) {
  return (
    <StyledTimeline>
      <thead>
        <tr>
          <th className="era">시대</th>
          <th className="startDate">시작 년도</th>
          <th className="endDate">종료 년도</th>
          <th className="option">옵션</th>
        </tr>
      </thead>

      <tbody>
        {timelineList.map((timeline) => (
          <Timeline timeline={timeline} key={timeline.id} />
        ))}
        <CreateTimeline />
      </tbody>
    </StyledTimeline>
  );
}

export default TimelineListUI;
