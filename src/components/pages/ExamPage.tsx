import { useLocation } from "react-router-dom";
import { ColumnFlex, RowFlex } from "../commons/FlexLayout";
import RoundList from "../units/round/presenter/RoundList.presenter";
import QuestionList from "../units/question/presenter/QuestionList.presenter";
import CreateQuestion from "../units/question/presenter/CreateQuestion.presenter";
import EditQuestion from "../units/question/presenter/EditQuestion.presenter";
import QuestionInfo from "../units/question/presenter/QuestionInfo.presenter";
import Description from "../units/description/presenter/Description";
import ChoiceList from "../units/choice/presenter/ChoiceList.presenter";
import ChoiceForm from "../units/choice/presenter/ChoiceForm.presenter";

function ExamPage() {
  const location = useLocation();
  return (
    <RowFlex>
      <RoundList />
      {!location.pathname.endsWith("exam") && <QuestionList />}
      {location.pathname.endsWith("create-question") && <CreateQuestion />}
      {location.pathname.endsWith("edit-question") && <EditQuestion />}
      {location.pathname.endsWith("question-info") && (
        <>
          <ColumnFlex>
            <QuestionInfo />
            <Description />
          </ColumnFlex>
          <ColumnFlex>
            <ChoiceForm />
            <ChoiceList />
          </ColumnFlex>
        </>
      )}
    </RowFlex>
  );
}

export default ExamPage;
