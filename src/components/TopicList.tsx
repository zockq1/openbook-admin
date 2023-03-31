import { Button, Menu, MenuProps, Pagination, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import getItem from "../services/getItem";
import { useGetTopicListQuery } from "../store/api/topic.Api";
import { RootState } from "../store/store";

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
  const { currentChapterNumber, currentChapterTitle } = useSelector(
    (state: RootState) => state.chapter
  );
  const [items, setItems] = useState<MenuProps["items"]>([]);
  // const [topicList] = useState({
  //   topicList: [
  //     "1번 주제",
  //     "2번 주제",
  //     "3번 주제",
  //     "4번 주제",
  //     "5번 주제",
  //     "6번 주제",
  //     "7번 주제",
  //     "8번 주제",
  //     "9번 주제",
  //     "10번 주제",
  //     "11번 주제",
  //     "12번 주제",
  //     "13번 주제",
  //     "14번 주제",
  //     "15번 주제",
  //   ],
  // });
  const { data: topicList } = useGetTopicListQuery(currentChapterNumber);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  useEffect(() => {
    const currentPageTopic = topicList?.topicList.slice(offset, offset + 10);
    const newItems = currentPageTopic?.map((topic) => getItem(topic, topic));
    setItems(newItems);
  }, [page, topicList, offset]);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/topic/${e.key}`);
  };

  function handleChange(pageNumber: number) {
    setPage(pageNumber);
  }

  return (
    <TopicContainer>
      <Typography.Title editable level={5}>
        {currentChapterTitle}
      </Typography.Title>
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
      <Link to="/topic/create" style={{ width: "90%" }}>
        <Button style={{ width: "100%" }}>+</Button>
      </Link>
    </TopicContainer>
  );
}

export default TopicList;
