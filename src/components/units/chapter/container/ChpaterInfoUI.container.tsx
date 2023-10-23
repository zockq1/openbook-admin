import { GetChapterInfoModel } from "../../../../types/chapterTypes";
import ContentBox from "../../../commons/ContentBox";
import { Button, Image } from "antd";

interface ChapterInfoProps {
  chapterInfo: GetChapterInfoModel;
  toChapterInfoEdit: () => void;
}

function ChapterInfoUI({ chapterInfo, toChapterInfoEdit }: ChapterInfoProps) {
  return (
    <ContentBox
      title="단원 정보"
      option={<Button onClick={toChapterInfoEdit}>수정</Button>}
    >
      {chapterInfo.content && (
        <Image src={chapterInfo.content} alt="단원 이미지" />
      )}
    </ContentBox>
  );
}

export default ChapterInfoUI;
