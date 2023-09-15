import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  RadioChangeEvent,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../services/errorNotification";
import { useAddQuestionMutation } from "../../store/api/questionApi";
import { ChoiceType, QuestionModel } from "../../types/questionTypes";

function CreateQuestion() {
  const navigate = useNavigate();
  const [addQuestion] = useAddQuestionMutation();
  const { round } = useParams();
  const [choiceType, setChoiceType] = useState<ChoiceType>("String");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChangeChoiceType = ({ target: { value } }: RadioChangeEvent) => {
    setChoiceType(value);
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values: any) => {
    const { number, description, descriptionComment, answer, score } = values;
    let newQuestion: QuestionModel = {
      number,
      description: description.fileList[0].thumbUrl,
      descriptionComment,
      answer,
      score,
      choiceList: [],
      choiceType,
    };

    try {
      await addQuestion({
        roundNumber: Number(round),
        question: newQuestion,
      }).unwrap();
      navigate(`/question/${round}/${number}`);
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        style={{ width: 600, margin: "auto auto" }}
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
          >
            <Input type="number" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="보기" style={{ marginBottom: 0 }}>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "보기를 입력해주세요!" }]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              fileList={fileList}
              onChange={onChange}
              beforeUpload={() => false}
            >
              Upload
            </Upload>
          </Form.Item>
        </Form.Item>

        <Form.Item label="보기 해설" style={{ marginBottom: 0 }}>
          <Form.Item
            name="descriptionComment"
            rules={[{ required: true, message: "보기 해설을 입력해주세요!" }]}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item label="정답 주제" style={{ marginBottom: 0 }}>
          <Form.Item
            name="answer"
            rules={[{ required: true, message: "보기 해설을 입력해주세요!" }]}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="score"
          label="배점"
          rules={[{ required: false, message: "배점을 입력해 주세요!" }]}
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

export default CreateQuestion;
