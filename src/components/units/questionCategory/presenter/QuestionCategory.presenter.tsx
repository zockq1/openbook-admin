import { useState } from "react";
import QuestionCategoryFormUI from "../container/QuestionCategoryFormUI.container";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { QuestionCategoryFormValues } from "./CreateQuestionCategory.presenter";
import QuestionCategoryUI from "../container/QuestionCategoryUI.container";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useGetEraListQuery } from "../../../../store/api/eraApi";
import {
  useDeleteQuestionCategoryMutation,
  useUpdateQuestionCategoryMutation,
} from "../../../../store/api/questionCategoryApi";
import { useGetCategoryListQuery } from "../../../../store/api/categoryApi";
import { QuestionCategoryModel } from "../../../../types/questionCategory";

interface QuestionCategoryProps {
  questionCategory: QuestionCategoryModel;
}

function QuestionCategory({ questionCategory }: QuestionCategoryProps) {
  const [deleteQuestionCategory] = useDeleteQuestionCategoryMutation();
  const [updateQuestionCategory] = useUpdateQuestionCategoryMutation();
  const { data: eraList, error: eraListError } = useGetEraListQuery();
  const { data: categoryList, error: categoryListError } =
    useGetCategoryListQuery();
  useNotificationErrorList([
    setError(eraListError, "시대 목록"),
    setError(categoryListError, "분류 목록"),
  ]);
  const { era, category, id, title } = questionCategory;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { register, handleSubmit, control } =
    useForm<QuestionCategoryFormValues>({
      defaultValues: {
        title,
        era,
        category,
      },
    });
  const onSubmit = handleSubmit(async (data) => {
    const { era, category, title } = data;

    try {
      await updateQuestionCategory({
        id,
        updatedQuestionCategory: {
          title,
          era,
          category,
        },
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
      content: "정말 이 연표를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteQuestionCategory({ id }).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  if (!eraList || !categoryList) {
    return <></>;
  }

  return (
    <>
      {isEditing ? (
        <QuestionCategoryFormUI
          onCancle={handleCancle}
          onSubmit={onSubmit}
          register={register}
          eraList={eraList}
          categoryList={categoryList}
          control={control}
        />
      ) : (
        <QuestionCategoryUI
          questionCategory={questionCategory}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </>
  );
}

export default QuestionCategory;
