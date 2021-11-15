import React, { useEffect } from "react";
import FormHeader from "../../Components/FormHeader";
import styled from "styled-components";
function CrawlDataScreening({ screeningData }) {
  useEffect(() => {
    console.log(screeningData);
  }, [screeningData]);
  return (
    <>
      <FormHeader type="view" title={"크롤데이터 스크리닝 진행"} />
      <Wrapper>
        <CustomTable>
          <thead>
            <tr>
              <th>선택</th>
              <th>itemID</th>
              <th>요약</th>
              <th>발행자/발행기관</th>
              <th>언어</th>
              <th>수집일</th>
              <th>페이지수</th>
            </tr>
          </thead>
          <tbody>
            {screeningData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" value={item.item_id} />
                  </td>
                  <td>{item.item_id}</td>
                  <td>{item.dc_smry_kr}</td>
                  <td>{item.dc_publisher}</td>
                  <td>{item.dc_lang}</td>
                  <td>{item.dc_dt_collect}</td>
                  <td>{item.dc_page}</td>
                </tr>
              );
            })}
          </tbody>
        </CustomTable>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin: 0 5rem 0 5rem;
`;
const CustomTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  th {
    border-bottom: solid 1px #d6d6d6;
  }
  tr {
    height: 3rem;
  }
  tr:nth-child(2n) {
    background-color: #eee;
  }
`;
export default CrawlDataScreening;
