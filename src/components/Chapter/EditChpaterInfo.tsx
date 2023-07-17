import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetChapterInfoQuery,
  useUpdateChapterInfoMutation,
} from "../../store/api/chapterApi";
import {
  mutationErrorNotification,
  queryErrorNotification,
} from "../../services/errorNotification";

const EditorBox = styled.div`
  margin: 50px auto;

  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
  }
`;

function EditChapterInfo() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const [updateChapterInfo] = useUpdateChapterInfoMutation();
  const { data: chapterInfo, error: chapterInfoError } = useGetChapterInfoQuery(
    Number(chapter)
  );
  const [content, setContent] = useState<string>(String(chapterInfo?.content));

  useEffect(() => {
    queryErrorNotification(chapterInfoError, "단원 학습");
  }, [chapterInfoError]);

  const handleSubmit = async () => {
    try {
      await updateChapterInfo({
        chapterNumber: Number(chapter),
        content: content,
      }).unwrap();
      navigate(`/topic/${chapter}/chapter-info`);
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
