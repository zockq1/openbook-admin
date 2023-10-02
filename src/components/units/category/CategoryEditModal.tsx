import { Button, Form, Input, Modal, Space } from "antd";
import { useState } from "react";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../store/api/categoryApi";
import { CategoryModel } from "../../../types/categoryType";
import { mutationErrorNotification } from "../../../services/errorNotification";

interface CategoryEditModalProps {
  categoryList: CategoryModel[];
}

function CategoryEditModal({ categoryList }: CategoryEditModalProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    try {
      const { categoryName } = values;
      await addCategory(categoryName).unwrap();
      form.resetFields();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleDelete = async (category: string) => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteCategory(category).unwrap();
        } catch (error) {
          mutationErrorNotification(error);
        }
      },
    });
  };

  return (
    <div style={{ display: "inline", marginLeft: "20px" }}>
      <Button type="primary" onClick={showModal}>
        분류 설정
      </Button>
      <Modal
        title="분류 설정"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="category-form"
          form={form}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item
            name="categoryName"
            label="분류명"
            rules={[
              {
                required: true,
                message: "분류명을 입력해주세요.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              저장
            </Button>
          </Form.Item>
        </Form>
        {categoryList.map((category: CategoryModel) => (
          <Space key={category.name}>
            <span style={{ fontSize: 18 }}>{category.name}</span>
            <Button onClick={() => handleDelete(category.name)} danger>
              삭제
            </Button>
            <span> </span>
          </Space>
        ))}
      </Modal>
    </div>
  );
}

export default CategoryEditModal;
