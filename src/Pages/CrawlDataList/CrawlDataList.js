import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchOption from "../../Components/SearchOption";
import CrawlDataCard from "../../Components/CrawlDataCard";
import FormHeader from "../../Components/FormHeader";
import Pagenation from "../../Components/Pagenation";
import Tab from "../../Components/Tab";
import { CgFileDocument } from "react-icons/cg";

function CrawlDataList({
  statusCode,
  dcCount,
  listSize,
  pageNo,
  setPageNo,
  crawlDataList,
  STATUS_CODE_SET
}) {
  return (
    <>
      <FormHeader type="view" title={STATUS_CODE_SET[statusCode].mainTitle} />
      <Tab process={STATUS_CODE_SET[statusCode].type}></Tab>
      <Wrapper>
        <SearchOption />
        {crawlDataList.length !== 0 ? (
          <>
            <SearchResultTitle>
              <p>검색결과 ({dcCount}건)</p>
              <p>카드 클릭 시 편집 화면이 뜹니다.</p>
            </SearchResultTitle>
            <SearchResult>
              {crawlDataList.map((item, i) => {
                return (
                  <CustomLink
                    to={`/crawl/detail/${statusCode}/${item.item_id}`}
                    key={i}
                  >
                    <CrawlDataCard crawlDataItem={item} />
                  </CustomLink>
                );
              })}
            </SearchResult>
            <Pagenation
              dcCount={dcCount}
              listSize={listSize}
              pageNo={pageNo}
              setPageNo={setPageNo}
            />
          </>
        ) : (
          <SearchResultNotthingContainer>
            <CgFileDocument size="100" color="#d6d6d6" />
            <div className="comment">등록된 데이터가 없습니다.</div>
          </SearchResultNotthingContainer>
        )}
      </Wrapper>
    </>
  );
}

/* status에 따라 라우팅을... 다르게 해야하네요 ㅎ; */

const SearchResultNotthingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10rem;
  .comment {
    font-size: 30px;
    color: #d6d6d6;
  }
`;
const CustomLink = styled(Link)`
  color: black;
  &:link {
    text-decoration: none;
  }
  &:visited {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
  }
`;
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
