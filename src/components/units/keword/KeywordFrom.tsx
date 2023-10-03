import { useState } from "react";
import { useAddKeywordMutation } from "../../../store/api/keywordApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import ImageUpload from "../../commons/ImageUpload";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

const KeywordFormGridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100px 1fr 56.23px;
  grid-template-rows: 32px 100px 32px;
`;

interface KeywordFormProps {
  topicTitle: string;
}

function KeywordForm({ topicTitle }: KeywordFormProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [dateComment, setDateComment] = useState("");
  const [addKeyword] = useAddKeywordMutation();
  const [form] = useForm();

  const handleSubmit = async () => {
    try {
      addKeyword({
        name,
        comment,
        topic: topicTitle,
        file: imgFile,
        dateComment: dateComment,
        extraDateList: form.getFieldValue("extraDateList"),
      });
      setName("");
      setComment("");
      setImgFile("");
      form.resetFields();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  return (
    <KeywordFormGridContainer>
      <Input
        value={name}
        onChange={handleNameChange}
        style={{
          gridColumn: "1/3",
        }}
        placeholder="키워드"
      />
      <Button type="primary" onClick={handleSubmit}>
        추가
      </Button>

      <ImageUpload
        setImgFile={setImgFile}
        imgFile={imgFile}
        htmlFor="keyword-form"
      />

      <Input.TextArea
        value={comment}
        onChange={handleCommentChange}
        placeholder="설명"
      />

      <Input
        style={{
          gridColumn: "1/3",
        }}
        placeholder="년도"
        value={dateComment}
        onChange={(e) => setDateComment(e.target.value)}
      />
      <Form
        style={{
          gridColumn: "1/3",
        }}
        form={form}
      >
        <Form.Item>
          <Form.List name="extraDateList">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key}>
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
                        marginBottom: "0",
                        display: "inline-block",
                      }}
                    >
                      <Input
                        type="number"
                        placeholder="년도"
                        style={{ width: "100px" }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "extraDateComment"]}
                      style={{
                        marginRight: "3px",
                        marginBottom: "0",
                        display: "inline-block",
                      }}
                    >
                      <Input
                        type="text"
                        placeholder="설명"
                        style={{ width: "330px" }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{ position: "absolute" }}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    연표용 년도 추가
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Form>
    </KeywordFormGridContainer>
  );
}

export default KeywordForm;
