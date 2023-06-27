import { List, Menu, MenuProps, Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useGetChaptersQuery } from "../../store/api/chapterApi";
import getItem from "../../services/getItem";
import { useParams } from "react-router-dom";
import { useGetChapterTopicListQuery } from "../../store/api/topicApi";
import { useGetDescriptionsQuery } from "../../store/api/descriptionApi";

interface DescriptionProps {
  text: string;
}

function DescriptionModal({ text }: DescriptionProps) {
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

  const { data: chapterList } = useGetChaptersQuery();
  const { data: topicList } = useGetChapterTopicListQuery(selectedChapter);
  const { data: descriptionList } = useGetDescriptionsQuery(selectedTopic);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div onClick={showModal}>{text}</div>
      <Modal
        title="보기와 내용이 겹치는 선지 선택"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        style={{ display: "flex" }}
      >
        <Menu
          onClick={onClickChapter}
          mode="inline"
          items={chapters}
          defaultSelectedKeys={[`${chapter}`]}
          style={{ borderInlineEnd: "unset" }}
        />
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

        <List
          dataSource={descriptionList}
          renderItem={(item) => <div>{item.content}</div>}
        />
      </Modal>
    </>
  );
}

export default DescriptionModal;
