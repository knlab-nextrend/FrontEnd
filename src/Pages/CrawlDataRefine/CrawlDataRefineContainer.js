import React, { useState, useEffect } from "react";
import { CrawlDataDetailFetchApi } from "../../Utils/api";
import CrawlDataRefine from "./CrawlDataRefine";
import { useParams } from "react-router-dom";

function CrawlDataRefineContainer() {
  /* 
    라우터에서 받아온 정보. 
    itemId - 해당 크롤 데이터의 id
    screeningStatus - 단계 상태 코드
  */
  const { itemId, statusCode } = useParams();
  /* 
    CrawlDataRefine > CrawlDataForm 에 있는 정보를 가져오기 위해서.
    부모 컴포넌트에서 자식 컴포넌트의 함수를 호출하는 상황임.
    CrawlDataForm 에 ref를.. 걸고자 함. 
  */
  const [docs, setDocs] = useState({}); // 폼에 default 값으로 출력할 데이터를 객체로 전달. 관리 편하게

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
  const dataFetch = () => {
    CrawlDataDetailFetchApi(statusCode, itemId).then((res) => {
      console.log(res.data)
      dataCleansing(res.data);
    });
  };

  useEffect(() => {
    dataFetch();
  }, [itemId]);

  return (
    <>
      <CrawlDataRefine docs={docs} />
    </>
  );
}

export default CrawlDataRefineContainer;
