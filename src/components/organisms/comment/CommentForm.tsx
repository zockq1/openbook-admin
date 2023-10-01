import { Button, Select } from "antd";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import { useLazyGetKeywordListQuery } from "../../../store/api/keywordApi";
import { useLazyGetSentencesQuery } from "../../../store/api/sentenceApi";
import { useLazyGetChapterTopicListQuery } from "../../../store/api/topicApi";
import { useEffect, useState } from "react";
import { CommentType } from "../../../types/descriptionType";
import { KeywordModel } from "../../../types/keywordType";
import { SentenceModel } from "../../../types/sentenceType";
import styled from "styled-components";

const StyledCommentForm = styled.div`
  & > h1 {
    padding: 10px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

interface CommentFormProps {
  addComment: (id: number, type: CommentType) => Promise<boolean>;
}

function CommentForm({ addComment }: CommentFormProps) {
  const { data: chapterList } = useGetChaptersQuery();
  const [getTopicListTrigger, { data: topicList }] =
    useLazyGetChapterTopicListQuery();
  const [getKeywordListTrigger, { data: keywordList }] =
    useLazyGetKeywordListQuery();
  const [getSentenceListTrigger, { data: sentenceList }] =
    useLazyGetSentencesQuery();
  const [chapterNumber, setChapterNumber] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [commentType, setCommentType] = useState<CommentType>("Keyword");
  const [commentId, setCommentId] = useState<number | null>(null);
  const [currentKeywordList, setCurrentKeywordList] = useState<KeywordModel[]>(
    []
  );
  const [currentSentenceList, setCurrentSentenceList] = useState<
    SentenceModel[]
  >([]);

  useEffect(() => {
    setCurrentKeywordList(keywordList || []);
  }, [keywordList, topicTitle]);

  useEffect(() => {
    setCurrentSentenceList(sentenceList || []);
  }, [sentenceList, topicTitle]);

  const handleChapterChange = (value: string) => {
    if (value === chapterNumber) return;
    getTopicListTrigger(Number(value));
    setTopicTitle("");
    setCurrentKeywordList([]);
    setCurrentSentenceList([]);
    setCommentId(null);
    setChapterNumber(value);
  };

  const handleTocpiChange = (value: string) => {
    if (value === topicTitle) return;
    getKeywordListTrigger(value);
    getSentenceListTrigger(value);
    setTopicTitle(value);
    setCommentId(null);
  };

  const handleCommentTypeChange = (value: CommentType) => {
    if (value === commentType) return;
    getKeywordListTrigger(value);
    getSentenceListTrigger(value);
    setCommentType(value);
    setCommentId(null);
  };

  const handleSubmit = async () => {
    if (commentId === null) return;

    const result = await addComment(commentId, commentType);

    if (result) {
      setTopicTitle("");
      setCurrentKeywordList([]);
      setCurrentSentenceList([]);
      setCommentId(null);
      setChapterNumber("");
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
          style={{ width: "30%" }}
        >
          {chapterList &&
            chapterList?.map((chapter) => (
              <Select.Option value={chapter.number} key={chapter.number}>
                {`${chapter.number}.${chapter.title}`}
              </Select.Option>
            ))}
        </Select>
        <Select
          onChange={handleTocpiChange}
          value={topicTitle}
          style={{ width: "30%" }}
        >
          {topicList &&
            topicList?.map((topic) => (
              <Select.Option value={topic.title} key={topic.title}>
                {topic.title}
              </Select.Option>
            ))}
        </Select>
        <Select
          defaultValue={commentType}
          value={commentType}
          onChange={handleCommentTypeChange}
          style={{ width: "20%" }}
        >
          <Select.Option value={"Keyword"} key={"Keyword"}>
            키워드
          </Select.Option>
          <Select.Option value={"Sentence"} key={"Sentence"}>
            문장
          </Select.Option>
        </Select>
        <Button onClick={handleSubmit} style={{ float: "right" }}>
          추가
        </Button>
        {commentType === "Keyword" && (
          <Select
            onChange={(value) => setCommentId(value)}
            value={commentId}
            style={{ width: "80%" }}
          >
            {currentKeywordList.map((keyword) => (
              <Select.Option value={keyword.id} key={keyword.name}>
                {keyword.name}
              </Select.Option>
            ))}
          </Select>
        )}
        {commentType === "Sentence" && (
          <Select
            onChange={(value) => {
              setCommentId(value);
            }}
            value={commentId}
            style={{ width: "80%" }}
          >
            {currentSentenceList.map((sentence) => (
              <Select.Option value={sentence.id} key={sentence.name}>
                {sentence.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </div>
    </StyledCommentForm>
  );
}

export default CommentForm;
