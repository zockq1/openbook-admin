import styled from "styled-components";
import { UseFormRegister } from "react-hook-form";
import { KeywordFormValues } from "../presenter/Keyword.presenter";
import ImageUpload from "../../../commons/ImageUpload";

const StyledKeywordForm = styled.tr`
  & > td {
    text-align: center;
  }

  input,
  textarea {
    width: 100%;
    padding: 4px;
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    border-radius: ${({ theme }) => theme.borderRadius.xxxs};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    :focus {
      border: 1px solid ${({ theme }) => theme.colors.blue};
    }
  }

  textarea {
    resize: none;
    display: block;
    :focus {
      outline: none;
    }
  }

  .hidden {
    display: none;
  }

  .white,
  .red {
    border-radius: ${({ theme }) => theme.borderRadius.xxxs};
    padding: 4px;
    margin: 2px;
  }

  .white {
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  }

  .red {
    background-color: #f44336;
    color: white;
  }
`;

interface KeywordProps {
  onSubmit: () => void;
  onCancle?: () => void;
  onDeleteImage: () => void;
  register: UseFormRegister<KeywordFormValues>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
}

function KeywordFormUI({
  onCancle,
  onSubmit,
  onDeleteImage,
  register,
  setImage,
  image,
}: KeywordProps) {
  return (
    <StyledKeywordForm>
      <td className="name">
        <textarea rows={4} {...register("name")} />
      </td>
      <td className="comment">
        <textarea rows={4} {...register("comment")} />
      </td>
      <td className="dateComment">
        <textarea rows={4} {...register("dateComment")} />
      </td>
      <td className="extraDate">
        <input
          type="number"
          {...register("extraDate1")}
          style={{ marginBottom: "5px" }}
        />
        <input type="number" {...register("extraDate2")} />
      </td>
      <td className="extraDateComment">
        <input
          type="text"
          {...register("extraDateComment1")}
          style={{ marginBottom: "5px" }}
        />
        <input type="text" {...register("extraDateComment2")} />
      </td>
      <td className="image">
        <ImageUpload
          setImgFile={setImage}
          imgFile={image}
          htmlFor="keyword-form"
        />
        <button className="red" onClick={onDeleteImage}>
          이미지 삭제
        </button>
      </td>
      <td className="option">
        <button className="white" onClick={onSubmit}>
          {onCancle ? "저장" : "추가"}
        </button>
        {onCancle && (
          <button className="red" onClick={onCancle}>
            취소
          </button>
        )}
      </td>
    </StyledKeywordForm>
  );
}

export default KeywordFormUI;
