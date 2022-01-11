import React from "react";
import styled from "styled-components";
function DataTable({
  tableData,
  stageDataList,
  keepDataList,
  deleteDataList,
  onChangeCheckedAll,
  checkedAll,
  onChangeEach,
}) {
  return (
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
                <input
                  type="checkbox"
                  value="stage"
                  onChange={onChangeCheckedAll}
                  checked={checkedAll === "stage"}
                />
              </th>
              <th>
                보류
                <input
                  type="checkbox"
                  value="keep"
                  onChange={onChangeCheckedAll}
                  checked={checkedAll === "keep"}
                />
              </th>
              <th>
                삭제
                <input
                  type="checkbox"
                  value="delete"
                  onChange={onChangeCheckedAll}
                  checked={checkedAll === "delete"}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <a href={item.dc_url_loc} target="_blank">
                      {item.dc_smry_kr}
                    </a>
                  </td>
                  <td>{item.dc_publisher}</td>
                  <td>{item.dc_lang}</td>
                  <td>{item.dc_dt_collect}</td>
                  <td>{item.dc_page}</td>
                  <td>
                    <CustomRadio
                      type="radio"
                      name={item.item_id}
                      value={item.item_id}
                      checked={stageDataList.includes(item.item_id)}
                      onChange={(e) => {
                        onChangeEach(e, "stage");
                      }}
                    />
                  </td>
                  <td>
                    <CustomRadio
                      type="radio"
                      name={item.item_id}
                      value={item.item_id}
                      checked={keepDataList.includes(item.item_id)}
                      onChange={(e) => {
                        onChangeEach(e, "keep");
                      }}
                    />
                  </td>
                  <td>
                    <CustomRadio
                      type="radio"
                      name={item.item_id}
                      value={item.item_id}
                      checked={deleteDataList.includes(item.item_id)}
                      onChange={(e) => {
                        onChangeEach(e, "delete");
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </CustomTable>
      </TableWrapper>
    </>
  );
}

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
    a {
      color: black;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        color: #435269;
      }
    }
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
export default DataTable;
