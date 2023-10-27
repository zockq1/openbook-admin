import { Form, Input, Button, RadioChangeEvent, Radio } from "antd";
import { QuestionFormHandler } from "../../../../hooks/useQuestionFormHandler";
import ContentBox from "../../../commons/ContentBox";

interface QuestionFormUIProps {
  questionFormhandler: QuestionFormHandler;
  onFinish: (values: any) => Promise<void>;
}

function QuestionFormUI({
  questionFormhandler,
  onFinish,
}: QuestionFormUIProps) {
  const {
    choiceType,
    setChoiceType,
    answer,
    setAnswer,
    score,
    setScore,
    form,
  } = questionFormhandler;
  return (
    <ContentBox title="문제 정보">
      <Form
        onFinish={onFinish}
        style={{ width: "auto", margin: "20px" }}
        labelCol={{ span: 4 }}
        form={form}
      >
        <Form.Item label="선지 유형">
          <Radio.Group
            options={[
              { label: "문자", value: "String" },
              { label: "이미지", value: "Image" },
            ]}
            onChange={(e: RadioChangeEvent) => setChoiceType(e.target.value)}
            value={choiceType}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item label="문제 번호" style={{ marginBottom: 0 }}>
          <Form.Item
            name="number"
            rules={[{ required: true, message: "문제 번호를 입력해주세요!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="정답">
          <Radio.Group
            buttonStyle="solid"
            onChange={(e: RadioChangeEvent) => setAnswer(e.target.value)}
            value={answer}
          >
            <Radio.Button value={1}>1</Radio.Button>
            <Radio.Button value={2}>2</Radio.Button>
            <Radio.Button value={3}>3</Radio.Button>
            <Radio.Button value={4}>4</Radio.Button>
            <Radio.Button value={5}>5</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="배점">
          <Radio.Group
            buttonStyle="solid"
            onChange={(e: RadioChangeEvent) => setScore(e.target.value)}
            value={score}
          >
            <Radio.Button value={1}>1</Radio.Button>
            <Radio.Button value={2}>2</Radio.Button>
            <Radio.Button value={3}>3</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            저장
          </Button>
        </Form.Item>
      </Form>
    </ContentBox>
  );
}

export default QuestionFormUI;
