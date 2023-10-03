import { useNavigate } from "react-router-dom";
import { useUpdateTopicMutation } from "../../../store/api/topicApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import { ExtraDateModel, TopicModel } from "../../../types/topicTypes";
import { Button, Form, Input, Select, Space } from "antd";
import { CategoryModel } from "../../../types/categoryType";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import CategoryEditModal from "../category/CategoryEditModal";
import { EraModel } from "../../../types/eraType";
import EraEditModal from "../era/EraEditModal";

interface TopicInfoProps {
  topicInfo: TopicModel;
  categoryList: CategoryModel[];
  eraList: EraModel[];
  topicTitle: string;
  chapterNumber: number;
}

function EditTopic({
  topicInfo,
  categoryList,
  eraList,
  topicTitle,
  chapterNumber,
}: TopicInfoProps) {
  const navigate = useNavigate();
  const [updateTopic] = useUpdateTopicMutation();

  const onFinish = async (values: any) => {
    const {
      chapter,
      title,
      category,
      era,
      detail,
      dateComment,
      extraDateList,
    } = values;
    let updatedTopic: TopicModel = {
      chapter,
      title,
      category,
      era,
      detail: detail ? detail : "",
      dateComment,
      extraDateList: [],
    };

    if (extraDateList) {
      extraDateList.forEach((item: ExtraDateModel) => {
        const newExtraDate: ExtraDateModel = {
          extraDate: item.extraDate,
          extraDateComment: String(item.extraDateComment),
        };
        updatedTopic.extraDateList.push(newExtraDate);
      });
    }
    try {
      await updateTopic({ updatedTopic, title: topicTitle }).unwrap();
      navigate(`/topic/${chapter}/${title}/topic-info`);
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
          initialValue={topicInfo.title}
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
          initialValue={topicInfo.category}
        >
          <Select style={{ width: "300px" }} showSearch placeholder="분류 선택">
            {categoryList.map((category: CategoryModel) => (
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
          initialValue={topicInfo.era}
        >
          <Select style={{ width: "300px" }} showSearch placeholder="시대 선택">
            {eraList.map((era: EraModel) => (
              <Select.Option value={era.name} key={era.name}>
                {era.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <EraEditModal eraList={eraList} />
      </Form.Item>

      <Form.Item
        name="dateComment"
        label="년도"
        rules={[{ required: false, message: "년도를 입력해 주세요!" }]}
        initialValue={topicInfo.dateComment}
      >
        <Input />
      </Form.Item>

      <Form.Item label="연표 년도 추가">
        <Form.List name="extraDateList" initialValue={topicInfo.extraDateList}>
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
        initialValue={topicInfo.detail}
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

export default EditTopic;
