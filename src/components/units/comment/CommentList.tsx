import { List, Modal } from "antd";
import { DescriptionCommentModel } from "../../../types/descriptionType";
import { DeleteOutlined } from "@ant-design/icons";

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
    <>
      <List
        dataSource={commentList}
        renderItem={(item) => (
          <List.Item
            actions={[<DeleteOutlined onClick={() => handleDelete(item.id)} />]}
          >
            <List.Item.Meta
              title={item.name}
              description={`${item.chapterNumber}단원: ${item.topicTitle} `}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default CommentList;
