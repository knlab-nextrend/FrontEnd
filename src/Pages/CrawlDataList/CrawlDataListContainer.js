import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { CrawlDataListFetchApi} from "../../Utils/api";
import CrawlDataList from "./CrawlDataList";


function CrawlDataListContainer() {

  /* 현재 보여질 데이터 */
  const [crawlDataList, setCrawlDataList] = useState([]);

  /* [1차 스크리닝, 1차스크리닝 보류, 2차정제, 2차정제 보류] 진행상황을 나타내기 위한 상태코드 */
  const { statusCode } = useParams();

  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(0); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(10); // 한 페이지에 나타낼 document 개수

  
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


  const dataCleansing = (rawData) => {
    let _crawlDataList = [];
    let _rawCrawlDataList = rawData.docs;
    let _dcCount = rawData.dcCount;

    _rawCrawlDataList.forEach((item, index) => {
      const obj = {
        dc_title_or: item.dc_title_or,
        dc_title_kr: item.dc_title_kr,
        dc_keyword: item.dc_keyword,
        dc_dt_collect: item.dc_dt_collect,
        subscribed: false,
        item_id: Number(item.item_id),
        stat: item.stat,
      };

      _crawlDataList.push(obj);
    });
    setDcCount(_dcCount);
    setCrawlDataList(_crawlDataList);
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataListFetchApi(statusCode, listSize, pageNo)
      .then((res) => {
        dataCleansing(res.data);
      })
  };

  /* pageNo, statusCode 가 변경되었을 때 데이터를 다시 불러옴 */
  useEffect(() => {
    dataFetch();
  }, [pageNo,statusCode]);

  return (
    <>
      <CrawlDataList
        statusCode={statusCode}
        crawlDataList={crawlDataList}
        dcCount={dcCount}
        listSize={listSize}
        pageNo={pageNo}
        setPageNo={setPageNo}
        statusCode={statusCode}
        process={STATUS_CODE_SET[statusCode].type}
      />
    </>
  );
}
export default CrawlDataListContainer;
