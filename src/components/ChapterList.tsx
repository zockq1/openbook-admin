import { Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setChapter } from "../store/slices/chapterSlice";
import getItem from "../services/getItem";
import Title from "antd/es/typography/Title";
import { useGetChaptersQuery } from "../store/api/chapterApi";
import CreateChapterModal from "./CreateChpterModal";
import { useNavigate, useParams } from "react-router-dom";

const ChpterContainer = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
`;

function ChapterList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { chapter } = useParams();
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const [chapterMap, setChapterMap] = useState<Map<number, string>>(new Map());
  const { data: chapterList } = useGetChaptersQuery();

  useEffect(() => {
    const newItems = chapterList?.numberList.map((number) =>
      getItem(number + "단원", number)
    );
    setItems(newItems);

    const newChapterMap = new Map();
    chapterList?.numberList.forEach((number, index) => {
      newChapterMap.set(number, chapterList?.titleList[index]);
    });
    setChapterMap(newChapterMap);
  }, [chapterList]);

  const onClick: MenuProps["onClick"] = (e) => {
    dispatch(
      setChapter({
        title: chapterMap.get(Number(e.key)) || "",
        number: Number(e.key),
      })
    );
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
