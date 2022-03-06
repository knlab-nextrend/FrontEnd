import React, { useState, useEffect } from "react";
import UserOnlyDataLookUpPage from "./UserOnlyDataLookUpPage";
import { userAxisMenuFetchApi } from "../../../Utils/api";
import { useSelector } from "react-redux";

function UserOnlyDataLookUpPageContainer() {
  const userInfo = useSelector((state) => state.user.user);
  const [axisMenu, setAxisMenu] = useState({ X: [], Y: [] });

  const menuDataFetch = (uid) => {
    userAxisMenuFetchApi(uid).then((res) => {
        console.log(res.data)
      const _axisMenu = { X: res.data.axis_x, Y: res.data.axis_y };
      setAxisMenu(_axisMenu);
    });
  };
  useEffect(() => {
    console.log(userInfo);
    menuDataFetch(userInfo.id);
  }, [userInfo]);
  return (
    <>
      <UserOnlyDataLookUpPage axisMenu={axisMenu}/>
    </>
  );
}
export default UserOnlyDataLookUpPageContainer;
