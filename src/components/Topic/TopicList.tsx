import { Button } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import ChapterTitle from "../Chapter/ChapterTitle";
import { useGetChapterTopicListQuery } from "../../store/api/topicApi";
import { queryErrorNotification } from "../../services/errorNotification";
import DeleteChapterButton from "../Chapter/DeleteChapterButton";
import { TopicListModel } from "../../types/topicTypes";
import Table, { ColumnsType } from "antd/es/table";
import EditTopicOrder from "./EditTopicOrder";

const columns: ColumnsType<TopicListModel> = [
  {
    title: "순서",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "주제 이름",
    dataIndex: "title",
    width: 170,
    key: "title",
  },
  {
    title: "분류",
    dataIndex: "category",
    width: 80,
    key: "category",
  },
  {
    title: "시작일",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "종료일",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "보기 수",
    dataIndex: "descriptionCount",
    key: "descriptionCount",
  },
  {
    title: "선지 수",
    dataIndex: "choiceCount",
    key: "choiceCount",
  },
  {
    title: "키워드 수",
    dataIndex: "keywordCount",
    key: "keywordCount",
  },
];

const TopicContainer = styled.div`
  height: 100vh;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
`;

function TopicList() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const { data: topicList, error: topicListError } =
    useGetChapterTopicListQuery(Number(chapter));

  useEffect(() => {
    queryErrorNotification(topicListError, "주제 목록");
  }, [topicListError]);

  return (
    <TopicContainer>
      <ChapterTitle />
      <Table
        columns={columns}
        dataSource={topicList}
        pagination={{ pageSize: 10 }}
        size="small"
        rowKey="title"
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/topic/${chapter}/${record.title}`);
            }, // click row
          };
        }}
        style={{ margin: "10px" }}
      />
      <br />
      <Link to={`/topic/${chapter}/create-topic`} style={{ width: "90%" }}>
        <Button style={{ width: "100%" }}>+</Button>
      </Link>
      <br />
      <DeleteChapterButton topicListLength={topicList?.length} />
      <br />
      {topicList ? (
        <EditTopicOrder topicList={topicList} />
      ) : (
        <div>주제 목록 로딩중</div>
      )}

      {/* {<Link to={`/topic/${chapter}/question`} style={{ width: "90%" }}>
      <Button style={{ width: "100%" }}>문제</Button>
    </Link>} */}
    </TopicContainer>
  );
}

export default TopicList;
