import styled from "styled-components";
import CreateQuestionCategory from "../presenter/CreateQuestionCategory.presenter";
import QuestionCategory from "../presenter/QuestionCategory.presenter";
import { GetQuestionCategoryModel } from "../../../../types/questionCategory";

const StyledQuestionCategory = styled.table`
  width: 100%;
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

  .title {
    width: 20%;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  .era {
    width: 20%;
  }

  .category {
    width: 20%;
  }

  .count {
    width: 20%;
  }

  .option {
    width: 20%;
    text-align: center;
  }
`;

interface QuestionCategoryListProps {
  questionCategoryList: GetQuestionCategoryModel;
}

function QuestionCategoryListUI({
  questionCategoryList,
}: QuestionCategoryListProps) {
  return (
    <StyledQuestionCategory>
      <thead>
        <tr>
          <th className="title">제목</th>
          <th className="era">시대</th>
          <th className="category">분류</th>
          <th className="count">주제 수</th>
          <th className="option">옵션</th>
        </tr>
      </thead>

      <tbody>
        {questionCategoryList.map((questionCategory) => (
          <QuestionCategory
            questionCategory={questionCategory}
            key={questionCategory.id}
          />
        ))}
        <CreateQuestionCategory />
      </tbody>
    </StyledQuestionCategory>
  );
}

export default QuestionCategoryListUI;
