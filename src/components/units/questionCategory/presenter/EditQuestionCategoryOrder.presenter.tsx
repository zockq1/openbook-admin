import { useEffect } from "react";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import {
  useGetQuestionCategoryListQuery,
  useUpdateQuestionCategoryOrderMutation,
} from "../../../../store/api/questionCategoryApi";
import EditOrderUI from "../../common/EditOrderUI.container";
import { Button } from "antd";
import useModalHandler from "../../../../hooks/useModalHandler";
import { useOrderListHandler } from "../../../../hooks/useOrderListHandler";

function EditquestionCategoryOrder() {
  const modalHandler = useModalHandler();
  const { showModal, closeModal } = modalHandler;
  const { orderList, setOrderList, handleChange } = useOrderListHandler();

  const { data: questionCategoryList, error: questionCategoryListError } =
    useGetQuestionCategoryListQuery();
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
  }, [questionCategoryList, setOrderList]);

  const onSubmit = async () => {
    await updatequestionCategoryOrder(
      orderList.map((item, index) => {
        return { id: item.id, number: index };
      })
    );
    closeModal();
  };

  return (
    <EditOrderUI
      orderList={orderList}
      button={<Button onClick={showModal}>순서 변경</Button>}
      modalHandler={modalHandler}
      onSubmit={onSubmit}
      handleChange={handleChange}
      isLoading={isLoading}
    />
  );
}

export default EditquestionCategoryOrder;
