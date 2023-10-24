import Search from "antd/es/input/Search";
import styled from "styled-components";

const StyledSearchFormUI = styled(Search)`
  margin: 0px 15px;
  width: 500px;
`;

interface SearchFormUIProps {
  onSearch: (value: string) => void;
}

function SearchFormUI({ onSearch }: SearchFormUIProps) {
  return (
    <StyledSearchFormUI
      placeholder="검색"
      onSearch={onSearch}
      enterButton="검색"
    />
  );
}

export default SearchFormUI;
