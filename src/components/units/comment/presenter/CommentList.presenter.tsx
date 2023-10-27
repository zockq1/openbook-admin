import { Modal } from "antd";
import { DescriptionCommentModel } from "../../../../types/descriptionType";
import CommentListUI from "../container/CommnetListUI.comtainer";

interface CommentListProps {
  commentList: DescriptionCommentModel[];
  deleteComment: (id: number) => Promise<void>;
}

function CommentList({ commentList, deleteComment }: CommentListProps) {
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 키워드(문장)를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => await deleteComment(id),
    });
  };

  return (
    <CommentListUI commentList={commentList} handleDelete={handleDelete} />
  );
}

export default CommentList;
