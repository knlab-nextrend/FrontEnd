import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CrawlDataListFetchApi, sessionHandler } from "../../../Utils/api";
import CrawlDataList from "./CrawlDataList";
import { useDispatch } from "react-redux";
import { trackPromise } from "react-promise-tracker";

function CrawlDataListContainer() {
  const dispatch = useDispatch();
  /* 현재 보여질 데이터 */
  const [crawlDataList, setCrawlDataList] = useState([]);
  const [searchObj, setSearchObj] = useState(null); // 검색 옵션

  /* refine, register 를 router로 부터 받아와서 구분하도록 함.... */
  const { statusCode } = useParams();
  const [currentCode, setCurrentCode] = useState(statusCode);

  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(0); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(10); // 한 페이지에 나타낼 document 개수

  const [isKeep, setIsKeep] = useState(false);
  const onChangeKeepToggle = () => {
    setIsKeep(!isKeep);
  };

  useEffect(() => {
    const code = isKeep ? Number(statusCode) + 1 : Number(statusCode);
    setCurrentCode(code);
  }, [isKeep]);

  const STATUS_CODE_SET = {
    2: {
      type: "refine",
      mainTitle: "크롤데이터 정제 작업 데이터 목록",
      title: "크롤데이터 정제 진행",
    },
    3: {
      type: "refine",
      mainTitle: "크롤데이터 정제 작업 데이터 목록",
      title: "크롤데이터 정제 진행",
    },
    4: {
      type: "register",
      mainTitle: "크롤데이터 등록(아카이빙) 작업 데이터 목록",
      title: "크롤데이터 등록(아카이빙) 진행",
    },
    5: {
      type: "register",
      mainTitle: "크롤데이터 등록(아카이빙) 작업 데이터 목록",
      title: "크롤데이터 등록(아카이빙) 진행",
    },
  };

  const dataCleansing = (rawData) => {
    let _crawlDataList = [];
    let _rawCrawlDataList = rawData.docs;
    let _dcCount = rawData.dcCount;

    _rawCrawlDataList.forEach((item, index) => {
      const obj = {
        dc_title_or: item.dc_title_or,
        dc_title_kr: item.dc_title_kr,
        dc_keyword: item.dc_keyword,
        dc_dt_collect: item.dc_dt_collect.substring(0, 10),
        _id: item._id,
        dc_publisher: item.dc_publisher,
        stat: item.stat,
        dc_lang: item.dc_lang,
        dc_page: item.dc_page,
        dc_url_loc: item.dc_url_loc,
        dc_smry_kr: item.dc_smry_kr,
      };
      _crawlDataList.push(obj);
    });
    setDcCount(_dcCount);
    setCrawlDataList(_crawlDataList);
  };

  /* 데이터 불러오기 */
  const dataFetch = (searchObj = null) => {
    trackPromise(
      CrawlDataListFetchApi(currentCode, listSize, pageNo, searchObj)
        .then((res) => {
          dataCleansing(res.data);
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            CrawlDataListFetchApi(
              currentCode,
              listSize,
              pageNo,
              searchObj
            ).then((res) => {
              dataCleansing(res.data);
            });
          });
        })
    );
  };

  const dataFilterFetch = (
    lang = null,
    code = null,
    keyword = null,
    country = null,
    dateGte = null,
    dateLte = null,
    pageGte = null,
    pageLte = null,
    isCrawled = null,
    sort = null,
    sortType = null,
    host = null
  ) => {
    const searchObj = {
      lang: lang,
      code: code,
      keyword: keyword,
      country: country,
      is_crawled: isCrawled,
      dateLte,
      dateGte,
      pageGte,
      pageLte,
      sort,
      sortType,
      host,
    };
    setSearchObj(searchObj);
  };

  /* pageNo, statusCode 가 변경되었을 때 데이터를 다시 불러옴 */
  useEffect(() => {
    dataFetch(searchObj);
  }, [pageNo, currentCode, listSize, searchObj]);
  return (
    <>
      <CrawlDataList
        statusCode={statusCode}
        crawlDataList={crawlDataList}
        dcCount={dcCount}
        listSize={listSize}
        setListSize={setListSize}
        pageNo={pageNo}
        setPageNo={setPageNo}
        STATUS_CODE_SET={STATUS_CODE_SET}
        onChangeKeepToggle={onChangeKeepToggle}
        isKeep={isKeep}
        dataFilterFetch={dataFilterFetch}
      />
    </>
  );
}
export default CrawlDataListContainer;
