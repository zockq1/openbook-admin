import { Button, Select } from "antd";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import { useLazyGetKeywordListQuery } from "../../../store/api/keywordApi";
import { useLazyGetChapterTopicListQuery } from "../../../store/api/topicApi";
import { useEffect, useState } from "react";
import { KeywordModel } from "../../../types/keywordType";
import styled from "styled-components";

const StyledCommentForm = styled.div`
  & > h1 {
    padding: 10px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

interface CommentFormProps {
  addComment: (id: number) => Promise<boolean>;
}

function CommentForm({ addComment }: CommentFormProps) {
  const { data: chapterList } = useGetChaptersQuery();
  const [getTopicListTrigger, { data: topicList }] =
    useLazyGetChapterTopicListQuery();
  const [getKeywordListTrigger, { data: keywordList }] =
    useLazyGetKeywordListQuery();
  const [chapterNumber, setChapterNumber] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [commentId, setCommentId] = useState<number | null>(null);
  const [currentKeywordList, setCurrentKeywordList] = useState<KeywordModel[]>(
    []
  );

  useEffect(() => {
    setCurrentKeywordList(keywordList || []);
  }, [keywordList, topicTitle]);

  const handleChapterChange = (value: string) => {
    if (value === chapterNumber) return;
    getTopicListTrigger(Number(value));
    setTopicTitle("");
    setCurrentKeywordList([]);
    setCommentId(null);
    setChapterNumber(value);
  };

  const handleTocpiChange = (value: string) => {
    if (value === topicTitle) return;
    getKeywordListTrigger(value);
    setTopicTitle(value);
    setCommentId(null);
  };
  const handleSubmit = async () => {
    if (commentId === null) return;

    const result = await addComment(commentId);

    if (result) {
      setCommentId(null);
    }
  };

  return (
    <StyledCommentForm>
      <h1>해설 추가</h1>
      <div>
        {" "}
        <Select
          onChange={handleChapterChange}
          value={chapterNumber}
          style={{ width: "40%" }}
          showSearch
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
          onChange={handleTocpiChange}
          value={topicTitle}
          style={{ width: "40%" }}
          showSearch
          placeholder="주제 선택"
        >
          {topicList &&
            topicList?.map((topic) => (
              <Select.Option value={topic.title} key={topic.title}>
                {topic.title}
              </Select.Option>
            ))}
        </Select>
        <Button onClick={handleSubmit} style={{ float: "right" }}>
          추가
        </Button>
        <Select
          onChange={(value) => setCommentId(value)}
          value={commentId}
          style={{ width: "80%" }}
          showSearch
          placeholder="키워드 선택"
        >
          {currentKeywordList.map((keyword) => (
            <Select.Option value={keyword.id} key={keyword.name}>
              {keyword.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </StyledCommentForm>
  );
}

export default CommentForm;
