import { List } from "antd";
import { DescriptionCommentModel } from "../../../../types/descriptionType";
import { DeleteOutlined } from "@ant-design/icons";

interface CommentListUIProps {
  commentList: DescriptionCommentModel[];
  handleDelete: (id: number) => void;
}

function CommentListUI({ commentList, handleDelete }: CommentListUIProps) {
  return (
    <>
      {commentList.length > 0 && (
        <List
          dataSource={commentList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <DeleteOutlined onClick={() => handleDelete(item.id)} />,
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={`${item.chapterNumber}단원: ${item.topicTitle} `}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
}

export default CommentListUI;
