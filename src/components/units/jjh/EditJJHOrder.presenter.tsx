import { useEffect, useState } from "react";
import useNotificationErrorList from "../../../hooks/useNotificationErrorList";
import setError from "../../../services/setError";
import {
  useGetJJHListQuery,
  useUpdateJJHOrderMutation,
} from "../../../store/api/JJHApi";
import { DropResult } from "react-beautiful-dnd";
import EditOrderUI from "../common/EditOrderUI.container";
import { Button } from "antd";

export interface JJHOrderModel {
  title: string;
  number: number;
  id: number;
  type: "Chapter" | "Timeline";
}

function EditJJHOrder() {
  const { data: jjhList, error: jjhListError } = useGetJJHListQuery(
    { count: 5 },
    { refetchOnMountOrArgChange: true }
  );
  useNotificationErrorList([setError(jjhListError, "정주행 목록")]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedJJHList, setEditedJJHList] = useState<JJHOrderModel[]>([]);
  const [updateJJHOrder, { isLoading }] = useUpdateJJHOrderMutation();

  useEffect(() => {
    if (jjhList) {
      let newList: JJHOrderModel[] = jjhList.chapterList.map(
        (chapter): JJHOrderModel => {
          const { jjhNumber, title, number, id } = chapter;
          return {
            title: `${number}단원: ${title}`,
            number: jjhNumber,
            id: id,
            type: "Chapter",
          };
        }
      );
      newList = newList.concat(
        jjhList.timelineList.map((timeline): JJHOrderModel => {
          const { endDate, startDate, era, jjhNumber, id } = timeline;
          return {
            title: `연표 학습: ${era}(${startDate} ~ ${endDate})`,
            number: jjhNumber,
            id: id,
            type: "Timeline",
          };
        })
      );
      setEditedJJHList(newList.sort((a, b) => a.number - b.number));
    }
  }, [jjhList, setEditedJJHList]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    let newJJHList = editedJJHList.map((jjh, index) => ({
      ...jjh,
      number: index,
    }));
    await updateJJHOrder({
      chapterList: newJJHList
        .filter((item) => item.type === "Chapter")
        .map((chapter) => ({
          id: chapter.id,
          jjhNumber: chapter.number,
        })),
      timelineList: newJJHList
        .filter((item) => item.type === "Timeline")
        .map((timeline) => ({
          id: timeline.id,
          jjhNumber: timeline.number,
        })),
    });
    setIsModalOpen(false);
  };

  const handleChange = async (result: DropResult) => {
    if (!result.destination) return;
    const items = [...editedJJHList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEditedJJHList(items);
  };

  return (
    <EditOrderUI
      orderList={editedJJHList}
      button={<Button onClick={showModal}>순서 변경</Button>}
      handleCancel={handleCancel}
      onSubmit={onSubmit}
      handleChange={handleChange}
      isModalOpen={isModalOpen}
      isLoading={isLoading}
    />
  );
}

export default EditJJHOrder;
