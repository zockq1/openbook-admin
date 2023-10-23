import styled from "styled-components";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { TimelineFormValues } from "../presenter/CreateTimeline.presenter";
import { EraModel } from "../../../../types/eraType";
import { Select } from "antd";
import filterOption from "../../../../services/filterOption";

const StyledTimelineForm = styled.tr`
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

interface TimelineProps {
  onSubmit: () => void;
  onCancle?: () => void;
  register: UseFormRegister<TimelineFormValues>;
  eraList: EraModel[];
  control: Control<TimelineFormValues, any>;
}

function TimelineFormUI({
  onCancle,
  onSubmit,
  register,
  eraList,
  control,
}: TimelineProps) {
  return (
    <StyledTimelineForm>
      <td className="era">
        <Controller
          name="era"
          control={control}
          render={({ field }) => (
            <Select
              style={{ width: "150px" }}
              showSearch
              filterOption={filterOption}
              placeholder="시대 선택"
              {...field}
            >
              {eraList.map((category: EraModel) => (
                <Select.Option value={category.name} key={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </td>
      <td className="startDate">
        <input type="number" {...register("startDate")} />
      </td>
      <td className="dateComment">
        <input type="endDate" {...register("endDate")} />
      </td>
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
    </StyledTimelineForm>
  );
}

export default TimelineFormUI;
