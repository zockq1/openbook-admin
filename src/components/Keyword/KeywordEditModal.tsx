import { Button, Form, Input, Modal, Space, notification } from "antd";
import { useEffect, useState } from "react";
import {
  useAddKeywordMutation,
  useDeleteKeywordMutation,
  useGetKeywordListQuery,
} from "../../store/api/KeywordApi";
import { useParams } from "react-router-dom";
import { KeywordModel } from "../../types/keywordType";
import errorMessage from "../../services/errorMessage";

function KeywordEditModal() {
  const { title } = useParams();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addKeyword] = useAddKeywordMutation();
  const [deleteKeyword] = useDeleteKeywordMutation();
  const { data: keywordList, error: keywordListError } = useGetKeywordListQuery(
    title ? title : ""
  );

  useEffect(() => {
    if (keywordListError) {
      console.error(keywordListError);
      notification.error({
        message: "에러 발생",
        description: "키워드 목록을 불러오는 도중에 에러가 발생했습니다.",
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
      await addKeyword({
        keyword: String(keyword),
        topicTitle: String(title),
      }).unwrap();
      form.resetFields();
    } catch (error) {
      errorMessage(error);
    }
  };

  const handleDelete = async (keyword: string) => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        console.log("키워드: " + keyword + "주제: " + title);
        try {
          await deleteKeyword({
            keyword: String(keyword),
            topicTitle: String(title),
          }).unwrap();
        } catch (error) {
          errorMessage(error);
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
            name="keyword"
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
        {keywordList?.map((keyword: KeywordModel, index: number) => (
          <Space key={index}>
            <span style={{ fontSize: 18 }}>{keyword.name}</span>
            <Button onClick={() => handleDelete(keyword.name)} danger>
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
