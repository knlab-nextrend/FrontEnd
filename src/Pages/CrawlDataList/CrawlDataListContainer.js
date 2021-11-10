import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import CrawlDataList from "./CrawlDataList";
import { CrawlDataFetchApi, RefreshTokenApi } from "../../Utils/api";
import { setLogout } from "../../Modules/login";

function CrawlDataListContainer() {
  const dispatch = useDispatch();
  const history = useHistory();

  /* 현재 보여질 데이터 */
  const [statusCrawlData, setStatusCrawlData] = useState([]);

  /* [1차 스크리닝, 1차스크리닝 보류, 2차정제, 2차정제 보류] 진행상황을 나타내기 위한 상태코드 */
  const { statusCode } = useParams();

  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(0); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(10); // 한 페이지에 나타낼 document 개수

  const STATUS_SET = {
    0: "screening",
    1: "screening",
    2: "refine",
    3: "refine",
  }; // 0: 스크리닝 1: 스크리닝보류 2: 2차정제 3:2차정제 보류

  const dataCleansing = (rawData) => {
    let _statusCrawlData = [];
    let _rawStatusCrawlData = rawData.docs;
    let _dcCount = rawData.dcCount;

    _rawStatusCrawlData.forEach((item, index) => {
      const obj = {
        dc_title_or: item.dc_title_or,
        dc_title_kr: item.dc_title_kr,
        dc_keyword: item.dc_keyword,
        dc_dt_collect: item.dc_dt_collect,
        subscribed: false,
        item_id: Number(item.item_id),
        stat: item.stat,
      };

      _statusCrawlData.push(obj);
    });
    setDcCount(_dcCount);
    setStatusCrawlData(_statusCrawlData);
  };
  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataFetchApi(statusCode, listSize, pageNo)
      .then((res) => {
        dataCleansing(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          RefreshTokenApi()
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("refreshToken", res.data.refreshToken);
            })
            .catch((err) => {
              dispatch(setLogout({ logout_type: "EXPIRED_LOGOUT" }));
            });
        }
      });
  };

  /* 페이지 번호가 변경되었을 때 데이터를 다시 불러옴 */
   /* statusCode가 변경되었을 때 데이터를 다시 불러옴 */
  useEffect(() => {
    dataFetch();
  }, [pageNo,statusCode]);


  /* 조건 검색 */
  const Search = (keyword, startDate, endDate, itemId, lang, subscribed) => {
    CrawlDataFetchApi(
      statusCode,
      listSize,
      pageNo,
      keyword,
      startDate,
      endDate,
      itemId,
      lang,
      subscribed
    ).then((res) => {
      dataCleansing(res.data);
    });
  };

  return (
    <>
      <CrawlDataList
        statusCode={statusCode}
        Search={Search}
        statusCrawlData={statusCrawlData}
        dcCount={dcCount}
        listSize={listSize}
        pageNo={pageNo}
        setPageNo={setPageNo}
        statusCode={statusCode}
        STATUS_SET={STATUS_SET}
      />
    </>
  );
}
export default CrawlDataListContainer;
