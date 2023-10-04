import { List, Space, Image } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { KeywordModel } from "../../../../types/keywordType";
import styled from "styled-components";
import ContentBox from "../../../commons/ContentBox";
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
  keywordInfo: KeywordModel;
  onEdit: () => void;
  handleDelete: () => void;
}

function KeywordInfoUI({ keywordInfo, onEdit, handleDelete }: KeywordProps) {
  const { name, file, comment, dateComment, extraDateList } = keywordInfo;

  return (
    <ContentBox title={name}>
      <List.Item
        actions={[
          <Space>
            <EditOutlined onClick={onEdit} />
            <DeleteOutlined onClick={handleDelete} />
          </Space>,
        ]}
      >
        <KeywordGridContainer>
          <KeywordNameBox>{name}</KeywordNameBox>
          <Image src={file} height="100%" />
          <KeywordCommentBox>{comment}</KeywordCommentBox>
          <KeywordNameBox>{dateComment}</KeywordNameBox>
          {extraDateList &&
            extraDateList.map((item) => {
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
      </List.Item>
    </ContentBox>
  );
}

export default KeywordInfoUI;
