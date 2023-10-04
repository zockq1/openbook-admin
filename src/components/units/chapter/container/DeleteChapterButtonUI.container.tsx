import { Button } from "antd";

interface DeleteChapterButtonProps {
  handleDelete: () => Promise<void>;
  isLoading: boolean;
}
function DeleteChapterButtonUI({
  handleDelete,
  isLoading,
}: DeleteChapterButtonProps) {
  return (
    <Button danger type="primary" onClick={handleDelete} loading={isLoading}>
      단원 삭제
    </Button>
  );
}

export default DeleteChapterButtonUI;
