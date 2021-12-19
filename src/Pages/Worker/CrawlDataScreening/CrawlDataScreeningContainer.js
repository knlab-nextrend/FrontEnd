import React, { useState, useEffect } from "react";
import {
  ScreeningDataFetchApi,
  ScreeningDataStageApi,
  ScreeningDataDeleteApi,
  sessionHandler,
} from "../../../Utils/api";
import CrawlDataScreening from "./CrawlDataScreening";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { trackPromise } from "react-promise-tracker";

function CrawlDataScreeningContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  /* 현재 보여질 데이터 */
  const [screeningData, setScreeningData] = useState([]);

  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(0); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(50); // 한 페이지에 나타낼 document 개수

  const [checkedAll, setCheckedAll] = useState(false);
  const [itemIdList, setItemIdList] = useState([]);
  const [deleteDataList, setDeleteDataList] = useState([]);
  const [stageDataList, setStageDataList] = useState([]);

  /* item 전체 선택 */
  const onChangeAll = () => {
    setCheckedAll(!checkedAll);
  };

  /* item 개별 선택*/
  const onChangeEach = (e) => {
    // 체크할 시 CheckList에 id값
    const id = Number(e.target.value);
    console.log(e.target.checked);
    if (e.target.checked) {
      setStageDataList([...stageDataList, id]);
    } else {
      setStageDataList(stageDataList.filter((item_id) => item_id !== id));
    }
  };

  /* 선택된 데이터를 크롤데이터 정제 단계로 넘기고 나머지 데이터는 버리기 */
  const stageScreeningData = () => {
    if (
      window.confirm(
        "선택되지 않은 데이터는 DB에서 삭제됩니다. 스크리닝을 진행하시겠습니까?"
      )
    ) {
      if (stageDataList.length === 0) {
        ScreeningDataDeleteApi(deleteDataList).then((res) => {
          if (res.status === 200) {
            alert("성공적으로 스크리닝이 완료되었습니다.");
            history.go(0);
          }
        });
      } else if (deleteDataList.length === 0) {
        ScreeningDataStageApi(stageDataList).then((res) => {
          if (res.status === 200) {
            alert("성공적으로 스크리닝이 완료되었습니다.");
            history.go(0);
          }
        });
      } else {
        ScreeningDataStageApi(stageDataList).then((res) => {
          if (res.status === 200) {
            ScreeningDataDeleteApi(deleteDataList).then((res) => {
              if (res.status === 200) {
                alert("성공적으로 스크리닝이 완료되었습니다.");
                history.go(0);
              }
            });
          }
        });
      }
    }
  };

  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    let _screeningData = [];
    let _rawScreeningData = rawData.docs;
    let _dcCount = rawData.dcCount;

    _rawScreeningData.forEach((item, index) => {
      const obj = {
        item_id: Number(item.item_id),
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
    trackPromise(ScreeningDataFetchApi(listSize, pageNo)
      .then((res) => {
        dataCleansing(res.data);
      })
      .catch((err) => {
        sessionHandler(err, dispatch).then((res) => {
          ScreeningDataFetchApi(listSize, pageNo).then((res) => {
            dataCleansing(res.data);
          });
        });
      }));
  };

  /* pageNo, listSize 가 변경되었을 때 데이터를 다시 불러옴 */
  useEffect(() => {
    if (dcCount <= listSize) {
      setPageNo(1);
    }
    dataFetch();
  }, [pageNo, listSize]);

  /* 데이터를 불러오는데 성공하였을 경우 각 데이터의 id값을 list에 먼저 세팅해줌*/
  useEffect(() => {
    let _itemIdList = [];
    screeningData.forEach((item) => {
      _itemIdList.push(item.item_id);
    });
    setItemIdList(_itemIdList);
    setDeleteDataList(_itemIdList); // 초기에는 모두 체크해제되어있으므로 삭제대상
  }, [screeningData]);

  /* 체크박스를 선택 또는 해제할 때 deleteDataList와 stageDataList를 구분*/
  useEffect(() => {
    const _deleteDataList = itemIdList.filter(
      (item_id) => !stageDataList.includes(item_id)
    );
    setDeleteDataList(_deleteDataList);
  }, [stageDataList]);

  /* 전체선택을 선택 또는 해제 하였을 때 */
  useEffect(() => {
    // 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
    setStageDataList(checkedAll ? itemIdList : []);
  }, [checkedAll]);

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
        stageScreeningData={stageScreeningData}
        stageDataList={stageDataList}
      />
    </>
  );
}

export default CrawlDataScreeningContainer;
