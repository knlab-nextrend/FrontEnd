import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import {
  modifyUserInfoApi,
  addUserApi,
  verifyUserIdApi,
} from "../../Utils/api";
import permission from "../../Data/permission.json";

function UserInfoModal({ closeModal, executeModal }) {
  const [id, setID] = useState("");
  const [userID, setUserID] = useState("");
  const [idMsg, setIdMsg] = useState(null);

  const [userPW, setUserPW] = useState("");
  const [userPWCheck, setUserPWCheck] = useState("");
  const [salt, setSalt] = useState("");
  const [Tel, setTel] = useState("");
  const [Position, setPosition] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Category, setCategory] = useState(0);

  const [confirm, setConfirm] = useState(false);

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
  const _userPWCheckHandler = (e) => {
    setUserPWCheck(e.target.value);
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
    setConfirm(userInfo.Confirm || "");
  }, []);

  const _userIDdVerify = () => {
    if (userID !== "") {
      verifyUserIdApi(userID, id)
        .then(() => {
          setIdMsg("사용가능한 ID입니다.");
          setConfirm(true);
        })
        .catch((err) => {
          setIdMsg("이미 존재하는 ID입니다.");
        });
    } else {
      setIdMsg("사용할 아이디를 입력해주세요.");
    }
  };
  const _userPWVerify = () => {
    if (userPW !== "" && userPW !== userPWCheck) {
      return false;
    }
    return true;
  };
  const _fieldCheck = () => {
    /* userID, userPW, userPWCheck, Email, Name, category 는 필수필드 */
    /* 필수 필드 조건을 모두 만족하였다면 true를 반환, 그렇지 않다면 false를 반환하도록 함.*/
    return (
      userID !== "" &&
      userPW !== "" &&
      userPWCheck !== "" &&
      Email !== "" &&
      Name !== ""
    );
  };

  const _confirmCheck = () => {
    if (confirm) {
      if (_fieldCheck()) {
        if (_userPWVerify()) {
          return true;
        } else {
          alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          return false;
        }
      } else {
        alert("필수필드를 모두 입력해주세요");
        return false;
      }
    } else {
      alert("사용할 아이디를 확인하여주세요.");
      return false;
    }
  };
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
    if (_confirmCheck()) {
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
    }
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

    if (_confirmCheck()) {
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
    }
  };

  return (
    <>
      <ModalWrapper>
        <Modalheader>
          <ModalTitle>사용자{type ? " 추가" : " 정보 수정"}</ModalTitle>
          <ModalSubTitle>
            {"아래 데이터를 입력한 후 확인을 누르면 정보가 반영됩니다."}
          </ModalSubTitle>
        </Modalheader>
        <ModalBody>
          <InputWrapper>
            <InputFieldWrapper>
              <InputTitle required>아이디</InputTitle>
              <InputField
                value={userID}
                onChange={_userUserIDHandler}
                type="text"
              />
              <Button color="#435269" onClick={_userIDdVerify}>
                중복확인
              </Button>
            </InputFieldWrapper>
            <Message>{idMsg}</Message>
          </InputWrapper>

          <InputWrapper>
            <InputFieldWrapper>
              <InputTitle required>
                {type ? "비밀번호" : "새 비밀번호"}
              </InputTitle>
              <InputField onChange={_userUserPWHandler} type="text" />
            </InputFieldWrapper>
          </InputWrapper>

          <InputWrapper>
            <InputFieldWrapper>
              <InputTitle required>비밀번호 확인</InputTitle>
              <InputField onChange={_userPWCheckHandler} type="text" />
            </InputFieldWrapper>
          </InputWrapper>
          <InputWrapper>
            <InputFieldWrapper>
              <InputTitle>전화번호</InputTitle>
              <InputField value={Tel} onChange={_userTelHandler} type="text" />
            </InputFieldWrapper>
          </InputWrapper>
          <InputWrapper>
            <InputFieldWrapper>
              <InputTitle>직책</InputTitle>
              <InputField
                value={Position}
                onChange={_userPositionHandler}
                type="text"
              />
            </InputFieldWrapper>
          </InputWrapper>
          <InputWrapper>
            <InputFieldWrapper>
              <InputTitle required>사용자 이름</InputTitle>
              <InputField
                value={Name}
                onChange={_userNameHandler}
                type="text"
              />
            </InputFieldWrapper>
          </InputWrapper>

          <InputWrapper>
            <InputFieldWrapper>
              <InputTitle required>이메일</InputTitle>
              <InputField
                value={Email}
                onChange={_userEmailHandler}
                type="text"
              />
            </InputFieldWrapper>
          </InputWrapper>

          <InputWrapper>
            <InputFieldWrapper>
              <InputTitle required>사용자 권한</InputTitle>
              <SelectField onChange={_userCategoryHandler} value={Category}>
                {permission.permission.map((item, index) => {
                  return (
                    <option value={item.permission_code} key={index}>
                      {item.permission_name}
                    </option>
                  );
                })}
              </SelectField>
            </InputFieldWrapper>
          </InputWrapper>
        </ModalBody>
        <ModalActions>
          <Button color="#435269" onClick={type ? _addUser : _modifyUser}>
            저장
          </Button>
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
  height: 100%;
  padding: 0.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0.5rem 0 0.5rem 0;
  width: 60%;
`;
const InputTitle = styled.div`
  min-width: 7rem;
  ${({ required }) =>
    required &&
    css`
      &:before {
        content: "*";
        margin-right: 4px;
        font-size: 16px;
        color: red;
      }
    `};
`;
const InputFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2rem;
`;
const InputField = styled.input`
  padding-left: 0.5rem;
  border-radius: 4px;
  border: solid 1px #d6d6d6;
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
  }
`;

const SelectField = styled.select`
  padding-left: 0.5rem;
  border-radius: 4px;
  border: solid 1px #d6d6d6;
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
  }
`;
const Message = styled.div`
  color: red;
  text-align: left;
  margin-top: 4px;
`;
const ModalWrapper = styled.div`
  font-size: 14px;
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
    height: 1.5rem;
    border: solid 1px #d6d6d6;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 10px;
  }
  select {
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
