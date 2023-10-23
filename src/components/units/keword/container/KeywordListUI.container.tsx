import { KeywordModel } from "../../../../types/keywordType";
import styled from "styled-components";
import Keyword from "../presenter/Keyword.presenter";
import CreateKeyword from "../presenter/CreateKeyword.presenter";
import EditkeywordOrder from "../presenter/EditKeywordOrder.presenter";
import { Switch } from "antd";

const StyledKeyword = styled.table`
  border-collapse: collapse;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  border-spacing: 0px;
  margin-top: 10px;
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

  .number {
    width: 5%;
  }

  .name {
    width: 15%;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  .comment {
    width: 25%;
  }

  .dateComment {
    width: 10%;
  }

  .extraDate {
    width: 10%;
  }

  .extraDate {
    width: 10%;
  }

  .image {
    width: 10%;
  }

  .option {
    width: 10%;
    text-align: center;
  }

  img {
    width: 100%;
  }
`;

interface KeywordListProps {
  keywordList: KeywordModel[];
  isKeywordQuestion: boolean;
  onChange: () => void;
}

function KeywordListUI({
  keywordList,
  isKeywordQuestion,
  onChange,
}: KeywordListProps) {
  return (
    <>
      <Switch
        checkedChildren="연관 문제 ON"
        unCheckedChildren="연관 문제 OFF"
        onChange={onChange}
        defaultChecked={isKeywordQuestion}
      />
      <StyledKeyword>
        <thead>
          <tr>
            <th className="number">
              <EditkeywordOrder />
            </th>
            <th className="name">키워드</th>
            <th className="comment">해설</th>
            <th className="dateComment">년도</th>
            <th className="extraDate">연표 년도</th>
            <th className="extraDateComment">연표 설명</th>
            <th className="image">이미지</th>
            <th className="option">옵션</th>
          </tr>
        </thead>

        <tbody>
          {keywordList.map((keyword) => (
            <Keyword keyword={keyword} key={keyword.name} />
          ))}
          <CreateKeyword length={keywordList.length} />
        </tbody>
      </StyledKeyword>
    </>
  );
}

export default KeywordListUI;
