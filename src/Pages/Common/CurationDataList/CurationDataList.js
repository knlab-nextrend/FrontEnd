import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Pagination from "../../../Components/Pagination";
import { HiOutlineDocumentSearch, HiPhotograph } from "react-icons/hi";
import { MdCalendarViewDay } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";
import DataFilter from "../../../Components/DataFilter";
import CurationDataCard from "../../../Components/CurationDataCard"
import CurationDataCard2 from "../../../Components/CurationDataCard2"
import NoData from "../../../Components/NoData";
function CurationDataList({
  curationDataList,
  dcCount,
  listSize,
  pageNo,
  setPageNo,
  viewType,
  viewTypeHandler,
  handleRowClick,
  userInfo
}) {
  return (
    <>
      {curationDataList.length !== 0 ? (
        <Wrapper>
          <RowContainer>
            <Row>
              <div className="result-count">
                <HiOutlineDocumentSearch />
                검색 결과 ({dcCount}건)
              </div>
              <div className="action-group">
                <ViewType>
                  <input
                    onChange={viewTypeHandler}
                    type="radio"
                    value="card1"
                    id="card1"
                    name="view-type"
                    checked={viewType === "card1"}
                  />
                  <label htmlFor="card1">
                    <MdCalendarViewDay />
                    카드형1
                  </label>
                  <input
                    onChange={viewTypeHandler}
                    type="radio"
                    value="card2"
                    id="card2"
                    name="view-type"
                    checked={viewType === "card2"}
                  />
                  <label htmlFor="card2">
                    <MdCalendarViewDay />
                    카드형2
                  </label>
                  <input
                    onChange={viewTypeHandler}
                    type="radio"
                    value="list"
                    id="list"
                    name="view-type"
                    checked={viewType === "list"}
                  />
                  <label htmlFor="list">
                    <RiFileList2Line />
                    목록형
                  </label>
                </ViewType>
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
              <DataFilter type={"curation"} />
            </Row>
          </RowContainer>
          {viewType === "list" && (
            <CurationListWrapper>
              <CurationList
                curationData={curationDataList}
                handleRowClick={handleRowClick}
              />
            </CurationListWrapper>
          )}
          {viewType === "card1" && (
            <CurationCard1Wrapper>
              {curationDataList.map((item, index) => {
                return (
                  <CustomLink to={`/${userInfo.permission!==0?"curation":"library"}/${item._id}`}>
                    <CurationDataCard curationDataItem={item}></CurationDataCard>
                  </CustomLink>
                );
              })}
            </CurationCard1Wrapper>
          )}
          {viewType === "card2" && (
            <CurationCard2Wrapper>
              {curationDataList.map((item, index) => {
                return (
                  <CustomLink to={`/${userInfo.permission!==0?"curation":"library"}/${item._id}`}>
                    <CurationDataCard2 curationDataItem={item}></CurationDataCard2>
                  </CustomLink>
                );
              })}
            </CurationCard2Wrapper>
          )}

          <Pagination
            dcCount={dcCount}
            listSize={listSize}
            pageNo={pageNo}
            setPageNo={setPageNo}
          />
        </Wrapper>
      ) : (
        <NoData />
      )}
    </>
  );
}

function CurationList({ curationData, handleRowClick }) {
  return (
    <>
      <CurationListTable>
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>제목</th>
            <th>대상 국가</th>
            <th>주제 분류</th>
            <th>문서 분류</th>
            <th>HOST 명</th>
            <th>페이지 수</th>
            <th>데이터 등록일</th>
          </tr>
        </thead>
        <tbody>
          {curationData.map((item, index) => {
            return (
              <tr
                onClick={() => {
                  handleRowClick(item._id);
                }}
              >
                <td>
                  <div className="content">
                    <div className="img-container">
                      <img
                        src={
                          item.doc_thumbnail !== null
                            ? `http://${item.doc_thumbnail}`
                            : process.env.PUBLIC_URL +
                              `/img/curation_default_image.png`
                        }
                      />
                    </div>
                    <div className="title-container">
                      <td className="dc_title_kr">{item.doc_kor_title}</td>
                      <td className="dc_title_or">{item.doc_origin_title}</td>
                    </div>
                  </div>
                </td>
                <td className="center">{item.doc_country_list}</td>
                <td className="center">{item.doc_category_list}</td>
                <td className="center">{item.doc_content_type_list}</td>
                <td className="center">{item.doc_host}</td>

                <td className="center">{item.doc_page}쪽</td>
                <td className="center">{item.doc_register_date}</td>
              </tr>
            );
          })}
        </tbody>
      </CurationListTable>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
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

const ViewType = styled.div`
  display: flex;
  font-size: 14px;
  input[type="radio"] {
    display: none;
    &:checked + label {
      color: white;
      font-weight: bold;
      background-color: #435269;
    }
  }
  label {
    display: flex;
    align-items: center;
    margin: 0.25rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    border-radius: 4px;
  }
`;

const CurationListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: solid 1px #d6d6d6;

  tr {
    height: 2.5rem;
    cursor: pointer;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
  th,
  td {
    padding: 0.5rem;
    word-break: break-all;
  }
  thead {
    background-color: #d8dee6;
    color: #323d4d;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .center {
    text-align: center;
  }
  .content {
    display: flex;
    .img-container {
      max-width: 5rem;
      max-height: 5rem;
      overflow: hidden;
      border-radius: 4px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .title-container {
      display: flex;
      flex-direction: column;
      .dc_title_kr {
        color: #009999;

        font-weight: bold;
        font-size: 16px;
      }
      .dc_title_or {
        color: rgb(59, 59, 59);
      }
    }
  }
`;
const CurationListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 100%;
`;
const CurationCard1Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
`;
const CurationCard2Wrapper = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
`;


const CustomLink = styled(Link)`
  text-decoration:none;
  color:black;
`
export default CurationDataList;
