import React from "react";
import SearchOption from '../../Components/SearchOption';
import CrawlDataCard from '../../Components/CrawlDataCard'
import styled from 'styled-components'
function CrawlDataList({ statusCode,crawlData,Search,resultCount }) {
  return (
    <>
      <Wrapper>
        <SearchOption Search={Search}/>
        <SearchResultFont>"keyword" 검색결과 ({resultCount}건)</SearchResultFont>
        <p>카드 클릭 시 편집 화면이 뜹니다.</p>
        {crawlData.map((item, i) => {
          return <CrawlDataCard key={i} crawlDataItem={item} />;
        })}
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const SearchResultFont = styled.p` 
  font-size:20px;
`

export default CrawlDataList;
