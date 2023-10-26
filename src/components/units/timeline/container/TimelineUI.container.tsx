import styled from "styled-components";
import { TimelineModel } from "../../../../types/timelineTypes";

interface TimelineProps {
  timeline: TimelineModel;
  onEdit: () => void;
  onDelete: () => void;
}

const Button = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.xxxs};
  padding: 4px;
  margin: 2px;
  &.white {
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  }

  &.red {
    background-color: #f44336;
    color: white;
  }
`;

function TimelineUI({ timeline, onDelete, onEdit }: TimelineProps) {
  const { endDate, startDate, era, id, title } = timeline;
  return (
    <tr key={id}>
      <td className="title">{title}</td>
      <td className="era">{era}</td>
      <td className="startDate">{startDate}</td>
      <td className="comment">{endDate}</td>
      <td className="option">
        <Button className="white" onClick={onEdit}>
          수정
        </Button>
        <Button className="red" onClick={onDelete}>
          삭제
        </Button>
      </td>
    </tr>
  );
}

export default TimelineUI;
