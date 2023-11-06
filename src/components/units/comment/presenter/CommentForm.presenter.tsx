import { useGetAllKeywordListQuery } from "../../../../store/api/keywordApi";
import { useState } from "react";
import CommentFormUI from "../container/CommentFormUI.container";
import { Spin } from "antd";

interface CommentFormProps {
  addComment: (id: number) => Promise<boolean>;
}

function CommentForm({ addComment }: CommentFormProps) {
  const { data: keywordList } = useGetAllKeywordListQuery();
  const [commentId, setCommentId] = useState<number | null>(null);

  if (!keywordList) return <Spin />;

  const handleSubmit = async () => {
    if (commentId === null) return;

    const result = await addComment(commentId);

    if (result) {
      setCommentId(null);
    }
  };

  return (
    <CommentFormUI
      keywordList={keywordList}
      onSubmit={handleSubmit}
      setCommentId={setCommentId}
      commentId={commentId}
    />
  );
}

export default CommentForm;
