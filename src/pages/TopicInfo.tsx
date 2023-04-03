import { Button, Card } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteTopicMutation,
  useGetTopicQuery,
} from "../store/api/topic.Api";

function TopicInfo() {
  const navigate = useNavigate();
  let { params } = useParams();
  const { data: topic } = useGetTopicQuery(params ? params : "");
  const [deleteTopic] = useDeleteTopicMutation();

  const handleDeleteClick = async () => {
    try {
      await deleteTopic({ id: params }).unwrap();
      navigate("/topic");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClick = () => {
    navigate(`/topic/${params}/edit`);
  };

  return (
    <Card
      title={topic?.title}
      style={{ width: 600, margin: "auto auto" }}
      extra={
        <div>
          <Button onClick={handleUpdateClick}>수정</Button>
          <span> </span>
          <Button danger type="primary" onClick={handleDeleteClick}>
            삭제
          </Button>
        </div>
      }
    >
      <p>단원: {topic?.chapter}</p>
      <p>분류: {topic?.category}</p>
      <p>시작 년도: {topic?.startDate}</p>
      <p>종료 년도: {topic?.endDate}</p>
      <p>상세설명: {topic?.detail}</p>
      <p>키워드: {topic?.keywordList}</p>
    </Card>
  );
}

export default TopicInfo;
