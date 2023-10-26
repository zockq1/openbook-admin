import { ReactNode } from "react";
import styled from "styled-components";

interface StyledContentBoxProps {
  height: number | string;
  width: "half" | "full";
}

const StyledContentBox = styled.div<StyledContentBoxProps>`
  --width: 547.5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(50px, max-content) minmax(50px, max-content);
  grid-template-areas:
    "title option"
    "body body";
  padding: 10px;
  margin: 10px;
  width: ${({ width }) => (width === "half" ? "547.5px" : "1115px;")};
  height: ${({ height }) =>
    typeof height === "number" ? `${height}px` : height};
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
  margin: 10px;
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
  height?: number | string;
  width?: "half" | "full";
  children?: ReactNode;
}

function ContentBox({
  title,
  option,
  height = "fit-content",
  width = "half",
  children,
}: ContentBoxProps) {
  return (
    <StyledContentBox height={height} width={width}>
      <Title>{title}</Title>
      <Option>{option}</Option>
      <Body>{children}</Body>
    </StyledContentBox>
  );
}

export default ContentBox;
