import { useState } from "react";
import { extraDateModel } from "../../../../types/keywordType";
import KeywordFormUI from "../container/KeywordFormUI.container";
import { useForm } from "react-hook-form";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { useAddKeywordMutation } from "../../../../store/api/keywordApi";
import { useParams } from "react-router-dom";

export type KeywordFormValues = {
  name: string;
  comment: string;
  dateComment: string;
  extraDate1: number | "";
  extraDate2: number | "";
  extraDateComment1: string;
  extraDateComment2: string;
};

interface CreateKeywordProps {
  length: number;
}

function CreateKeyword({ length }: CreateKeywordProps) {
  const { topic } = useParams();
  const topicTitle = String(topic);
  const [addKeyword] = useAddKeywordMutation();
  const { register, handleSubmit, reset } = useForm<KeywordFormValues>();
  const [image, setImage] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    let newExtraDateList: extraDateModel[] = [];
    if (data.extraDate1) {
      newExtraDateList.push({
        extraDate: data.extraDate1,
        extraDateComment: data.extraDateComment1,
      });
    }
    if (data.extraDate2) {
      newExtraDateList.push({
        extraDate: data.extraDate2,
        extraDateComment: data.extraDateComment2,
      });
    }

    try {
      addKeyword({
        name: data.name,
        comment: data.comment,
        topic: topicTitle,
        file: image,
        dateComment: data.dateComment,
        extraDateList: newExtraDateList,
        number: length,
      });
      setImage("");
      reset({
        name: "",
        comment: "",
        dateComment: "",
        extraDate1: "",
        extraDate2: "",
        extraDateComment1: "",
        extraDateComment2: "",
      });
    } catch (error) {
      mutationErrorNotification(error);
    }
  });

  const handleDeleteImage = () => {
    setImage("");
  };

  return (
    <KeywordFormUI
      onSubmit={onSubmit}
      onDeleteImage={handleDeleteImage}
      register={register}
      image={image}
      setImage={setImage}
    />
  );
}

export default CreateKeyword;
