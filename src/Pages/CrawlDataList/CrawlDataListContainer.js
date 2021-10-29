import React, { useEffect, useState } from "react";
import CrawlDataList from "./CrawlDataList";
import { useParams } from "react-router-dom";
function CrawlDataListContainer() {
  // 여기서
  const crawlData = [
    {
      item_id: 1,
      title: "크롤데이터 스크리닝",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태그3"],
      subscribed: false,
      status: 1,
    },
    {
      item_id: 2,
      title: "크롤데이터 스크리닝",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태그3"],
      subscribed: false,
      status: 1,
    },
    {
      item_id: 3,
      title: "크롤데이터 큐레이션",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태그3"],
      subscribed: true,
      status: 5,
    },
    {
      item_id: 4,
      title: "크롤데이터 1차정제",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태그3"],
      subscribed: false,
      status: 2,
    },
    {
      item_id: 5,
      title: "크롤데이터 2차정제",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태그3"],
      subscribed: true,
      status: 3,
    },
    {
      item_id: 6,
      title: "크롤데이터 등록",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태그3"],
      subscribed: false,
      status: 4,
    },
    {
      item_id: 7,
      title: "크롤데이터 1차정제",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태그3"],
      subscribed: true,
      status: 2,
    },
    {
      item_id: 8,
      title: "크롤데이터 2차정제",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태그3"],
      subscribed: false,
      status: 3,
    },
    {
      item_id: 9,
      title: "크롤데이터 등록",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태그3"],
      subscribed: true,
      status: 4,
    },
  ];

  const [statusCrawlData, setStatusCrawlData] = useState([]);
  const [resultCount ,setResultCount] = useState(12);
  const { statusCode } = useParams();

  useEffect(() => {
    const statusData = crawlData.filter((item) => {
      return item.status === Number(statusCode);
    });
    setStatusCrawlData(statusData);
  }, [statusCode]);
  const Search = (
    keyword = "",
    duration = "전체",
    itemID = 0,
    language = "전체",
    subscribed = 0
  ) => {
    console.log(keyword, duration, itemID, language, subscribed);
  };

  return (
    <>
      <CrawlDataList
        statusCode={statusCode}
        Search={Search}
        crawlData={statusCrawlData}
        resultCount={resultCount}
      />
    </>
  );
}
export default CrawlDataListContainer;
