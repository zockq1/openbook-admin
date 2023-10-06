import { ReactNode } from "react";
import styled from "styled-components";

const StyledContentBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(50px, max-content) minmax(50px, max-content);
  grid-template-areas:
    "title option"
    "body body";
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

interface BodyProps {
  maxHeight: number | string;
}

const Body = styled.div<BodyProps>`
  grid-area: body;
  margin: 10px;
  max-height: ${({ maxHeight }) =>
    typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight};
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    background: rgb(255, 255, 255);
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    height: 4px;
    border-radius: 6px;
  }
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
  maxHeight?: number | string;
  children?: ReactNode;
}

function ContentBox({
  title,
  option,
  maxHeight = "none",
  children,
}: ContentBoxProps) {
  return (
    <StyledContentBox>
      <Title>{title}</Title>
      <Option>{option}</Option>
      <Body maxHeight={maxHeight}>{children}</Body>
    </StyledContentBox>
  );
}

export default ContentBox;
