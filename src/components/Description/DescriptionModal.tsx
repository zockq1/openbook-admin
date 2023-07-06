import { List, Menu, MenuProps, Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useGetChaptersQuery } from "../../store/api/chapterApi";
import getItem from "../../services/getItem";
import { useParams } from "react-router-dom";
import { useGetChapterTopicListQuery } from "../../store/api/topicApi";
import { useGetChoicesQuery } from "../../store/api/choicesApi";
import styled from "styled-components";
import { useAddDuplicationChoiceMutation } from "../../store/api/descriptionApi";
import {
  mutationErrorNotification,
  queryErrorNotification,
} from "../../services/errorNotification";

const Box = styled.div`
  display: flex;
`;
const TopicListBox = styled.div``;

interface DescriptionProps {
  descriptionId: number;
  content: string;
}

function DescriptionModal({ content, descriptionId }: DescriptionProps) {
  const { title, chapter } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<number>(
    Number(chapter)
  );
  const [selectedTopic, setSelectedTopic] = useState<string>(String(title));

  const [chapters, setChapters] = useState<MenuProps["items"]>([]);
  const [topics, setTopics] = useState<MenuProps["items"]>([]);

  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data: chapterList, error: chapterListError } = useGetChaptersQuery();
  const { data: topicList, error: topicListError } =
    useGetChapterTopicListQuery(selectedChapter);
  const { data: choiceList, error: choiceListError } =
    useGetChoicesQuery(selectedTopic);

  const [addDuplicationChoice] = useAddDuplicationChoiceMutation();

  useEffect(() => {
    queryErrorNotification(chapterListError, "단원 목록");
  }, [chapterListError]);

  useEffect(() => {
    queryErrorNotification(topicListError, "주제 목록");
  }, [topicListError]);

  useEffect(() => {
    queryErrorNotification(choiceListError, "선지 목록");
  }, [choiceListError]);

  useEffect(() => {
    const newItems = chapterList?.map((chapter) => {
      return getItem(chapter.number + "단원", chapter.number);
    });
    setChapters(newItems);
  }, [chapterList]);

  useEffect(() => {
    const currentPageTopic = topicList?.slice(offset, offset + 10);
    const newItems = currentPageTopic?.map((topic) =>
      getItem(topic.title, topic.title)
    );
    setTopics(newItems);
  }, [page, topicList, offset]);

  function handleChange(pageNumber: number) {
    setPage(pageNumber);
  }

  const onClickChapter: MenuProps["onClick"] = (e) => {
    setSelectedChapter(Number(e.key));
  };

  const onClickTopic: MenuProps["onClick"] = (e) => {
    setSelectedTopic(String(e.key));
  };

  const onClickChoice = async (choiceId: number) => {
    try {
      await addDuplicationChoice({
        choiceList: [choiceId],
        descriptionId,
      }).unwrap();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div onClick={showModal}>{content}</div>
      <Modal
        title="보기와 내용이 겹치는 선지 선택"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Box>
          <Menu
            onClick={onClickChapter}
            mode="inline"
            items={chapters}
            defaultSelectedKeys={[`${chapter}`]}
            style={{ borderInlineEnd: "unset", width: 90 }}
          />
          <TopicListBox>
            <Menu
              onClick={onClickTopic}
              mode="inline"
              items={topics}
              style={{ borderInlineEnd: "unset" }}
            />
            <Pagination
              simple
              defaultCurrent={1}
              pageSize={10}
              total={topicList?.length}
              onChange={handleChange}
            />
          </TopicListBox>

          <List
            dataSource={choiceList}
            renderItem={(item) => (
              <List.Item key={item.id} onClick={() => onClickChoice(item.id)}>
                {item.content}
              </List.Item>
            )}
          />
        </Box>
      </Modal>
    </>
  );
}

export default DescriptionModal;
