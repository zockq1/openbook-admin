import parse from "html-react-parser";
import styled from "styled-components";
import { ChapterInfoModel } from "../../../types/chapterTypes";

const Info = styled.div`
  padding: 20px;
  table {
    border: solid 1px black;
    border-collapse: collapse;
  }

  th,
  td {
    border: solid 1px black;
    padding: 4px;
  }
`;

interface ChapterInfoProps {
  chapterInfo: ChapterInfoModel;
}

function ChapterInfo({ chapterInfo }: ChapterInfoProps) {
  return <Info>{parse(String(chapterInfo?.content))}</Info>;
}

export default ChapterInfo;
