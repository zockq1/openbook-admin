import { Button } from "antd";

interface DeleteRoundButtonProps {
  onDelete: () => Promise<void>;
  isLoading: boolean;
}

function DeleteRoundButtonUI({ onDelete, isLoading }: DeleteRoundButtonProps) {
  return (
    <Button danger type="primary" onClick={onDelete} loading={isLoading}>
      회차 삭제
    </Button>
  );
}

export default DeleteRoundButtonUI;
