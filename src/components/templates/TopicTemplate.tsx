import BaseLayout from "../atoms/BaseLayout";
import SideMenu from "../organisms/SideMenu";
import ContentBox from "../molecules/ContentBox";
import Header from "../organisms/Header";
import {
  ChapterDateModel,
  ChapterInfoModel,
  ChapterModel,
  ChapterTitleModel,
} from "../../types/chapterTypes";
import { Button, Empty } from "antd";
import CreateChapterModal from "../organisms/chapter/CreateChpterModal";
import SmallItemList from "../organisms/SmallItemList";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { TopicListModel, TopicModel } from "../../types/topicTypes";
import CreateTopic from "../organisms/topic/CreateTopic";
import EditTopic from "../organisms/topic/EditTopic";
import { ReactNode, useEffect, useState } from "react";
import TopicInfo from "../organisms/topic/TopicInfo";
import DeleteChapterButton from "../organisms/chapter/DeleteChapterButton";
import EditChapterModal from "../organisms/chapter/EditChapterModal";
import { CategoryModel } from "../../types/categoryType";
import DeleteTopicButton from "../organisms/topic/DeleteTopicButton";
import { ColumnFlex } from "../atoms/FlexLayout";
import KeywordForm from "../organisms/keword/KeywordFrom";
import KeywordList from "../organisms/keword/KeywordList";
import { KeywordModel } from "../../types/keywordType";
import { SentenceModel } from "../../types/sentenceType";
import SentenceForm from "../organisms/sentence/SentenceForm";
import SentenceList from "../organisms/sentence/SentenceList";
import EditTopicOrder from "../organisms/topic/EditTopicOrder";
import ChapterInfo from "../organisms/chapter/ChpaterInfo";
import EditChapterInfo from "../organisms/chapter/EditChpaterInfo";

interface TopicTemplateProps {
  chapterList: ChapterModel[] | undefined;
  topicList: TopicListModel[] | undefined;
  topicInfo: TopicModel | undefined;
  chapterTitle: ChapterTitleModel | undefined;
  chapterDate: ChapterDateModel | undefined;
  chapterInfo: ChapterInfoModel | undefined;
  categoryList: CategoryModel[] | undefined;
  keywordList: KeywordModel[] | undefined;
  sentenceLsit: SentenceModel[] | undefined;
}

