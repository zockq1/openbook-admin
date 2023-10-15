import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import EditOrderUI from "../../common/EditOrderUI.container";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { Button } from "antd";
import {
  useGetChaptersQuery,
  useUpdateChapterOrderMutation,
} from "../../../../store/api/chapterApi";
import { GetChapterModel } from "../../../../types/chapterTypes";

function EditChapterOrder() {
  const { data: ChapterList, error: ChapterListError } = useGetChaptersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedChapterList, setEditedChapterList] = useState<GetChapterModel[]>(
    []
  );
  const [updateChapterOrder, { isLoading }] = useUpdateChapterOrderMutation();

  useNotificationErrorList([setError(ChapterListError, "단원 목록")]);

  useEffect(() => {
    if (ChapterList?.length)
      setEditedChapterList(
        [...ChapterList].sort((a, b) => a.number - b.number)
      );
  }, [ChapterList]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    await updateChapterOrder(
      editedChapterList.map((item, index) => {
        return { id: item.id, number: index };
      })
    );
    setIsModalOpen(false);
  };

  const handleChange = async (result: DropResult) => {
    if (!result.destination) return;
    const items = [...editedChapterList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEditedChapterList(items);
  };

  return (
    <EditOrderUI
      orderList={editedChapterList}
      button={<Button onClick={showModal}>순서 변경</Button>}
      handleCancel={handleCancel}
      onSubmit={onSubmit}
      handleChange={handleChange}
      isModalOpen={isModalOpen}
      isLoading={isLoading}
    />
  );
}

export default EditChapterOrder;
