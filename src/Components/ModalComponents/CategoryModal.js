import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sessionHandler, categoryListFetchApi } from "../../Utils/api";
import { trackPromise } from "react-promise-tracker";

import styled from "styled-components";

function CategoryModal({ executeModal, closeModal }) {
  const dispatch = useDispatch();
  const categoryModalType = useSelector(
    (state) => state.modal.categoryModalType
  );
  const categoryModalData = useSelector((state)=>state.modal.modalData[categoryModalType])
  const CATEGORY_TYPE_DATA = {
    doc_category: {
      type: 1,
      title: "정책 분류 설정",
      subTitle:
        "정책 분류를 선택해주세요. 항목을 더블클릭하면 추가됩니다. 추가된 정책 분류는 아래의 리스트에서 미리 볼 수 있으며, 추가된 칩을 클릭하면 목록에서 삭제됩니다.",
    },
    doc_content_type: {
      type: 2,
      title: "문서 유형 설정",
      subTitle: "문서 유형을 선택해주세요.",
    },
    doc_content_category: {
      type: 2,
      title: "내용 구분 설정",
      subTitle: "내용 구분을 선택해주세요.",
    },
    doc_country: {
      type: 3,
      title: "문서 대상 국가 설정",
      subTitle:
        "대상 국가를 선택해주세요. 항목을 더블클릭하면 추가됩니다. 추가된 국가는 아래의 리스트에서 미리 볼 수 있으며, 추가된 칩을 클릭하면 목록에서 삭제됩니다.",
    },
    doc_publish_country: {
      type: 3,
      title: "문서 발행 국가 설정",
      subTitle:
        "발행 국가를 선택해주세요. 항목을 더블클릭하면 추가됩니다. 추가된 국가는 아래의 리스트에서 미리 볼 수 있으며, 추가된 칩을 클릭하면 목록에서 삭제됩니다.",
    },
    doc_language: {
      type: 4,
      title: "언어 설정",
      subTitle:
        "언어를 선택해주세요. 항목을 더블클릭하면 추가되며, 하나의 언어만 선택 가능합니다.",
    },
    doc_topic: {
      type: 5,
      title: "토픽 분류 설정",
      subTitle: "토픽 분류를 선택해주세요..",
    },
    doc_custom: {
      type: 6,
      title: "기관맞춤형 분류 설정",
      subTitle:
        "기관맞춤형 분류를 설정해주세요. 항목을 더블클릭하면 추가되며, 추가된 칩을 클릭하면 목록에서 삭제됩니다. 설정된 기관맞춤형 분류는 사용자 페이지에 표출할 때 사용됩니다.",
    },
  };

  const [categoryList, setCategoryList] = useState([
    { length: 2, list: [] },
    { length: 4, list: [] },
    { length: 6, list: [] },
  ]);
  const [upperCode, setUpperCode] = useState({ 2: null, 4: null, 6: null });
  const [length, setLength] = useState(2); // 대분류 (2) 중분류 (4) 소분류 (6)

  const [selectedCategoryList, setSelectedCategoryList] = useState([]);

  const upperCodeHandler = (code, length) => {
    let _upperCode = { ...upperCode };
    _upperCode[length] = code;
    setUpperCode(_upperCode);
  };
  const lengthHandler = (length) => {
    setLength(length);
  };
  const clickHandler = (e, item, code, length) => {
    //console.log(e.detail) // 1 : 원클릭 2: 더블클릭
    if (e.detail === 1 && categoryModalType !== "doc_language") {
      upperCodeHandler(code, length);
      lengthHandler(length + 2);
    } else if (e.detail === 2) {
      addCategory(item);
    }
  };

  const addCategory = (item) => {
    console.log(item)
    if (
      selectedCategoryList.some((ele) => {
        return ele.CODE === item.CODE;
      })
    ) {
      alert("이미 선택된 항목 입니다.");
    } else if (
      categoryModalType === ("doc_language" || "doc_publish_country")
    ) {
      setSelectedCategoryList([item]);
    } else {
      setSelectedCategoryList([...selectedCategoryList, item]);
    }
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    const type = CATEGORY_TYPE_DATA[categoryModalType].type;
      categoryListFetchApi(type, length, upperCode[length - 2])
        .then((res) => {
          dataCleansing(res.data);
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            categoryListFetchApi(type, length, upperCode[length - 2]).then(
              (res) => {
                dataCleansing(res.data);
              }
            );
          });
        })
  };
  const saveCategory = () => {
    executeModal(selectedCategoryList, categoryModalType);
    alert("성공적으로 저장되었습니다.");
    closeModal();
  };
  const deleteCategory = (code) => {
    setSelectedCategoryList(
      selectedCategoryList.filter((item) => item.CODE !== code)
    );
  };

  const dataCleansing = (rawData) => {
    const index = categoryList.findIndex((i) => i.length == length);
    let _categoryList = [...categoryList];
    _categoryList[index] = { length, list: rawData };
    setCategoryList(_categoryList);
  };

  const listInit = () => {
    setCategoryList([
      { length: 2, list: [] },
      { length: 4, list: [] },
      { length: 6, list: [] },
    ]);
    setUpperCode({ 2: null, 4: null, 6: null });
    setLength(2);
    setSelectedCategoryList(categoryModalData)
  };
  useEffect(() => {
    listInit();
  }, [categoryModalType]);
  useEffect(() => {
    dataFetch();
  }, [length, upperCode]);
  return (
    <>
      <ModalWrapper>
        <Modalheader>
          <ModalTitle>{CATEGORY_TYPE_DATA[categoryModalType].title}</ModalTitle>
          <ModalSubTitle>
            {CATEGORY_TYPE_DATA[categoryModalType].subTitle}
          </ModalSubTitle>
        </Modalheader>
        <ModalBody>
          <ListContainer>
            <ListHeader>
              <div>대분류</div>
              <div>중분류</div>
              <div>소분류</div>
            </ListHeader>
            <ListBody>
              {categoryList.map((category, index) => {
                return (
                  <ListWrapper>
                    {category.list.length === 0 ? (
                      <ListItem>상위분류를 먼저 선택하세요</ListItem>
                    ) : (
                      category.list.map((item, index) => {
                        return (
                          <>
                            <ListItem>
                              <div
                                className="title"
                                value={item.CODE}
                                onClick={(e) => {
                                  clickHandler(
                                    e,
                                    item,
                                    item.CODE,
                                    category.length
                                  );
                                }}
                              >
                                {item.CT_NM}
                              </div>
                            </ListItem>
                          </>
                        );
                      })
                    )}
                  </ListWrapper>
                );
              })}
            </ListBody>
          </ListContainer>
          <CategoryList>
            {selectedCategoryList.map((item) => {
              return (
                <div
                  key={item.IDX}
                  onClick={() => {
                    deleteCategory(item.CODE);
                  }}
                >
                  {item.CT_NM}
                </div>
              );
            })}
          </CategoryList>
        </ModalBody>
        <ModalActions>
          <Button color="#435269" onClick={saveCategory}>
            <p>저장</p>
          </Button>
          <Button color="#bfbfbf" onClick={closeModal}>
            <p>취소</p>
          </Button>
        </ModalActions>
      </ModalWrapper>
    </>
  );
}

