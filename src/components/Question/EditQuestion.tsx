import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  RadioChangeEvent,
  Radio,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  mutationErrorNotification,
  queryErrorNotification,
} from "../../services/errorNotification";
import {
  useGetQuestionQuery,
  useUpdateQuestionMutation,
} from "../../store/api/questionApi";
import { ChoiceType, QuestionModel } from "../../types/questionTypes";

function EditQuestion() {
  const navigate = useNavigate();
  const { round, question } = useParams();
  const { data: questionInfo, error: questionError } = useGetQuestionQuery({
    roundNumber: Number(round),
    questionNumber: Number(question),
  });
  const [updateQuestion] = useUpdateQuestionMutation();
  const [choiceType, setChoiceType] = useState<ChoiceType>("String");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onChangeChoiceType = ({ target: { value } }: RadioChangeEvent) => {
    setChoiceType(value);
  };

  useEffect(() => {
    queryErrorNotification(questionError, "주제 정보");
  }, [questionError]);

  useEffect(() => {
    if (questionInfo) {
      setChoiceType(questionInfo.choiceType);
      setFileList([
        {
          uid: "1",
          name: "image.png",
          status: "done",
          url: questionInfo.description,
        },
      ]);
    }
  }, [questionInfo]);

  const onFinish = async (values: any) => {
    const { number, description, descriptionComment, answer, score } = values;
    let newQuestion: QuestionModel = {
      number,
      description: description.fileList[0].thumbUrl,
      descriptionComment,
      answer,
      score,
      choiceList: questionInfo?.choiceList || [],
      choiceType,
    };

    try {
      await updateQuestion({
        updatedQuestion: newQuestion,
        currentQuestionNumber: Number(question),
        roundNumber: Number(round),
      }).unwrap();
      navigate(`/question/${round}/${question}`);
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
            initialValue={questionInfo?.number}
          >
            <Input type="number" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="보기" style={{ marginBottom: 0 }}>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "보기를 입력해주세요!" }]}
            initialValue={questionInfo?.description}
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
            initialValue={questionInfo?.descriptionComment}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item label="정답 주제" style={{ marginBottom: 0 }}>
          <Form.Item
            name="answer"
            rules={[{ required: true, message: "보기 해설을 입력해주세요!" }]}
            initialValue={questionInfo?.answer}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="score"
          label="배점"
          rules={[{ required: false, message: "배점을 입력해 주세요!" }]}
          initialValue={questionInfo?.score}
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
