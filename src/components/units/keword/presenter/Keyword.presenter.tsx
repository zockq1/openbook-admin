import { useState } from "react";
import { KeywordModel, extraDateModel } from "../../../../types/keywordType";
import KeywordUI from "../container/KeywordUI.container";
import KeywordFormUI from "../container/KeywordFormUI.container";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import {
  useDeleteKeywordMutation,
  useUpdateKeywordMutation,
} from "../../../../store/api/keywordApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

export type KeywordFormValues = {
  name: string;
  comment: string;
  dateComment: string;
  extraDate1: number | "";
  extraDate2: number | "";
  extraDateComment1: string;
  extraDateComment2: string;
};

interface KeywordProps {
  keyword: KeywordModel;
}

function Keyword({ keyword }: KeywordProps) {
  const [deleteKeyword] = useDeleteKeywordMutation();
  const [updateKeyword] = useUpdateKeywordMutation();
  const isKeywordQuestion = useSelector(
    (state: RootState) => state.keyword.isKeywordQuestion
  );
  const { name, comment, dateComment, extraDateList, file, id, number } =
    keyword;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<KeywordFormValues>({
    defaultValues: {
      name,
      comment,
      dateComment,
      extraDate1: extraDateList[0]?.extraDate || "",
      extraDate2: extraDateList[1]?.extraDate || "",
      extraDateComment1: extraDateList[0]?.extraDateComment || "",
      extraDateComment2: extraDateList[1]?.extraDateComment || "",
    },
  });
  const [image, setImage] = useState(file);

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
      await updateKeyword({
        name: data.name,
        comment: data.comment,
        file: image,
        dateComment: data.dateComment,
        extraDateList: newExtraDateList,
        id: id,
        number: number,
      }).unwrap();
      setIsEditing(false);
    } catch (error) {
      mutationErrorNotification(error);
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancle = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
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

  const handleDeleteImage = () => {
    setImage("");
  };

  return (
    <>
      {isEditing ? (
        <KeywordFormUI
          onCancle={handleCancle}
          onSubmit={onSubmit}
          onDeleteImage={handleDeleteImage}
          register={register}
          image={image}
          setImage={setImage}
        />
      ) : (
        <KeywordUI
          keyword={keyword}
          onDelete={handleDelete}
          onEdit={handleEdit}
          isKeywordQuestion={isKeywordQuestion}
        />
      )}
    </>
  );
}

export default Keyword;
