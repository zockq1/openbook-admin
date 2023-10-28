import { useEffect } from "react";
import useNotificationErrorList from "../../../hooks/useNotificationErrorList";
import setError from "../../../services/setError";
import {
  useGetJJHListQuery,
  useUpdateJJHOrderMutation,
} from "../../../store/api/JJHApi";
import EditOrderUI, { OrderModel } from "../common/EditOrderUI.container";
import { Button } from "antd";
import useModalHandler from "../../../hooks/useModalHandler";
import { useOrderListHandler } from "../../../hooks/useOrderListHandler";

function EditJJHOrder() {
  const modalHandler = useModalHandler();
  const { showModal, closeModal } = modalHandler;
  const { orderList, setOrderList, handleChange } = useOrderListHandler();

  const { data: jjhList, error: jjhListError } = useGetJJHListQuery(
    { count: 5 },
    { refetchOnMountOrArgChange: true }
  );
  useNotificationErrorList([setError(jjhListError, "정주행 목록")]);
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
          const { jjhNumber, id, title } = timeline;
          return {
            title: `연표 학습: ${title}`,
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

export default EditJJHOrder;
