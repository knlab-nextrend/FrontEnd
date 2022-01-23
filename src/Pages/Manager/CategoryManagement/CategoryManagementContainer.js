import React, { useState , useEffect} from "react";
import CategoryManagement from "./CategoryManagement";
function CategoryManagementContainer() {
  /* 정책분류 , 문서유형, 내용구분, 언어, 국가, HOST */
  const [managementType, setManagementType] = useState("정책분류");

  const [editableCode, setEditableCode] = useState(0);
  const [text,setText] = useState("")
  /* 수정할 항목의 코드를 저장한다.
  0일 경우 수정 할 항목이 지정되지 않은 상태이다.
  그러므로, 수정 확인 또는 수정 취소 시 해당 값을 0으로 다시 지정해 주어야 한다.
  */


  const [addCategoryName,setAddCategoryName] = useState(""); // 새롭게 등록할 카테고리 이름...

  // 수정할 항목의 code값을 받아옴.
  const categoryEdit = (item) => {
    setEditableCode(item.CT_CODE);
    setText(item.CT_NM)
  };
  const categoryEditCancel = ()=>{
    setEditableCode(0);
    setText("")
  }
  const _managementTypeHandler = (type) => {
    setManagementType(type);
    console.log(type);
  };

  const onChangeEditInput = (e)=>{
    setText(e.target.value)
  }
  const onChangeAddInput = (e)=>{
    setAddCategoryName(e.target.value)
  }

  useEffect(()=>{
    console.log(dummy)
  },[])

  const dummy = [
    { CT_NM: "정책뭐시깽이", CT_CODE: 32 },
    { CT_NM: "정책뭐시깽", CT_CODE: 31 },
    { CT_NM: "정책뭐시", CT_CODE: 33 },
    { CT_NM: "정책뭐", CT_CODE: 34 },
    { CT_NM: "정책뭐", CT_CODE: 35 },
    { CT_NM: "정책뭐", CT_CODE: 36 },
    { CT_NM: "정책뭐", CT_CODE: 37 },
    { CT_NM: "정책뭐", CT_CODE: 38 },
    { CT_NM: "정책뭐", CT_CODE: 39 },
    { CT_NM: "정책뭐", CT_CODE: 40 },
    { CT_NM: "정책뭐", CT_CODE: 41 },

  ];
  return (
    <>
      <CategoryManagement
        managementType={managementType}
        _managementTypeHandler={_managementTypeHandler}
        editableCode={editableCode}
        categoryEdit={categoryEdit}
        categoryEditCancel={categoryEditCancel}
        dummy={dummy}
        onChangeEditInput={onChangeEditInput}
        text={text}
        onChangeAddInput={onChangeAddInput}
      />
    </>
  );
}

export default CategoryManagementContainer;
