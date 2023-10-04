import BaseLayout from "../commons/BaseLayout";
import SideMenu from "../units/ui/SideMenu";
import Header from "../units/ui/Header";
import { useLocation } from "react-router-dom";
import CreateTopic from "../units/topic/presenter/CreateTopic.presenter";
import EditTopic from "../units/topic/presenter/EditTopic.presenter";
import TopicInfo from "../units/topic/presenter/TopicInfo.presenter";
import { ColumnFlex } from "../commons/FlexLayout";
import KeywordForm from "../units/keword/presenter/KeywordFrom.presenter";
import KeywordList from "../units/keword/presenter/KeywordList.presenter";
import EditChapterInfo from "../units/chapter/presenter/EditChpaterInfo.presenter";
import ChapterList from "../units/chapter/presenter/ChapterList.presenter";
import TopicList from "../units/topic/presenter/TopicList.presenter";

function TopicPage() {
  const location = useLocation();
  return (
    <BaseLayout>
      <SideMenu />
      <Header />
      <ChapterList />
      <TopicList />
      {location.pathname.endsWith("topic-info") && <TopicInfo />}
      {location.pathname.endsWith("create-topic") && <CreateTopic />}
      {location.pathname.endsWith("edit-topic") && <EditTopic />}
      {location.pathname.endsWith("chapter-info")}
      {location.pathname.endsWith("edit-chapter") && <EditChapterInfo />}
      {location.pathname.endsWith("topic-info") && (
        <ColumnFlex>
          <KeywordForm />
          <KeywordList />
        </ColumnFlex>
      )}
    </BaseLayout>
  );
}

export default TopicPage;
