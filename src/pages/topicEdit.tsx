import React from "react";
import { Form, Input, Select, Button } from "antd";
import { TopicModel } from "../types/topicTypes";
import {
  useGetTopicQuery,
  useUpdateTopicMutation,
} from "../store/api/topicApi";
import { useNavigate, useParams } from "react-router-dom";
import CategoryEditModal from "../components/CategoryEditModal";
const { Option } = Select;

function TopicEdit() {
  const navigate = useNavigate();
  let { title, chapter } = useParams();
  const { data: topic } = useGetTopicQuery(title ? title : "");
  const [updateTopic] = useUpdateTopicMutation();

  const onFinish = async (values: any) => {
    const updatedTopic: TopicModel = {
      chapter: values.chapter,
      title: values.title,
      category: values.category,
      startDate: values.startDate,
      endDate: values.endDate,
      detail: values.detail,
      keywordList: values.keywordList,
    };
    try {
      const title = topic?.title ? topic?.title : "";
      await updateTopic({ updatedTopic, title }).unwrap();
      navigate(`/topic/${chapter}/${values.title}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      style={{ width: 600, margin: "auto auto" }}
      labelCol={{ span: 4 }}
    >
      <Form.Item
        name="chapter"
        label="단원"
        rules={[{ required: true, message: "단원을 입력해주세요!" }]}
        initialValue={topic?.chapter}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="title"
        label="이름"
        rules={[{ required: true, message: "이름을 입력해주세요!" }]}
        initialValue={topic?.title}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="분류"
        rules={[{ required: true, message: "분류를 선택해 주세요!" }]}
        initialValue={topic?.category}
      >
        <Select>
          <Option value="인물">인물</Option>
          <Option value="사건">사건</Option>
          <Option value="국가">국가</Option>
          <Option value="유물">유물</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <CategoryEditModal />
      </Form.Item>

      <Form.Item
        name="startDate"
        label="시작 년도"
        rules={[{ required: true, message: "시작 년도를 입력해 주세요!" }]}
        initialValue={topic?.startDate}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="endDate"
        label="종료 년도"
        rules={[{ required: true, message: "종료 년도를 입력해 주세요!" }]}
        initialValue={topic?.endDate}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="detail"
        label="상세설명"
        rules={[{ required: true, message: "상세설명을 입려갷 주세요!" }]}
        initialValue={topic?.detail}
      >
        <Input.TextArea rows={10} />
      </Form.Item>

      <Form.Item
        name="keywordList"
        label="키워드"
        rules={[{ required: true, message: "키워드를 입력해 주세요!" }]}
        initialValue={topic?.keywordList}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ float: "right" }}>
          수정
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TopicEdit;
