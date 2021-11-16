import React from "react";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { FaRegHandPaper } from "react-icons/fa";
import CrawlDataForm from "../../Components/CrawlDataForm";
import FormHeader from "../../Components/FormHeader";
import Button from "../../Components/Button";
import styled from "styled-components";

function CrawlDataDetail({
  crawlDataFormRef,
  docs,
  refineKeep,
  refineReject,
  refineStage,
  cancel,
}) {
  return (
    <>
      <FormHeader type="plus" title={"데이터 정제 진행"} />
      <CrawlDataForm docs={docs} type="refine" ref={crawlDataFormRef} />
      <ButtonWrapper>
        <Button color="#dc3545" onClick={refineReject}>
          <AiOutlineDelete color="white" />
          <p>데이터 버리기</p>
        </Button>
        <Button color="#6DAF44" onClick={refineKeep}>
          <FaRegHandPaper color="white" />
          <p>정제 보류</p>
        </Button>
        <Button color="#435269" onClick={refineStage}>
          <AiOutlineArrowRight color="white" />
          <p>등록 단계로 넘기기</p>
        </Button>
        <Button onClick={cancel}>
          <AiOutlineDelete color="white" />
          <p>작업 취소</p>
        </Button>
      </ButtonWrapper>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem;
  justify-content: center;
  Button {
    margin: 1rem;
  }
`;

export default CrawlDataDetail;
