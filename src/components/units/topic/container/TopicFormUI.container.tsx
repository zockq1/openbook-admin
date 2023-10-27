import { Button, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { GetChapterModel } from "../../../../types/chapterTypes";
import ContentBox from "../../../commons/ContentBox";
import { useEffect } from "react";
import filterOption from "../../../../services/filterOption";
import { GetQuestionCategoryModel } from "../../../../types/questionCategory";
import { GetTopicModel } from "../../../../types/topicTypes";

interface TopicFormUIProps {
  onFinish: (values: any) => Promise<void>;
  questionCategoryList: GetQuestionCategoryModel;
  chapterList: GetChapterModel;
  initialValue: Omit<GetTopicModel, "number">;
  isLoading: boolean;
}

function TopicFormUI({
  onFinish,
  questionCategoryList,
  initialValue,
  chapterList,
  isLoading,
}: TopicFormUIProps) {
  const {
    questionCategory,
    dateComment,
    detail,
    extraDateList,
    title,
    chapter: chapterNumber,
  } = initialValue;
  const questionCategoryId = questionCategory.id;

  useEffect(() => {
    window.scrollTo({ top: 400, left: 0, behavior: "smooth" });
  }, []);

  return (
    <ContentBox title={title || "주제 생성"}>
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
            <Select
              style={{ width: "300px" }}
              showSearch
              filterOption={filterOption}
              placeholder="단원 선택"
            >
              {chapterList.map((chapter) => (
                <Select.Option value={chapter.number} key={chapter.number}>
                  {`${chapter.number}. ${chapter.title}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item label="이름" style={{ marginBottom: 0 }}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "이름을 입력해주세요!" }]}
            initialValue={title}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item label="문제 분류" style={{ marginBottom: 0 }}>
          <Form.Item
            name="questionCategory"
            rules={[{ required: true, message: "문제 분류를 선택해 주세요!" }]}
            style={{
              display: "inline-block",
            }}
            initialValue={questionCategoryId}
          >
            <Select
              style={{ width: "250px" }}
              showSearch
              filterOption={filterOption}
              placeholder="문제 분류 선택"
            >
              {questionCategoryList.map((category) => (
                <Select.Option value={category.id} key={category.id}>
                  {category.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="dateComment"
          label="년도"
          rules={[{ required: false, message: "년도를 입력해 주세요!" }]}
          initialValue={dateComment}
        >
          <Input />
        </Form.Item>

        <Form.Item label="연표 년도">
          <Form.List name="extraDateList" initialValue={extraDateList}>
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
                        {
                          required: true,
                          message: "추가 년도를 입력해 주세요!",
                        },
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
          initialValue={detail}
        >
          <Input.TextArea rows={10} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: "right" }}
            loading={isLoading}
          >
            저장
          </Button>
        </Form.Item>
      </Form>
    </ContentBox>
  );
}

export default TopicFormUI;
