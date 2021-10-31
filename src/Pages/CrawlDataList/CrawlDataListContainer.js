import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../Data/data.json";
import CrawlDataList from "./CrawlDataList";
import { CrawlDataFetchApi } from "../../Api/api";

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
  const [dcCount, setDcCount] = useState(77); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(10); // 한 페이지에 나타낼 document 개수

  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataFetchApi(statusCode, listSize, pageNo).then((res) => {
      let _statusCrawlData = [];
      let _rawStatusCrawlData = res.data.docs;
      _rawStatusCrawlData.forEach((item,index)=>{
        console.log(item)
        const _title = item.dc_title_kr;
        const _subTitle = item.dc_title_or;
        const _tags = item.dc_keyword.split(" ")
        const _writeDate = item.dc_dt_write.split("T")[0]
        const _subscribed = false;
        const _itemID = Number(item.item_id);
        const _status = item.stat;

        const obj = {title:_title,subTitle:_subTitle,tags:_tags,writeDate:_writeDate,subscribed:_subscribed,itemID:_itemID,status:_status}

        _statusCrawlData.push(obj)
      })
      setStatusCrawlData(_statusCrawlData)
    });
  };

  useEffect(() => {
    dataFetch();
    setResultCount(statusCrawlData.length);
  }, [statusCode]);

  useEffect(() => {
    setResultCount(statusCrawlData.length);
    setDcCount(statusCrawlData.length);
  }, [statusCrawlData]);

  const Search = (keyword,startDate,endDate,itemID,language,subscribed) => {
    CrawlDataFetchApi(
      statusCode,
      listSize,
      pageNo,
      keyword,
      startDate,
      endDate,
      itemID,
      language,
      subscribed
    ).then((res) => {
      console.log(res);
    });
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
