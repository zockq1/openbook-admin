import { useState } from "react";
import { Form, Input, Button, RadioChangeEvent, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { mutationErrorNotification } from "../../../services/errorNotification";
import { useUpdateQuestionMutation } from "../../../store/api/questionApi";
import { ChoiceType, QuestionModel } from "../../../types/questionTypes";

interface EditQuestionProps {
  questionInfo: QuestionModel;
  roundNumber: number;
  questionNumber: number;
}

function EditQuestion({
  questionInfo,
  roundNumber,
  questionNumber,
}: EditQuestionProps) {
  const navigate = useNavigate();
  const [updateQuestion] = useUpdateQuestionMutation();
  const [choiceType, setChoiceType] = useState<ChoiceType>(
    questionInfo.choiceType
  );
  const [answer, setAnswer] = useState<number>(questionInfo.answer);
  const [score, setScore] = useState<number>(questionInfo.score);

  const onChangeChoiceType = ({ target: { value } }: RadioChangeEvent) => {
    setChoiceType(value);
  };

  const onFinish = async (values: any) => {
    const { number } = values;
    let newQuestion: QuestionModel = {
      number,
      answer,
      score,
      choiceType,
    };

    try {
      await updateQuestion({
        updatedQuestion: newQuestion,
        currentQuestionNumber: questionNumber,
        roundNumber: roundNumber,
      }).unwrap();
      navigate(`/question/${roundNumber}/${questionNumber}/question-info`);
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        style={{ width: "auto", margin: "20px" }}
        labelCol={{ span: 4 }}
      >
        <Form.Item label="선지 유형">
          <Radio.Group
            options={[
              { label: "문자", value: "String" },
              { label: "이미지", value: "Image" },
            ]}
            onChange={onChangeChoiceType}
            value={choiceType}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item label="문제 번호" style={{ marginBottom: 0 }}>
          <Form.Item
            name="number"
            rules={[{ required: true, message: "문제 번호를 입력해주세요!" }]}
            initialValue={questionInfo?.number}
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
    </>
  );
}

export default EditQuestion;