import { ReactNode } from "react";
import styled from "styled-components";

const StyledContentBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(50px, max-content) minmax(50px, max-content);
  grid-template-areas:
    "title option"
    "body body";
  min-height: 100px;
  padding: 10px;
  margin: 10px;
  width: 547.5px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  grid-area: title;
  padding: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const Body = styled.div`
  grid-area: body;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  grid-area: option;
  padding: 10px;
`;

interface ContentBoxProps {
  title?: ReactNode;
  option?: ReactNode;
  children?: ReactNode;
}

function ContentBox({ title, option, children }: ContentBoxProps) {
  return (
    <StyledContentBox>
      <Title>{title}</Title>
      <Option>{option}</Option>
      <Body>{children}</Body>
    </StyledContentBox>
  );
}

export default ContentBox;
