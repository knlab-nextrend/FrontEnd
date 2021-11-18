import React, { useState, useEffect, useRef } from "react";
import {
  CrawlDataDetailFetchApi,
  CrawlDataRejectApi,
  CrawlDataStageApi,
  CrawlDataKeepApi,
} from "../../Utils/api";
import CrawlDataDetail from "./CrawlDataDetail";
import { useParams, useHistory } from "react-router-dom";

function CrawlDataDetailContainer() {
  /* 
    라우터에서 받아온 정보. 
    itemId - 해당 크롤 데이터의 id
    screeningStatus - 단계 상태 코드
  */
  const { itemId, statusCode } = useParams();
  const history = useHistory();
  const crawlDataFormRef = useRef();
  /* 
    CrawlDataRefine > CrawlDataForm 에 있는 정보를 가져오기 위해서.
    부모 컴포넌트에서 자식 컴포넌트의 함수를 호출하는 상황임.
    CrawlDataForm 에 ref를.. 걸고자 함. 
  */
  const [docs, setDocs] = useState({}); // 폼에 default 값으로 출력할 데이터를 객체로 전달. 관리 편하게

  const STATUS_CODE_SET = {
    2: {
      type: "refine",
      title: "데이터 정제 진행",
    },
    3: {
      type: "refine",
      title: "데이터 정제 진행",
    },
    4: {
      type: "register",
      title: "데이터 등록 진행",
    },
    5: {
      type: "register",
      title: "데이터 등록 진행",
    },
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataDetailFetchApi(statusCode, itemId).then((res) => {
      dataCleansing(res.data);
    });
  };

  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    const _rawStatusDetailData = rawData.docs;
    let _docs = {
      dc_content: _rawStatusDetailData.dc_content,
      dc_dt_collect: _rawStatusDetailData.dc_dt_collect,
      dc_dt_regi: new Date().toISOString().substring(0, 19) + "Z",
      dc_dt_write: _rawStatusDetailData.dc_dt_write,
      dc_keyword: _rawStatusDetailData.dc_keyword,
      dc_page: _rawStatusDetailData.dc_page,
      dc_title_or: _rawStatusDetailData.dc_title_or,
      dc_title_kr: _rawStatusDetailData.dc_title_kr || "",
      dc_smry_kr: _rawStatusDetailData.dc_smry_kr || "",
      dc_url_loc: _rawStatusDetailData.dc_url_loc,
    };
    setDocs(_docs);
  };

  const dataKeep = () => {
    CrawlDataKeepApi(itemId, statusCode).then((res) => {
      alert("해당 데이터에 대한 작업이 보류되었습니다.");
      history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
    });
  };

  const dataReject = () => {
    if (confirm("해당 데이터를 버리시겠습니까?")) {
      CrawlDataRejectApi(itemId, statusCode).then((res) => {
        alert("해당 데이터가 성공적으로 삭제되었습니다.");
        history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
      });
    }
  };

  const dataStage = () => {
    const _crawlDataFormDocs = crawlDataFormRef.current.getCrawlFormData();
    CrawlDataStageApi(statusCode, itemId, _crawlDataFormDocs).then((res) => {
      alert("해당 데이터가 성공적으로 저장되었습니다.");
      history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
    });
  };

  const cancel = () => {
    if (confirm("작업을 중단하시겠습니까?\n변경사항은 저장되지 않습니다.")) {
      history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
    }
  };

  useEffect(() => {
    dataFetch();
  }, [itemId]);

  return (
    <>
      <CrawlDataDetail
        docs={docs}
        dataKeep={dataKeep}
        dataReject={dataReject}
        dataStage={dataStage}
        cancel={cancel}
        crawlDataFormRef={crawlDataFormRef}
        STATUS_CODE_SET={STATUS_CODE_SET}
        statusCode={statusCode}
      />
    </>
  );
}

export default CrawlDataDetailContainer;