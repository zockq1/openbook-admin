import { useState } from "react";
import { Form, Input, Button, RadioChangeEvent, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { mutationErrorNotification } from "../../../services/errorNotification";
import { useUpdateQuestionMutation } from "../../../store/api/questionApi";
import { ChoiceType, QuestionModel } from "../../../types/questionTypes";
import ImageUpload from "../../molecules/ImageUpload";

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
  const [imgFile, setImgFile] = useState(questionInfo.description);

  const onChangeChoiceType = ({ target: { value } }: RadioChangeEvent) => {
    setChoiceType(value);
  };

  const onFinish = async (values: any) => {
    const { number, descriptionComment, answer, score } = values;
    let newQuestion: QuestionModel = {
      number,
      description: imgFile,
      descriptionComment,
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

        <Form.Item label="보기" style={{ marginBottom: 0 }}>
          <ImageUpload
            setImgFile={setImgFile}
            imgFile={imgFile}
            htmlFor="edit-question"
          />
        </Form.Item>

        <Form.Item label="보기 해설" style={{ marginBottom: 0 }}>
          <Form.Item
            name="descriptionComment"
            rules={[{ required: true, message: "보기 해설을 입력해주세요!" }]}
            initialValue={questionInfo.descriptionComment}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item label="정답 주제" style={{ marginBottom: 0 }}>
          <Form.Item
            name="answer"
            rules={[{ required: true, message: "보기 해설을 입력해주세요!" }]}
            initialValue={questionInfo.answer}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="score"
          label="배점"
          rules={[{ required: false, message: "배점을 입력해 주세요!" }]}
          initialValue={questionInfo.score}
        >
          <Input type="number" />
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
