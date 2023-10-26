import styled from "styled-components";
import { QuestionCategoryModel } from "../../../../types/questionCategory";

interface QuestionCategoryProps {
  questionCategory: QuestionCategoryModel;
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

function QuestionCategoryUI({
  questionCategory,
  onDelete,
  onEdit,
}: QuestionCategoryProps) {
  const { title, era, id, topicCount, category } = questionCategory;
  return (
    <tr key={id}>
      <td className="title">{title}</td>
      <td className="era">{era}</td>
      <td className="category">{category}</td>
      <td className="count">{topicCount}</td>
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

export default QuestionCategoryUI;
