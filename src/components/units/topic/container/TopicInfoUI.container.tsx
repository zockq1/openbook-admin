import { Button, Descriptions } from "antd";
import { TopicModel } from "../../../../types/topicTypes";
import ContentBox from "../../../commons/ContentBox";
import DeleteTopicButton from "../presenter/DeleteTopicButton.presenter";
import { KeywordModel } from "../../../../types/keywordType";
import styled from "styled-components";

const Keyword = styled.table`
  border-collapse: collapse;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  & tr {
    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.bg}; // hover 시 배경색 변경
    }
    border-bottom: 1pt solid ${({ theme }) => theme.colors.border};
  }

  & th {
    text-align: left;
    border-bottom: 1pt solid ${({ theme }) => theme.colors.border};
  }

  & td {
    padding: 4px;
  }

  .name {
    width: 30%;
  }

  .comment {
    width: 50%;
  }

  .dateComment {
    width: 20%;
  }
`;

interface TopicInfoProps {
  topicInfo: TopicModel;
  keywordList: KeywordModel[];
  toEditTopic: () => void;
}

function TopicInfoUI({ topicInfo, keywordList, toEditTopic }: TopicInfoProps) {
  const { title, category, chapter, era, dateComment } = topicInfo;
  return (
    <ContentBox
      title={title}
      option={
        <>
          <Button onClick={toEditTopic}>수정</Button>
          <DeleteTopicButton />
        </>
      }
    >
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="주제">{title}</Descriptions.Item>
        <Descriptions.Item label="분류">{category}</Descriptions.Item>
        <Descriptions.Item label="단원">{chapter}</Descriptions.Item>
        <Descriptions.Item label="시대">{era}</Descriptions.Item>
        <Descriptions.Item label="년도">{dateComment}</Descriptions.Item>
        <Descriptions.Item label="추가 년도">
          {topicInfo.extraDateList.map((item, index) => {
            return (
              <div key={index}>
                {item.extraDate + "/" + item.extraDateComment}
              </div>
            );
          })}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="키워드">
          <Keyword>
            <thead>
              <th className="name">키워드</th>
              <th className="comment">해설</th>
              <th className="dateComment">년도</th>
            </thead>

            <tbody>
              {keywordList.map((keyword) => (
                <tr key={keyword.name}>
                  <td className="name">{keyword.name}</td>
                  <td className="comment">{keyword.comment}</td>
                  <td className="dateComment">{keyword.dateComment}</td>
                </tr>
              ))}
            </tbody>
          </Keyword>
        </Descriptions.Item>
        <Descriptions.Item span={3} label="상세설명">
          {topicInfo.detail}
        </Descriptions.Item>
      </Descriptions>
    </ContentBox>
  );
}

export default TopicInfoUI;
