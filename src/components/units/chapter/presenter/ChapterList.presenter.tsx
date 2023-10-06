import { useNavigate, useParams } from "react-router-dom";
import CreateChapterModal from "./CreateChpterModal.presenter";
import { useGetChaptersQuery } from "../../../../store/api/chapterApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { Empty } from "antd";
import ContentBox from "../../../commons/ContentBox";
import ChapterListUI from "../../common/TableUI.container";

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
    <ChapterListUI
      currentItemKey={String(chapter)}
      tableHead={[
        { name: "number", title: "단원" },
        { name: "title", title: "단원명" },
        { name: "dateComment", title: "년도" },
      ]}
      itemList={[...chapterList]
        .sort((a, b) => a.number - b.number)
        .map((item) => {
          return {
            data: {
              number: item.number,
              title: item.title,
              dateComment: item.dateComment,
            },
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
