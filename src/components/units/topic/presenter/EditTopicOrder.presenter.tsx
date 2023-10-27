import {
  useGetChapterTopicListQuery,
  useUpdateTopicOrderMutation,
} from "../../../../store/api/topicApi";
import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import EditOrderUI, { OrderModel } from "../../common/EditOrderUI.container";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { Button } from "antd";
import useModal from "../../../../hooks/useModal";

function EditTopicOrder() {
  const { isModalOpen, showModal, closeModal } = useModal();
  const { chapter } = useParams();
  const chapterNumber = Number(chapter);
  const { data: topicList, error: topicListError } =
    useGetChapterTopicListQuery(chapterNumber);
  const [orderList, setOrderList] = useState<OrderModel[]>([]);
  const [updateTopicOrder, { isLoading }] = useUpdateTopicOrderMutation();

  useNotificationErrorList([setError(topicListError, "주제 목록")]);

  useEffect(() => {
    if (topicList?.length)
      setOrderList(
        [...topicList]
          .sort((a, b) => a.number - b.number)
          .map((topic, index) => {
            return {
              title: topic.title,
              id: 0,
              number: topic.number,
              isColored: false,
              date: topic.dateComment,
            };
          })
      );
  }, [topicList]);

  const onSubmit = async () => {
    await updateTopicOrder(
      orderList.map((item, index) => {
        return { title: item.title, number: index };
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

export default EditTopicOrder;
