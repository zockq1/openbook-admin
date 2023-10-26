import { useState } from "react";
import TimelineFormUI from "../container/TimelineFormUI.container";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { TimelineModel } from "../../../../types/timelineTypes";
import {
  useDeleteTimelineMutation,
  useUpdateTimelineMutation,
} from "../../../../store/api/timelineApi";
import { TimelineFormValues } from "./CreateTimeline.presenter";
import TimelineUI from "../container/TimelineUI.container";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { useGetEraListQuery } from "../../../../store/api/eraApi";

interface TimelineProps {
  timeline: TimelineModel;
}

function Timeline({ timeline }: TimelineProps) {
  const [deleteTimeline] = useDeleteTimelineMutation();
  const [updateTimeline] = useUpdateTimelineMutation();
  const { data: eraList, error: eraListError } = useGetEraListQuery();
  useNotificationErrorList([setError(eraListError, "시대 목록")]);
  const { era, startDate, endDate, id, title } = timeline;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { register, handleSubmit, control } = useForm<TimelineFormValues>({
    defaultValues: {
      title,
      era,
      startDate,
      endDate,
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    const { era, startDate, endDate, title } = data;
    if (startDate === "" || endDate === "") return;

    try {
      await updateTimeline({
        id,
        updatedTimeline: {
          title,
          era,
          startDate,
          endDate,
        },
      }).unwrap();
      setIsEditing(false);
    } catch (error) {
      mutationErrorNotification(error);
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancle = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 연표를 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteTimeline({ id }).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  if (!eraList) {
    return <></>;
  }

  return (
    <>
      {isEditing ? (
        <TimelineFormUI
          onCancle={handleCancle}
          onSubmit={onSubmit}
          register={register}
          eraList={eraList}
          control={control}
        />
      ) : (
        <TimelineUI
          timeline={timeline}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </>
  );
}

export default Timeline;
