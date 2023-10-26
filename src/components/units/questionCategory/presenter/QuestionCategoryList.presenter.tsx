import { useGetQuestionCategoryListQuery } from "../../../../store/api/questionCategoryApi";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import setError from "../../../../services/setError";
import QuestionCategoryListUI from "../container/QuestionCategoryListUI.container";
import ContentBox from "../../../commons/ContentBox";
import EditquestionCategoryOrder from "./EditQuestionCategoryOrder.presenter";

function QuestionCategoryList() {
  const { data: questionCategoryList, error: questionCategoryListError } =
    useGetQuestionCategoryListQuery();
  useNotificationErrorList([
    setError(questionCategoryListError, "키워드 목록"),
  ]);

  if (!questionCategoryList) {
    return (
      <ContentBox title="연표" width="half">
        <QuestionCategoryListUI questionCategoryList={[]} />
      </ContentBox>
    );
  }

  return (
    <ContentBox
      title="연표"
      width="half"
      option={<EditquestionCategoryOrder />}
    >
      <QuestionCategoryListUI
        questionCategoryList={[...questionCategoryList].sort(
          (a, b) => a.number - b.number
        )}
      />
    </ContentBox>
  );
}

export default QuestionCategoryList;
