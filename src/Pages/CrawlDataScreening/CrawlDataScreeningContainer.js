import React, { useState, useEffect } from "react";
import { ScreeningDataFetchApi } from "../../Utils/api";
import CrawlDataScreening from "./CrawlDataScreening";

function CrawlDataScreeningContainer() {
  /* 현재 보여질 데이터 */
  const [screeningData, setScreeningData] = useState([]);

  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(0); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(50); // 한 페이지에 나타낼 document 개수

  const [itemIdList, setItemIdList] = useState([]);
  const [deleteDataList, setDeleteDataList] = useState([]);
  const [stageDataList, setStageDataList] = useState([]);

  /* item 전체 선택 */
  const onChangeAll = (e) => {
    // 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
    setCheckList(e.target.checked ? itemIdList : []);
  };

  /* item 개별 선택*/
  const onChangeEach = (e, id) => {
    // 체크할 시 CheckList에 id값 넣기
    if (e.target.checked) {
      setStageDataList([...stageDataList, id]);
      // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
    } else {
      setStageDataList(stageDataList.filter((item_id) => item_id !== id));
    }
  };

  /* 선택된 데이터를 크롤데이터 정제 단계로 넘기고 나머지 데이터는 버리기 */
  const stageScreeningData = () => {
    const _deleteDataList = itemIdList.filter(
      (item_id) => !stageDataList.includes(item_id)
    );
  };

  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    let _screeningData = [];
    let _rawScreeningData = rawData.docs;
    let _dcCount = rawData.dcCount;

    _rawScreeningData.forEach((item, index) => {
      const obj = {
        item_id: item.item_id,
        dc_smry_kr: item.dc_smry_kr,
        dc_publisher: item.dc_publisher,
        dc_lang: item.dc_lang,
        dc_dt_collect: item.dc_dt_collect,
        dc_page: item.dc_page,
      };
      _screeningData.push(obj);
    });
    setDcCount(_dcCount);
    setScreeningData(_screeningData);
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    ScreeningDataFetchApi(listSize, pageNo).then((res) => {
      dataCleansing(res.data);
    });
  };

  /* statusCode가 변경되었을 때 데이터를 다시 불러옴 */
  useEffect(() => {
    dataFetch();
  }, [pageNo, listSize]);

  /* 데이터를 불러오는데 성공하였을 경우 각 데이터의 id값을 list에 먼저 세팅해줌*/
  useEffect(() => {
    let _itemIdList = [];
    screeningData.forEach((item) => {
      _itemIdList.push(item.item_id);
    });
    setItemIdList(_itemIdList);
  }, [screeningData]);

  return (
    <>
      <CrawlDataScreening
        screeningData={screeningData}
        dcCount={dcCount}
        listSize={listSize}
        setListSize={setListSize}
        pageNo={pageNo}
        setPageNo={setPageNo}
        onChangeAll={onChangeAll}
        onChangeEach={onChangeEach}
      />
    </>
  );
}

export default CrawlDataScreeningContainer;
