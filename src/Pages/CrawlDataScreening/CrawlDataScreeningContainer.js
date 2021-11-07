import React, { useEffect, useState, useRef } from "react";
import {
  CrawlDataDetailFetchApi,
  CrawlDataScreeningKeepApi,
  CrawlDataScreeningRejectApi,
  CrawlDataScreeningStagedApi,
} from "../../Utils/api";
import { useParams, useHistory } from "react-router-dom";
import CrawlDataScreening from "./CrawlDataScreening";
function CrawlDataScreeningContainer() {
  /* 
      라우터에서 받아온 정보. 
      itemId - 해당 크롤 데이터의 id
      screeningStatus - 단계 상태 코드
    */
  const { itemId, statusCode } = useParams();
  const history = useHistory();
  const crawlDataFormRef = useRef();
  /* 
    CrawlDataScreening > CrawlDataForm 에 있는 정보를 가져오기 위해서.
    부모 컴포넌트에서 자식 컴포넌트의 함수를 호출하는 상황임.
    CrawlDataForm 에 ref를.. 걸고자 함. 
  */

  const [docs, setDocs] = useState({}); // 폼에 default 값으로 출력할 데이터를 객체로 전달. 관리 편하게
  const [modifiedDocs, setModifiedDocs] = useState({});
  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    const _rawStatusDetailData = rawData.docs;
    /* 
      state에 값 세팅. 세팅된 값을 form에다가 defaultValue로 지정해줄거임.
      defaultValue를 지정할 때, defaultValue 키워드로 하지 말고,
      value에 할당해서 관리하는게 리액트에서는 바람직한 방법임.... 이라네요 ㅎ
    */
    let _docs = {};

    _docs["content"] = _rawStatusDetailData.dc_content;
    _docs["collectDate"] = _rawStatusDetailData.dc_dt_collect;
    // _docs["writeDate"] = new Date()
    //   .toISOString()
    //   .replace("T", " ")
    //   .substring(0, 19);
    _docs["writeDate"] = new Date().toISOString().substring(0, 19) + "Z";
    _docs["keyword"] = _rawStatusDetailData.dc_keyword;
    _docs["page"] = _rawStatusDetailData.dc_page;
    _docs["originTitle"] = _rawStatusDetailData.dc_title_or;
    _docs["docsUrlLocation"] = _rawStatusDetailData.dc_url_loc;

    setDocs(_docs);
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataDetailFetchApi(statusCode, itemId).then((res) => {
      console.log(res.data)
      dataCleansing(res.data);
    });
  };

  /* 1차 스크리닝 보류 */
  const dataKeep = () => {
    CrawlDataScreeningKeepApi(itemId, statusCode).then((res) => {
      alert("해당 데이터에 대한 1차 스크리닝이 보류되었습니다.");
      history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
    });
  };

  /* 1차 스크리닝 버리기 */
  const dataReject = () => {
    if (
      confirm(
        "해당 데이터를 1차 스크리닝 단계에서 버리시겠습니까?\n버려진 데이터는 다시 복구할 수 없습니다."
      )
    ) {
      CrawlDataScreeningRejectApi(itemId, statusCode).then((res) => {
        alert("해당 데이터가 성공적으로 삭제되었습니다.");
        history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
      });
    }
  };

  /* 1차 스크리닝 > 2차 정제 넘기기 */
  const dataStaged = () => {
    const _crawlDataFormDocs = crawlDataFormRef.current.getCrawlFormData();
    CrawlDataScreeningStagedApi(statusCode, itemId, _crawlDataFormDocs).then(
      (res) => {
        alert(
          "해당 데이터에 대한 1차 스크리닝 결과가 성공적으로 반영되었습니다."
        );
        history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
      }
    );
  };

  /* 1차 스크리닝 취소하기(돌아가기) */
  const dataCancel = () => {
    if (
      confirm("1차 스크리닝을 중단하시겠습니까?\n변경사항은 저장되지 않습니다.")
    ) {
      history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
    }
  };
  useEffect(() => {
    dataFetch();
  }, [itemId]);

  return (
    <>
      <CrawlDataScreening
        docs={docs}
        dataKeep={dataKeep}
        dataReject={dataReject}
        dataStaged={dataStaged}
        dataCancel={dataCancel}
        crawlDataFormRef={crawlDataFormRef}
      />
    </>
  );
}

export default CrawlDataScreeningContainer;
