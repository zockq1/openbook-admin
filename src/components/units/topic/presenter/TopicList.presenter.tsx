import { Link, useNavigate, useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { Button, Empty } from "antd";
import ContentBox from "../../../commons/ContentBox";
import { useGetChapterTopicListQuery } from "../../../../store/api/topicApi";
import EditTopicOrder from "./EditTopicOrder.presenter";
import EditChapterModal from "../../chapter/presenter/EditChapterModal.presenter";
import DeleteChapterButton from "../../chapter/presenter/DeleteChapterButton.presenter";
import TableUI from "../../common/TableUI.container";

function TopicList() {
  const navigate = useNavigate();
  const { chapter, topic } = useParams();
  const chapterNumber = Number(chapter);
  const topicTitle = String(topic);
  const { data: topicList, error: topicListError } =
    useGetChapterTopicListQuery(chapterNumber);
  useNotificationErrorList([setError(topicListError, "주제 목록")]);

  if (!topicList) {
    return (
      <ContentBox title="주제 선택">
        <Empty />
      </ContentBox>
    );
  }

  return (
    <TableUI
      height={300}
      currentItemKey={topicTitle}
      tableHead={[
        { name: "number", title: "순서" },
        { name: "title", title: "주제명" },
        { name: "questionCategory", title: "문제 분류" },
        { name: "dateComment", title: "년도" },
      ]}
      itemList={[...topicList]
        .sort((a, b) => a.number - b.number)
        .map((item) => {
          return {
            data: {
              number: item.number + 1,
              title: item.title,
              questionCategory: item.questionCategory.title,
              dateComment: item.dateComment,
            },
            key: item.title,
            onClick: () =>
              navigate(`/topic/${chapter}/${item.title}/topic-info`),
          };
        })}
      title={`${chapterNumber}단원 주제 선택`}
      option={
        <>
          <Link to={`/topic/${chapter}/create-topic`}>
            <Button>주제 추가</Button>
          </Link>
          <EditTopicOrder />
          <EditChapterModal />
          <DeleteChapterButton />
        </>
      }
    />
  );
}

export default TopicList;
