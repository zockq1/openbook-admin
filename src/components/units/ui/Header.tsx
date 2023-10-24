import { Button } from "antd";
import styled from "styled-components";
import { useUpdateJJHMutation } from "../../../store/api/JJHApi";
import { mutationErrorNotification } from "../../../services/errorNotification";
import SearchForm from "../search/presenter/SearchForm.presenter";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 15px;
  grid-column: 2 / 4;
  grid-row: 1 / 2;
`;

function Header() {
  const [updateJJH, { isLoading }] = useUpdateJJHMutation();

  const handleUpdate = async () => {
    try {
      await updateJJH();
    } catch (error) {
      mutationErrorNotification(error);
    }
  };
  return (
    <StyledHeader>
      <SearchForm />
      <Button loading={isLoading} onClick={handleUpdate}>
        정주행 업데이트
      </Button>
    </StyledHeader>
  );
}

export default Header;
