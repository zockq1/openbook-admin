import { Button } from "antd";
import ContentBox from "../../../commons/ContentBox";
import ImageUpload from "../../../commons/ImageUpload";

interface EditChapterInfoProps {
  onSubmit: () => Promise<void>;
  onDelete: () => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

function EditChapterInfoUI({
  onSubmit,
  content,
  setContent,
  onDelete,
}: EditChapterInfoProps) {
  return (
    <ContentBox title="단원 정보 수정">
      <ImageUpload
        setImgFile={setContent}
        imgFile={content}
        htmlFor="choice-form"
      />
      <Button type="primary" onClick={onSubmit} style={{ float: "right" }}>
        저장
      </Button>
      <Button
        type="primary"
        danger
        onClick={onDelete}
        style={{ float: "right" }}
      >
        삭제
      </Button>
    </ContentBox>
  );
}

export default EditChapterInfoUI;
