import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Pagination from "../../../Components/Pagination";
import { HiOutlineDocumentSearch, HiPhotograph } from "react-icons/hi";
import { MdCalendarViewDay } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";
import DataFilter from "../../../Components/DataFilter";
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
}) {
  return (
    <>
      <FormHeader type="view" title={"큐레이션 데이터 조회"} />
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
                    value="card"
                    id="card"
                    name="view-type"
                    checked={viewType === "card"}
                  />
                  <label htmlFor="card">
                    <MdCalendarViewDay />
                    카드형
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
          {viewType === "card" && (
            <CurationCardWrapper>
              {curationDataList.map((item, index) => {
                return (
                  <CustomLink to={`/curation/${item._id}`}>
                    <CurationCard curationDataItem={item}></CurationCard>
                  </CustomLink>
                );
              })}
            </CurationCardWrapper>
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
                          item.dc_cover.length !== 0
                            ? `http://${item.dc_cover[0]}`
                            : process.env.PUBLIC_URL +
                              `/img/curation_default_image.png`
                        }
                      />
                    </div>
                    <div className="title-container">
                      <td className="dc_title_kr">{item.dc_title_kr}</td>
                      <td className="dc_title_or">{item.dc_title_or}</td>
                    </div>
                  </div>
                </td>
                <td className="center">{item.dc_country_list.join(",")}</td>
                <td className="center">{item.dc_code_list.join(", ")}</td>
                <td className="center">{item.dc_type}</td>
                <td className="center">{item.dc_publisher}</td>

                <td className="center">{item.dc_page}쪽</td>
                <td className="center">{item.dc_dt_regi}</td>
              </tr>
            );
          })}
        </tbody>
      </CurationListTable>
    </>
  );
}
function CurationCard({ curationDataItem }) {
  return (
    <>
      <CardWrapper>
        <ImageContainer>
          <Image
            src={
              curationDataItem.dc_cover.length !== 0
                ? `http://${curationDataItem.dc_cover[0]}`
                : process.env.PUBLIC_URL + `/img/curation_default_image.png`
            }
          />
        </ImageContainer>
        <ContentContainer>
          <Title>
            <div>[{curationDataItem.dc_country_list.join(",")}]</div>
            <div>{curationDataItem.dc_title_kr}</div>
          </Title>
          <SubTitle>{curationDataItem.dc_title_or}</SubTitle>
          <Info>
            <CategoryBadge color="grey">
              {curationDataItem.dc_code_list.join(", ")}
            </CategoryBadge>
            <CountryBadge color="grey">
              {curationDataItem.dc_country_list.join(", ")}
            </CountryBadge>
            <PublisherBadge color="grey">
              {curationDataItem.dc_publisher}
            </PublisherBadge>
          </Info>
          <Info>
            <PageBadge color="grey">{curationDataItem.dc_page}쪽</PageBadge>
            <RegiDateBadge color="grey">
              {curationDataItem.dc_dt_regi}
            </RegiDateBadge>
          </Info>
          <Content>{curationDataItem.dc_content}</Content>
        </ContentContainer>
      </CardWrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5rem 0 5rem;
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

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const CardWrapper = styled.div`
  display: flex;
  padding: 1rem;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
  border-radius: 4px;
  margin: 1rem;
  transition: all 0.3s ease-in-out; /* 부드러운 모션을 위해 추가*/
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  background-color: white;
`;
const ImageContainer = styled.div`
  min-width: 12rem;
  max-width: 12rem;
  height: 100%;
  overflow: hidden;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ContentContainer = styled.div`
  p {
    padding: 0;
    margin: 0;
  }
  div {
    margin-bottom: 0.5rem;
  }
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
const Title = styled.div`
  display: flex;
  div {
    margin-right: 0.5rem;
    font-weight: bold;
    font-size: 20px;
  }
  /* p태그 첫번째 요소는 말머리 */
  /* div:nth-child(1) {
    color: black;
  } */
  /* p태그 두번째 요소는 한글 제목*/
  div:nth-child(1) {
    color: #435269;
  }
`;
const SubTitle = styled.div`
  /* p태그 세번째 요소는 원문 제목*/
  font-size: 14px;
  color: grey;
`;
const Info = styled.div`
  font-size: 12px;
  display: flex;

  div {
    align-items: center;
    padding: 0.5rem;
    margin: 0;
  }
`;

const Badge = styled.div`
  &:before {
    content: "";
    color: white;
    font-weight: bold;
    font-size: 12px;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 5px;
    border-radius: 3px;
    background-color: ${(props) => props.color || "grey"};
  }
`;
const CategoryBadge = styled(Badge)`
  &:before {
    content: "주제";
  }
`;
const CountryBadge = styled(Badge)`
  &:before {
    content: "국가";
  }
`;

const PageBadge = styled(Badge)`
  &:before {
    content: "페이지수";
  }
`;
const PublisherBadge = styled(Badge)`
  &:before {
    content: "발행 HOST";
  }
`;
const RegiDateBadge = styled(Badge)`
  &:before {
    content: "데이터 등록 일자";
  }
`;

const Content = styled.div`
  overflow: hidden;

  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-line-clamp: 5; /* 라인수 */

  -webkit-box-orient: vertical;

  word-wrap: break-word;
`;

const CurationListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 100%;
`;

const CurationCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export default CurationDataList;
