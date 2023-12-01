import { List, Space, Input, Button, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import ImageUpload from "../../../commons/ImageUpload";
import { ChoiceType } from "../../../../types/questionTypes";
import ContentBox from "../../../commons/ContentBox";
import { GetChoiceModel } from "../../../../types/choiceType";
import CommentForm from "../../comment/presenter/CommentForm.presenter";
import CommentList from "../../comment/presenter/CommentList.presenter";
interface ChoiceFormGridContainerProps {
  choiceType: ChoiceType;
}

const ChoiceGridContainer = styled.div<ChoiceFormGridContainerProps>`
  width: ${({ choiceType }) => (choiceType === "Image" ? "100px" : "100%")};
`;

const ChoiceNameBox = styled.div`
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 4px 11px;
  overflow: auto;
`;

interface ChoiceUIProps {
  choiceInfo: GetChoiceModel;
  isEditing: boolean;
  editChoice: string;
  setEditChoice: React.Dispatch<React.SetStateAction<string>>;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
  addComment: (id: number) => Promise<boolean>;
  deleteComment: (id: number) => Promise<void>;
}

function ChoiceUI({
  choiceInfo,
  isEditing,
  editChoice,
  setEditChoice,
  onCancel,
  onEdit,
  onSave,
  addComment,
  deleteComment,
}: ChoiceUIProps) {
  const { choice, choiceNumber, commentList, choiceType } = choiceInfo;

  return (
    <ContentBox title={choiceNumber + "번 선지"}>
      <List.Item
        actions={[
          <Space>
            {!isEditing && <EditOutlined onClick={onEdit} />}
            {isEditing && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button onClick={onSave}>저장</Button>
                <br />
                <Button onClick={onCancel}>취소</Button>
              </div>
            )}
          </Space>,
        ]}
      >
        {isEditing ? (
          <ChoiceGridContainer choiceType={choiceType}>
            {choiceType === "Image" ? (
              <ImageUpload
                setImgFile={setEditChoice}
                imgFile={editChoice}
                htmlFor="choice-form"
              />
            ) : (
              <Input.TextArea
                value={editChoice}
                onChange={(e: any) => {
                  setEditChoice(e.target.value);
                }}
                placeholder="선지"
              />
            )}
          </ChoiceGridContainer>
        ) : (
          <ChoiceGridContainer choiceType={choiceType}>
            {}
            {choiceType === "Image" ? (
              <Image src={choice} width={100} />
            ) : (
              <ChoiceNameBox>{choice}</ChoiceNameBox>
            )}
          </ChoiceGridContainer>
        )}
      </List.Item>
      <CommentForm addComment={addComment} />
      <CommentList commentList={commentList} deleteComment={deleteComment} />
    </ContentBox>
  );
}

export default ChoiceUI;
