import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CrawlDataListFetchApi,
  RefreshTokenApi,
  userAuthApi,
} from "../../../Utils/api";
import CrawlDataList from "./CrawlDataList";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../Modules/login";
import { setUser } from "../../../Modules/user";
import { setTokens } from "../../../Utils/tokens";

function CrawlDataListContainer() {
  const dispatch = useDispatch();
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
      mainTitle: "크롤데이터 등록 작업 데이터 목록",
      title: "크롤데이터 등록 진행",
    },
    5: {
      type: "register",
      mainTitle: "크롤데이터 등록 작업 데이터 목록",
      title: "크롤데이터 등록 진행",
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
      .catch((err) => {
        if (err.response.status === 401) {
          RefreshTokenApi()
            .then((res) => {
              setTokens(res);
              userAuthApi().then((res) => {
                dispatch(setUser({name: res.data.Name,permission: Number(res.data.Category)}));
                
                CrawlDataListFetchApi(statusCode, listSize, pageNo)
                .then((res) => {
                  dataCleansing(res.data);
                })
              });
            })
            .catch((err) => {
              if (err.response.status === 401) {
                alert("세션만료");
                localStorage.removeItem("token"); // 로컬스토리지에서 데이터 삭제
                localStorage.removeItem("refreshToken"); // 로컬스토리지에서 데이터 삭제
          
                window.location.href = "/login";
              }
            });
        }
      });
  };

  /* pageNo, statusCode 가 변경되었을 때 데이터를 다시 불러옴 */
  useEffect(() => {
    dataFetch();
  }, [pageNo, statusCode]);

  return (
    <>
      <CrawlDataList
        statusCode={statusCode}
        crawlDataList={crawlDataList}
        dcCount={dcCount}
        listSize={listSize}
        pageNo={pageNo}
        setPageNo={setPageNo}
        STATUS_CODE_SET={STATUS_CODE_SET}
      />
    </>
  );
}
export default CrawlDataListContainer;
