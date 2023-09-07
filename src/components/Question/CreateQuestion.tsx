import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { mutationErrorNotification } from "../../services/errorNotification";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useAddQuestionMutation } from "../../store/api/questionApi";
import { ChoiceModel, QuestionModel } from "../../types/questionTypes";

function CreateQuestion() {
  const navigate = useNavigate();
  const [addQuestion] = useAddQuestionMutation();
  const { round } = useParams();

  const onFinish = async (values: QuestionModel) => {
    const {
      number,
      description,
      descriptionComment,
      answer,
      score,
      choiceList,
    } = values;
    let newQuestion: QuestionModel = {
      number,
      description,
      descriptionComment,
      answer,
      score,
      choiceList: [],
    };
    if (choiceList) {
      choiceList.forEach((item) => {
        const newExtraDate: ChoiceModel = {
          choice: item.choice,
          comment: item.comment,
          key: item.key,
        };
        newQuestion.choiceList.push(newExtraDate);
      });
    }

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
    <Form
      onFinish={onFinish}
      style={{ width: 600, margin: "auto auto" }}
      labelCol={{ span: 4 }}
    >
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
          <Input />
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

      <Form.Item label="선지 목록">
        <Form.List name="choiceList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <Form.Item
                    {...restField}
                    label="주제"
                    name={[name, "key"]}
                    rules={[
                      { required: true, message: "선지를 입력해 주세요!" },
                    ]}
                    style={{
                      marginRight: "10px",
                      display: "inline-block",
                    }}
                  >
                    <Input type="text" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                  <Form.Item
                    {...restField}
                    label="선지"
                    name={[name, "choice"]}
                    rules={[
                      { required: true, message: "선지를 입력해 주세요!" },
                    ]}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Input width="100%" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="해설"
                    name={[name, "comment"]}
                    style={{
                      width: "100%",
                      display: "inline-block",
                    }}
                  >
                    <Input type="text" width="100%" />
                  </Form.Item>
                </>
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

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ float: "right" }}>
          저장
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateQuestion;
