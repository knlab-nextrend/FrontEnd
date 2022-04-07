import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useDispatch } from "react-redux";
import { setModal, setModalData } from "../../../Modules/modal";
import { trackPromise } from "react-promise-tracker";
import {
  crawlHostDataFetchApi,
  crawlSumDataFetchApi,
  userWorkLogFetchApi,
  curationWorkListFetchApi,
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
  const [crawlSum, setCrawlSum] = useState(null); // 현재 크롤링 총 작업 현황
  const [process, setProcess] = useState(0);

  const [currentUserId, setCurrentUserId] = useState(null); // 현재 선택된 유저의 id

  const [dateGte, setDateGte] = useState("2022-01-01"); // 현재 시각 기준 3년 전으로 설정 할 예정...
  const [lineGraphData, setLineGraphData] = useState([]); // 기간별 통계 꺾은선 그래프 데이터

  const [duration, setDuration] = useState("daily");

  const [curationWorkList, setCurationWorkList] = useState([]); // 해당 작업자의 큐레이션 내역 목록

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
  const currentUserIdHandler = (e) => {
    setCurrentUserId(e.target.value);
  };
  const curationWorkModalOpen = (data) => {
    dispatch(setModal("CurationWorkContentModal"));
    dispatch(setModalData(data, "curation_work_content"));
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

  const getCrawlHostList = () => {
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
  };

  const getCrawlHostLogList = () => {
    trackPromise(
      crawlHostDataFetchApi(selectedHostId)
        .then((res) => {
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
  };
  const graphDataCleansing = (rawData) => {
    setLineGraphData(
      rawData.map((item, index) => {
        return { date: new Date(item.start).getTime(), value: item.cnt };
      })
    );
  };
  const getUserWorkLog = () => {
    const dataObj = {
      status: process,
      wid: Number(currentUserId),
      duration: duration,
      dateLte: new Date().toISOString().substring(0, 10),
      dateGte: dateGte,
    };
    trackPromise(
      userWorkLogFetchApi(dataObj)
        .then((res) => {
          graphDataCleansing(res.data);
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            userWorkLogFetchApi(dataObj).then((res) => {
              graphDataCleansing(res.data);
            });
          });
        })
    );
  };
  const getCurationWorkList = () => {
    const dataObj = {
      wid: Number(currentUserId),
      dateLte: new Date().toISOString().substring(0, 10),
      dateGte: "1970-01-01",
    };
    trackPromise(
      curationWorkListFetchApi(dataObj)
        .then((res) => {
          console.log(res.data);
          setCurationWorkList(res.data);
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            curationWorkListFetchApi(dataObj).then((res) => {
              console.log(res.data);
              setCurationWorkList(res.data);
            });
          });
        })
    );
  };

  useEffect(() => {
    getCrawlHostList(); // 크롤 호스트 목록 불러오기
  }, []);

  useEffect(() => {
    if (!!currentUserId) {
      getUserWorkLog();
    }
  }, [currentUserId, dateGte, process, duration]);
  useEffect(()=>{
    if(!!currentUserId){
      getCurationWorkList();
    }
  },[currentUserId])

  useEffect(() => {
    if (selectedHostId !== null) {
      getCrawlHostLogList();
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
        currentUserIdHandler={currentUserIdHandler}
        setCurrentUserId={setCurrentUserId}
        setDateGte={setDateGte}
        lineGraphData={lineGraphData}
        setDuration={setDuration}
        duration={duration}
        curationWorkModalOpen={curationWorkModalOpen}
        curationWorkList={curationWorkList}
      />
    </>
  );
}
export default DashboardContainer;
