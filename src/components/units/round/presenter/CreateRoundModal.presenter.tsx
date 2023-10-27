import { Form } from "antd";
import { useAddRoundMutation } from "../../../../store/api/roundApi";
import { mutationErrorNotification } from "../../../../services/errorNotification";
import useModalHandler from "../../../../hooks/useModalHandler";
import CreateRoundModalUI from "../container/CreateRoundModalUI.container";

function CreateRoundModal() {
  const modalHandler = useModalHandler();
  const [addRound] = useAddRoundMutation();
  const [form] = Form.useForm();

  const handleSubmit = async (values: { date: number; number: number }) => {
    try {
      const { date, number } = values;
      await addRound({
        date: date,
        number: number,
      }).unwrap();
      form.resetFields();
    } catch (error) {
      mutationErrorNotification(error);
    }
    modalHandler.closeModal();
  };

  return (
    <CreateRoundModalUI
      modalHandler={modalHandler}
      onSubmit={handleSubmit}
      form={form}
    />
  );
}

export default CreateRoundModal;
