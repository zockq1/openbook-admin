import { useState } from "react";
import { useAddKeywordMutation } from "../../../../store/api/keywordApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { useForm } from "antd/es/form/Form";
import { useParams } from "react-router-dom";
import KeywordFormUI from "../container/KeywordFormUI.container";

function KeywordForm() {
  const { topic } = useParams();
  const topicTitle = String(topic);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [dateComment, setDateComment] = useState("");
  const [addKeyword] = useAddKeywordMutation();
  const [form] = useForm();

  const handleSubmit = async () => {
    try {
      addKeyword({
        name,
        comment,
        topic: topicTitle,
        file: imgFile,
        dateComment: dateComment,
        extraDateList: form.getFieldValue("extraDateList"),
      });
      setName("");
      setComment("");
      setImgFile("");
      setDateComment("");
      form.resetFields();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleDateCommentChange = (e: any) => {
    setDateComment(e.target.value);
  };

  return (
    <KeywordFormUI
      handleCommentChange={handleCommentChange}
      handleDateCommentChange={handleDateCommentChange}
      handleNameChange={handleNameChange}
      handleSubmit={handleSubmit}
      form={form}
      name={name}
      comment={comment}
      dateComment={dateComment}
      imgFile={imgFile}
      setImgFile={setImgFile}
    />
  );
}

export default KeywordForm;
