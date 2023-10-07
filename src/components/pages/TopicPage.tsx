import BaseLayout from "../commons/BaseLayout";
import SideMenu from "../units/ui/SideMenu";
import Header from "../units/ui/Header";
import { useLocation } from "react-router-dom";
import CreateTopic from "../units/topic/presenter/CreateTopic.presenter";
import EditTopic from "../units/topic/presenter/EditTopic.presenter";
import TopicInfo from "../units/topic/presenter/TopicInfo.presenter";
import { RowFlex } from "../commons/FlexLayout";
import EditChapterInfo from "../units/chapter/presenter/EditChpaterInfo.presenter";
import ChapterList from "../units/chapter/presenter/ChapterList.presenter";
import TopicList from "../units/topic/presenter/TopicList.presenter";
import ChapterInfo from "../units/chapter/presenter/ChpaterInfo.presenter";

function TopicPage() {
  const location = useLocation();
  return (
    <BaseLayout>
      <SideMenu />
      <Header />
      <RowFlex>
        <ChapterList />
        {!location.pathname.endsWith("/topic") && <TopicList />}
        {location.pathname.endsWith("/topic-info") && <TopicInfo />}
        {location.pathname.endsWith("/create-topic") && <CreateTopic />}
        {location.pathname.endsWith("/edit-topic") && <EditTopic />}
        {location.pathname.endsWith("/chapter-info") && <ChapterInfo />}
        {location.pathname.endsWith("/edit-chapter") && <EditChapterInfo />}
      </RowFlex>
    </BaseLayout>
  );
}

export default TopicPage;
