import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { QuestionModel } from "../../types/questionTypes";
import { RoundDateModel, RoundModel } from "../../types/roundTypes";
import ContentBox from "../commons/ContentBox";
import SmallItemList from "../units/common/SmallItemListUI.container";
import { Button, Empty } from "antd";
import CreateRoundModal from "../units/round/CreateRoundModal";
import { ReactNode, useEffect, useState } from "react";
import QuestionInfo from "../units/question/QuestionInfo";
import CreateQuesion from "../units/question/CreateQuestion";
import EditQuestion from "../units/question/EditQuestion";
import DeleteRoundButton from "../units/round/DeleteRoundButton";
import EditRoundModal from "../units/round/EditRoundModal";
import DeleteQuestionButton from "../units/question/DeleteQuestionButton";
import ChoiceForm from "../units/choice/ChoiceForm";
import ChoiceList from "../units/choice/ChoiceList";
import Description from "../units/description/Description";
import { GetDescriptionModel } from "../../types/descriptionType";
import { ColumnFlex, RowFlex } from "../commons/FlexLayout";
import { GetChoiceModel } from "../../types/choiceType";

interface QuestionTemplateProps {
  roundList: RoundModel[] | undefined;
  roundDate: RoundDateModel | undefined;
  questionList: number[] | undefined;
  questionInfo: QuestionModel | undefined;
  choiceList: GetChoiceModel[] | undefined;
  descriptionInfo: GetDescriptionModel | undefined;
}

function QuestionTemplate({
  roundDate,
  roundList,
  questionInfo,
  questionList,
  choiceList,
  descriptionInfo,
}: QuestionTemplateProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { round, question } = useParams();
  const [questionState, setQuestionState] = useState<
    | "QuestionInfo"
    | "EditQuestion"
    | "CreateQuestion"
    | "QuestionList"
    | "Empty"
  >();
  useEffect(() => {
    if (location.pathname.endsWith("question-list")) {
      setQuestionState("QuestionList");
    } else if (location.pathname.endsWith("question-info")) {
      setQuestionState("QuestionInfo");
    } else if (location.pathname.endsWith("create-question")) {
      setQuestionState("CreateQuestion");
    } else if (location.pathname.endsWith("edit-question")) {
      setQuestionState("EditQuestion");
    } else {
      setQuestionState("Empty");
    }
  }, [setQuestionState, location]);

  const renderMainContent = (): ReactNode => {
    if (questionState === "QuestionInfo" && questionInfo) {
      return <QuestionInfo questionInfo={questionInfo} />;
    } else if (questionState === "CreateQuestion") {
      return <CreateQuesion numberOfQuestion={questionList?.length || 0} />;
    } else if (questionState === "EditQuestion" && questionInfo) {
      return (
        <EditQuestion
          questionInfo={questionInfo}
          questionNumber={Number(question)}
          roundNumber={Number(round)}
        />
      );
    }
    return <Empty />;
  };

  return (
    <RowFlex>
      {roundList && roundList.length !== 0 ? (
        <SmallItemList
          title="회차 선택"
          option={<CreateRoundModal />}
          currentItemKey={String(round)}
          itemList={roundList.map((item) => {
            return {
              name: item.number + "회차",
              key: item.number.toString(),
              onClick: () => navigate(`/exam/${item.number}/question-list`),
            };
          })}
        />
      ) : (
        <Empty />
      )}
      {round ? (
        <SmallItemList
          title="문제 선택"
          option={
            round && (
              <>
                <Link to={`/exam/${round}/create-question`}>
                  <Button>문제 추가</Button>
                </Link>
                {roundDate && (
                  <EditRoundModal
                    roundNumber={Number(round)}
                    roundDate={roundDate}
                  />
                )}
                {questionList && (
                  <DeleteRoundButton
                    roundNumber={Number(round)}
                    questionListLength={questionList.length}
                  />
                )}
              </>
            )
          }
          currentItemKey={String(question)}
          itemList={
            questionList
              ? questionList.map((item) => {
                  return {
                    name: item.toString(),
                    key: item.toString(),
                    onClick: () =>
                      navigate(`/exam/${round}/${item}/question-info`),
                  };
                })
              : []
          }
        />
      ) : (
        <ContentBox title="문제 선택">
          <Empty />
        </ContentBox>
      )}
      <ColumnFlex>
        {" "}
        <ContentBox
          title="문제 정보"
          option={
            questionState === "QuestionInfo" && (
              <>
                <Button
                  onClick={() =>
                    navigate(`/exam/${round}/${question}/edit-question`)
                  }
                >
                  수정
                </Button>
                <DeleteQuestionButton
                  questionNumber={Number(question)}
                  roundNumber={Number(round)}
                />
              </>
            )
          }
        >
          {renderMainContent()}
        </ContentBox>
        {questionState === "QuestionInfo" && (
          <ContentBox title="보기">
            {descriptionInfo && (
              <Description descriptionInfo={descriptionInfo} />
            )}
          </ContentBox>
        )}
      </ColumnFlex>
      <ColumnFlex>
        {questionState === "QuestionInfo" && (
          <>
            <ContentBox title="선지 추가">
              {questionInfo && choiceList && (
                <ChoiceForm
                  choiceCount={choiceList.length}
                  choiceType={questionInfo.choiceType}
                  roundNumber={Number(round)}
                  questionNumber={Number(question)}
                />
              )}
            </ContentBox>
            {questionInfo && choiceList && (
              <ChoiceList choiceList={choiceList} />
            )}
          </>
        )}
      </ColumnFlex>
    </RowFlex>
  );
}

export default QuestionTemplate;
