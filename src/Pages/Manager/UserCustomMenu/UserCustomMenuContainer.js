import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCustomMenu from "./UserCustomMenu";
import { trackPromise } from "react-promise-tracker";
import {
  FetchUsersApi,
  sessionHandler,
  axisMenuPreviewFetch,
} from "../../../Utils/api";
import { setModal, clearCategoryData } from "../../../Modules/modal";
function UserCustomMenuContainer() {
  const CATEGORY_TYPE_LIST = {
    1:"정책 분류",
    2:"유형 분류",
    3:"국가 분류",
    4:"언어 분류",
    5:"토픽 분류",
    6:"기관 맞춤형 분류"
  }
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null); // 현재 선택된 유저의 id
  const [currentAxis, setCurrentAxis] = useState("X"); // 현재 수정중인 축
  const currentCategory = useSelector(
    (state) => state.modal.modalData.axis_category
  ); // 현재 수정중인 축의 카테고리

  const [axisCategoryInfo, setAxisCategoryInfo] = useState({
    X: { category_type: null, select_category_name: null },
    Y: { category_type: null, select_category_name: null },
  }); // 선택된 값을 미리 보여주기 위한 state
  const [axisMenuData, setAxisMenuData] = useState({ X: null, Y: null }); // 현재 세팅된 축 메뉴
  const [previewAxisMenu, setPreviewAxisMenu] = useState({ X: [], Y: [] }); // 미리보기용 하위 메뉴
  const openCategoryModal = (axis) => {
    setCurrentAxis(axis);
    dispatch(setModal("AxisCategoryModal"));
  };
  const getUserList = () => {
    trackPromise(
      FetchUsersApi()
        .then((res) => {
          setUserList(res.data);
          setCurrentUserId(res.data[0].id);
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            FetchUsersApi().then((res) => {
              setUserList(res.data);
              setCurrentUserId(res.data[0].id);
            });
          });
        })
    );
  };
  const previewSetting = () => {
    console.log(axisMenuData[currentAxis].IDX);
    trackPromise(
      axisMenuPreviewFetch(axisMenuData[currentAxis].IDX).then((res) => {
        console.log(res.data);
        setPreviewAxisMenu((prev) => ({
          ...prev,
          [currentAxis]: res.data,
        }));
        console.log(CATEGORY_TYPE_LIST[res.data[0].type])
        setAxisCategoryInfo((prev) => ({
          ...prev,
          [currentAxis]: {
            category_type: CATEGORY_TYPE_LIST[res.data[0].type],
            select_category_name: axisMenuData[currentAxis].CT_NM,
          },
        }));
      })
    );
  };
  const saveUserAxisData = () => {
    if(axisCategoryInfo.X.category_type === axisCategoryInfo.Y.category_type){
      alert("X축과 Y축이 동일한 카테고리 타입을 가질 수 없습니다. 다시 설정해주세요.");
      return;
    }
  };
  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    setAxisMenuData((prev) => ({
      ...prev,
      [currentAxis]: currentCategory,
    }));
  }, [currentCategory]);

  useEffect(() => {
    if (currentAxis === "X" && !!axisMenuData.X) {
      previewSetting();
    }
    if (currentAxis === "Y" && !!axisMenuData.Y) {
      previewSetting();
    }
  }, [axisMenuData]);
  return (
    <>
      <UserCustomMenu
        userList={userList}
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
        openCategoryModal={openCategoryModal}
        previewAxisMenu={previewAxisMenu}
        axisCategoryInfo={axisCategoryInfo}
        saveUserAxisData={saveUserAxisData}
      />
    </>
  );
}

export default UserCustomMenuContainer;
