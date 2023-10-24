import { List } from "antd";
import { SearchModel } from "../../../../types/JJHTypes";
import ContentBox from "../../../commons/ContentBox";
import formatSearchResult from "../../../../services/formatSearchResult";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledSearchResultUI = styled.div`
  strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
  .search-title {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSizes.large};
  }

  .sub-title {
    float: right;
    color: ${({ theme }) => theme.colors.black};
  }
`;

interface SearchResultUIProps {
  searchResult: SearchModel;
  searchValue: string;
}

function SearchResultUI({ searchResult, searchValue }: SearchResultUIProps) {
  const { chapterList, topicList, keywordList } = searchResult;
  return (
    <>
      <StyledSearchResultUI>
        <ContentBox title="단원·주제 검색 결과">
          <List
            header={<span className="search-title">단원 검색</span>}
            bordered
            itemLayout="horizontal"
            dataSource={chapterList}
            renderItem={(chapter, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Link to={`/topic/${chapter.chapterNumber}/chapter-info`}>
                      {`${chapter.chapterNumber}단원: `}
                      {formatSearchResult(
                        `${chapter.chapterTitle}`,
                        searchValue
                      )}
                    </Link>
                  }
                />
              </List.Item>
            )}
          />
          <br />
          <List
            header={<span className="search-title">주제 검색</span>}
            bordered
            itemLayout="horizontal"
            dataSource={topicList}
            renderItem={(topic, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <>
                      <Link
                        to={`/topic/${topic.chapterNumber}/${topic.topicTitle}/topic-info`}
                      >
                        {formatSearchResult(`${topic.topicTitle}`, searchValue)}
                      </Link>
                      <span className="sub-title">
                        {`${topic.chapterNumber}단원: ${topic.chapterTitle}`}
                      </span>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </ContentBox>
      </StyledSearchResultUI>

      <StyledSearchResultUI>
        <ContentBox title="키워드 검색 결과">
          <List
            header={<span className="search-title">키워드 검색</span>}
            bordered
            itemLayout="horizontal"
            dataSource={keywordList}
            renderItem={(keyword, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <>
                      <Link
                        to={`/topic/${keyword.chapterNumber}/${keyword.topicTitle}/topic-info`}
                      >
                        {formatSearchResult(
                          `${keyword.keywordName}`,
                          searchValue
                        )}
                      </Link>
                      <span className="sub-title">
                        {`${keyword.chapterNumber}단원: ${keyword.chapterTitle} / ${keyword.topicTitle}`}
                      </span>
                    </>
                  }
                  description={formatSearchResult(
                    `${keyword.keywordComment}`,
                    searchValue
                  )}
                />
              </List.Item>
            )}
          />
        </ContentBox>
      </StyledSearchResultUI>
    </>
  );
}

export default SearchResultUI;
