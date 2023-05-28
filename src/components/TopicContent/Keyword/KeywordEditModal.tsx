import { Button, Form, Input, Modal, Space, notification } from "antd";
import { useEffect, useState } from "react";
import {
  useAddKeywordMutation,
  useDeleteKeywordMutation,
  useGetKeywordListQuery,
} from "../../../store/api/KeywordApi";
import { KeywordModel } from "../../../types/keywordType";

function KeywordEditModal() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addKeyword] = useAddKeywordMutation();
  const [deleteKeyword] = useDeleteKeywordMutation();
  const { data: keywordList, error: keywordListError } =
    useGetKeywordListQuery();

  useEffect(() => {
    if (keywordListError) {
      console.error(keywordListError);
      notification.error({
        message: "에러 발생",
        description: "카테고리 목록을 불러오는 도중에 에러가 발생했습니다.",
      });
    }
  }, [keywordListError]);

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
      const { keyword } = values;
      await addKeyword(keyword);
      form.resetFields();
    } catch (error: any) {
      console.error(error);
      error.data.forEach((data: any) => {
        notification.error({
          message: "Error",
          description: data.message,
        });
      });
    }
  };

  const handleDelete = async (keywordId: number) => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteKeyword(keywordId).unwrap();
        } catch (error: any) {
          console.error(error);
          error.data.forEach((data: any) => {
            notification.error({
              message: "Error",
              description: data.message,
            });
          });
        }
      },
    });
  };

  return (
    <div style={{ float: "right" }}>
      <Button type="primary" onClick={showModal}>
        키워드 설정
      </Button>
      <Modal
        title="키워드 설정"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="keyword-form"
          form={form}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item
            name="keyword-name"
            label="키워드"
            rules={[
              {
                required: true,
                message: "키워드를 입력해주세요.",
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
        {keywordList?.map((keyword: KeywordModel) => (
          <Space key={keyword.id}>
            <span style={{ fontSize: 18 }}>{keyword.keyword}</span>
            <Button onClick={() => handleDelete(keyword.id)} danger>
              삭제
            </Button>
            <span> </span>
          </Space>
        ))}
      </Modal>
    </div>
  );
}

export default KeywordEditModal;
