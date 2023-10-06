import { Button, Descriptions } from "antd";
import { TopicModel } from "../../../../types/topicTypes";
import ContentBox from "../../../commons/ContentBox";
import DeleteTopicButton from "../presenter/DeleteTopicButton.presenter";
import { KeywordModel } from "../../../../types/keywordType";

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
          {keywordList.map((keyword) => (
            <div key={keyword.name}>{`${keyword.name} / `}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="상세설명">
          {topicInfo.detail}
        </Descriptions.Item>
      </Descriptions>
    </ContentBox>
  );
}

export default TopicInfoUI;
