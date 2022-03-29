import React, { useState, useEffect } from "react";
import UserOnlyDataLookUpPage from "./UserOnlyDataLookUpPage";
import {
  userAxisMenuFetchApi,
  CrawlDataListFetchApi,
  sessionHandler,
} from "../../../Utils/api";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../../Modules/login";
import { trackPromise } from "react-promise-tracker";

function UserOnlyDataLookUpPageContainer() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const [axisMenu, setAxisMenu] = useState({ X: [], Y: [] });
  const [axisObj, setAxisObj] = useState({ X: null, Y: null });
  const [dataMode, setDataMode] = useState("curation"); // curation , archive

  const [archiveData, setArchiveData] = useState([]);
  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(0); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(10); // 한 페이지에 나타낼 document 개수

  const curationRequest = (id)=>{
    if(confirm("해당 아카이브 자료의 큐레이션을 신청하시겠습니까?")){
      console.log(id)
    }
  }
  const initAxisObj = (setting) => {
    const _axisObj = {
      X: { type: setting.x_type, code: setting.x_code },
      Y: { type: setting.y_type, code: setting.y_code },
    };
    setAxisObj(_axisObj);
  };
  const menuDataFetch = (uid) => {
    userAxisMenuFetchApi(uid).then((res) => {
      if (res.data.axis_x.length === 0 || res.data.axis_y.lengtth === 0) {
        alert("x축, y축 메뉴가 모두 설정되지 않은 사용자입니다.");
        dispatch(setLogout("NORMAL_LOGOUT"));
      } else {
        const _axisMenu = { X: res.data.axis_x, Y: res.data.axis_y };
        setAxisMenu(_axisMenu);
        initAxisObj(res.data.setting[0]);
      }
    });
  };

  const archiveDataFetch = () => {
    trackPromise(
      CrawlDataListFetchApi(6, listSize, pageNo)
        .then((res) => {
          dataCleansing(res.data);
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            CrawlDataListFetchApi(6, listSize, pageNo).then((res) => {
              dataCleansing(res.data);
            });
          });
        })
    );
  };
  const dataCleansing = (rawData) => {
    let _archiveDataList = [];
    let _rawArchiveDataList = rawData.docs;
    let _dcCount = rawData.dcCount;
    _rawArchiveDataList.forEach((item) => {
      const obj = {
        _id:item._id,
        doc_origin_title: item.doc_origin_title,
        doc_page: item.doc_page,
        doc_url: item.doc_url.replace("%3A", ":"),
        doc_publish_date: item.doc_publish_date,
        status:item.status,
      };
      _archiveDataList.push(obj);
    });
    setDcCount(_dcCount);
    setArchiveData(_archiveDataList);
  };

  const modeSwitchHandler = () => {
    if (dataMode === "curation") {
      setDataMode("archive");
    } else {
      setDataMode("curation");
    }
  };
  const menuClickHandler = (axis, item) => {
    let _axisObj = { ...axisObj };
    _axisObj[axis] = { type: item.type, code: item.code };
    setAxisObj(_axisObj);
  };
  const listSizeHandler = (e)=>{
    setListSize(e.target.value)
  }

  useEffect(() => {
    menuDataFetch(userInfo.id);
  }, [userInfo]);


  useEffect(() => {
    if (dataMode === "archive") {
      archiveDataFetch();
    }
  }, [dataMode, pageNo, listSize]);
  return (
    <>
      <UserOnlyDataLookUpPage
        axisMenu={axisMenu}
        menuClickHandler={menuClickHandler}
        axisObj={axisObj}
        modeSwitchHandler={modeSwitchHandler}
        dataMode={dataMode}
        dcCount={dcCount}
        listSize={listSize}
        listSizeHandler={listSizeHandler}
        pageNo={pageNo}
        setPageNo={setPageNo}
        archiveData={archiveData}
        curationRequest={curationRequest}
      />
    </>
  );
}
export default UserOnlyDataLookUpPageContainer;
