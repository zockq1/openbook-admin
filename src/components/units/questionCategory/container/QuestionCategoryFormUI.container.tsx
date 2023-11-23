import styled from "styled-components";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { QuestionCategoryFormValues } from "../presenter/CreateQuestionCategory.presenter";
import { EraModel } from "../../../../types/eraType";
import { Select } from "antd";
import filterOption from "../../../../services/filterOption";
import { CategoryModel } from "../../../../types/categoryType";

const StyledQuestionCategoryForm = styled.tr`
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

  .create-button {
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    width: 100%;
  }
`;

interface QuestionCategoryProps {
  onSubmit: () => void;
  onCancle?: () => void;
  register: UseFormRegister<QuestionCategoryFormValues>;
  eraList: EraModel[];
  categoryList: CategoryModel[];
  control: Control<QuestionCategoryFormValues, any>;
}

function QuestionCategoryFormUI({
  onCancle,
  onSubmit,
  register,
  eraList,
  categoryList,
  control,
}: QuestionCategoryProps) {
  return (
    <StyledQuestionCategoryForm>
      <td className="title">
        <input type="text" {...register("title")} />
      </td>
      <td className="era">
        <Controller
          name="era"
          control={control}
          render={({ field }) => (
            <Select
              showSearch
              filterOption={filterOption}
              placeholder="시대 선택"
              {...field}
              style={{ width: "100%" }}
            >
              {eraList.map((era: EraModel) => (
                <Select.Option value={era.name} key={era.name}>
                  {era.name}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </td>
      <td className="category">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              showSearch
              filterOption={filterOption}
              placeholder="분류 선택"
              style={{ width: "100%" }}
              {...field}
            >
              {categoryList.map((category: CategoryModel) => (
                <Select.Option value={category.name} key={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </td>
      <td className="count"></td>
      <td className="option">
        {onCancle ? (
          <>
            <button className="white" onClick={onSubmit}>
              저장
            </button>
            <button className="red" onClick={onCancle}>
              취소
            </button>
          </>
        ) : (
          <button className="white create-button" onClick={onSubmit}>
            추가
          </button>
        )}
      </td>
    </StyledQuestionCategoryForm>
  );
}

export default QuestionCategoryFormUI;
