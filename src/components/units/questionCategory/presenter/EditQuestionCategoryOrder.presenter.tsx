import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import {
  useGetQuestionCategoryListQuery,
  useUpdateQuestionCategoryOrderMutation,
} from "../../../../store/api/questionCategoryApi";
import EditOrderUI from "../../common/EditOrderUI.container";
import { Button } from "antd";
import { GetQuestionCategoryModel } from "../../../../types/questionCategory";

function EditquestionCategoryOrder() {
  const { data: questionCategoryList, error: questionCategoryListError } =
    useGetQuestionCategoryListQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedquestionCategoryList, setEditedquestionCategoryList] =
    useState<GetQuestionCategoryModel>([]);
  const [updatequestionCategoryOrder, { isLoading }] =
    useUpdateQuestionCategoryOrderMutation();

  useNotificationErrorList([
    setError(questionCategoryListError, "문제 분류 목록"),
  ]);

  useEffect(() => {
    if (questionCategoryList?.length)
      setEditedquestionCategoryList(
        [...questionCategoryList].sort((a, b) => a.number - b.number)
      );
  }, [questionCategoryList]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    await updatequestionCategoryOrder(
      editedquestionCategoryList.map((item, index) => {
        return { id: item.id, number: index };
      })
    );
    setIsModalOpen(false);
  };

  const handleChange = async (result: DropResult) => {
    if (!result.destination) return;
    const items = [...editedquestionCategoryList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEditedquestionCategoryList(items);
  };

  return (
    <EditOrderUI
      orderList={editedquestionCategoryList}
      button={<Button onClick={showModal}>순서 변경</Button>}
      handleCancel={handleCancel}
      onSubmit={onSubmit}
      handleChange={handleChange}
      isModalOpen={isModalOpen}
      isLoading={isLoading}
    />
  );
}

export default EditquestionCategoryOrder;
