import React, { useState } from "react";
import styled from "styled-components";
function CrawlDataForm() {

  const [content, setContent] = useState(""); // dc_content 크롤 데이터 내용
  const [collectDate, setCollectDate] = useState(""); // dc_dt_collect 크롤 데이터 수집 일자
  const [writeDate,setWriteDate] = useState(new Date().toISOString().replace("T",' ').substring(0,19)) // dc_dt_write 데이터 등록 일자. 한국 기준 현재시간
  const [keyword, setKeyword] = useState([]); // dc_keyword 키워드 검색 단어
  const [page, setPage] = useState(0); // dc_page 원문의 페이지 수
  const [originTitle, setOriginTitle] = useState(""); // dc_title_or 원문 제목
  const [koreaTitle, setKoreaTitle] = useState("");
  const [itemId, setItemId] = useState(0); // item_id 해당 크롤 데이터의 id 


  return (
    <>
      <Wrapper>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">원제목</p>
            <input className="form" type="text" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">한글제목</p>
            <input className="form" type="text" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">한글요약</p>
            <input className="form" type="text" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">국가 설정</p>
            <div className="form notInput" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">주제 분류 설정</p>
            <div className="form notInput" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">문서 위치 URL</p>
            <input className="form" type="text" />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">원문 작성일</p>
            <input className="form" type="text" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">문서 안내 URL</p>
            <input className="form" type="text" />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">데이터 수집일</p>
            <input className="form" type="text" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">유형 구분</p>
            <input
              className="form"
              type="text"
              placeholder="보고서, 지침, 뉴스, 논문 ....."
            />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">데이터 등록일</p>
            <input className="form" type="text" disabled/>
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">기관명</p>
            <input className="form" type="text" />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">페이지 수</p>
            <input className="form" type="number" min="0" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">검색 키워드</p>
            <input
              className="form"
              type="text"
              placeholder="검색에 사용할 키워드를 입력하세요. 검색 키워드는 쉼표(,)로 구분합니다."
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">내용</p>
            <textarea className="form textarea" rows="30" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">표지 파일</p>
            <div className="form notInput" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">첨부 문서</p>
            <div className="form notInput" />
          </CustomFormItem>
        </CustomFormRow>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CustomFormItem = styled.div`
  display: flex;
  align-items: center;
  min-height: 3rem;
  overflow: hidden;
  width: 100%;
  font-size: 12px;
  border-bottom: dotted 1px #ccc;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.02);
    height: 100%;
    min-width: 10rem;
    border-right: solid 2px #d6d6d6;
  }
  .form {
    background-color: #eeffdb;
    width: 100%;
    padding-left: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
  .textarea{
    padding-top:2rem;
  }
  .notInput {
    background-color: white;
    height: 5rem;
  }
`;
const CustomFormRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export default CrawlDataForm;
