import { Button, Card, Modal, Space } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteTopicMutation,
  useGetTopicQuery,
} from "../store/api/topicApi";
import ChoiceForm from "../components/Choice/ChoiceForm";
import ChoiceList from "../components/Choice/ChoiceList";
import ChoicesAutoCompleteModal from "../components/Choice/ChoicesAutoCompleteModal";
import DescriptionList from "../components/Description/DescriptionList";
import DescriptionForm from "../components/Description/DescriptionForm";
import DescriptionsAutoCompleteModal from "../components/Description/DescriptionsAutoCompleteModal";
import KeywordEditModal from "../components/Keyword/KeywordEditModal";
import { useGetKeywordListQuery } from "../store/api/KeywordApi";
import { KeywordModel } from "../types/keywordType";
import {
  mutationErrorNotification,
  queryErrorNotification,
} from "../services/errorNotification";

function TopicInfo() {
  const navigate = useNavigate();
  const { title, chapter } = useParams();
  const { data: topic, error: topicError } = useGetTopicQuery(String(title));
  const { data: keywordList, error: keywordListError } = useGetKeywordListQuery(
    String(title)
  );
  const [deleteTopic] = useDeleteTopicMutation();

  useEffect(() => {
    queryErrorNotification(topicError, "주제 정보");
  }, [topicError]);

  useEffect(() => {
    queryErrorNotification(keywordListError, "키워드 목록");
  }, [keywordListError]);

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
          mutationErrorNotification(error);
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
      style={{ width: 1000, margin: "0 auto" }}
      extra={
        <div>
          <Button onClick={handleUpdateClick}>수정</Button>
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
        {topic?.detail &&
          topic?.detail.split("\n").map((line, index) => {
            return <p key={index}>{line}</p>;
          })}
      </div>
      <br />
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
          키워드
        </div>
        <br />
        <KeywordEditModal />
        {keywordList?.map((keyword: KeywordModel, index: number) => (
          <Space key={index}>
            {index !== 0 ? <div>&nbsp;&nbsp;/</div> : null}
            <div style={{ fontSize: 18 }}>{keyword.name}</div>
          </Space>
        ))}
      </div>
      <br />
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
          선지
        </div>
        <br />
        <ChoicesAutoCompleteModal />
        <ChoiceForm />
        <ChoiceList />
      </div>
      <br />
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
          보기
        </div>
        <br />
        <DescriptionsAutoCompleteModal />
        <DescriptionForm />
        <DescriptionList />
      </div>
    </Card>
  );
}

export default TopicInfo;
