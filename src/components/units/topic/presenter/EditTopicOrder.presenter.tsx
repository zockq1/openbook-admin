import {
  useGetChapterTopicListQuery,
  useUpdateTopicOrderMutation,
} from "../../../../store/api/topicApi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditOrderUI from "../../common/EditOrderUI.container";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { Button } from "antd";
import useModalHandler from "../../../../hooks/useModalHandler";
import { useOrderListHandler } from "../../../../hooks/useOrderListHandler";

function EditTopicOrder() {
  const { chapter } = useParams();
  const chapterNumber = Number(chapter);

  const { isModalOpen, showModal, closeModal } = useModalHandler();
  const { orderList, setOrderList, handleChange } = useOrderListHandler();

  const { data: topicList, error: topicListError } =
    useGetChapterTopicListQuery(chapterNumber);
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
  }, [topicList, setOrderList]);

  const onSubmit = async () => {
    await updateTopicOrder(
      orderList.map((item, index) => {
        return { title: item.title, number: index };
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

export default EditTopicOrder;
