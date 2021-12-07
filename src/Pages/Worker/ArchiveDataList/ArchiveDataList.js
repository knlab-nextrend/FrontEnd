import React from "react";
import FormHeader from "../../../Components/FormHeader";
import Pagenation from "../../../Components/Pagenation";
import DataFilter from "../../../Components/DataFilter";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
function ArchiveDataList({
  archiveDataList,
  statusCode,
  dcCount,
  listSize,
  pageNo,
  setPageNo,
}) {
  return (
    <>
      <FormHeader type="view" title={"아카이브 데이터 조회"} />

      <Wrapper>
        <DataFilter />
        {archiveDataList.length !== 0 ? (
          <>
            <SearchResultTitle>
              <p>검색결과 ({dcCount}건)</p>
            </SearchResultTitle>
            <TableWrapper>
              <CustomTable>
                <colgroup>
                  <col style={{ width: "3%" }} />
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "7%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "5%" }} />
                </colgroup>

                <thead>
                  <tr>
                    <th>itemID</th>
                    <th>구분</th>
                    <th>원문 대상 국가</th>
                    <th>원문 제목</th>
                    <th>한글 제목</th>
                    <th>요약</th>
                    <th>주제 분류</th>
                    <th>페이지 수</th>
                    <th>열람 수</th>
                    <th>원문 링크</th>
                  </tr>
                </thead>
                <tbody>
                  {archiveDataList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.item_id}</td>
                        <td>
                          <p>{item.is_crawled ? "크롤데이터" : "수기데이터"}</p>
                        </td>
                        <td>{item.dc_country_list.join(", ")}</td>
                        <td>
                          <CustomLink
                            to={`/crawl/detail/${statusCode}/${item.item_id}`}
                          >
                            {item.dc_title_or}
                          </CustomLink>
                        </td>
                        <td>{item.dc_title_kr}</td>
                        <td>{item.dc_smry_kr}</td>
                        <td>{item.dc_code_list.join(", ")}</td>
                        <td>{item.dc_page}</td>
                        <td>{item.dc_hit}</td>
                        <td>
                          <a href={item.dc_url_loc} target="_blank">
                            <HiOutlineExternalLink size="24" color="black" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </CustomTable>
            </TableWrapper>
            <Pagenation
              dcCount={dcCount}
              listSize={listSize}
              pageNo={pageNo}
              setPageNo={setPageNo}
            />
          </>
        ) : (
          <>
            <SearchResultNotthingContainer>
              <CgFileDocument size="100" color="#d6d6d6" />
              <div className="comment">등록된 데이터가 없습니다.</div>
            </SearchResultNotthingContainer>
          </>
        )}
      </Wrapper>
    </>
  );
}
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

const Wrapper = styled.div`
  margin: 0 5rem 5rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: 65rem;
  overflow: auto;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
`;
const CustomTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  tr {
    height: 3rem;
  }
  thead {
    border-bottom: solid 1px #d6d6d6;
    position: sticky;
    top: 0px;
    background-color: white;
  }
  tbody {
    tr:nth-child(2n) {
      background-color: #eee;
    }
    tr {
      &:hover {
        cursor: pointer;
        background-color: #d6d6d6;
      }
    }

    tr > td > span {
      margin: 0.2rem;
    }
  }
`;
const CustomLink = styled(Link)`
  color: black;
`;
const SearchResultTitle = styled.div`
  width: 100%;
  p {
    font-size: 20px;
    font-weight: bold;
  }
`;

export default ArchiveDataList;
