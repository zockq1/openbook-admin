import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import { Button } from "antd";
import ContentBox from "../../../commons/ContentBox";

const EditorBox = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
  }
`;

interface EditChapterInfoProps {
  handleSubmit: () => Promise<void>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

function EditChapterInfoUI({
  handleSubmit,
  content,
  setContent,
}: EditChapterInfoProps) {
  return (
    <ContentBox title="단원 정보 수정">
      <EditorBox>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ float: "right" }}
        >
          저장
        </Button>
      </EditorBox>
    </ContentBox>
  );
}

export default EditChapterInfoUI;
