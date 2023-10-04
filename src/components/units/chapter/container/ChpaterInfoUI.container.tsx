import parse from "html-react-parser";
import styled from "styled-components";
import { ChapterInfoModel } from "../../../../types/chapterTypes";
import ContentBox from "../../../commons/ContentBox";
import { Button } from "antd";

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
  toChapterInfoEdit: () => void;
}

function ChapterInfoUI({ chapterInfo, toChapterInfoEdit }: ChapterInfoProps) {
  return (
    <ContentBox
      title="단원 정보"
      option={<Button onClick={toChapterInfoEdit}>수정</Button>}
    >
      <Info>{parse(String(chapterInfo?.content))}</Info>
    </ContentBox>
  );
}

export default ChapterInfoUI;
