import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import UserCustomMenu from "./UserCustomMenu";
import { trackPromise } from "react-promise-tracker";
import { FetchUsersApi, sessionHandler } from "../../../Utils/api";
import { setModal, setModalData, setCategoryModalType } from "../../../Modules/modal";
function UserCustomMenuContainer() {
  const dispatch = useDispatch();
  
  const [userList, setUserList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentAxis, setCurrentAxis] = useState("X");
  const [currentCategory, setCurrentCategory] = useState(null);

  const openCategoryModal = (axis)=>{
    setCurrentAxis(axis);
    dispatch(setModal("AxisCategoryModal"));
  }
  const getUserList = () => {
    trackPromise(
      FetchUsersApi()
        .then((res) => {
          setUserList(res.data);
          setCurrentUserId(res.data[0].id)
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            FetchUsersApi().then((res) => {
              setUserList(res.data);
              setCurrentUserId(res.data[0].id)
            });
          });
        })
    );
  };
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <UserCustomMenu
        userList={userList}
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
        openCategoryModal={openCategoryModal}
        currentAxis={currentAxis}
      />
    </>
  );
}

export default UserCustomMenuContainer;
