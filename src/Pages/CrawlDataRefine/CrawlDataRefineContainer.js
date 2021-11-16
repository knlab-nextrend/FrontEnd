import React, { useState, useEffect, useRef } from "react";
import {
  CrawlDataDetailFetchApi,
  CrawlDataRefineStagedApi,
  CrawlDataRefineKeepApi,
  CrawlDataRefineRejectApi,
} from "../../Utils/api";
import CrawlDataRefine from "./CrawlDataRefine";
import { useParams, useHistory } from "react-router-dom";

function CrawlDataRefineContainer() {
  /* 
    라우터에서 받아온 정보. 
    itemId - 해당 크롤 데이터의 id
    screeningStatus - 단계 상태 코드
  */
  const { itemId, statusCode } = useParams();
  const history = useHistory();
  /* 
    CrawlDataRefine > CrawlDataForm 에 있는 정보를 가져오기 위해서.
    부모 컴포넌트에서 자식 컴포넌트의 함수를 호출하는 상황임.
    CrawlDataForm 에 ref를.. 걸고자 함. 
  */
  const [docs, setDocs] = useState({}); // 폼에 default 값으로 출력할 데이터를 객체로 전달. 관리 편하게

  const crawlDataFormRef = useRef();

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

  /* 데이터 불러오기 */
  // const dataFetch = () => {
  //   CrawlDataDetailFetchApi(statusCode, itemId).then((res) => {
  //     console.log(res.data);
  //     dataCleansing(res.data);
  //   });
  // };

  /* 2차 정제 보류 */
  const dataKeep = () => {
    CrawlDataRefineKeepApi(itemId, statusCode)
      .then((res) => {
        alert("해당 데이터에 대한 2차 정제가 보류되었습니다.");
        history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
      })
      .catch((err) => console.log(err.response));
  };

  /* 2차 정제 버리기 */
  const dataReject = () => {
    if (
      confirm(
        "해당 데이터를 2차 정제 단계에서 버리시겠습니까?\n버려진 데이터는 다시 복구할 수 없습니다."
      )
    ) {
      CrawlDataRefineRejectApi(itemId, statusCode).then((res) => {
        alert("해당 데이터가 성공적으로 삭제되었습니다.");
        history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
      });
    }
  };

  /* 2차 정제 > 아카이브 등록 */
  const dataStaged = () => {
    const _crawlDataFormDocs = crawlDataFormRef.current.getCrawlFormData();
    CrawlDataRefineStagedApi(statusCode, itemId, _crawlDataFormDocs).then(
      (res) => {
        alert("해당 데이터가 아카이브에 성공적으로 등록되었습니다.");
        history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
      }
    );
  };

  /* 1차 스크리닝 취소하기(돌아가기) */
  const dataCancel = () => {
    if (
      confirm("2차 정제를 중단하시겠습니까?\n변경사항은 저장되지 않습니다.")
    ) {
      history.push(`/crawl/list/${statusCode}`); // 목록으로 돌아가기
    }
  };

  useEffect(() => {
    dataFetch();
  }, [itemId]);

  return (
    <>
      <CrawlDataRefine
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

export default CrawlDataRefineContainer;
