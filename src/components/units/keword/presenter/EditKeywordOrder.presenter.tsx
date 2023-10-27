import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import {
  useGetKeywordListQuery,
  useUpdateKeywordOrderMutation,
} from "../../../../store/api/keywordApi";
import EditOrderUI from "../../common/EditOrderUI.container";
import { Button } from "antd";
import useModalHandler from "../../../../hooks/useModalHandler";
import { useOrderListHandler } from "../../../../hooks/useOrderListHandler";

function EditkeywordOrder() {
  const { topic } = useParams();
  const topicTitle = String(topic);

  const { isModalOpen, showModal, closeModal } = useModalHandler();
  const { orderList, setOrderList, handleChange } = useOrderListHandler();

  const { data: keywordList, error: keywordListError } =
    useGetKeywordListQuery(topicTitle);
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
  }, [keywordList, setOrderList]);

  const onSubmit = async () => {
    await updatekeywordOrder(
      orderList.map((item, index) => {
        return { id: item.id, number: index };
      })
    );
    closeModal();
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
