import styled from "styled-components";
import SideMenuItem from "../molecules/SideMenuItem";
import Icon from "../atoms/Icon";

const StyledSideMenu = styled.ul`
  display: flex;
  grid-row: 1/4;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.black};
  font-family: "Giants-Inline";
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

function SideMenu() {
  return (
    <StyledSideMenu>
      <Logo>
        정주행
        <Icon category="정주행" size={24} />
        한국사
      </Logo>
      <SideMenuItem icon="topic" title="주제 관리" to="/topic" />
      <SideMenuItem icon="question" title="문제 관리" to="/question" />
      <SideMenuItem icon="user" title="유저 관리" to="/user" />
      <SideMenuItem icon="login" title="로그인" to="/login" />
    </StyledSideMenu>
  );
}

export default SideMenu;
