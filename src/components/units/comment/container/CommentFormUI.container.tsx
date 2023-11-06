import { Button, Select } from "antd";
import { KeywordSelectModel } from "../../../../types/keywordType";
import styled from "styled-components";
import filterOption from "../../../../services/filterOption";

const StyledCommentForm = styled.div`
  & > h1 {
    padding: 10px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

interface CommentFormProps {
  keywordList: KeywordSelectModel[];
  setCommentId: React.Dispatch<React.SetStateAction<number | null>>;
  commentId: number | null;
  onSubmit: () => Promise<void>;
}

function CommentFormUI({
  keywordList,
  commentId,
  setCommentId,
  onSubmit,
}: CommentFormProps) {
  return (
    <StyledCommentForm>
      <h1>해설 추가</h1>
      <div>
        <Select
          onChange={(value) => setCommentId(value)}
          value={commentId}
          style={{ width: "80%" }}
          showSearch
          filterOption={filterOption}
          placeholder="키워드 선택"
        >
          {keywordList.map((keyword) => (
            <Select.Option value={keyword.id} key={keyword.id}>
              {keyword.name}
            </Select.Option>
          ))}
        </Select>
        <Button onClick={onSubmit} style={{ float: "right" }}>
          추가
        </Button>
      </div>
    </StyledCommentForm>
  );
}

export default CommentFormUI;
