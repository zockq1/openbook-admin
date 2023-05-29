import { Button, Menu, MenuProps, Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import getItem from "../../services/getItem";

import { useDeleteChapterMutation } from "../../store/api/chapterApi";
import ChapterTitle from "./ChapterTitle";
import { useGetChapterTopicListQuery } from "../../store/api/topicApi";

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
  const { chapter } = useParams();
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

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import styled from "styled-components";
// import { useGetChapterTopicListQuery } from "../../store/api/topicApi";
// import ChapterTitle from "./ChapterTitle";
// import { useDeleteChapterMutation } from "../../store/api/chapterApi";

// interface MenuItem {
//   title: string;
//   key: string;
// }

// const TopicContainer = styled.div`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   border-right: 1px solid rgba(5, 5, 5, 0.06);
// `;

// const TopicMenu = styled.ul`
//   width: 300px;
//   list-style-type: none;
//   padding: 0;
// `;

// const MenuItemWrapper = styled.li<{ selected: boolean }>`
//   cursor: pointer;
//   padding: 8px;
//   background-color: ${(props) => (props.selected ? "#1890ff" : "transparent")};
//   color: ${(props) => (props.selected ? "#fff" : "#000")};
// `;

// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 10px;
// `;

// const PaginationButton = styled.button<{ active: boolean }>`
//   margin: 0 5px;
//   background-color: ${(props) => (props.active ? "#1890ff" : "transparent")};
//   color: ${(props) => (props.active ? "#fff" : "#000")};
//   border: none;
//   cursor: pointer;
// `;

// function TopicList() {
//   const navigate = useNavigate();
//   const { chapter } = useParams<{ chapter: string }>();
//   const { data: topicList } = useGetChapterTopicListQuery(Number(chapter));
//   const [deleteChapter] = useDeleteChapterMutation();
//   const [items, setItems] = useState<MenuItem[]>([]);
//   const [page, setPage] = useState(1);
//   const limit = 10;
//   const offset = (page - 1) * limit;
//   const [selectedKey, setSelectedKey] = useState<string | null>(null);

//   useEffect(() => {
//     // 데이터 가져오는 로직
//     const currentPageTopic = topicList?.topicList.slice(offset, offset + 10);
//     const newItems = currentPageTopic?.map((topic, index) => ({
//       title: topic,
//       key: index.toString(),
//     }));
//     setItems(newItems || []);
//   }, [page, topicList, offset]);

//   const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
//     const key = e.currentTarget.dataset.key;
//     setSelectedKey(key ? key : null);
//     navigate(`/topic/${chapter}/${e.currentTarget.dataset.key}`);
//   };

//   const handleChangePage = (pageNumber: number) => {
//     setPage(pageNumber);
//   };

//   const handleDelete = async () => {
//     if (topicList?.topicList.length === 0) {
//       try {
//         await deleteChapter({ number: Number(chapter) }).unwrap();
//         navigate(`/topic`);
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       window.alert("해당 단원에 주제가 없을 때만 삭제 가능합니다.!");
//     }
//   };

//   const totalPages = Math.ceil((topicList?.topicList.length || 0) / limit);

//   return (
//     <TopicContainer>
//       <ChapterTitle />
//       <TopicMenu>
//         {items.map((item) => (
//           <MenuItemWrapper
//             key={item.key}
//             data-key={item.key}
//             selected={selectedKey === item.key}
//             onClick={onClick}
//           >
//             {item.title}
//           </MenuItemWrapper>
//         ))}
//       </TopicMenu>
//       <PaginationContainer>
//         {Array.from(Array(totalPages), (_, index) => index + 1).map(
//           (pageNumber) => (
//             <PaginationButton
//               key={pageNumber}
//               active={pageNumber === page}
//               onClick={() => handleChangePage(pageNumber)}
//             >
//               {pageNumber}
//             </PaginationButton>
//           )
//         )}
//       </PaginationContainer>
//       <br />
//       <Link to={`/topic/${chapter}/create`} style={{ width: "90%" }}>
//         <button style={{ width: "100%" }}>+</button>
//       </Link>
//       <br />
//       <button style={{ width: "90%" }} onClick={handleDelete}>
//         현재 단원 삭제
//       </button>
//       <br />
//       <Link to={`/topic/${chapter}/question`} style={{ width: "90%" }}>
//         <button style={{ width: "100%" }}>문제</button>
//       </Link>
//     </TopicContainer>
//   );
// }

// export default TopicList;
