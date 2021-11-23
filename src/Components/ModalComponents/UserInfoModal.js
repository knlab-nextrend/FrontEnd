import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { modifyUserInfoApi, addUserApi } from "../../Utils/api";

function UserInfoModal({ closeModal, executeModal }) {
  const [id, setID] = useState("");
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [salt, setSalt] = useState("");
  const [Tel, setTel] = useState("");
  const [Position, setPosition] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Category, setCategory] = useState("");

  const userInfo = useSelector(
    (state) => state.modal.modalData.modal_user.user
  );
  const type = useSelector((state) => state.modal.modalData.modal_user.type);

  const _userUserIDHandler = (e) => {
    setUserID(e.target.value);
  };
  const _userTelHandler = (e) => {
    setTel(e.target.value);
  };
  const _userNameHandler = (e) => {
    setName(e.target.value);
  };
  const _userUserPWHandler = (e) => {
    setUserPW(e.target.value);
  };
  const _userPositionHandler = (e) => {
    setPosition(e.target.value);
  };
  const _userEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const _userCategoryHandler = (e) => {
    setCategory(e.target.value);
  };
  useEffect(() => {
    setUserID(userInfo.userID || "");
    setID(userInfo.id || "");
    setUserPW(userInfo.userPW || "");
    setTel(userInfo.Tel || "");
    setPosition(userInfo.Position || "");
    setName(userInfo.Name || "");
    setEmail(userInfo.Email || "");
    setCategory(userInfo.Category || "");
    setSalt(userInfo.salt || "");
  }, []);

  const _addUser = () => {
    let userInfo = {
      userID,
      userPW,
      Tel,
      Position,
      Name,
      Email,
      Category,
      salt,
    };
    addUserApi(userInfo)
      .then(() => alert("성공적으로 생성되었습니다."))
      .catch((err) => {
        if (err.response.status === 400) {
          alert("추가 중 오류발생");
        } else {
          console.log(err.response);
        }
      });
    closeModal();
    window.location.reload();
  };

  const _modifyUser = () => {
    let userInfo = {
      userID,
      userPW,
      Tel,
      Position,
      Name,
      Email,
      Category,
      salt,
    };
    modifyUserInfoApi(userInfo, id)
      .then(() => alert("성공적으로 저장되었습니다."))
      .catch((err) => {
        if (err.response.status === 400) {
          alert("변경 중 오류발생");
        }
      });
    closeModal();
    window.location.reload();
  };

  return (
    <>
      <ModalWrapper>
        <Modalheader>
          <ModalTitle>사용자{type ? " 추가" : " 정보 수정"}</ModalTitle>
          <ModalSubTitle>
            {"아래 데이터를 변경 후 저장 버튼을 누르면 변경 사항이 저장됩니다."}
          </ModalSubTitle>
        </Modalheader>
        <ModalBody>
          <InputContainer>
            <p className="title">아이디</p>
            <input
              value={userID}
              onChange={_userUserIDHandler}
              className="form"
              type="text"
            />
          </InputContainer>
          <InputContainer>
            {type && (
              <>
                <p className="title">비밀번호</p>
                <input
                  value={userPW}
                  onChange={_userUserPWHandler}
                  className="form"
                  type="text"
                />
              </>
            )}
          </InputContainer>
          <InputContainer>
            <p className="title">전화번호</p>
            <input
              value={Tel}
              onChange={_userTelHandler}
              className="form"
              type="text"
            />
          </InputContainer>
          <InputContainer>
            <p className="title">직책</p>
            <input
              value={Position}
              onChange={_userPositionHandler}
              className="form"
              type="text"
            />
          </InputContainer>
          <InputContainer>
            <p className="title">사용자 이름</p>
            <input
              value={Name}
              onChange={_userNameHandler}
              className="form"
              type="text"
            />
          </InputContainer>
          <InputContainer>
            <p className="title">이메일</p>
            <input
              value={Email}
              onChange={_userEmailHandler}
              className="form"
              type="text"
            />
          </InputContainer>
          <InputContainer>
            <p className="title">사용자 권한</p>
            <input
              value={Category}
              onChange={_userCategoryHandler}
              className="form"
              type="text"
            />
          </InputContainer>
        </ModalBody>
        <ModalActions>
          <Button onClick={type ? _addUser : _modifyUser}>저장</Button>
        </ModalActions>
      </ModalWrapper>
    </>
  );
}

const Button = styled.button`
  background-color: ${(props) => props.color || "grey"};
  cursor: pointer;
  min-width: 5rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  margin: 0 0.5rem 0 0.5rem;
  padding: 1rem;
`;

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
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  p {
    width: 7rem;
  }
  input {
    height: 2rem;
    border: solid 1px #d6d6d6;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 10px;
  }
`;
const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export default UserInfoModal;
