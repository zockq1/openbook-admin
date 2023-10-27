import { Button, Select } from "antd";
import { KeywordModel } from "../../../../types/keywordType";
import styled from "styled-components";
import filterOption from "../../../../services/filterOption";
import { GetChapterModel } from "../../../../types/chapterTypes";
import { TopicListModel } from "../../../../types/topicTypes";

const StyledCommentForm = styled.div`
  & > h1 {
    padding: 10px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

interface CommentFormProps {
  chapterList: GetChapterModel | undefined;
  chapterNumber: string;
  topicList: TopicListModel | undefined;
  topicTitle: string;
  keywordList: KeywordModel[];
  setCommentId: React.Dispatch<React.SetStateAction<number | null>>;
  commentId: number | null;
  onChapterChange: (value: string) => void;
  onTocpiChange: (value: string) => void;
  onSubmit: () => Promise<void>;
}

function CommentFormUI({
  chapterList,
  chapterNumber,
  topicList,
  topicTitle,
  keywordList,
  commentId,
  setCommentId,
  onChapterChange,
  onSubmit,
  onTocpiChange,
}: CommentFormProps) {
  return (
    <StyledCommentForm>
      <h1>해설 추가</h1>
      <div>
        {" "}
        <Select
          onChange={onChapterChange}
          value={chapterNumber}
          style={{ width: "40%" }}
          showSearch
          filterOption={filterOption}
          placeholder="단원 선택"
        >
          {chapterList &&
            [...chapterList]
              .sort((a, b) => a.number - b.number)
              .map((chapter) => (
                <Select.Option value={chapter.number} key={chapter.number}>
                  {`${chapter.number}.${chapter.title}`}
                </Select.Option>
              ))}
        </Select>
        <Select
          onChange={onTocpiChange}
          value={topicTitle}
          style={{ width: "40%" }}
          showSearch
          filterOption={filterOption}
          placeholder="주제 선택"
        >
          {topicList &&
            topicList?.map((topic) => (
              <Select.Option value={topic.title} key={topic.title}>
                {topic.title}
              </Select.Option>
            ))}
        </Select>
        <Button onClick={onSubmit} style={{ float: "right" }}>
          추가
        </Button>
        <Select
          onChange={(value) => setCommentId(value)}
          value={commentId}
          style={{ width: "80%" }}
          showSearch
          filterOption={filterOption}
          placeholder="키워드 선택"
        >
          {keywordList.map((keyword) => (
            <Select.Option value={keyword.id} key={keyword.name}>
              {keyword.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </StyledCommentForm>
  );
}

export default CommentFormUI;
