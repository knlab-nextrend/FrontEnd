import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";

/* forwordRef는 부모 컴포넌트에서 자식 컴포넌트를 컨트롤하기 위해 */
function CrawlDataForm ({ docs }, ref){
  /* 현재 보여질 데이터 정보들 */
  const [content, setContent] = useState(""); // dc_content 크롤 데이터 내용
  const [collectDate, setCollectDate] = useState(""); // dc_dt_collect 크롤 데이터 수집 일자
  const [writeDate, setWriteDate] = useState(""); // dc_dt_write 데이터 등록 일자. 한국 기준 현재시간
  const [keyword, setKeyword] = useState([]); // dc_keyword 키워드 검색 단어. 받아올 땐 배열이나, 관리는 문자열로 할 예정
  const [stringKeyword, setStringKeyword] = useState(""); // dc_keyword 를 문자열 형태로 표시하기 위해서 .
  const [page, setPage] = useState(0); // dc_page 원문의 페이지 수
  const [originTitle, setOriginTitle] = useState(""); // dc_title_or 원문 제목
  const [koreaTitle, setKoreaTitle] = useState("");
  const [docsUrlLocation, setDocsUrlLocation] = useState(""); // dc_url_loc

  const _contentHandler = (e) => {
    setContent(e.target.value);
  };
  const _collectDateHandler = (e) => {
    setCollectDate(e.target.value);
  };
  const _stringKeywordHandler = (e) => {
    setStringKeyword(e.target.value);
  };
  const _pageHandler = (e) => {
    setPage(e.target.value);
  };
  const _originTitleHandler = (e) => {
    setOriginTitle(e.target.value);
  };
  const _koreaTitleHandler = (e) => {
    setKoreaTitle(e.target.value);
  };

  const _docsUrlLocationHandler = (e) => {
    setDocsUrlLocation(e.target.value);
  };

  const _writeDateHandler = (e) => {
    setWriteDate(e.target.value);
  };

  /* 부모 컴포넌트에서 호출할 수 있는 함수.*/
  useImperativeHandle(ref, () => ({
    /* input state 값들을 객체에 담아서 반환함.*/
    getCrawlFormData() {
      let _docs = {};
      _docs["content"] = content;
      _docs["collectDate"] = collectDate;
      _docs["writeDate"] = writeDate;
      _docs["keyword"] = keyword;
      _docs["page"] = page;
      _docs["originTitle"] = originTitle;
      _docs["docsUrlLocation"] = docsUrlLocation;
      return _docs;
    },
  }));
  useEffect(() => {
    /* 
      docs가 빈 객체가 아니라면
      빈 객체인 상황이 useEffect로 인해 만들어지면 안될텐데...
      어쩌다보니 빈 객체인 상황이 발생해서ㅠ
      에러 처리를 일단 빈 배열 검사로 했다...
    */
    if (Object.keys(docs).length !== 0) {
      setContent(docs.content);
      setCollectDate(docs.collectDate);
      setWriteDate(docs.writeDate);
      setKeyword(docs.keyword);
      setStringKeyword(docs.keyword.join(", "));
      setPage(docs.page);
      setOriginTitle(docs.originTitle);
      setDocsUrlLocation(docs.docsUrlLocation);
    }
  }, [docs]);

  /* stringKeyword 값이 변경되면 keyword 배열도 자동으로 반영되도록.*/
  useEffect(() => {
    const _stringToArrayKeywordArray = stringKeyword.split(", ");
    setKeyword(_stringToArrayKeywordArray);
  }, [stringKeyword]);

  return (
    <>
      <Wrapper>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">원제목</p>
            <input
              value={originTitle}
              onChange={_originTitleHandler}
              className="form"
              type="text"
            />
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
            <input
              value={docsUrlLocation}
              onChange={_docsUrlLocationHandler}
              className="form"
              type="text"
            />
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
            <input
              value={collectDate}
              onChange={_collectDateHandler}
              className="form"
              type="text"
            />
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
            <input
              onChange={_writeDateHandler}
              value={writeDate}
              className="form"
              type="text"
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">기관명</p>
            <input className="form" type="text" />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">페이지 수</p>
            <input
              value={page}
              onChange={_pageHandler}
              className="form"
              type="number"
              min="0"
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">검색 키워드</p>
            <input
              value={stringKeyword}
              onChange={_stringKeywordHandler}
              className="form"
              type="text"
              placeholder="검색에 사용할 키워드를 입력하세요. 검색 키워드는 쉼표(,)로 구분합니다."
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">내용</p>
            <textarea
              value={content}
              onChange={_contentHandler}
              className="form textarea"
              rows="30"
            />
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
  .textarea {
    padding-top: 2rem;
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

/* forwardRef를 사용하여 부모가 자식 컴포넌트 함수를 호출할 수 있도록 함*/
export default forwardRef(CrawlDataForm);
