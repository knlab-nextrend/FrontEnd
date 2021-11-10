import React from "react";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { FaRegHandPaper } from "react-icons/fa";
import CrawlDataForm from "../../Components/CrawlDataForm";
import FormHeader from "../../Components/FormHeader";
import Button from "../../Components/Button";
import styled from "styled-components";

function CrawlDataRefine({docs}) {
  return (
    <>
      <FormHeader type="plus" title={"2차 정제 진행"} />
      <CrawlDataForm docs={docs} type="refine"/>
      <ButtonWrapper>
        <Button color="#dc3545">
          <p>버리기</p>
          <AiOutlineDelete color="white" />
        </Button>
        <Button color="#6DAF44">
          <p>보류</p>
          <FaRegHandPaper color="white" />
        </Button>
        <Button>
          <p>작업 취소 (돌아가기)</p>
          <AiOutlineDelete color="white" />
        </Button>
        <Button color="#435269">
          <p>아카이브 자료 등록하기</p>
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

export default CrawlDataRefine;
