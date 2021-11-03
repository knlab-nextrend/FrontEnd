import React, { useEffect, useState } from "react";
import { CrawlDataDetailFetchApi } from "../../Utils/api";
import { useParams } from "react-router-dom";
import Screening from "./CrawlDataRegister";
function CrawlDataRegisterContainer() {
  /* 현재 보여질 데이터 정보들 */
  const { itemId, statusCode } = useParams(); // 라우터에서 받아옴. // itemId 해당 크롤 데이터의 id , statusCode 단계 상태 코드
  const [content, setContent] = useState(""); // dc_content 크롤 데이터 내용
  const [collectDate, setCollectDate] = useState(""); // dc_dt_collect 크롤 데이터 수집 일자
  const [writeDate, setWriteDate] = useState(""); // dc_dt_write 데이터 등록 일자. 한국 기준 현재시간
  const [keyword, setKeyword] = useState([]); // dc_keyword 키워드 검색 단어. 받아올 땐 배열이나, 관리는 문자열로 할 예정
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
  const _keywordHandler = (e) => {
    setKeyword(e.target.value);
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

  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    const _rawStatusDetailData = rawData.docs;
    /* 
      state에 값 세팅. 세팅된 값을 form에다가 defaultValue로 지정해줄거임.
      defaultValue를 지정할 때, defaultValue 키워드로 하지 말고,
      value에 할당해서 관리하는게 리액트에서는 바람직한 방법임.... 이라네요 ㅎ
    */


    setContent(_rawStatusDetailData.dc_content);
    setCollectDate(_rawStatusDetailData.dc_dt_collect);
    setWriteDate(new Date().toISOString().replace("T", " ").substring(0, 19));
    setKeyword(_rawStatusDetailData.dc_keyword.join(", "));
    setPage(_rawStatusDetailData.dc_page);
    setOriginTitle(_rawStatusDetailData.dc_title_or);
    setDocsUrlLocation(_rawStatusDetailData.dc_url_loc);
  };

  useEffect(() => {
    dataFetch();
  }, [itemId]);

  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataDetailFetchApi(statusCode, itemId).then((res) => {
      dataCleansing(res.data);
    });
  };

  return (
    <>
      <Screening
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
    </>
  );
}

export default CrawlDataRegisterContainer;
