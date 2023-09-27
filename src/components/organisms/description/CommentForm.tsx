import { Button, Select } from "antd";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import { useLazyGetKeywordListQuery } from "../../../store/api/keywordApi";
import { useLazyGetSentencesQuery } from "../../../store/api/sentenceApi";
import { useLazyGetChapterTopicListQuery } from "../../../store/api/topicApi";
import { useEffect, useState } from "react";
import { CommentType } from "../../../types/descriptionType";
import { KeywordModel } from "../../../types/keywordType";
import { SentenceModel } from "../../../types/sentenceType";
import { useAddDescriptionMutation } from "../../../store/api/descriptionApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled from "styled-components";

const StyledCommentForm = styled.div`
  & > h1 {
    padding: 10px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

interface CommentFormProps {
  descriptionId: number;
}

function CommentForm({ descriptionId }: CommentFormProps) {
  const [addDescription] = useAddDescriptionMutation();
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
  const [comment, setComment] = useState<number | null>(null);
  const [currentKeywordList, setCurrentKeywordList] = useState<KeywordModel[]>(
    []
  );
  const [currentSentenceList, setCurrentSentenceList] = useState<
    SentenceModel[]
  >([]);

  useEffect(() => {
    setCurrentKeywordList(keywordList || []);
  }, [keywordList]);

  useEffect(() => {
    setCurrentSentenceList(sentenceList || []);
  }, [sentenceList]);

  const handleChapterChange = (value: string) => {
    if (value === chapterNumber) return;
    getTopicListTrigger(Number(value));
    setTopicTitle("");
    setCurrentKeywordList([]);
    setCurrentSentenceList([]);
    setComment(null);
    setChapterNumber(value);
  };

  const handleTocpiChange = (value: string) => {
    if (value === topicTitle) return;
    getKeywordListTrigger(value);
    getSentenceListTrigger(value);
    setTopicTitle(value);
    setComment(null);
  };

  const handleCommentTypeChange = (value: CommentType) => {
    if (value === commentType) return;
    getKeywordListTrigger(value);
    getSentenceListTrigger(value);
    setCommentType(value);
    setComment(null);
  };

  const handleSubmit = () => {
    if (comment === null) return;
    try {
      addDescription({
        descriptionId,
        comment: {
          type: commentType,
          id: comment,
        },
      });
      setTopicTitle("");
      setCurrentKeywordList([]);
      setCurrentSentenceList([]);
      setComment(null);
      setChapterNumber("");
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <StyledCommentForm>
      <h1>보기 해설 추가</h1>
      <div>
        {" "}
        <Select
          onChange={handleChapterChange}
          value={chapterNumber}
          style={{ width: "20%" }}
        >
          {chapterList &&
            chapterList?.map((chapter) => (
              <Select.Option value={chapter.number} key={chapter.number}>
                {chapter.number + "단원"}
              </Select.Option>
            ))}
        </Select>
        <Select
          onChange={handleTocpiChange}
          value={topicTitle}
          style={{ width: "20%" }}
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
        {commentType === "Keyword" && (
          <Select
            onChange={(value) => setComment(value)}
            value={comment}
            style={{ width: "20%" }}
          >
            {currentKeywordList.map((keyword) => (
              <Select.Option value={keyword.id} key={keyword.name}>
                {keyword.name}
              </Select.Option>
            ))}
          </Select>
        )}
        <Button onClick={handleSubmit} style={{ float: "right" }}>
          추가
        </Button>
        {commentType === "Sentence" && (
          <Select
            onChange={(value) => {
              setComment(value);
            }}
            value={comment}
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
