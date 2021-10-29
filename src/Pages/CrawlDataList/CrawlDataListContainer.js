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
      writeDate: "2021-10-30",
    },
    {
      item_id: 2,
      title: "크롤데이터 스크리닝",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태그3"],
      subscribed: false,
      status: 1,
      writeDate: "2021-10-30",
    },
    {
      item_id: 3,
      title: "크롤데이터 큐레이션",
      subTitle: "부제목",
      tags: ["태그1", "태그2", "태태그1태그1태그1태그1태그1태그1태그1그3"],
      subscribed: true,
      status: 5,
      writeDate: "2021-10-30",
    },
    {
      item_id: 4,
      title: "크롤데이터 1차정제",
      subTitle: "부제목",
      tags: ["태태그1태그1그1", "태태그1그2", "태태그1태그1태그1태그1그3"],
      subscribed: false,
      status: 2,
      writeDate: "2021-10-30",
    },
    {
      item_id: 5,
      title: "크롤데이터 2차정제",
      subTitle: "부제목",
      tags: ["태그1", "태태그1태그1태그1태그1그2", "태그3"],
      subscribed: true,
      status: 3,
      writeDate: "2021-10-30",
    },
    {
      item_id: 6,
      title: "크롤데이터 등록",
      subTitle: "부제목",
      tags: [
        "태그1",
        "태태그1태그1태그1태그1그2",
        "태그태그1태그1태그1태그1태그13",
      ],
      subscribed: false,
      status: 4,
      writeDate: "2021-10-30",
    },
    {
      item_id: 7,
      title: "크롤데이터 1차정제",
      subTitle: "부제목",
      tags: [
        "태그1",
        "태그태그1태그12",
        "태그3",
        "태태그1태그1그1",
        "태그2",
        "태태그1태그1그3",
      ],
      subscribed: true,
      status: 2,
      writeDate: "2021-10-30",
    },
    {
      item_id: 8,
      title: "크롤데이터 2차정제",
      subTitle: "부제목",
      tags: [
        "태그1",
        "태그태그1태그1태그1태그1태그12",
        "태그3",
        "태그1태그1태그1태그1",
        "태그2",
        "태그3",
      ],
      subscribed: false,
      status: 3,
      writeDate: "2021-10-30",
    },
    {
      item_id: 9,
      title: "크롤데이터 등록",
      subTitle: "부제목",
      tags: [
        "태그1",
        "태그1",
        "태그1",
        "태그1",
        "태그1",
        "태그1",
        "태그2",
        "태그3",
        "태그1태그1태그1",
        "태그2",
        "태그3태그1",
        "태그1",
        "태그2",
        "태그3",
      ],
      subscribed: true,
      status: 4,
      writeDate: "2021-10-30",
    },
  ];

  const [statusCrawlData, setStatusCrawlData] = useState([]);
  const [resultCount, setResultCount] = useState(12);
  const { statusCode } = useParams();

  useEffect(() => {
    const statusData = crawlData.filter((item) => {
      return item.status === Number(statusCode);
    });
    setStatusCrawlData(statusData);
  }, [statusCode]);
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
        crawlData={statusCrawlData}
        resultCount={resultCount}
      />
    </>
  );
}
export default CrawlDataListContainer;
