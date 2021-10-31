import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../Data/data.json";
import CrawlDataList from "./CrawlDataList";

function CrawlDataListContainer() {
  /* dummy 데이터 */
  const [dummyData, setDummyData] = useState(data.data);

  /* 현재 보여질 데이터 */
  const [statusCrawlData, setStatusCrawlData] = useState([]);
  /* 검색 결과 건수 */
  const [resultCount, setResultCount] = useState(0);

  /* [스크리닝, 1차, 2차, 등록] 진행상황을 나타내기 위한 상태코드 */
  const { statusCode } = useParams();

  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(77);
  const [pageNo, setPageNo] = useState(1);
  const [listSize, setListSize] = useState(10);

  /* 데이터 불러오기 */
  const dataFetch = () => {
    const statusData = dummyData.filter((item) => {
      return item.status === Number(statusCode);
    });
    setStatusCrawlData(statusData);
  };

  useEffect(() => {
    dataFetch();
    setResultCount(statusCrawlData.length);
  }, [statusCode]);

  useEffect(() => {
    setResultCount(statusCrawlData.length);
    setDcCount(statusCrawlData.length);
  }, [statusCrawlData]);


  const Search = (
    keyword = "",
    startDate,
    endDate,
    itemID = 0,
    language = "전체",
    subscribed = 0
  ) => {
    console.log(keyword, startDate, endDate, itemID, language, subscribed);
  };

  return (
    <>
      <CrawlDataList
        statusCode={statusCode}
        Search={Search}
        statusCrawlData={statusCrawlData}
        resultCount={resultCount}
        dcCount={dcCount}
        listSize={listSize}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
    </>
  );
}
export default CrawlDataListContainer;
