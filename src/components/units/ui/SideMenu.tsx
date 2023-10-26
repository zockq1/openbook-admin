import styled from "styled-components";
import SideMenuItem from "./SideMenuItem";
import Logo from "../../commons/Logo";

const StyledSideMenu = styled.ul`
  display: flex;
  grid-row: 1/4;
  align-items: center;
  flex-direction: column;
`;

function SideMenu() {
  return (
    <StyledSideMenu>
      <li>
        <Logo />
      </li>
      <SideMenuItem icon="topic" title="주제 관리" to="/topic" />
      <SideMenuItem icon="clock" title="연표 관리" to="/timeline" />
      <SideMenuItem
        icon="주제별 문제"
        title="문제 분류 관리"
        to="/question-category"
      />
      <SideMenuItem icon="모의고사" title="모의고사 관리" to="/exam" />
      <SideMenuItem icon="user" title="유저 관리" to="/user" />
      <SideMenuItem icon="login" title="로그인" to="/login" />
    </StyledSideMenu>
  );
}

export default SideMenu;
