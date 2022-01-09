import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled from "styled-components";
import Button from "../../../Components/Button";
import Pagenation from "../../../Components/Pagenation";
import NoData from "../../../Components/NoData";
import { AiOutlineCheck } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import DataFilter from "../../../Components/DataFilter";
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
        <RowContainer>
          <Row>
            <div className="result-count">
              <HiOutlineDocumentSearch />
              검색 결과 ({dcCount}건)
            </div>
            <div className="action-group">
              <button className="screening-button" onClick={stageScreeningData}>
                <AiOutlineCheck />
                스크리닝 완료
              </button>
              <select
                className="list-size"
                value={listSize}
                onChange={_listSizeHandler}
              >
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
            <DataFilter />
          </Row>
        </RowContainer>
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
                    <th>
                      완료
                      <input type="radio" name="allcheck" />
                    </th>
                    <th>
                      보류
                      <input type="radio" name="allcheck" />
                    </th>
                    <th>
                      삭제
                      <input type="radio" name="allcheck" />
                    </th>
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
const Wrapper = styled.div`
  margin: 0 5rem 5rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
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
  .screening-button {
    margin: 0 0.5rem 0 0.5rem;
    padding: 0.5rem;
    color: white;
    font-weight: bold;
    background-color: #435269;
    border: none;
    border-radius: 4px;
  }
  .list-size {
    margin: 0 0.5rem 0 0.5rem;
    padding: 0.5rem;
    border: solid 1px #d6d6d6;
  }
`;

const TableWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  max-height: 65rem;
  overflow: auto;
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

const CustomRadio = styled.input`
  font-size: 1em;
  width: 1.25em; /* 너비 설정 */
  height: 1.25em; /* 높이 설정 */
  vertical-align: middle;
`;

export default CrawlDataScreening;
