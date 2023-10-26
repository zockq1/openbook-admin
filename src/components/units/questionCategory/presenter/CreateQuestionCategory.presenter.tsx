import { useForm } from "react-hook-form";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import QuestionCategoryFormUI from "../container/QuestionCategoryFormUI.container";
import { useGetEraListQuery } from "../../../../store/api/eraApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useAddQuestionCategoryMutation } from "../../../../store/api/questionCategoryApi";
import { useGetCategoryListQuery } from "../../../../store/api/categoryApi";
export type QuestionCategoryFormValues = {
  title: string;
  era: string;
  category: string;
};

function CreateQuestionCategory() {
  const [addQuestionCategory] = useAddQuestionCategoryMutation();
  const { data: eraList, error: eraListError } = useGetEraListQuery();
  const { data: categoryList, error: categoryListError } =
    useGetCategoryListQuery();
  const { register, handleSubmit, reset, control } =
    useForm<QuestionCategoryFormValues>();
  useNotificationErrorList([
    setError(eraListError, "시대 목록"),
    setError(categoryListError, "분류 목록"),
  ]);

  const onSubmit = handleSubmit(async (data) => {
    const { era, category, title } = data;
    try {
      addQuestionCategory({
        title,
        era,
        category,
      });
      reset({
        title: "",
        era: "",
        category: "",
      });
    } catch (error) {
      mutationErrorNotification(error);
    }
  });

  if (!eraList || !categoryList) {
    return <></>;
  }

  return (
    <QuestionCategoryFormUI
      onSubmit={onSubmit}
      register={register}
      eraList={eraList}
      categoryList={categoryList}
      control={control}
    />
  );
}

export default CreateQuestionCategory;
