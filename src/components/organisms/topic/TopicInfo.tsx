import { Badge, Descriptions } from "antd";
import { TopicModel } from "../../../types/topicTypes";

interface TopicInfoProps {
  topicInfo: TopicModel;
}
function TopicInfo({ topicInfo }: TopicInfoProps) {
  return (
    <Descriptions layout="vertical" bordered>
      <Descriptions.Item label="주제">{topicInfo.title}</Descriptions.Item>
      <Descriptions.Item label="분류">{topicInfo.category}</Descriptions.Item>
      <Descriptions.Item label="단원">{topicInfo.chapter}</Descriptions.Item>
      <Descriptions.Item label="시대">{topicInfo.era}</Descriptions.Item>
      <Descriptions.Item label="시작 년도">
        <Badge
          status={topicInfo.startDateCheck ? "processing" : "default"}
          text={topicInfo.startDate}
        />
      </Descriptions.Item>
      <Descriptions.Item label="종료 년도">
        <Badge
          status={topicInfo.endDateCheck ? "processing" : "default"}
          text={topicInfo.endDate}
        />
      </Descriptions.Item>
      <Descriptions.Item label="추가 년도">
        {topicInfo.extraDateList.map((item, index) => {
          return (
            <div key={index}>
              <Badge
                status={item.extraDateCheck ? "processing" : "default"}
                text={item.extraDate + "/" + item.extraDateComment}
              />
              <br />
            </div>
          );
        })}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="상세설명">
        {topicInfo.detail}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default TopicInfo;
