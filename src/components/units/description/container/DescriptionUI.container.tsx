import { EditOutlined } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import ImageUpload from "../../../commons/ImageUpload";
import { DescriptionCommentModel } from "../../../../types/descriptionType";
import { useEffect } from "react";
import ContentBox from "../../../commons/ContentBox";
import CommentForm from "../../comment/presenter/CommentForm.presenter";
import CommentList from "../../comment/presenter/CommentList.presenter";

interface DescriptionProps {
  description: string;
  newDescription: string;
  setNewDescription: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  addComment: (id: number) => Promise<boolean>;
  deleteComment: (id: number) => Promise<void>;
  commentList: DescriptionCommentModel[];
}

function DescriptionUI({
  description,
  newDescription,
  setNewDescription,
  isEditing,
  onCancel,
  onEdit,
  onSave,
  addComment,
  deleteComment,
  commentList,
}: DescriptionProps) {
  useEffect(() => {
    if (description === null) {
      onEdit();
    } else {
      setNewDescription(description);
      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  return (
    <ContentBox title="보기">
      <div>
        <Space style={{ float: "right" }}>
          {!isEditing && <EditOutlined onClick={onEdit} />}
          {isEditing && (
            <div>
              <Button onClick={onSave}>저장</Button>
              <Button onClick={onCancel}>취소</Button>
            </div>
          )}
        </Space>
        {isEditing ? (
          <ImageUpload
            setImgFile={setNewDescription}
            imgFile={newDescription}
            htmlFor="edit-description"
          />
        ) : (
          <Image width="100%" src={description} />
        )}
      </div>
      <CommentForm addComment={addComment} />
      <CommentList commentList={commentList} deleteComment={deleteComment} />
    </ContentBox>
  );
}

export default DescriptionUI;
