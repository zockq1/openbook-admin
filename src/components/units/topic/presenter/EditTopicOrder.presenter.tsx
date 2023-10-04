import {
  useGetChapterTopicListQuery,
  useUpdateTopicOrderMutation,
} from "../../../../store/api/topicApi";
import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { TopicListModel } from "../../../../types/topicTypes";
import { useParams } from "react-router-dom";
import EditTopicOrderUI from "../container/EditTopicOrderUI.container";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";

function EditTopicOrder() {
  const { chapter } = useParams();
  const chapterNumber = Number(chapter);
  const { data: topicList, error: topicListError } =
    useGetChapterTopicListQuery(chapterNumber);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTopicList, setEditedTopicList] = useState<TopicListModel[]>([]);
  const [updateTopicOrder, { isLoading }] = useUpdateTopicOrderMutation();

  useNotificationErrorList([setError(topicListError, "주제 목록")]);

  useEffect(() => {
    if (topicList?.length) setEditedTopicList([...topicList]);
  }, [topicList]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    await updateTopicOrder(
      editedTopicList.map((item, index) => {
        return { title: item.title, number: index };
      })
    );
    setIsModalOpen(false);
  };

  const handleChange = async (result: DropResult) => {
    if (!result.destination) return;
    const items = [...editedTopicList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEditedTopicList(items);
  };

  return (
    <EditTopicOrderUI
      editedTopicList={editedTopicList}
      showModal={showModal}
      handleCancel={handleCancel}
      onSubmit={onSubmit}
      handleChange={handleChange}
      isModalOpen={isModalOpen}
      isLoading={isLoading}
    />
  );
}

export default EditTopicOrder;
