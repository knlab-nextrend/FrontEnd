import React from "react";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { FaRegHandPaper } from "react-icons/fa";
import CrawlDataForm from "../../Components/CrawlDataForm";
import FormHeader from "../../Components/FormHeader";
import Button from "../../Components/Button";
import styled from "styled-components";
function CrawlDataRegister({
  content,
  collectDate,
  writeDate,
  keyword,
  page,
  originTitle,
  koreaTitle,
  docsUrlLocation,
  _contentHandler,
  _collectDateHandler,
  _keywordHandler,
  _originTitleHandler,
  _koreaTitleHandler,
  _docsUrlLocationHandler,
  _pageHandler,
}) {

  return (
    <>
      <FormHeader type="plus" title={"1차 스크리닝 진행"} />
      <CrawlDataForm
        content={content}
        collectDate={collectDate}
        writeDate={writeDate}
        keyword={keyword}
        page={page}
        originTitle={originTitle}
        koreaTitle={koreaTitle}
        docsUrlLocation={docsUrlLocation}
        _contentHandler={_contentHandler}
        _collectDateHandler={_collectDateHandler}
        _keywordHandler={_keywordHandler}
        _originTitleHandler={_originTitleHandler}
        _koreaTitleHandler={_koreaTitleHandler}
        _docsUrlLocationHandler={_docsUrlLocationHandler}
        _pageHandler={_pageHandler}
      />
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

export default CrawlDataRegister;
