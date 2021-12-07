import React, { useState, useEffect } from "react";
import CurationDataList from "./CurationDataList";
import { CrawlDataListFetchApi } from "../../../Utils/api";

function CurationDataListContainer() {
  const [curationDataList, setCurationDataList] = useState([]);

  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(0); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(10); // 한 페이지에 나타낼 document 개수

  const statusCode = 7;

  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    let _curationDataList = [];
    let _rawCurationDataList = rawData.docs;
    let _dcCount = rawData.dcCount;
    _rawCurationDataList.forEach((item) => {
      const obj = {
        item_id: item.item_id,
        dc_title_or: item.dc_title_or,
        dc_title_kr: item.dc_title_kr,
        dc_page: item.dc_page,
        dc_cover:(item.dc_cover[0]==='') ? [] : item.dc_cover,
        dc_country_list: item.dc_country.map((x) => x.CTY_NAME),
        dc_country_pub_list:item.dc_country_pub.map((x) => x.CTY_NAME),
        dc_code_list: item.dc_code.map((x) => x.CT_NM),
        dc_dt_regi:item.dc_dt_regi.substring(0,10),
        dc_publisher:item.dc_publisher,
        dc_content:item.dc_content.replace(/(<([^>]+)>)/ig,"") // 태그 삭제 정규표현식

      };
      _curationDataList.push(obj);
    });
    setDcCount(_dcCount);
    setCurationDataList(_curationDataList);
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataListFetchApi(statusCode, listSize, pageNo).then((res) => {
      console.log(res.data)
      dataCleansing(res.data);
    });
  };

  useEffect(() => {
    dataFetch();
  }, [pageNo]);

  return (
    <>
      <CurationDataList
        curationDataList={curationDataList}
        statusCode={statusCode}
        dcCount={dcCount}
        listSize={listSize}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
    </>
  );
}
export default CurationDataListContainer;