function TopicTemplate({
  chapterList,
  topicList,
  topicInfo,
  chapterTitle,
  chapterDate,
  chapterInfo,
  categoryList,
  keywordList,
  sentenceLsit,
}: TopicTemplateProps) {
  const navigate = useNavigate();
  const { chapter, topic } = useParams();
  const location = useLocation();
  const [topicState, setTopicState] = useState<
    | "TopicInfo"
    | "TopicCreate"
    | "TopicEdit"
    | "Empty"
    | "ChapterInfo"
    | "ChapterEdit"
  >("Empty");

  useEffect(() => {
    if (location.pathname.endsWith("topic-info")) {
      setTopicState("TopicInfo");
    } else if (location.pathname.endsWith("create-topic")) {
      setTopicState("TopicCreate");
    } else if (location.pathname.endsWith("edit-topic")) {
      setTopicState("TopicEdit");
    } else if (location.pathname.endsWith("edit-chapter")) {
      setTopicState("ChapterEdit");
    } else if (location.pathname.endsWith("chapter-info")) {
      setTopicState("ChapterInfo");
    } else {
      setTopicState("Empty");
    }
  }, [setTopicState, location]);

  const renderMainContent = (): ReactNode => {
    if (topicState === "TopicInfo" && topicInfo) {
      return <TopicInfo topicInfo={topicInfo} />;
    } else if (topicState === "TopicCreate" && categoryList) {
      return (
        <CreateTopic
          categoryList={categoryList}
          chapterNumber={Number(chapter)}
        />
      );
    } else if (topicState === "TopicEdit" && topicInfo && categoryList) {
      return (
        <EditTopic
          topicInfo={topicInfo}
          categoryList={categoryList}
          chapterNumber={Number(chapter)}
          topicTitle={String(topic)}
        />
      );
    } else if (topicState === "ChapterInfo" && chapterInfo) {
      return <ChapterInfo chapterInfo={chapterInfo} />;
    } else if (topicState === "ChapterEdit" && chapterInfo) {
      return (
        <EditChapterInfo
          chapterInfo={chapterInfo}
          chapterNumber={Number(chapter)}
        />
      );
    }
    return <Empty />;
  };

  return (
    <BaseLayout>
      <SideMenu />
      <Header />
      <ContentBox title="단원 선택" option={<CreateChapterModal />}>
        {chapterList && chapterList.length !== 0 ? (
          <SmallItemList
            currentItemKey={String(chapter)}
            itemList={[...chapterList]
              .sort((a, b) => a.number - b.number)
              .map((item) => {
                return {
                  name: item.number + `단원(${item.title})`,
                  key: item.number.toString(),
                  onClick: () => navigate(`/topic/${item.number}/chapter-info`),
                };
              })}
          />
        ) : (
          <Empty />
        )}
      </ContentBox>
      <ContentBox
        title={chapter ? chapter + "단원 주제 선택" : "주제 선택"}
        option={
          <>
            {chapter && (
              <>
                <Link to={`/topic/${chapter}/create-topic`}>
                  <Button>주제 추가</Button>
                </Link>
                <EditTopicOrder topicList={topicList || []} />
                {chapterTitle && chapterDate && (
                  <EditChapterModal
                    chapterNumber={Number(chapter)}
                    title={chapterTitle?.title}
                    startDate={chapterDate?.startDate}
                    endDate={chapterDate?.endDate}
                  />
                )}
                {topicList && (
                  <DeleteChapterButton
                    topicListLength={topicList.length}
                    chapterNumber={Number(chapter)}
                  />
                )}
              </>
            )}
          </>
        }
      >
        {topicList && chapter && topicList.length !== 0 ? (
          <SmallItemList
            currentItemKey={String(topic)}
            itemList={topicList.map((item) => {
              return {
                name: item.title,
                key: item.title,
                onClick: () =>
                  navigate(`/topic/${chapter}/${item.title}/topic-info`),
              };
            })}
          />
        ) : (
          <Empty />
        )}
      </ContentBox>
      <ColumnFlex>
        {(chapter || topic) && (
          <ContentBox
            title={
              topicState === "ChapterInfo" || topicState === "ChapterEdit"
                ? chapterTitle?.title
                : topicState === "TopicInfo" ||
                  topicState === "TopicEdit" ||
                  topicState === "TopicCreate"
                ? "주제 정보"
                : ""
            }
            option={
              topicState === "TopicInfo" ? (
                <>
                  <Button
                    onClick={() =>
                      navigate(`/topic/${chapter}/${topic}/edit-topic`)
                    }
                  >
                    수정
                  </Button>
                  <DeleteTopicButton
                    chapterNumber={Number(chapter)}
                    topicTitle={String(topic)}
                  />
                </>
              ) : topicState === "ChapterInfo" ? (
                <Button
                  onClick={() => navigate(`/topic/${chapter}/edit-chapter`)}
                >
                  수정
                </Button>
              ) : (
                ""
              )
            }
          >
            {renderMainContent()}
          </ContentBox>
        )}
      </ColumnFlex>
      <ColumnFlex>
        {topicState === "TopicInfo" && (
          <ContentBox title="키워드">
            <KeywordForm topicTitle={String(topic)} />
            {keywordList ? (
              <KeywordList keywordList={keywordList} />
            ) : (
              <Empty />
            )}
          </ContentBox>
        )}
        {topicState === "TopicInfo" && (
          <ContentBox title="문장">
            <SentenceForm topicTitle={String(topic)} />
            {sentenceLsit ? (
              <SentenceList sentenceList={sentenceLsit} />
            ) : (
              <Empty />
            )}
          </ContentBox>
        )}
      </ColumnFlex>
    </BaseLayout>
  );
}

export default TopicTemplate;
