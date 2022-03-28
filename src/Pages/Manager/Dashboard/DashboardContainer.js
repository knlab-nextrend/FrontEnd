import React, { useState } from "react";
import Dashboard from "./Dashboard";

function DashboardContainer() {
  // docs 문서 통계
  // work 작업자 작업 통계
  // crawl 크롤러 현황

  const [menuType, setMenuType] = useState("docs_country");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [process, setProcess] = useState("all");
  const menuHandler = (e) => {
    setMenuType(e.target.value);
  };
  const processHandler = (select) => {
    setProcess(select);
  };
  const rowClickHandler = (job_id) => {
    // 현재 선택된 job_id와 새로 보고자 하는 job_id가 같을경우 이미 오픈된 목록을 닫는걸로 생각
    if (selectedJobId === job_id) {
      setSelectedJobId(null);
    } else {
      setSelectedJobId(job_id);
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
  const crawlDummyData = [
    {
      job_id:"1",
      host:"https://www.worldbank.org/",
      worked_count:"10",
      worked_at:"2022-01-04 10:00:01.000000",
      scheduled_at:"2022-01-04 10:00:01.000000",
      created_at:"2022-01-04 10:00:01.000000"
    },
    {
      job_id:"2",
      host:"https://www.worldbank.org/",
      worked_count:"10",
      worked_at:"2022-01-04 10:00:01.000000",
      scheduled_at:"2022-01-04 10:00:01.000000",
      created_at:"2022-01-04 10:00:01.000000"
    }
  ]
  return (
    <>
      <Dashboard
        data={data}
        menuHandler={menuHandler}
        menuType={menuType}
        processHandler={processHandler}
        rowClickHandler={rowClickHandler}
        process={process}
        crawlDummyData={crawlDummyData}
      />
    </>
  );
}
export default DashboardContainer;
