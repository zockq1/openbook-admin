import React, { useEffect } from "react";
import { Form, Input, Select, Button, Switch, Space } from "antd";
import { ExtraDate, TopicModel } from "../../types/topicTypes";
import { useAddTopicMutation } from "../../store/api/topicApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoryListQuery } from "../../store/api/categoryApi";
import CategoryEditModal from "../Category/CategoryEditModal";
import { CategoryModel } from "../../types/categoryType";
import {
  mutationErrorNotification,
  queryErrorNotification,
} from "../../services/errorNotification";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

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

  const onFinish = async (values: TopicModel) => {
    let newTopic: TopicModel = {
      chapter: Number(values.chapter),
      title: values.title,
      category: values.category,
      startDate: values.startDate ? Number(values.startDate) : null,
      startDateCheck: Boolean(values.startDateCheck),
      endDate: values.endDate ? Number(values.endDate) : null,
      endDateCheck: Boolean(values.endDateCheck),
      detail: values.detail ? values.detail : "",
      extraDateList: [],
    };
    if (values.extraDateList) {
      values.extraDateList.forEach((item) => {
        const newExtraDate: ExtraDate = {
          extraDate: item.extraDate,
          extraDateCheck: Boolean(item.extraDateCheck),
          extraDateComment: String(item.extraDateComment),
        };
        newTopic.extraDateList.push(newExtraDate);
      });
    }

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
      <Form.Item label="단원" style={{ marginBottom: 0 }}>
        <Form.Item
          name="chapter"
          rules={[{ required: true, message: "단원을 입력해주세요!" }]}
          initialValue={chapter}
        >
          <Input type="number" />
        </Form.Item>
      </Form.Item>

      <Form.Item label="이름" style={{ marginBottom: 0 }}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "이름을 입력해주세요!" }]}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="분류" style={{ marginBottom: 0 }}>
        <Form.Item
          name="category"
          rules={[{ required: true, message: "분류를 선택해 주세요!" }]}
          style={{
            display: "inline-block",
          }}
        >
          <Select style={{ width: "300px" }}>
            {categoryList?.map((category: CategoryModel) => (
              <Option value={category.name} key={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <CategoryEditModal />
      </Form.Item>

      <Form.Item label="시작 년도" style={{ marginBottom: 0 }}>
        <Form.Item
          name="startDate"
          style={{
            display: "inline-block",
            width: "150px",
            marginRight: "10px",
          }}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="연표 사용"
          name="startDateCheck"
          style={{ display: "inline-block" }}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form.Item>

      <Form.Item label="종료 년도" style={{ marginBottom: 0 }}>
        <Form.Item
          name="endDate"
          style={{
            display: "inline-block",
            width: "150px",
            marginRight: "10px",
          }}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="연표 사용"
          name="endDateCheck"
          style={{ display: "inline-block" }}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form.Item>

      <Form.Item label="추가 년도">
        <Form.List name="extraDateList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 0 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "extraDate"]}
                    rules={[
                      { required: true, message: "추가 년도를 입력해 주세요!" },
                    ]}
                    style={{
                      width: "150px",
                      marginRight: "3px",
                      display: "inline-block",
                    }}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="설명"
                    name={[name, "extraDateComment"]}
                    style={{
                      width: "200px",
                      marginRight: "3px",
                      display: "inline-block",
                    }}
                  >
                    <Input type="text" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="연표 사용"
                    name={[name, "extraDateCheck"]}
                    style={{ display: "inline-block" }}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
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
