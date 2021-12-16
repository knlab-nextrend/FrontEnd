import React from "react";
import styled from "styled-components";
import FormHeader from "../../../Components/FormHeader";
import { RiFileExcel2Line } from "react-icons/ri";
function ExcelDataRegister() {
  return (
    <>
      <FormHeader type={"view"} title={"대량 엑셀 데이터 등록"} />
      <Wrapper>
        <SubTitle>
          <img src="/img/excel_icon.png" />
          <p>DB 제출용 포맷에 맞추어진 엑셀 파일을 업로드해주세요.</p>
        </SubTitle>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const SubTitle = styled.div`
  display: flex;
  align-items: center;
  img{
      width:50px;
      height:50px;
      margin-right:20px;
  }
`;
export default ExcelDataRegister;
