import styled from "styled-components";
import { KeywordModel } from "../../../../types/keywordType";

interface KeywordProps {
  keyword: KeywordModel;
  isKeywordQuestion: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const Button = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.xxxs};
  padding: 4px;
  margin: 2px;
  &.white {
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  }

  &.red {
    background-color: #f44336;
    color: white;
  }
`;

function KeywordUI({
  keyword,
  onDelete,
  onEdit,
  isKeywordQuestion,
}: KeywordProps) {
  const {
    name,
    comment,
    dateComment,
    extraDateList,
    file,
    number,
    questionList,
  } = keyword;
  return (
    <>
      <tr key={keyword.name}>
        <td className="number">{number + 1}</td>
        <td className="name">{name}</td>
        <td className="comment">{comment}</td>
        <td className="dateComment">{dateComment}</td>
        <td className="extraDate">
          {extraDateList.map((date) => (
            <div key={date.extraDate}>{date.extraDate}</div>
          ))}
        </td>
        <td className="extraDateComment">
          {extraDateList.map((date, index) => (
            <div key={index + date.extraDateComment}>
              {date.extraDateComment}
            </div>
          ))}
        </td>
        <td className="image">{file ? <img src={file} alt={name} /> : ""}</td>
        <td className="option">
          <Button className="white" onClick={onEdit}>
            수정
          </Button>
          <Button className="red" onClick={onDelete}>
            삭제
          </Button>
        </td>
      </tr>
      {isKeywordQuestion && questionList.length > 0 && (
        <tr>
          <td colSpan={8}>
            {questionList.map((choice, index) => {
              return (
                <div key={index}>
                  {`${choice.roundNumber}회 ${choice.questionNumber}번 문제: ${choice.choice}`}
                </div>
              );
            })}
          </td>
        </tr>
      )}
    </>
  );
}

export default KeywordUI;
