import { Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getItem from "../../services/getItem";
import Title from "antd/es/typography/Title";
import { useGetChaptersQuery } from "../../store/api/chapterApi";
import CreateChapterModal from "./CreateChpterModal";
import { useNavigate, useParams } from "react-router-dom";
import { queryErrorNotification } from "../../services/errorNotification";

const ChpterContainer = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
`;

function ChapterList() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const { data: chapterList, error: chapterError } = useGetChaptersQuery();

  useEffect(() => {
    queryErrorNotification(chapterError, "단원 목록");
  }, [chapterError]);

  useEffect(() => {
    const newItems = chapterList?.map((chapter) => {
      return getItem(chapter.number + "단원", chapter.number);
    });
    setItems(newItems);
  }, [chapterList]);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/topic/${e.key}`);
  };

  return (
    <ChpterContainer>
      <Title level={5}>단원{}</Title>
      <Menu
        onClick={onClick}
        mode="inline"
        items={items}
        defaultSelectedKeys={[`${chapter}`]}
        style={{ borderInlineEnd: "unset" }}
      />
      <CreateChapterModal />
    </ChpterContainer>
  );
}

export default ChapterList;
