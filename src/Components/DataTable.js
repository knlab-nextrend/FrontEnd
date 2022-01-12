import React from "react";
import styled from "styled-components";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
function DataTable({
  tableData,
  type,
  statusCode = null,
  stageDataList = null,
  keepDataList = null,
  deleteDataList = null,
  onChangeCheckedAll = null,
  checkedAll = null,
  onChangeEach = null,
}) {
  return (
    <>
      <TableWrapper>
        <CustomTable>
          <thead>
            <tr>
              {type === "register" && <th>한글제목</th>}
              {type !== "screening" && <th>원제목</th>}
              <th>요약</th>
              <th>HOST 명</th>
              <th className="lang">언어</th>
              <th className="dc_dt_collect">수집일</th>
              <th className="dc_page">페이지 수</th>

              {type === "screening" && (
                <>
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
                </>
              )}
              <th className="dc_url_loc">원문링크</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => {
              return (
                <tr key={index}>
                  {type === "register" && <td>{item.dc_title_kr}</td>}
                  {type !== "screening" && (
                    <td>
                      <Link to={`/crawl/${statusCode}/${item.item_id}`}>
                        {item.dc_title_or}
                      </Link>
                    </td>
                  )}
                  <td>{item.dc_smry_kr}</td>
                  <td>{item.dc_publisher}</td>
                  <td>{item.dc_lang}</td>
                  <td>{item.dc_dt_collect}</td>
                  <td>{item.dc_page}</td>
                  {type === "screening" && (
                    <>
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
                    </>
                  )}

                  <td>
                    <a href={item.dc_url_loc} target="_blank">
                      <HiOutlineExternalLink size="24" color="#435269" />
                    </a>
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
  font-size: 14px;
`;

const CustomTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  .lang {
    width: 2rem;
  }
  .dc_dt_collect {
    width: 6rem;
  }
  .dc_page,
  .dc_url_loc {
    width: 4rem;
  }

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
