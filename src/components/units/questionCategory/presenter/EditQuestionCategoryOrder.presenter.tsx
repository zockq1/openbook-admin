import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import {
  useGetQuestionCategoryListQuery,
  useUpdateQuestionCategoryOrderMutation,
} from "../../../../store/api/questionCategoryApi";
import EditOrderUI, { OrderModel } from "../../common/EditOrderUI.container";
import { Button } from "antd";
import useModal from "../../../../hooks/useModal";

function EditquestionCategoryOrder() {
  const { isModalOpen, showModal, closeModal } = useModal();
  const { data: questionCategoryList, error: questionCategoryListError } =
    useGetQuestionCategoryListQuery();
  const [orderList, setOrderList] = useState<OrderModel[]>([]);
  const [updatequestionCategoryOrder, { isLoading }] =
    useUpdateQuestionCategoryOrderMutation();

  useNotificationErrorList([
    setError(questionCategoryListError, "문제 분류 목록"),
  ]);

  useEffect(() => {
    if (questionCategoryList?.length)
      setOrderList(
        [...questionCategoryList]
          .sort((a, b) => a.number - b.number)
          .map((questionCategory) => {
            return {
              title: questionCategory.title,
              id: questionCategory.id,
              number: questionCategory.number,
              isColored: false,
            };
          })
      );
  }, [questionCategoryList]);

  const onSubmit = async () => {
    await updatequestionCategoryOrder(
      orderList.map((item, index) => {
        return { id: item.id, number: index };
      })
    );
    closeModal();
  };

  const handleChange = async (result: DropResult) => {
    if (!result.destination) return;
    const items = [...orderList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setOrderList(items);
  };

  return (
    <EditOrderUI
      orderList={orderList}
      button={<Button onClick={showModal}>순서 변경</Button>}
      handleCancel={closeModal}
      onSubmit={onSubmit}
      handleChange={handleChange}
      isModalOpen={isModalOpen}
      isLoading={isLoading}
    />
  );
}

export default EditquestionCategoryOrder;
