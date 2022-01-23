import React, { useState, useEffect } from "react";
import CategoryManagement from "./CategoryManagement";
import { categoryListFetchApi,sessionHandler } from "../../../Utils/api";
import { useDispatch } from "react-redux";
import { trackPromise } from "react-promise-tracker";
function CategoryManagementContainer() {

  const dispatch = useDispatch();
  /* 정책분류 , 유형구분 , 국가 분류, 언어 */
  const [managementType, setManagementType] = useState(1);
  const [categoryList,setCategoryList] = useState([]);
  const [editableCode, setEditableCode] = useState(0);
  const [text, setText] = useState("");
  /* 수정할 항목의 코드를 저장한다.
  0일 경우 수정 할 항목이 지정되지 않은 상태이다.
  그러므로, 수정 확인 또는 수정 취소 시 해당 값을 0으로 다시 지정해 주어야 한다.
  */

  const CATEGOROY_CODE_LIST = {
    정책분류: 1,
    유형분류: 2,
    국가분류: 3,
    언어: 4,
  };

  const [addCategoryName, setAddCategoryName] = useState(""); // 새롭게 등록할 카테고리 이름...

  // 수정할 항목의 code값을 받아옴.
  const categoryEdit = (item) => {
    setEditableCode(item.CODE);
    setText(item.CT_NM);
  };
  const categoryEditCancel = () => {
    setEditableCode(0);
    setText("");
  };
  const _managementTypeHandler = (type) => {
    setManagementType(type);
    console.log(type);
  };

  const onChangeEditInput = (e) => {
    setText(e.target.value);
  };
  const onChangeAddInput = (e) => {
    setAddCategoryName(e.target.value);
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    trackPromise(
      categoryListFetchApi(managementType, 2)
        .then((res) => {
          setCategoryList(res.data);
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            categoryListFetchApi(managementType,2).then((res) => {
              setCategoryList(res.data);
            });
          });
        })
    );
  };
  useEffect(()=>{
    dataFetch();
  },[managementType])

  return (
    <>
      <CategoryManagement
        CATEGOROY_CODE_LIST={CATEGOROY_CODE_LIST}
        managementType={managementType}
        _managementTypeHandler={_managementTypeHandler}
        editableCode={editableCode}
        categoryEdit={categoryEdit}
        categoryEditCancel={categoryEditCancel}
        categoryList={categoryList}
        onChangeEditInput={onChangeEditInput}
        text={text}
        onChangeAddInput={onChangeAddInput}
      />
    </>
  );
}

export default CategoryManagementContainer;
