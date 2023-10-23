import { useForm } from "react-hook-form";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import { useAddtimelineMutation } from "../../../../store/api/timelineApi";
import TimelineFormUI from "../container/TimelineFormUI.container";
import { useGetEraListQuery } from "../../../../store/api/eraApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
export type TimelineFormValues = {
  era: string;
  startDate: number | "";
  endDate: number | "";
};

function CreateTimeline() {
  const [addTimeline] = useAddtimelineMutation();
  const { data: eraList, error: eraListError } = useGetEraListQuery();
  const { register, handleSubmit, reset, control } =
    useForm<TimelineFormValues>();
  useNotificationErrorList([setError(eraListError, "시대 목록")]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const { era, startDate, endDate } = data;
    if (startDate === "" || endDate === "") return;
    try {
      addTimeline({
        era,
        startDate,
        endDate,
      });
      reset({
        era: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      mutationErrorNotification(error);
    }
  });

  if (!eraList) {
    return <></>;
  }

  return (
    <TimelineFormUI
      onSubmit={onSubmit}
      register={register}
      eraList={eraList}
      control={control}
    />
  );
}

export default CreateTimeline;
