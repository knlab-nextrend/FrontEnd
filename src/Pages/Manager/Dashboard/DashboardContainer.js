import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useDispatch } from "react-redux";
import { trackPromise } from "react-promise-tracker";
import {
  crawlHostDataFetchApi,
  crawlSumDataFetchApi,
  sessionHandler,
} from "../../../Utils/api";

function DashboardContainer() {
  // docs 문서 통계
  // work 작업자 작업 통계
  // crawl 크롤러 현황
  const dispatch = useDispatch();
  const [menuType, setMenuType] = useState("docs_country");

  const [crawlHostList, setCrawlHostList] = useState([]); // 크롤 호스트 전체 목록
  const [currentCrawlHostLog, setCurrentCrawlHostLog] = useState([]); // 선택한 호스트의 크롤링 작업 로그 목록
  const [selectedHostId, setSelectedHostId] = useState(null); // 현태 선택한 호스트
  const [crawlSum,setCrawlSum] = useState(null); // 현재 크롤링 총 작업 현황 
  const [process, setProcess] = useState("all");
  const menuHandler = (e) => {
    setMenuType(e.target.value);
  };
  const processHandler = (select) => {
    setProcess(select);
  };
  const rowClickHandler = (host_id) => {
    // 현재 선택된 host_id 새로 보고자 하는 host_id 같을경우 이미 오픈된 목록을 닫는걸로 생각
    if (selectedHostId === host_id) {
      setSelectedHostId(null);
    } else {
      setSelectedHostId(host_id);
    }
  };
  const data = [
    {
      id: "sass",
      label: "sass",
      value: 10,
      color: "hsl(63, 70%, 50%)",
    },
    {
      id: "stylus",
      label: "stylus",
      value: 20,
      color: "hsl(25, 70%, 50%)",
    },
    {
      id: "elixir",
      label: "elixir",
      value: 30,
      color: "hsl(262, 70%, 50%)",
    },
    {
      id: "haskell",
      label: "haskell",
      value: 20,
      color: "hsl(101, 70%, 50%)",
    },
    {
      id: "javascript",
      label: "javascript",
      value: 3,
      color: "hsl(192, 70%, 50%)",
    },
  ];

  useEffect(() => {
    trackPromise(
      crawlHostDataFetchApi()
        .then((res) => {
          setCrawlHostList(res.data);
          crawlSumDataFetchApi().then((res) => {
            setCrawlSum(res.data[0]);
          });
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            crawlHostDataFetchApi().then((res) => {
              setCrawlHostList(res.data);
              crawlSumDataFetchApi().then((res) => {
                setCrawlSum(res.data[0]);
              });
            });
          });
        })
    );
  }, []);
  useEffect(() => {
    if (selectedHostId !== null) {
      trackPromise(
        crawlHostDataFetchApi(selectedHostId)
          .then((res) => {
            console.log(res.data);
            setCurrentCrawlHostLog(res.data.reverse()); // 최신순
          })
          .catch((err) => {
            sessionHandler(err, dispatch).then((res) => {
              crawlHostDataFetchApi(selectedHostId).then((res) => {
                setCurrentCrawlHostLog(res.data.reverse()); // 최신순
              });
            });
          })
      );
    }
  }, [selectedHostId]);
  return (
    <>
      <Dashboard
        data={data}
        menuHandler={menuHandler}
        menuType={menuType}
        processHandler={processHandler}
        rowClickHandler={rowClickHandler}
        process={process}
        crawlHostList={crawlHostList}
        selectedHostId={selectedHostId}
        currentCrawlHostLog={currentCrawlHostLog}
        crawlSum={crawlSum}
      />
    </>
  );
}
export default DashboardContainer;
