import styled from "styled-components";
import Icon from "./Icon";

const StyledLogo = styled.div`
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

function Logo() {
  return (
    <StyledLogo>
      정주행
      <Icon category="정주행" size={24} />
      한국사
    </StyledLogo>
  );
}

export default Logo;
