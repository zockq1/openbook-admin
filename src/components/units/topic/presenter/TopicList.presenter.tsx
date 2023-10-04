import { Link, useNavigate, useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import { Button, Empty } from "antd";
import ContentBox from "../../../commons/ContentBox";
import SmallItemListUI from "../../common/SmallItemListUI.container";
import { useGetChapterTopicListQuery } from "../../../../store/api/topicApi";
import EditTopicOrder from "./EditTopicOrder.presenter";
import EditChapterModal from "../../chapter/presenter/EditChapterModal.presenter";
import DeleteChapterButton from "../../chapter/presenter/DeleteChapterButton.presenter";

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
      <ContentBox title="단원 선택">
        <Empty />
      </ContentBox>
    );
  }

  return (
    <SmallItemListUI
      currentItemKey={topicTitle}
      itemList={[...topicList]
        .sort((a, b) => a.number - b.number)
        .map((item) => {
          return {
            name: item.title,
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
