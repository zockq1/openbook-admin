import { Descriptions } from "antd";
import { TopicModel } from "../../../types/topicTypes";

interface TopicInfoProps {
  topicInfo: TopicModel;
}
function TopicInfo({ topicInfo }: TopicInfoProps) {
  const { title, category, chapter, era, dateComment } = topicInfo;
  return (
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
      <Descriptions.Item span={2} label="상세설명">
        {topicInfo.detail}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default TopicInfo;
