import { Button } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { queryErrorNotification } from "../../services/errorNotification";
import { useGetRoundQuestionListQuery } from "../../store/api/questionApi";
import Title from "antd/es/typography/Title";
import DeleteRoundButton from "../Round/DeleteRoundButton";
import EditRoundModal from "../Round/EditRoundModal";

const QuestionContainer = styled.div`
  height: 100vh;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
`;

function QuestionList() {
  const navigate = useNavigate();
  const { round } = useParams();
  const { data: questionList, error: questionListError } =
    useGetRoundQuestionListQuery(Number(round));

  useEffect(() => {
    queryErrorNotification(questionListError, "문제 목록");
  }, [questionListError]);

  return (
    <QuestionContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title
          level={5}
          style={{
            margin: "5px",
          }}
        >
          {round}
        </Title>
        <EditRoundModal />
      </div>
      {questionList &&
        questionList.map((item) => {
          return (
            <div onClick={() => navigate(`/question/${round}/${item}`)}>
              {item}
            </div>
          );
        })}

      <br />
      <Link to={`/question/${round}/create-question`} style={{ width: "90%" }}>
        <Button style={{ width: "100%" }}>+</Button>
      </Link>
      <br />
      <DeleteRoundButton questionListLength={questionList?.length} />
      <br />
    </QuestionContainer>
  );
}

export default QuestionList;
