import React from "react";
import FormHeader from "../../../Components/FormHeader";
import Pagenation from "../../../Components/Pagenation";
import DataFilter from "../../../Components/DataFilter";
import DataTable from "../../../Components/DataTable"
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiOutlineExternalLink, HiOutlineDocumentSearch } from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
function ArchiveDataList({
  archiveDataList,
  statusCode,
  dcCount,
  listSize,
  pageNo,
  setPageNo,
  dataFilterFetch,
}) {
  return (
    <>
      <FormHeader
        type="view"
        title={"큐레이션 데이터 등록(아카이브 데이터 조회)"}
      />

      <Wrapper>
        <RowContainer>
          <Row>
            <div className="result-count">
              <HiOutlineDocumentSearch />
              검색 결과 ({dcCount}건)
            </div>
            <div className="action-group">
              <select className="list-size">
                <option disabled>리스트 사이즈</option>
                <option value={2}>2건</option>
                <option value={10}>10건</option>
                <option value={30}>30건</option>
                <option value={50}>50건</option>
                <option value={75}>75건</option>
                <option value={100}>100건</option>
              </select>
            </div>
          </Row>
          <Row>
            <DataFilter dataFilterFetch={dataFilterFetch} type="archive" />
          </Row>
        </RowContainer>
        {archiveDataList.length !== 0 ? (
          <>
            
            <DataTable type="archive" tableData={archiveDataList} statusCode={statusCode}/>
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

const RowContainer = styled.div`
  border: solid 1px #d6d6d6;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  color: rgb(59, 59, 59);
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: solid 1px #d6d6d6;
  &:last-child {
    border: none;
  }

  .result-count {
    font-size: 16px;
    font-weight: bold;
    * {
      padding-right: 0.5rem;
    }
  }
  .action-group {
    display: flex;
  }
  .list-size {
    margin: 0 0.5rem 0 0.5rem;
    padding: 0.5rem;
    border: solid 1px #d6d6d6;
  }
`;

const Wrapper = styled.div`
  margin: 0 5rem 5rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
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
