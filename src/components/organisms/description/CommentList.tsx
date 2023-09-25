import { List, Modal } from "antd";
import {
  CommentType,
  DescriptionCommentModel,
} from "../../../types/descriptionType";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteDescriptionMutation } from "../../../store/api/descriptionApi";
import { mutationErrorNotification } from "../../../services/errorNotification";

interface CommentListProps {
  descriptionId: number;
  commentList: DescriptionCommentModel[];
}

function CommentList({ descriptionId, commentList }: CommentListProps) {
  const [deleteDescription] = useDeleteDescriptionMutation();
  const handleDelete = (id: number, type: CommentType) => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 키워드(문장)를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteDescription({
            descriptionId,
            comment: { id, type },
          }).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };
  return (
    <>
      <List
        dataSource={commentList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <DeleteOutlined
                onClick={() => handleDelete(item.id, item.type)}
              />,
            ]}
          >
            <List.Item.Meta
              title={`${item.chapterNumber}단원: ${item.topicTitle} `}
              description={item.name}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default CommentList;
