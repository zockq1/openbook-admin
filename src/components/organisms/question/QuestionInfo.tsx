import { Descriptions, Image } from "antd";
import { QuestionModel } from "../../../types/questionTypes";

interface QuestionInfoProps {
  questionInfo: QuestionModel;
}

function QuestionInfo({ questionInfo }: QuestionInfoProps) {
  return (
    <Descriptions layout="vertical" bordered column={4}>
      <Descriptions.Item label="문제 번호">
        {questionInfo.number}
      </Descriptions.Item>
      <Descriptions.Item label="정답 주제">
        {questionInfo.answer}
      </Descriptions.Item>
      <Descriptions.Item label="배점">{questionInfo.score}</Descriptions.Item>
      <Descriptions.Item label="선지 유형">
        {questionInfo.choiceType}
      </Descriptions.Item>
      <Descriptions.Item label="보기" span={4}>
        <Image width={200} src={questionInfo.description} />
      </Descriptions.Item>
      <Descriptions.Item label="보기 해설" span={4}>
        {questionInfo.descriptionComment}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default QuestionInfo;
