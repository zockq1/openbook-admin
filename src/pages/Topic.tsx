import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import ChapterList from "../components/ChapterListSider/ChapterList";
import TopicList from "../components/TopicListSider/TopicList";

const InfosLayout = styled.div`
  display: flex;
`;

function Topic() {
  const { chapter } = useParams();
  return (
    <InfosLayout>
      <ChapterList />
      {chapter && <TopicList />}
      <Outlet />
    </InfosLayout>
  );
}

export default Topic;
