import { useEffect, useState } from "react";
import useNotificationErrorList from "../../../hooks/useNotificationErrorList";
import setError from "../../../services/setError";
import {
  useGetJJHListQuery,
  useUpdateJJHOrderMutation,
} from "../../../store/api/JJHApi";
import { DropResult } from "react-beautiful-dnd";
import EditOrderUI, { OrderModel } from "../common/EditOrderUI.container";
import { Button } from "antd";
import useModal from "../../../hooks/useModal";

function EditJJHOrder() {
  const { isModalOpen, showModal, closeModal } = useModal();
  const { data: jjhList, error: jjhListError } = useGetJJHListQuery(
    { count: 5 },
    { refetchOnMountOrArgChange: true }
  );
  useNotificationErrorList([setError(jjhListError, "정주행 목록")]);
  const [orderList, setOrderList] = useState<OrderModel[]>([]);
  const [updateJJHOrder, { isLoading }] = useUpdateJJHOrderMutation();

  useEffect(() => {
    if (jjhList) {
      let newList: OrderModel[] = jjhList.chapterList.map(
        (chapter): OrderModel => {
          const { jjhNumber, title, number, id } = chapter;
          return {
            title: `${number}단원: ${title}`,
            number: jjhNumber,
            id: id,
            isColored: false,
          };
        }
      );
      newList = newList.concat(
        jjhList.timelineList.map((timeline): OrderModel => {
          const { jjhNumber, id, endDate, era, startDate } = timeline;
          return {
            title: `연표 학습: ${era}(${startDate} ~ ${endDate})`,
            number: jjhNumber,
            id: id,
            isColored: true,
          };
        })
      );
      setOrderList(newList.sort((a, b) => a.number - b.number));
    }
  }, [jjhList, setOrderList]);

  const onSubmit = async () => {
    let newJJHList = orderList.map((jjh, index) => ({
      ...jjh,
      number: index,
    }));
    await updateJJHOrder({
      chapterList: newJJHList
        .filter((item) => item.isColored === false)
        .map((chapter) => ({
          id: chapter.id,
          jjhNumber: chapter.number,
        })),
      timelineList: newJJHList
        .filter((item) => item.isColored === true)
        .map((timeline) => ({
          id: timeline.id,
          jjhNumber: timeline.number,
        })),
    });
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

export default EditJJHOrder;