/* 모달 디자인 관련 컴포넌트 ... 나중에 전역 관리 할 수 있음 좋겠네 ㅠ */
const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.25rem;
  padding: 1.5rem;
`;
const Modalheader = styled.div`
  justify-content: left;
  margin-bottom: 1rem;
`;
const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.7);
`;
const ModalSubTitle = styled.div`
  font-size: 16px;
  margin-bottom: 0.5rem;
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const Button = styled.button`
  background-color: ${(props) => props.color || "grey"};
  cursor: pointer;
  min-width: 5rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  margin: 0 0.5rem 0 0.5rem;
`;

/* 리스트 관리 스타일 */

const ListBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;
const ListHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: #435269;
  div {
    padding: 0.5rem 0 0.5rem 0;
    width: 100%;
    text-align: center;
    color: white;
    font-weight: bold;
  }
`;
const ListWrapper = styled.ul`
  width: 100%;
  list-style-type: none;
  height: 30rem;
  overflow: auto;
  margin: 0;
  padding: 0;
  border: solid 1px #eeeeee;
  overflow-x: hidden;
`;
const ListItem = styled.li`
  cursor: pointer;
  padding: 1rem;
  min-height: 1.5rem;
  border-bottom: dotted 1px #eeeeee;
`;

const CategoryList = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: left;
  border: solid 1px #eee;
  flex-wrap: wrap;

  div {
    cursor: pointer;
    margin: 0.5rem;
    background-color: #eee;
    padding: 0.5rem;
    border-radius: 1rem;
    font-size: 12px;
  }
`;
export default CategoryModal;
