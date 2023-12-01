import styled from "styled-components";
import { Button, Input } from "antd";
import ImageUpload from "../../../commons/ImageUpload";
import { ChoiceType } from "../../../../types/questionTypes";
import ContentBox from "../../../commons/ContentBox";

interface ChoiceFormGridContainerProps {
  choiceType: ChoiceType;
}

const ChoiceFormGridContainer = styled.div<ChoiceFormGridContainerProps>`
  display: grid;
  grid-template-columns: 1fr 56.23px;
  width: ${({ choiceType }) => (choiceType === "Image" ? "200px" : "100%")};
`;

interface ChoiceFormUIProps {
  choiceType: ChoiceType;
  choice: string;
  setChoice: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => Promise<void>;
}

function ChoiceFormUI({
  choiceType,
  choice,
  setChoice,
  onSubmit,
}: ChoiceFormUIProps) {
  return (
    <ContentBox title="선지 추가" width="half" height="auto">
      <ChoiceFormGridContainer choiceType={choiceType}>
        {choiceType === "Image" ? (
          <ImageUpload
            setImgFile={setChoice}
            imgFile={choice}
            htmlFor="choice-form"
          />
        ) : (
          <Input.TextArea
            value={choice}
            onChange={(e: any) => {
              setChoice(e.target.value);
            }}
            placeholder="선지"
          />
        )}
        <Button type="primary" onClick={onSubmit}>
          추가
        </Button>
      </ChoiceFormGridContainer>
    </ContentBox>
  );
}

export default ChoiceFormUI;
