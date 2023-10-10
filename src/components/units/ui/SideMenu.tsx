import styled from "styled-components";
import SideMenuItem from "./SideMenuItem";

const StyledSideMenu = styled.ul`
  display: flex;
  grid-row: 1/4;
  align-items: center;
  flex-direction: column;
`;

function SideMenu() {
  return (
    <StyledSideMenu>
      <SideMenuItem icon="topic" title="주제 관리" to="/topic" />
      <SideMenuItem icon="question" title="문제 관리" to="/question" />
      <SideMenuItem icon="user" title="유저 관리" to="/user" />
      <SideMenuItem icon="login" title="로그인" to="/login" />
    </StyledSideMenu>
  );
}

export default SideMenu;
