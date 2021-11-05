import React from "react";
import { AiOutlineArrowRight, AiOutlineDelete,AiOutlineRollback } from "react-icons/ai";
import { FaRegHandPaper } from "react-icons/fa";
import CrawlDataForm from "../../Components/CrawlDataForm";
import FormHeader from "../../Components/FormHeader";
import Button from "../../Components/Button";
import styled from "styled-components";

function CrawlDataScreening({ formData,dataKeep,dataReject}) {
  return (
    <>
      <FormHeader type="plus" title={"1차 스크리닝 진행"} />
      <CrawlDataForm formData={formData} />
      <ButtonWrapper>
        <Button color="#dc3545" onClick={dataReject}>
          <p>버리기</p>
          <AiOutlineDelete color="white" />
        </Button>
        <Button color="#6DAF44" onClick={dataKeep}>
          <p>보류</p>
          <FaRegHandPaper color="white" />
        </Button>
        <Button>
          <p>작업 취소 (돌아가기)</p>
          <AiOutlineRollback color="white" />
        </Button>
        <Button color="#435269">
          <p>2차 정제로 넘기기</p>
          <AiOutlineArrowRight color="white" />
        </Button>
      </ButtonWrapper>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0 2rem 0;
  justify-content: center;
`;

export default CrawlDataScreening;
