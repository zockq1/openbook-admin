import { List, Space, Input, Button, Form, FormInstance } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { KeywordModel } from "../../../../types/keywordType";
import styled from "styled-components";
import ImageUpload from "../../../commons/ImageUpload";
import ContentBox from "../../../commons/ContentBox";
const KeywordGridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 32px 100px 32px;
`;

interface KeywordProps {
  keywordInfo: KeywordModel;
  handleSave: () => void;
  handleCancel: () => void;
  handleNameChange: (e: any) => void;
  handleCommentChange: (e: any) => void;
  handleDateCommentChange: (e: any) => void;
  editFile: string;
  setEditFile: React.Dispatch<React.SetStateAction<string>>;
  form: FormInstance<any>;
  editName: string;
  editComment: string;
  editDateComment: string;
}

function EditKeywordFormUI({
  keywordInfo,
  handleCancel,
  handleSave,
  handleCommentChange,
  handleDateCommentChange,
  handleNameChange,
  form,
  setEditFile,
  editFile,
  editName,
  editComment,
  editDateComment,
}: KeywordProps) {
  const { extraDateList } = keywordInfo;
  return (
    <ContentBox title={keywordInfo.name}>
      <List.Item
        actions={[
          <Space>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button onClick={handleSave}>저장</Button>
              <br />
              <Button onClick={handleCancel}>취소</Button>
            </div>
          </Space>,
        ]}
      >
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
            htmlFor={keywordInfo.name}
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
            onChange={handleDateCommentChange}
          />
          <Form
            style={{
              gridColumn: "1/3",
            }}
            form={form}
          >
            <Form.Item>
              <Form.List name="extraDateList" initialValue={extraDateList}>
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
      </List.Item>
    </ContentBox>
  );
}

export default EditKeywordFormUI;
