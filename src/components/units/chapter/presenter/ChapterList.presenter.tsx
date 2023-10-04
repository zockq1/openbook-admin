import { useNavigate, useParams } from "react-router-dom";
import SmallItemListUI from "../../common/SmallItemListUI.container";
import CreateChapterModal from "./CreateChpterModal.presenter";
import { useGetChaptersQuery } from "../../../../store/api/chapterApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { Empty } from "antd";
import ContentBox from "../../../commons/ContentBox";

function ChapterList() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const { data: chapterList, error: chapterError } = useGetChaptersQuery();
  useNotificationErrorList([setError(chapterError, "단원 목록")]);

  if (!chapterList) {
    return (
      <ContentBox title="단원 선택">
        <Empty />
      </ContentBox>
    );
  }

  return (
    <SmallItemListUI
      currentItemKey={String(chapter)}
      itemList={[...chapterList]
        .sort((a, b) => a.number - b.number)
        .map((item) => {
          return {
            name: item.number + `단원(${item.title})`,
            key: item.number.toString(),
            onClick: () => navigate(`/topic/${item.number}/chapter-info`),
          };
        })}
      title="단원 선택"
      option={<CreateChapterModal />}
    />
  );
}

export default ChapterList;
