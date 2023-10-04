import { Modal } from "antd";
import { useState } from "react";
import { KeywordModel } from "../../../../types/keywordType";
import {
  useDeleteKeywordMutation,
  useUpdateKeywordMutation,
} from "../../../../store/api/keywordApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { useForm } from "antd/es/form/Form";
import EditKeywordFormUI from "../container/EditKeywordFormUI.container";
import KeywordInfoUI from "../container/KeywordInfoUI.container";

interface KeywordProps {
  keywordInfo: KeywordModel;
}

function Keyword({ keywordInfo }: KeywordProps) {
  const { name, comment, file, dateComment, extraDateList, id } = keywordInfo;
  const [deleteKeyword] = useDeleteKeywordMutation();
  const [updateKeyword] = useUpdateKeywordMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editComment, setEditComment] = useState(comment);
  const [editFile, setEditFile] = useState(file);
  const [editDateComment, setEditDateComment] = useState(dateComment);
  const [form] = useForm();

  const handleEdit = async () => {
    try {
      await updateKeyword({
        name: editName,
        comment: editComment,
        file: editFile,
        dateComment: editDateComment,
        extraDateList: form.getFieldValue("extraDateList"),
        id: id,
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const onEdit = () => {
    setEditName(name);
    setEditFile(file);
    setEditComment(comment);
    setEditDateComment(dateComment);
    form.setFieldValue("extraDateList", extraDateList);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    handleEdit();
    setIsEditing(false);
  };

  const handleNameChange = (e: any) => {
    setEditName(e.target.value);
  };

  const handleCommentChange = (e: any) => {
    setEditComment(e.target.value);
  };

  const handleDateCommentChange = (e: any) => {
    setEditDateComment(e.target.value);
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 키워드를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteKeyword(id).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return isEditing ? (
    <EditKeywordFormUI
      handleCancel={handleCancel}
      handleCommentChange={handleCommentChange}
      handleDateCommentChange={handleDateCommentChange}
      handleNameChange={handleNameChange}
      handleSave={handleSave}
      setEditFile={setEditFile}
      form={form}
      keywordInfo={keywordInfo}
      editComment={editComment}
      editDateComment={editDateComment}
      editFile={editFile}
      editName={editName}
    />
  ) : (
    <KeywordInfoUI
      keywordInfo={keywordInfo}
      handleDelete={handleDelete}
      onEdit={onEdit}
    />
  );
}

export default Keyword;
