import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import RoundList from "../components/Round/RoundList";
import QuestionList from "../components/Question/QuestionList";

const InfosLayout = styled.div`
  display: flex;
`;

function Question() {
  const { round } = useParams();
  return (
    <InfosLayout>
      <RoundList />
      {round && <QuestionList />}
      <Outlet />
    </InfosLayout>
  );
}

export default Question;
