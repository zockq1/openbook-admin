import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useUpdateChapterInfoMutation } from "../../../store/api/chapterApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import { ChapterInfoModel } from "../../../types/chapterTypes";

const EditorBox = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
  }
`;

interface EditChapterInfoProps {
  chapterInfo: ChapterInfoModel;
  chapterNumber: number;
}

function EditChapterInfo({ chapterInfo, chapterNumber }: EditChapterInfoProps) {
  const navigate = useNavigate();
  const [updateChapterInfo] = useUpdateChapterInfoMutation();
  const [content, setContent] = useState<string>(String(chapterInfo.content));

  const handleSubmit = async () => {
    try {
      await updateChapterInfo({
        chapterNumber: chapterNumber,
        content: content,
      }).unwrap();
      navigate(`/topic/${chapterNumber}/chapter-info`);
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <EditorBox>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
      <Button type="primary" onClick={handleSubmit} style={{ float: "right" }}>
        저장
      </Button>
    </EditorBox>
  );
}

export default EditChapterInfo;
