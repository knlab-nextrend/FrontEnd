import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled from "styled-components";
import Button from "../../../Components/Button";
import Pagenation from "../../../Components/Pagenation";
import NoData from "../../../Components/NoData";
import { AiOutlineCheck } from "react-icons/ai";
function CrawlDataScreening({
  screeningData,
  onChangeEach,
  stageScreeningData,
  onChangeAll,
  stageDataList,
  dcCount,
  listSize,
  setListSize,
  pageNo,
  setPageNo,
}) {
  const _listSizeHandler = (e) => {
    setListSize(e.target.value);
  };
  return (
    <>
      <FormHeader type="view" title={"크롤데이터 스크리닝 진행"} />
      <Wrapper>
        <SearchResultTitle>
          <p>검색결과 ({dcCount}건)</p>
        </SearchResultTitle>
        <ButtonWrapper>
          <Button color="#435269" onClick={onChangeAll}>
            <AiOutlineCheck color="white" />
            <p>전체선택</p>
          </Button>
          <Button color="#435269" onClick={stageScreeningData}>
            <AiOutlineCheck color="white" />
            <p>스크리닝 완료</p>
          </Button>
          <select value={listSize} onChange={_listSizeHandler}>
            <option disabled hidden>
              리스트 사이즈
            </option>
            <option value={2}>2건</option>
            <option value={10}>10건</option>
            <option value={30}>30건</option>
            <option value={50}>50건</option>
            <option value={75}>75건</option>
            <option value={100}>100건</option>
          </select>
        </ButtonWrapper>
        <div>검색결과 {dcCount} 건</div>
        {screeningData.length !== 0 ? (
          <>
            <TableWrapper>
              <CustomTable>
                <colgroup>
                  <col style={{ width: "45%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "5%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>요약</th>
                    <th>발행자/발행기관</th>
                    <th>언어</th>
                    <th>수집일</th>
                    <th>페이지수</th>
                    <th>완료</th>
                    <th>보류</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {screeningData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.dc_smry_kr}</td>
                        <td>{item.dc_publisher}</td>
                        <td>{item.dc_lang}</td>
                        <td>{item.dc_dt_collect}</td>
                        <td>{item.dc_page}</td>
                        <td>
                          <CustomRadio
                            type="radio"
                            name={item.item_id}
                            value={item.item_id}
                            onChange={onChangeEach}
                            checked={stageDataList.includes(item.item_id)}
                          />
                        </td>
                        <td>
                          <CustomRadio type="radio" name={item.item_id} />
                        </td>
                        <td>
                          <CustomRadio type="radio" name={item.item_id} />
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
          <NoData />
        )}
      </Wrapper>
    </>
  );
}
const SearchResultTitle = styled.div`
  width: 100%;
  
`;
const GuideComment = styled.div`
  margin: 1rem 0 1rem 0;
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
  font-size: 14px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
  border-radius: 4px;
  border: solid 1px #eee;
`;
const CustomTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  thead {
    position: sticky;
    top: 0px;
    background-color: #d8dee6;
    color: #323d4d;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
  tbody tr:nth-child(odd) {
    background-color: #f4f5f8;
  }
  tr {
    height: 2.5rem;
    border-bottom: solid 1px #eee;
  }
  th,
  td {
    padding-left: 1rem;
  }
  input[type="checkbox"] {
    width: 20px; /*Desired width*/
    height: 20px; /*Desired height*/
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0 1rem 0;

  Button {
    margin-right: 1rem;
  }
  select {
    padding: 0 0.5rem 0 0.5rem;
  }
`;

const CustomRadio = styled.input`
  font-size: 1em;
  width: 1.25em; /* 너비 설정 */
  height: 1.25em; /* 높이 설정 */
  vertical-align: middle;
`;

export default CrawlDataScreening;
