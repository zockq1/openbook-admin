import { Button, Card, Space } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTopicQuery } from "../../store/api/topicApi";
import ChoiceForm from "../Choice/ChoiceForm";
import ChoiceList from "../Choice/ChoiceList";
import ChoicesAutoCompleteModal from "../Choice/ChoicesAutoCompleteModal";
import DescriptionList from "../Description/DescriptionList";
import DescriptionForm from "../Description/DescriptionForm";
import DescriptionsAutoCompleteModal from "../Description/DescriptionsAutoCompleteModal";
import KeywordEditModal from "../Keyword/KeywordEditModal";
import { useGetKeywordListQuery } from "../../store/api/KeywordApi";
import { KeywordModel } from "../../types/keywordType";
import { queryErrorNotification } from "../../services/errorNotification";
import DeleteTopicButton from "./DeleteTopicButton";

function TopicInfo() {
  const navigate = useNavigate();
  const { title, chapter } = useParams();
  const { data: topic, error: topicError } = useGetTopicQuery(String(title));
  const { data: keywordList, error: keywordListError } = useGetKeywordListQuery(
    String(title)
  );

  useEffect(() => {
    queryErrorNotification(topicError, "주제 정보");
  }, [topicError]);

  useEffect(() => {
    queryErrorNotification(keywordListError, "키워드 목록");
  }, [keywordListError]);

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
          <DeleteTopicButton />
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
