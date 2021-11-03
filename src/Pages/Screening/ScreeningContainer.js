import React, { useEffect,useState } from "react";
import { CrawlDataDetailFetchApi } from "../../Utils/api";
import {useParams} from 'react-router-dom'
import Screening from "./Screening";
function ScreeningContainer() {

  /* 현재 보여질 데이터 정보들 */
  const {itemId} = useParams(); // 라우터에서 받아옴.
  const [statusDetailData, setStatusDetailData] = useState([]);


  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    // let _statusCrawlData = [];
    // let _rawStatusCrawlData = rawData.docs;
    // let _dcCount = rawData.dcCount;
    // _rawStatusCrawlData.forEach((item, index) => {
    //   const _title = item.dc_title_kr;
    //   const _subTitle = item.dc_title_or;
    //   const _keywords = item.dc_keyword;
    //   const _writeDate = item.dc_dt_collect.split("T")[0];
    //   const _subscribed = false;
    //   const _itemId = Number(item.item_id);
    //   const _status = item.stat;
    //   const obj = {
    //     title: _title,
    //     subTitle: _subTitle,
    //     keywords: _keywords,
    //     writeDate: _writeDate,
    //     subscribed: _subscribed,
    //     itemId: _itemId,
    //     status: _status,
    //   };
    //   _statusCrawlData.push(obj);
    // });
    // setDcCount(_dcCount);
    // setStatusCrawlData(_statusCrawlData);
  };

  // useEffect(()=>{
  //   console.log(itemId)
  // },[itemId])
  
  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataDetailFetchApi(statusCode, itemId).then((res) => {
      dataCleansing(res.data);
    });
  };

  return (
    <>
      <Screening />
    </>
  );
}

export default ScreeningContainer;
