import { Button, Descriptions } from "antd";
import ContentBox from "../../../commons/ContentBox";
import DeleteTopicButton from "../presenter/DeleteTopicButton.presenter";
import KeywordList from "../../keword/presenter/KeywordList.presenter";
import { GetTopicModel } from "../../../../types/topicTypes";

interface TopicInfoProps {
  topicInfo: GetTopicModel;
  toEditTopic: () => void;
}

function TopicInfoUI({ topicInfo, toEditTopic }: TopicInfoProps) {
  const { title, questionCategory, chapter, dateComment } = topicInfo;
  return (
    <ContentBox
      width="full"
      title={title}
      option={
        <>
          <Button onClick={toEditTopic}>수정</Button>
          <DeleteTopicButton />
        </>
      }
    >
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item span={3} label="키워드">
          <KeywordList />
        </Descriptions.Item>
        <Descriptions.Item label="주제">{title}</Descriptions.Item>
        <Descriptions.Item label="문제 분류">
          {questionCategory.title}
        </Descriptions.Item>
        <Descriptions.Item label="단원">{chapter}</Descriptions.Item>
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
        <Descriptions.Item span={3} label="상세설명">
          {topicInfo.detail}
        </Descriptions.Item>
      </Descriptions>
    </ContentBox>
  );
}

export default TopicInfoUI;
