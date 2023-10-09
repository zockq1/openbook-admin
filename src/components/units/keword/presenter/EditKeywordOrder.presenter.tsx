import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import {
  useGetKeywordListQuery,
  useUpdateKeywordOrderMutation,
} from "../../../../store/api/keywordApi";
import { KeywordModel } from "../../../../types/keywordType";
import EditOrderUI from "../../common/EditOrderUI.container";
import { Button } from "antd";

function EditkeywordOrder() {
  const { topic } = useParams();
  const topicTitle = String(topic);
  const { data: keywordList, error: keywordListError } =
    useGetKeywordListQuery(topicTitle);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedkeywordList, setEditedkeywordList] = useState<KeywordModel[]>(
    []
  );
  const [updatekeywordOrder, { isLoading }] = useUpdateKeywordOrderMutation();

  useNotificationErrorList([setError(keywordListError, "주제 목록")]);

  useEffect(() => {
    if (keywordList?.length)
      setEditedkeywordList(
        [...keywordList].sort((a, b) => a.number - b.number)
      );
  }, [keywordList]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    await updatekeywordOrder(
      editedkeywordList.map((item, index) => {
        return { id: item.id, number: index };
      })
    );
    setIsModalOpen(false);
  };

  const handleChange = async (result: DropResult) => {
    if (!result.destination) return;
    const items = [...editedkeywordList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEditedkeywordList(items);
  };

  return (
    <EditOrderUI
      orderList={editedkeywordList}
      button={
        <Button onClick={showModal} size="small">
          변경
        </Button>
      }
      handleCancel={handleCancel}
      onSubmit={onSubmit}
      handleChange={handleChange}
      isModalOpen={isModalOpen}
      isLoading={isLoading}
    />
  );
}

export default EditkeywordOrder;
