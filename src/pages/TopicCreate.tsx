import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TopicModel } from "../types/topicTypes";
import { useAddTopicMutation } from "../store/api/topic.Api";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

const { Option } = Select;

function TopicCreate() {
  const navigate = useNavigate();
  const [addTopic] = useAddTopicMutation();
  const currentChapterNumber = useSelector(
    (state: RootState) => state.chapter.currentChapterNumber
  );
  const onFinish = async (values: TopicModel) => {
    try {
      await addTopic(values).unwrap();
      navigate(`/topic/${values.title}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      style={{ width: 600, margin: "auto auto" }}
      labelCol={{ span: 4 }}
      //wrapperCol={{ span: 14 }}
    >
      <Form.Item
        name="chapter"
        label="단원"
        rules={[{ required: true, message: "단원을 입력해주세요!" }]}
        initialValue={currentChapterNumber ? currentChapterNumber : ""}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="title"
        label="이름"
        rules={[{ required: true, message: "이름을 입력해주세요!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="분류"
        rules={[{ required: true, message: "분류를 선택해 주세요!" }]}
      >
        <Select>
          <Option value="인물">인물</Option>
          <Option value="사건">사건</Option>
          <Option value="국가">국가</Option>
          <Option value="유물">유물</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="Date"
        label="년도"
        rules={[{ required: true, message: "년도를 입력해 주세요!" }]}
      >
        <RangePicker picker="year" />
      </Form.Item>

      <Form.Item
        name="detail"
        label="상세설명"
        rules={[{ required: true, message: "상세설명을 입려갷 주세요!" }]}
      >
        <Input.TextArea rows={10} />
      </Form.Item>

      <Form.Item
        name="keywordList"
        label="키워드"
        rules={[{ required: true, message: "키워드를 입력해 주세요!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ float: "right" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TopicCreate;
