import React, { useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { TopicModel } from "../../types/topicTypes";
import { useAddTopicMutation } from "../../store/api/topicApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoryListQuery } from "../../store/api/categoryApi";
import CategoryEditModal from "../Category/CategoryEditModal";
import { CategoryModel } from "../../types/categoryType";
import {
  mutationErrorNotification,
  queryErrorNotification,
} from "../../services/errorNotification";

const { Option } = Select;

function CreateTopic() {
  const navigate = useNavigate();
  const [addTopic] = useAddTopicMutation();
  const { chapter } = useParams();
  const { data: categoryList, error: categoryListError } =
    useGetCategoryListQuery();

  useEffect(() => {
    queryErrorNotification(categoryListError, "분류 목록");
  }, [categoryListError]);

  const onFinish = async (values: any) => {
    const newTopic: TopicModel = {
      chapter: Number(values.chapter),
      title: values.title,
      category: values.category,
      startDate: Number(values.startDate),
      endDate: Number(values.endDate),
      detail: values.detail,
    };
    console.log(newTopic);
    try {
      await addTopic(newTopic).unwrap();
      navigate(`/topic/${chapter}/${values.title}`);
    } catch (error) {
      mutationErrorNotification(error);
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
        initialValue={chapter}
      >
        <Input type="number" />
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
          {categoryList?.map((category: CategoryModel) => (
            <Option value={category.name} key={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <CategoryEditModal />
      </Form.Item>

      <Form.Item
        name="startDate"
        label="시작 년도"
        rules={[{ required: true, message: "시작 년도를 입력해 주세요!" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="endDate"
        label="종료 년도"
        rules={[{ required: true, message: "종료 년도를 입력해 주세요!" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="detail"
        label="상세설명"
        rules={[{ required: false, message: "상세설명을 입력해 주세요!" }]}
      >
        <Input.TextArea rows={10} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ float: "right" }}>
          저장
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateTopic;
