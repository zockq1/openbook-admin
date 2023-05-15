import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import ChapterList from "../components/ChapterList";
import TopicList from "../components/TopicList";

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
