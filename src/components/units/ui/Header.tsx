import styled from "styled-components";

const StyledHeader = styled.header`
  grid-column: 2 / 4;
  grid-row: 1 / 2;
`;

function Header() {
  return <StyledHeader></StyledHeader>;
}

export default Header;
