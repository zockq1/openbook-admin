import { useEffect } from "react";
import EditOrderUI from "../../common/EditOrderUI.container";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { Button } from "antd";
import {
  useGetChaptersQuery,
  useUpdateChapterOrderMutation,
} from "../../../../store/api/chapterApi";
import useModalHandler from "../../../../hooks/useModalHandler";
import { useOrderListHandler } from "../../../../hooks/useOrderListHandler";

function EditChapterOrder() {
  const { isModalOpen, showModal, closeModal } = useModalHandler();
  const { orderList, setOrderList, handleChange } = useOrderListHandler();

  const { data: chapterList, error: chapterListError } = useGetChaptersQuery();
  const [updateChapterOrder, { isLoading }] = useUpdateChapterOrderMutation();

  useNotificationErrorList([setError(chapterListError, "단원 목록")]);

  useEffect(() => {
    if (chapterList?.length)
      setOrderList(
        [...chapterList]
          .sort((a, b) => a.number - b.number)
          .map((chapter) => {
            return {
              title: chapter.title,
              id: chapter.id,
              isColored: false,
              number: chapter.number,
              date: chapter.dateComment,
            };
          })
      );
  }, [chapterList, setOrderList]);

  const onSubmit = async () => {
    await updateChapterOrder(
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
      handleCancel={closeModal}
      onSubmit={onSubmit}
      handleChange={handleChange}
      isModalOpen={isModalOpen}
      isLoading={isLoading}
    />
  );
}

export default EditChapterOrder;
