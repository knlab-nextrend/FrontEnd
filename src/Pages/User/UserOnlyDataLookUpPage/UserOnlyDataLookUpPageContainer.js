import React, { useState, useEffect } from "react";
import UserOnlyDataLookUpPage from "./UserOnlyDataLookUpPage";
import { userAxisMenuFetchApi } from "../../../Utils/api";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../../Modules/login";

function UserOnlyDataLookUpPageContainer() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const [axisMenu, setAxisMenu] = useState({ X: [], Y: [] });

  const menuDataFetch = (uid) => {
    userAxisMenuFetchApi(uid).then((res) => {
      console.log(res.data);
      if (res.data.axis_x.length === 0 || res.data.axis_y.lengtth === 0) {
        alert("x축, y축 메뉴가 모두 설정되지 않은 사용자입니다.");
        dispatch(setLogout("NORMAL_LOGOUT"));
      } else {
        const _axisMenu = { X: res.data.axis_x, Y: res.data.axis_y };
        setAxisMenu(_axisMenu);
      }
    });
  };
  useEffect(() => {
    menuDataFetch(userInfo.id);
  }, [userInfo]);
  return (
    <>
      <UserOnlyDataLookUpPage axisMenu={axisMenu} />
    </>
  );
}
export default UserOnlyDataLookUpPageContainer;
