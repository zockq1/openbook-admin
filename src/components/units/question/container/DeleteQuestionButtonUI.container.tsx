import { Button } from "antd";

interface DeleteQuestionButtonProps {
  onDelete: () => Promise<void>;
}

function DeleteQuestionButtonUI({ onDelete }: DeleteQuestionButtonProps) {
  return (
    <Button danger type="primary" onClick={onDelete}>
      삭제
    </Button>
  );
}

export default DeleteQuestionButtonUI;
