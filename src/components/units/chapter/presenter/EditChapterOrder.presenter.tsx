import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import EditOrderUI, { OrderModel } from "../../common/EditOrderUI.container";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { Button } from "antd";
import {
  useGetChaptersQuery,
  useUpdateChapterOrderMutation,
} from "../../../../store/api/chapterApi";
import useModal from "../../../../hooks/useModal";

function EditChapterOrder() {
  const { isModalOpen, showModal, closeModal } = useModal();
  const { data: chapterList, error: chapterListError } = useGetChaptersQuery();
  const [orderList, setOrderList] = useState<OrderModel[]>([]);
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
  }, [chapterList]);

  const onSubmit = async () => {
    await updateChapterOrder(
      orderList.map((item, index) => {
        return { id: item.id, number: index };
      })
    );
    closeModal();
  };

  const handleChange = (result: DropResult) => {
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

export default EditChapterOrder;
