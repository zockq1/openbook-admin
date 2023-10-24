import { useParams } from "react-router-dom";
import { useGetSearchQuery } from "../../../../store/api/JJHApi";
import setError from "../../../../services/setError";
import useNotificationErrorList from "../../../../hooks/useNotificationErrorList";
import { Spin } from "antd";
import SearchResultUI from "../container/SearchResultUI.container";
import ContentBox from "../../../commons/ContentBox";

function SearchResult() {
  const { search } = useParams();
  const searchValue = String(search);
  const {
    data: searchResult,
    error: searchResultError,
    isLoading,
  } = useGetSearchQuery(searchValue);
  useNotificationErrorList([setError(searchResultError, "주제 정보")]);

  if (searchResult === undefined || isLoading) {
    return (
      <>
        <ContentBox title="단원·주제 검색 결과">
          <Spin />
        </ContentBox>
        <ContentBox title="키워드 검색 결과">
          <Spin />
        </ContentBox>
      </>
    );
  }

  return (
    <SearchResultUI searchResult={searchResult} searchValue={searchValue} />
  );
}

export default SearchResult;
