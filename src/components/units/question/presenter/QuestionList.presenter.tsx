import { Link, useNavigate, useParams } from "react-router-dom";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import SmallItemListUI from "../../common/SmallItemListUI.container";
import { Button, Spin } from "antd";
import EditRoundModal from "../../round/presenter/EditRoundModal.presenter";
import DeleteRoundButton from "../../round/presenter/DeleteRoundButton.presenter";
import { useGetRoundQuestionListQuery } from "../../../../store/api/questionApi";

function QuestionList() {
  const { round, question } = useParams();
  const roundNumber = Number(round);
  const navigate = useNavigate();
  const { data: questionList, error: questionListError } =
    useGetRoundQuestionListQuery(roundNumber);
  useNotificationErrorList([setError(questionListError, "문제 목록")]);

  if (!questionList) {
    return <Spin />;
  }

  return (
    <SmallItemListUI
      title="문제 선택"
      option={
        round && (
          <>
            <Link to={`/exam/${round}/create-question`}>
              <Button>문제 추가</Button>
            </Link>
            <EditRoundModal />
            <DeleteRoundButton />
          </>
        )
      }
      currentItemKey={String(question)}
      itemList={
        questionList
          ? questionList.map((item) => {
              return {
                name: item.toString(),
                key: item.toString(),
                onClick: () => navigate(`/exam/${round}/${item}/question-info`),
              };
            })
          : []
      }
    />
  );
}

export default QuestionList;
