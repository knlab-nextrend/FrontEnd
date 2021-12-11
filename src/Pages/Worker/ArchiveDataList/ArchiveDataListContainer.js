import React, { useState, useEffect } from "react";
import ArchiveDataList from "./ArchiveDataList";
import { CrawlDataListFetchApi, RefreshTokenApi } from "../../../Utils/api";
import { useDispatch } from "react-redux";
import { setUser, setLogout } from "../../../Modules/login";

function ArchiveDataListContainer() {
  const dispatch = useDispatch();
  /* 현재 보여질 데이터 */
  const [archiveDataList, setArchiveDataList] = useState([]);

  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(0); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(10); // 한 페이지에 나타낼 document 개수

  const statusCode = 6;
  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    let _archiveDataList = [];
    let _rawArchiveDataList = rawData.docs;
    let _dcCount = rawData.dcCount;
    _rawArchiveDataList.forEach((item) => {
      const obj = {
        item_id: item.item_id,
        dc_title_or: item.dc_title_or,
        dc_title_kr: item.dc_title_kr,
        dc_smry_kr: item.dc_smry_kr,
        dc_page: item.dc_page,
        dc_hit: item.dc_hit || 0,
        dc_country_list: item.dc_country.map((x) => x.CTY_NAME),
        dc_code_list: item.dc_code.map((x) => x.CT_NM),
        dc_url_loc: item.dc_url_loc.replace("%3A", ":"),
        is_crawled: item.is_crawled,
      };
      _archiveDataList.push(obj);
    });

    setDcCount(_dcCount);
    setArchiveDataList(_archiveDataList);
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataListFetchApi(statusCode, listSize, pageNo).then((res) => {
      dataCleansing(res.data);
    });
  };

  useEffect(() => {
    dataFetch();
  }, [pageNo]);

  return (
    <>
      <ArchiveDataList
        archiveDataList={archiveDataList}
        statusCode={statusCode}
        dcCount={dcCount}
        listSize={listSize}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
    </>
  );
}
export default ArchiveDataListContainer;
