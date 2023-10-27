import { Button, Descriptions } from "antd";
import { QuestionModel } from "../../../../types/questionTypes";
import ContentBox from "../../../commons/ContentBox";
import DeleteQuestionButton from "../presenter/DeleteQuestionButton.presenter";

interface QuestionInfoProps {
  questionInfo: QuestionModel;
  toEditQuestion: () => void;
}

function QuestionInfoUI({ questionInfo, toEditQuestion }: QuestionInfoProps) {
  return (
    <ContentBox
      title="문제 정보"
      option={
        <>
          <Button onClick={toEditQuestion}>수정</Button>
          <DeleteQuestionButton />
        </>
      }
    >
      <Descriptions layout="vertical" bordered column={4}>
        <Descriptions.Item label="문제 번호">
          {questionInfo.number}
        </Descriptions.Item>
        <Descriptions.Item label="정답 선지 번호">
          {questionInfo.answer}
        </Descriptions.Item>
        <Descriptions.Item label="배점">{questionInfo.score}</Descriptions.Item>
        <Descriptions.Item label="선지 유형">
          {questionInfo.choiceType}
        </Descriptions.Item>
      </Descriptions>
    </ContentBox>
  );
}

export default QuestionInfoUI;
