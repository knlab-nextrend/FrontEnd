import React from "react";
import styled from "styled-components";

import SearchOption from "../../Components/SearchOption";
import CrawlDataCard from "../../Components/CrawlDataCard";
import Pagenation from "../../Components/Pagenation";
import Tab from "../../Components/Tab";

function CrawlDataList({
  statusCode,
  dcCount,
  listSize,
  pageNo,
  setPageNo,
  statusCrawlData,
  Search,
}) {
  return (
    <>
      <Tab statusCode={statusCode}></Tab>
      <Wrapper>
        <SearchOption Search={Search} />
        <SearchResultTitle>
          <p>검색결과 ({dcCount}건)</p>
          <p>카드 클릭 시 편집 화면이 뜹니다.</p>
        </SearchResultTitle>
        <SearchResult>
          {statusCrawlData.map((item, i) => {
            return <CrawlDataCard key={i} crawlDataItem={item} />;
          })}
        </SearchResult>
        <Pagenation
          dcCount={dcCount}
          listSize={listSize}
          pageNo={pageNo}
          setPageNo={setPageNo}
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5rem 0 5rem;
`;
const SearchResultTitle = styled.div`
  width: 100%;
  p {
    &:nth-child(1) {
      font-size: 20px;
      font-weight: bold;
    }
    &:nth-child(2) {
      font-size: 14px;
    }
  }
`;
const SearchResult = styled.div`
  width: 100%;
`;

export default CrawlDataList;
