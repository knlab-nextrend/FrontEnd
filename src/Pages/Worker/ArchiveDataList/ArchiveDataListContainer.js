import React, { useState, useEffect } from "react";
import ArchiveDataList from "./ArchiveDataList";
import { CrawlDataListFetchApi } from "../../../Utils/api";

function ArchiveDataListContainer() {
  /* 현재 보여질 데이터 */
  const [archiveDataList, setArchiveDataList] = useState([]);

  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(0); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(10); // 한 페이지에 나타낼 document 개수

  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    let _archiveDataList = [];
    let _rawArchiveDataList = rawData.docs;
    let _dcCount = rawData.dcCount;

    _rawArchiveDataList.forEach((item, index) => {
      const obj = {
        dc_title_or: item.dc_title_or,
        dc_title_kr: item.dc_title_kr,
        dc_keyword: item.dc_keyword,
        dc_dt_collect: item.dc_dt_collect,
        item_id: Number(item.item_id),
        stat: item.stat,
      };

      _archiveDataList.push(obj);
    });
    setDcCount(_dcCount);
    setArchiveDataList(_archiveDataList);
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataListFetchApi(6, listSize, pageNo).then((res) => {
      dataCleansing(res.data);
      console.log(res.data)
    });
  };

  useEffect(() => {
    dataFetch();
  }, [pageNo]);

  return (
    <>
      <ArchiveDataList archiveDataList={archiveDataList} />
    </>
  );
}
export default ArchiveDataListContainer;
