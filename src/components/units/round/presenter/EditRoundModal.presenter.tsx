import { Form } from "antd";
import { useEffect } from "react";
import useModalHandler from "../../../../hooks/useModalHandler";
import EditRoundModalUI from "../container/EditRoundModalUI.container";
import {
  useGetRoundDateQuery,
  useUpdateRoundMutation,
} from "../../../../store/api/roundApi";
import { useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { mutationErrorNotification } from "../../../../services/errorNotification";

function EditRoundModal() {
  const { round } = useParams();
  const roundNumber = Number(round);
  const modalHandler = useModalHandler();
  const [updateRound] = useUpdateRoundMutation();
  const [form] = Form.useForm<{ number: number; date: number }>();
  const { data: roundDate, error: roundError } =
    useGetRoundDateQuery(roundNumber);

  useNotificationErrorList([setError(roundError, "회차 날짜")]);

  useEffect(() => {
    form.setFieldsValue({
      number: roundNumber,
      date: roundDate?.date,
    });
  }, [form, roundNumber, roundDate]);

  const handleSubmit = async (values: { number: number; date: number }) => {
    try {
      const { number, date } = values;
      await updateRound({
        updatedRound: {
          number,
          date,
        },
        roundNumber: roundNumber,
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
    modalHandler.closeModal();
  };

  return (
    <EditRoundModalUI
      modalHandler={modalHandler}
      onSubmit={handleSubmit}
      form={form}
      roundDate={roundDate?.date}
      roundNumber={roundNumber}
    />
  );
}

export default EditRoundModal;
