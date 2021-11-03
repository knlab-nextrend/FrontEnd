import React from "react";
import styled from "styled-components";
function CrawlDataForm() {
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
            <input className="form" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">주제 분류 설정</p>
            <div className="form" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">수집일</p>
            <input className="form" type="text" />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">작성일</p>
            <input className="form" type="text" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">문서 위치 URL</p>
            <input className="form" type="text" />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">문서 안내 URL</p>
            <input className="form" type="text" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">구분 .. 무슨 구분?</p>
            <input className="form" type="text" />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">페이지 수</p>
            <input className="form" type="text" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">기관명</p>
            <input className="form" type="text" />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">검색 키워드</p>
            <input
              className="form"
              type="text"
              placeholder="검색에 사용할 키워드를 입력하세요. 검색 키워드는 ,로 구분합니다."
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">문서 위치 URL</p>
            <input className="form" type="text" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">표지 파일</p>
            <div className="form" />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">첨부 문서</p>
            <div className="form" />
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
  border: solid 1px black;
  display: flex;
  align-items: center;
  height: 3rem;
  overflow: hidden;
  width: 100%;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    background-color: red;
    height: 100%;
    min-width: 10rem;
  }
  .form {
    background-color: #eeffdb;
    width: 100%;
    padding-left: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: none;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
`;
const CustomFormRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export default CrawlDataForm;
