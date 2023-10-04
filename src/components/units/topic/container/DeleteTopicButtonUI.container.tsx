import { Button } from "antd";
interface DeleteTopicProps {
  handleDeleteClick: () => Promise<void>;
}

function DeleteTopicButtonUI({ handleDeleteClick }: DeleteTopicProps) {
  return (
    <Button danger type="primary" onClick={handleDeleteClick}>
      삭제
    </Button>
  );
}

export default DeleteTopicButtonUI;
