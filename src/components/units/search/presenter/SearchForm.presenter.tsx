import { useNavigate } from "react-router-dom";
import SearchFormUI from "../container/SearchFormUI.container";
import { SearchProps } from "antd/es/input";

function SearchForm() {
  const navigate = useNavigate();

  const onSearch: SearchProps["onSearch"] = (value: string) => {
    if (value.length < 1) return;
    navigate(`/search/${value}`);
  };

  return <SearchFormUI onSearch={onSearch} />;
}

export default SearchForm;
