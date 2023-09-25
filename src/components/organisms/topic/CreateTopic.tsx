import { useNavigate } from "react-router-dom";
import { useAddTopicMutation } from "../../../store/api/topicApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import { ExtraDate, TopicModel } from "../../../types/topicTypes";
import { Button, Form, Input, Select, Space, Switch } from "antd";
import { CategoryModel } from "../../../types/categoryType";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import CategoryEditModal from "../category/CategoryEditModal";
import { EraModel } from "../../../types/eraType";
import EraEditModal from "../era/CreateEraModal";

interface CreateTopicProps {
  categoryList: CategoryModel[];
  eraList: EraModel[];
  chapterNumber: number;
}

function CreateTopic({
  categoryList,
  eraList,
  chapterNumber,
}: CreateTopicProps) {
  const navigate = useNavigate();
  const [addTopic] = useAddTopicMutation();

  const onFinish = async (values: TopicModel) => {
    let newTopic: TopicModel = {
      chapter: Number(values.chapter),
      title: values.title,
      category: values.category,
      era: values.era,
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
      navigate(`/topic/${chapterNumber}/${values.title}/topic-info`);
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      style={{ width: "auto", margin: "20px" }}
      labelCol={{ span: 4 }}
    >
      <Form.Item label="단원" style={{ marginBottom: 0 }}>
        <Form.Item
          name="chapter"
          rules={[{ required: true, message: "단원을 입력해주세요!" }]}
          initialValue={chapterNumber}
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
          <Select style={{ width: "100px" }}>
            {categoryList?.map((category: CategoryModel) => (
              <Select.Option value={category.name} key={category.name}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <CategoryEditModal categoryList={categoryList} />
      </Form.Item>

      <Form.Item label="시대" style={{ marginBottom: 0 }}>
        <Form.Item
          name="era"
          rules={[{ required: true, message: "시대를 선택해 주세요!" }]}
          style={{
            display: "inline-block",
          }}
        >
          <Select style={{ width: "100px" }}>
            {eraList?.map((era: EraModel) => (
              <Select.Option value={era.name} key={era.name}>
                {era.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <EraEditModal eraList={eraList} />
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
                  style={{ marginBottom: 0, position: "relative" }}
                >
                  <Form.Item
                    {...restField}
                    name={[name, "extraDate"]}
                    rules={[
                      { required: true, message: "추가 년도를 입력해 주세요!" },
                    ]}
                    style={{
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
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ position: "absolute" }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  추가
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
