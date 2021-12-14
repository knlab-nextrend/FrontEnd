import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  FetchUsersApi,
  deleteUserByIdApi,
  sessionHandler,
} from "../../../Utils/api";
import UserManagement from "./UserManagement";
import { setModal, setModalData } from "../../../Modules/modal";

function UserManagementContainer() {
  const history = useHistory();
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();

  const openUserModifyModal = (user) => {
    dispatch(setModal("UserInfoModal"));
    dispatch(setModalData({ user, type: false }, "modal_user"));
  };
  const openUserAddModal = () => {
    dispatch(setModal("UserInfoModal"));
    dispatch(setModalData({ user: [], type: true }, "modal_user"));
  };

  const getUserList = () => {
    FetchUsersApi()
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        sessionHandler(err, dispatch).then((res) => {
          FetchUsersApi().then((res) => {
            setUserData(res.data);
          });
        });
      });
  };
  const deleteUser = (id) => {
    if (comfirm("삭제하시겠습니까?")) {
      deleteUserByIdApi(id)
        .then((res) => {
          alert("성공적으로 삭제되었습니다");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert("유저 정보 변경 중 오류발생");
          }
        });
      window.location.reload(); //
    }
  };
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <UserManagement
        userData={userData}
        openUserModifyModal={openUserModifyModal}
        deleteUser={deleteUser}
        openUserAddModal={openUserAddModal}
      />
    </>
  );
}

export default UserManagementContainer;
