import { Outlet } from "react-router-dom";
import styled from "styled-components";
import ChapterList from "../components/ChapterList";
import ThemeList from "../components/ThemeList";

const InfosLayout = styled.div`
  display: flex;
`;
function Infos() {
  return (
    <InfosLayout>
      <ChapterList />
      <ThemeList />
      <Outlet />
    </InfosLayout>
  );
}

export default Infos;
