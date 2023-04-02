import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import ChapterList from "../components/ChapterList";
import TopicList from "../components/TopicList";
import { RootState } from "../store/store";

const InfosLayout = styled.div`
  display: flex;
`;

function Topic() {
  const { currentChapterNumber } = useSelector(
    (state: RootState) => state.chapter
  );
  return (
    <InfosLayout>
      <ChapterList />
      {currentChapterNumber ? <TopicList /> : null}
      <Outlet />
    </InfosLayout>
  );
}

export default Topic;
