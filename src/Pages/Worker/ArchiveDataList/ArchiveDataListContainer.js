import React, { useState, useEffect } from "react";
import ArchiveDataList from "./ArchiveDataList";
import { CrawlDataListFetchApi, sessionHandler } from "../../../Utils/api";
import { useDispatch } from "react-redux";
import { trackPromise } from "react-promise-tracker";

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
        dc_dt_collect: item.dc_dt_collect,
        dc_lang:item.dc_lang,
        dc_publisher:item.dc_publisher,
      };
      _archiveDataList.push(obj);
    });

    setDcCount(_dcCount);
    setArchiveDataList(_archiveDataList);
  };

  /* 필터 적용 데이터 받아오기 */
  const dataFilterFetch = (
    lang = null,
    code = null,
    keyword = null,
    country = null,
    publisher = null,
    dateType = null,
    gte = null,
    lte = null,
    isCrawled = null,
    dateSort,
    sortDateType
  ) => {
    const searchObj = {
      dc_lang: lang,
      dc_code: code,
      dc_keyword: keyword,
      dc_country: country,
      dc_publisher: publisher,
      dateType: dateType,
      gte: gte,
      lte: lte,
      is_crawled: isCrawled,
      sortType: sortDateType,
      sort: dateSort,
    };
    CrawlDataListFetchApi(statusCode, listSize, pageNo, searchObj).then(
      (res) => {
        dataCleansing(res.data);
      }
    );
  };
  /* 데이터 불러오기 */
  const dataFetch = () => {
    trackPromise(CrawlDataListFetchApi(statusCode, listSize, pageNo)
      .then((res) => {
        dataCleansing(res.data);
      })
      .catch((err) => {
        console.log(err);
        sessionHandler(err, dispatch).then((res) => {
          CrawlDataListFetchApi(statusCode, listSize, pageNo).then((res) => {
            dataCleansing(res.data);
          });
        });
      }));
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
        dataFilterFetch={dataFilterFetch}
      />
    </>
  );
}
export default ArchiveDataListContainer;
