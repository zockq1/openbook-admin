import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import {
  useGetKeywordListQuery,
  useUpdateKeywordOrderMutation,
} from "../../../../store/api/keywordApi";
import EditOrderUI, { OrderModel } from "../../common/EditOrderUI.container";
import { Button } from "antd";
import useModal from "../../../../hooks/useModal";

function EditkeywordOrder() {
  const { isModalOpen, showModal, closeModal } = useModal();
  const { topic } = useParams();
  const topicTitle = String(topic);
  const { data: keywordList, error: keywordListError } =
    useGetKeywordListQuery(topicTitle);
  const [orderList, setOrderList] = useState<OrderModel[]>([]);
  const [updatekeywordOrder, { isLoading }] = useUpdateKeywordOrderMutation();

  useNotificationErrorList([setError(keywordListError, "주제 목록")]);

  useEffect(() => {
    if (keywordList?.length)
      setOrderList(
        [...keywordList]
          .sort((a, b) => a.number - b.number)
          .map((keyword) => {
            return {
              title: keyword.name,
              id: keyword.id,
              number: keyword.number,
              isColored: false,
              date: keyword.dateComment,
            };
          })
      );
  }, [keywordList]);

  const onSubmit = async () => {
    await updatekeywordOrder(
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
      button={
        <Button onClick={showModal} size="small">
          변경
        </Button>
      }
      handleCancel={closeModal}
      onSubmit={onSubmit}
      handleChange={handleChange}
      isModalOpen={isModalOpen}
      isLoading={isLoading}
    />
  );
}

export default EditkeywordOrder;
