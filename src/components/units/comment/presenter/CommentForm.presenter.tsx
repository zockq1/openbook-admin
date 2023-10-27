import { useGetChaptersQuery } from "../../../../store/api/chapterApi";
import { useLazyGetKeywordListQuery } from "../../../../store/api/keywordApi";
import { useLazyGetChapterTopicListQuery } from "../../../../store/api/topicApi";
import { useEffect, useState } from "react";
import { KeywordModel } from "../../../../types/keywordType";
import { useParams } from "react-router-dom";
import CommentFormUI from "../container/CommentFormUI.container";

interface CommentFormProps {
  addComment: (id: number) => Promise<boolean>;
}

function CommentForm({ addComment }: CommentFormProps) {
  const { question } = useParams();
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

  useEffect(() => {
    setTopicTitle("");
    setCurrentKeywordList([]);
    setCommentId(null);
    setChapterNumber("");
  }, [question]);

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
    <CommentFormUI
      chapterList={chapterList}
      chapterNumber={chapterNumber}
      topicList={topicList}
      topicTitle={topicTitle}
      keywordList={currentKeywordList}
      onChapterChange={handleChapterChange}
      onSubmit={handleSubmit}
      onTocpiChange={handleTocpiChange}
      setCommentId={setCommentId}
      commentId={commentId}
    />
  );
}

export default CommentForm;
