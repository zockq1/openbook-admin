import { Button, Card, Modal } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteTopicMutation,
  useGetTopicQuery,
} from "../store/api/topicApi";

function TopicInfo() {
  const navigate = useNavigate();
  let { title, chapter } = useParams();
  const { data: topic } = useGetTopicQuery(title ? title : "");
  const [deleteTopic] = useDeleteTopicMutation();

  const handleDeleteClick = async () => {
    Modal.confirm({
      title: "주의",
      content: "정말 이 항목을 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          await deleteTopic({ title: title }).unwrap();
          navigate(`/topic/${chapter}`);
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleUpdateClick = () => {
    navigate(`/topic/${chapter}/${title}/edit`);
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
      <p>키워드: {topic?.keywordList}</p>
      <div
        style={{
          border: "1px solid rgba(5, 5, 5, 0.06)",
          borderRadius: 12,
          padding: 12,
        }}
      >
        <div
          style={{
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
            paddingBottom: 12,
          }}
        >
          상세내용
        </div>
        {topic?.detail.split("\n").map((line, index) => {
          return <p key={index}>{line}</p>;
        })}
      </div>
    </Card>
  );
}

export default TopicInfo;
