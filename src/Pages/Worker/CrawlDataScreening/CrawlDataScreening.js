import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled from "styled-components";
import Button from "../../../Components/Button";
import Pagenation from "../../../Components/Pagenation";
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
  setPageNo
}) {
  const _listSizeHandler = (e)=>{
    setListSize(e.target.value)
  }
  return (
    
    <>
      <FormHeader type="view" title={"크롤데이터 스크리닝 진행"} />
      <Wrapper>
        <GuideComment>
          현재 보여지는 리스트에서 스크리닝 완료 버튼을 누르면 체크한 데이터는
          정제 단계로 넘어가며 , 체크 하지 않은 데이터는 버려집니다.
        </GuideComment>
        <ButtonWrapper>
          <Button color="#435269" onClick={onChangeAll}>
            <AiOutlineCheck color="white" />
            <p>전체선택</p>
          </Button>
          <Button color="#435269" onClick={stageScreeningData}>
            <AiOutlineCheck color="white" />
            <p>스크리닝 완료</p>
          </Button>
          <select value={listSize} onChange={_listSizeHandler} >
            <option disabled hidden>리스트 사이즈</option>
            <option value={10}>10건</option>
            <option value={30}>30건</option>
            <option value={50}>50건</option>
            <option value={75}>75건</option>
            <option value={100}>100건</option>
          </select>
        </ButtonWrapper>
        <TableWrapper>
          <CustomTable>
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>

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
                      <input
                        type="checkbox"
                        value={item.item_id}
                        onChange={onChangeEach}
                        checked={stageDataList.includes(item.item_id)}
                      />
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
        </TableWrapper>
        <Pagenation
          dcCount={dcCount}
          listSize={listSize}
          pageNo={pageNo}
          setPageNo={setPageNo}
        />
      </Wrapper>
    </>
  );
}

const GuideComment = styled.div`
  margin: 1rem 0 1rem 0;
`;
const Wrapper = styled.div`
  margin: 0 5rem 5rem 5rem;
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: 65rem;
  overflow: auto;
  box-shadow : rgb(9 30 66 / 25%) 0px 1px 1px;
`;
const CustomTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  thead {
    border-bottom: solid 1px #d6d6d6;
    position: sticky;
    top: 0px;
    background-color: white;
  }
  tr {
    height: 2.5rem;
  }
  tr:nth-child(2n) {
    background-color: #eee;
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
  select{
    padding: 0 0.5rem 0 0.5rem;
  }
  
`;

export default CrawlDataScreening;
