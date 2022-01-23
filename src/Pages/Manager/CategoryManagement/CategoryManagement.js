import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled, { css } from "styled-components";
import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
  MdOutlineCheck,
  MdClose,
} from "react-icons/md";
function CategoryManagement({
  managementType,
  _managementTypeHandler,
  categoryEdit,
  editableCode,
  dummy,
  onChangeEditInput,
  onChangeAddInput,
  categoryEditCancel,
  text,
}) {
  return (
    <>
      <FormHeader type={"view"} title={"카테고리 관리"} />
      <Wrapper>
        <MenuContainer>
          <Menu>
            <li
              onClick={() => {
                _managementTypeHandler("정책분류");
              }}
              className={managementType === "정책분류" ? "active" : null}
            >
              정책 분류
            </li>
            <li
              onClick={() => {
                _managementTypeHandler("유형분류");
              }}
              className={managementType === "유형분류" ? "active" : null}
            >
              유형 분류
            </li>
            <li
              onClick={() => {
                _managementTypeHandler("언어");
              }}
              className={managementType === "언어" ? "active" : null}
            >
              언어
            </li>
            <li
              onClick={() => {
                _managementTypeHandler("국가");
              }}
              className={managementType === "국가" ? "active" : null}
            >
              국가
            </li>
          </Menu>
        </MenuContainer>
        <ContentContainer>
          <div className="content-title">{managementType} 카테고리 관리</div>
          <div className="content-body">
            <div>
              <ListBody>
                <ListHeader>
                  <div>대분류</div>
                  <div>중분류</div>
                  <div>소분류</div>
                </ListHeader>
                <ListContainer>
                  <ListWrapper>
                    <AddItem>
                      <input
                        onChange={onChangeAddInput}
                        placeholder="등록할 카테고리의 이름을 입력해주세요."
                      />
                      <button>등록</button>
                    </AddItem>
                    {dummy.map((item, index) => {
                      return (
                        <>
                          {editableCode === item.CT_CODE ? (
                            <EditItem>
                              <input
                                type="text"
                                onChange={onChangeEditInput}
                                value={text}
                              />
                              <div className="actions">
                                <button className="confirm">
                                  <MdOutlineCheck />
                                </button>
                                <button
                                  className="cancel"
                                  onClick={categoryEditCancel}
                                >
                                  <MdClose />
                                </button>
                              </div>
                            </EditItem>
                          ) : (
                            <ViewItem>
                              <div className="title">{item.CT_NM}</div>
                              <div className="actions">
                                <button
                                  className="edit"
                                  onClick={() => {
                                    categoryEdit(item);
                                  }}
                                >
                                  <MdOutlineModeEditOutline />
                                </button>
                                <button className="delete">
                                  <MdOutlineDeleteOutline />
                                </button>
                              </div>
                            </ViewItem>
                          )}
                        </>
                      );
                    })}
                  </ListWrapper>
                  <ListWrapper>
                    <AddItem>
                      <input
                        onChange={onChangeAddInput}
                        placeholder="등록할 카테고리의 이름을 입력해주세요."
                      />
                      <button>등록</button>
                    </AddItem>
                    <ListItem>
                      <div className="title">대분류를 먼저 선택하세요</div>
                    </ListItem>
                  </ListWrapper>
                  <ListWrapper>
                    <AddItem>
                      <input
                        onChange={onChangeAddInput}
                        placeholder="등록할 카테고리의 이름을 입력해주세요."
                      />
                      <button>등록</button>
                    </AddItem>
                    <ListItem>
                      <div className="title">중분류를 먼저 선택하세요</div>
                    </ListItem>
                  </ListWrapper>
                </ListContainer>
              </ListBody>
            </div>
          </div>
        </ContentContainer>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  color: rgb(59, 59, 59);
  background-color: #eee;
  min-height: 50rem;
`;

const LineBox = styled.div`
  /* border: solid 1px #d6d6d6;
  border-radius: 4px; */
  min-height: 30rem;
  background-color: white;
  margin: 1rem;
  border-radius: 4px;
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
`;

const MenuContainer = styled(LineBox)`
  width: 15%;
`;
const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #d6d6d6;
  }
  li:hover,
  .active {
    border-left: solid 5px #435269;
    color: #435269;
    font-weight: bold;
    background-color: rgba(67, 82, 105, 0.05);
  }
`;
const ContentContainer = styled(LineBox)`
  width: 85%;
  .content-title {
    border-bottom: 1px solid #d6d6d6;
    padding: 1rem;
    font-size: 16px;
    font-weight: bold;
  }
  .content-body {
    height: 100%;
    padding: 1rem;
  }
`;

const ListBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
  background-color: white;
  &:first-child {
    position: sticky;
    top: 0;
  }
  display: flex;
  min-height: 1.5rem;
  border-bottom: dotted 1px #eeeeee;
  justify-content: space-between;
  padding: 1rem;

  .actions {
    display: flex;
    align-items: center;
    button {
      width: 2rem;
      height: 2rem;
      margin-left: 0.5rem;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: solid 1px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;

const ViewItem = styled(ListItem)`
  .title {
    cursor: pointer;
  }
  .delete {
    background-color: #b80000;
    color: white;
  }
`;
const EditItem = styled(ListItem)`
  input {
    display: flex;
    align-items: center;
    border: solid 1px #d6d6d6;
    padding-left: 0.5rem;
    max-width: 13rem;
    border-radius: 4px;
    &:focus {
      outline: none;
    }
  }
  .confirm {
    background-color: #435269;
    color: white;
  }
`;
const AddItem = styled(ListItem)`
  display: flex;
  border-bottom: solid 1px #d6d6d6;
  input {
    align-items: center;
    border: solid 1px #d6d6d6;
    padding-left: 0.5rem;
    border-radius: 4px;
    min-width: 18rem;
    &:focus {
      outline: none;
    }
  }
  button {
    background-color: #435269;
    color: white;
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 4px;
  }
`;

export default CategoryManagement;
