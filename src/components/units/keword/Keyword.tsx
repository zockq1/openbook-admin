import { List, Space, Input, Button, Image, Form } from "antd";
import {
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { KeywordModel } from "../../../types/keywordType";
import { useUpdateKeywordMutation } from "../../../store/api/keywordApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import styled from "styled-components";
import DeleteKeywordButton from "./DeleteKeywordButton";
import ImageUpload from "../../commons/ImageUpload";
import { useForm } from "antd/es/form/Form";
const KeywordGridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 32px 100px 32px;
`;

const KeywordNameBox = styled.div`
  grid-column: 1/3;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 4px 11px;
  overflow: auto;
`;

const KeywordDate = styled.div`
  display: grid;
  grid-column: 1/3;
  grid-template-columns: 100px 1fr;
`;

const KeywordDateBox = styled.div`
  grid-column: 1/2;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 4px 11px;
  overflow: auto;
`;

const KeywordDateCommentBox = styled.div`
  grid-column: 2/3;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 4px 11px;
  overflow: auto;
`;

const KeywordCommentBox = styled.div`
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  padding: 4px 11px;
  overflow: auto;
`;

interface KeywordProps {
  data: KeywordModel;
}

function Keyword({ data }: KeywordProps) {
  const [updateKeyword] = useUpdateKeywordMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(data.name);
  const [editComment, setEditComment] = useState(data.comment);
  const [editFile, setEditFile] = useState(data.file);
  const [editDateComment, setEditDateComment] = useState(data.dateComment);
  const [form] = useForm();

  const handleEdit = async () => {
    try {
      await updateKeyword({
        name: editName,
        comment: editComment,
        file: editFile,
        dateComment: editDateComment,
        extraDateList: form.getFieldValue("extraDateList"),
        id: data.id,
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const onEdit = () => {
    setEditName(data.name);
    setEditFile(data.file);
    setEditComment(data.comment);
    setEditDateComment(data.dateComment);
    form.setFieldValue("extraDateList", data.extraDateList);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    handleEdit();
    setIsEditing(false);
  };

  const handleNameChange = (e: any) => {
    setEditName(e.target.value);
  };

  const handleCommentChange = (e: any) => {
    setEditComment(e.target.value);
  };

  return (
    <List.Item
      actions={[
        <Space>
          {!isEditing && <EditOutlined onClick={onEdit} />}
          {isEditing && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button onClick={handleSave}>저장</Button>
              <br />
              <Button onClick={handleCancel}>취소</Button>
            </div>
          )}
          <DeleteKeywordButton keywordId={data.id} />
        </Space>,
      ]}
    >
      {isEditing ? (
        <KeywordGridContainer>
          <Input.TextArea
            value={editName}
            onChange={handleNameChange}
            style={{ gridColumn: "1/3" }}
            placeholder="키워드"
          />
          <ImageUpload
            setImgFile={setEditFile}
            imgFile={editFile}
            htmlFor={data.name}
          />
          <Input.TextArea
            value={editComment}
            onChange={handleCommentChange}
            placeholder="설명"
          />
          <Input
            style={{
              gridColumn: "1/3",
            }}
            placeholder="년도"
            value={editDateComment}
            onChange={(e) => setEditDateComment(e.target.value)}
          />
          <Form
            style={{
              gridColumn: "1/3",
            }}
            form={form}
          >
            <Form.Item>
              <Form.List name="extraDateList" initialValue={data.extraDateList}>
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
                            style={{ width: "250px" }}
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
        </KeywordGridContainer>
      ) : (
        <KeywordGridContainer>
          <KeywordNameBox>{data.name}</KeywordNameBox>
          <Image src={data.file} height="100%" />
          <KeywordCommentBox>{data.comment}</KeywordCommentBox>
          <KeywordNameBox>{data.dateComment}</KeywordNameBox>
          {data.extraDateList &&
            data.extraDateList.map((item) => {
              return (
                <KeywordDate key={item.extraDate}>
                  <KeywordDateBox>{item.extraDate}</KeywordDateBox>
                  <KeywordDateCommentBox>
                    {item.extraDateComment}
                  </KeywordDateCommentBox>
                </KeywordDate>
              );
            })}
        </KeywordGridContainer>
      )}
    </List.Item>
  );
}

export default Keyword;
