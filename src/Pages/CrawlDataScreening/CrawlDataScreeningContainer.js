import React, { useEffect, useState } from "react";
import {
  CrawlDataDetailFetchApi,
  CrawlDataScreeningKeepApi,
  CrawlDataScreeningRejectApi,
} from "../../Utils/api";
import { useParams } from "react-router-dom";
import CrawlDataScreening from "./CrawlDataScreening";
function CrawlDataScreeningContainer() {
  /* 
      라우터에서 받아온 정보. 
      itemId - 해당 크롤 데이터의 id
      screeningStatus - 단계 상태 코드
    */
  const { itemId, statusCode } = useParams();
  const [formData, setFormData] = useState({}); // 폼에 default 값으로 출력할 데이터를 객체로 전달. 관리 편하게
  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    const _rawStatusDetailData = rawData.docs;

    /* 
      state에 값 세팅. 세팅된 값을 form에다가 defaultValue로 지정해줄거임.
      defaultValue를 지정할 때, defaultValue 키워드로 하지 말고,
      value에 할당해서 관리하는게 리액트에서는 바람직한 방법임.... 이라네요 ㅎ
    */
    let _formData = {};

    _formData["content"] = _rawStatusDetailData.dc_content;
    _formData["collectDate"] = _rawStatusDetailData.dc_dt_collect;
    _formData["writeDate"] = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);
    _formData["keyword"] = _rawStatusDetailData.dc_keyword.join(", ");
    _formData["page"] = _rawStatusDetailData.dc_page;
    _formData["originTitle"] = _rawStatusDetailData.dc_title_or;
    _formData["docsUrlLocation"] = _rawStatusDetailData.dc_url_loc;
    setFormData(_formData);
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataDetailFetchApi(statusCode, itemId).then((res) => {
      dataCleansing(res.data);
    });
  };

  /* 1차 스크리닝 보류 */
  const dataKeep = () => {
    CrawlDataScreeningKeepApi(itemId, statusCode).then((res) => {
      alert("해당 데이터에 대한 1차 스크리닝이 보류되었습니다.");
    });
  };

  /* 1차 스크리닝 버리기 */
  const dataReject = () => {
    if (confirm("해당 데이터를 1차 스크리닝 단계에서 버리시겠습니까?\n버려진 데이터는 다시 복구할 수 없습니다.")) {
      CrawlDataScreeningRejectApi(itemId, statusCode).then((res) => {
        alert("해당 데이터가 성공적으로 삭제되었습니다.");
      });
    }
  };

  useEffect(() => {
    dataFetch();
  }, [itemId]);

  return (
    <>
      <CrawlDataScreening
        formData={formData}
        dataKeep={dataKeep}
        dataReject={dataReject}
      />
    </>
  );
}

export default CrawlDataScreeningContainer;
