import { Button, Menu, MenuProps, Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import getItem from "../services/getItem";

import { useDeleteChapterMutation } from "../store/api/chapterApi";
import ChapterTitle from "./ChapterTitle";
import { useGetChapterTopicListQuery } from "../store/api/topicApi";

const TopicMenu = styled(Menu)`
  width: 300px;
`;

const TopicContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
`;

function TopicList() {
  const navigate = useNavigate();
  let { chapter } = useParams();
  const [deleteChapter] = useDeleteChapterMutation();
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const { data: topicList } = useGetChapterTopicListQuery(Number(chapter));
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  useEffect(() => {
    const currentPageTopic = topicList?.topicList.slice(offset, offset + 10);
    const newItems = currentPageTopic?.map((topic) => getItem(topic, topic));
    setItems(newItems);
  }, [page, topicList, offset]);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/topic/${chapter}/${e.key}`);
  };

  function handleChange(pageNumber: number) {
    setPage(pageNumber);
  }

  const handleDelete = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        if (topicList?.topicList.length === 0) {
          try {
            await deleteChapter({ number: Number(chapter) }).unwrap();
            navigate(`/topic`);
          } catch (error) {
            console.error(error);
          }
        } else {
          window.alert("해당 단원에 주제가 없을 때만 삭제 가능합니다.!");
        }
      },
    });
  };

  return (
    <TopicContainer>
      <ChapterTitle />
      <TopicMenu
        onClick={onClick}
        mode="inline"
        items={items}
        style={{ borderInlineEnd: "unset" }}
      />
      <Pagination
        simple
        defaultCurrent={1}
        pageSize={10}
        total={topicList?.topicList.length}
        onChange={handleChange}
      />
      <br />
      <Link to={`/topic/${chapter}/create`} style={{ width: "90%" }}>
        <Button style={{ width: "100%" }}>+</Button>
      </Link>
      <br />
      <Button
        danger
        type="primary"
        onClick={handleDelete}
        style={{ width: "90%" }}
      >
        현재 단원 삭제
      </Button>
      <br />
      <Link to={`/topic/${chapter}/question`} style={{ width: "90%" }}>
        <Button style={{ width: "100%" }}>문제</Button>
      </Link>
    </TopicContainer>
  );
}

export default TopicList;
