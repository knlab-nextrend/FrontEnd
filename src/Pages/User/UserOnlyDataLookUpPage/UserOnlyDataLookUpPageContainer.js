import React, { useState, useEffect } from "react";
import UserOnlyDataLookUpPage from "./UserOnlyDataLookUpPage";
import { userAxisMenuFetchApi } from "../../../Utils/api";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../../Modules/login";


function UserOnlyDataLookUpPageContainer() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const [axisMenu, setAxisMenu] = useState({ X: [], Y: [] });
  const [axisObj, setAxisObj] = useState({ X: null, Y: null });

  const initAxisObj = (setting) => {
    const _axisObj = {
      X: { type:setting.x_type,code: setting.x_code },
      Y: { type:setting.y_type,code:setting.y_code },
    };
    console.log(_axisObj)
    setAxisObj(_axisObj)
  };
  const menuDataFetch = (uid) => {
    userAxisMenuFetchApi(uid).then((res) => {
      console.log(res.data);
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


  const menuClickHandler = (axis, item) => {
    let _axisObj = { ...axisObj };
    _axisObj[axis] = { type: item.type, code: item.code };
    setAxisObj(_axisObj);
  };

  useEffect(() => {
    menuDataFetch(userInfo.id);
  }, [userInfo]);

  useEffect(()=>{
    console.log(axisObj)
  },[axisObj])
  return (
    <>
      <UserOnlyDataLookUpPage
        axisMenu={axisMenu}
        menuClickHandler={menuClickHandler}
        axisObj={axisObj}
      />
    </>
  );
}
export default UserOnlyDataLookUpPageContainer;
