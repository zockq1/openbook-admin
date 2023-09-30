import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { QuestionModel } from "../../types/questionTypes";
import { RoundDateModel, RoundModel } from "../../types/roundTypes";
import BaseLayout from "../atoms/BaseLayout";
import ContentBox from "../molecules/ContentBox";
import Header from "../organisms/Header";
import SideMenu from "../organisms/SideMenu";
import SmallItemList from "../organisms/SmallItemList";
import { Button, Empty } from "antd";
import CreateRoundModal from "../organisms/round/CreateRoundModal";
import { ReactNode, useEffect, useState } from "react";
import QuestionInfo from "../organisms/question/QuestionInfo";
import CreateQuesion from "../organisms/question/CreateQuestion";
import EditQuestion from "../organisms/question/EditQuestion";
import DeleteRoundButton from "../organisms/round/DeleteRoundButton";
import EditRoundModal from "../organisms/round/EditRoundModal";
import DeleteQuestionButton from "../organisms/question/DeleteQuestionButton";
import ChoiceForm from "../organisms/choice/ChoiceForm";
import ChoiceList from "../organisms/choice/ChoiceList";
import Description from "../organisms/description/Description";
import { GetDescriptionModel } from "../../types/descriptionType";
import { ColumnFlex } from "../atoms/FlexLayout";
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
    <BaseLayout>
      <SideMenu />
      <Header />
      <ContentBox title="회차 선택" option={<CreateRoundModal />}>
        {roundList && roundList.length !== 0 ? (
          <SmallItemList
            currentItemKey={String(round)}
            itemList={roundList.map((item) => {
              return {
                name: item.number + "회차",
                key: item.number.toString(),
                onClick: () =>
                  navigate(`/question/${item.number}/question-list`),
              };
            })}
          />
        ) : (
          <Empty />
        )}
      </ContentBox>
      <ContentBox
        title="문제 선택"
        option={
          round && (
            <>
              <Link to={`/question/${round}/create-question`}>
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
      >
        {questionList && round && questionList.length !== 0 ? (
          <SmallItemList
            currentItemKey={String(question)}
            itemList={questionList.map((item) => {
              return {
                name: item.toString(),
                key: item.toString(),
                onClick: () =>
                  navigate(`/question/${round}/${item}/question-info`),
              };
            })}
          />
        ) : (
          <Empty />
        )}
      </ContentBox>
      <ColumnFlex>
        {" "}
        <ContentBox
          title="문제 정보"
          option={
            questionState === "QuestionInfo" && (
              <>
                <Button
                  onClick={() =>
                    navigate(`/question/${round}/${question}/edit-question`)
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
    </BaseLayout>
  );
}

export default QuestionTemplate;
