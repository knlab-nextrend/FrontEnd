import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { modifyUserInfoApi,addUserApi } from "../../Utils/api";

function UserInfoModal({closeModal, executeModal}) {
    const [id,setID] = useState("");
    const [userID,setUserID] = useState("");
    const [userPW,setUserPW] = useState("");
    const [salt,setSalt] = useState("");
    const [Tel,setTel] = useState("");
    const [Position,setPosition] = useState("");
    const [Name,setName] = useState("");
    const [Email,setEmail] = useState("");
    const [Category,setCategory] = useState("");

    const userInfo = useSelector((state)=> state.modal.modalData.modal_user.user);
    const type = useSelector((state)=> state.modal.modalData.modal_user.type);

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
    useEffect(()=>{
        setUserID(userInfo.userID||"");
        setID(userInfo.id||"");
        setUserPW(userInfo.userPW||"");
        setTel(userInfo.Tel||"");
        setPosition(userInfo.Position||"");
        setName(userInfo.Name||"");
        setEmail(userInfo.Email||"");
        setCategory(userInfo.Category||"");
        setSalt(userInfo.salt||"");
    },[])

    const _addUser = () =>{
      let userInfo = {
        userID,
        userPW,
        Tel,
        Position,
        Name,
        Email,
        Category,
        salt
      };
      addUserApi(userInfo)
      .then(()=>alert("성공적으로 생성되었습니다."))
      .catch((err)=>{
        if(err.response.status ===400){
          alert("추가 중 오류발생");
        }else{
          console.log(err.response);
        }
      })
      closeModal();
      window.location.reload();
    }

    const _modifyUser = () => {
      let userInfo = {
        userID,
        userPW,
        Tel,
        Position,
        Name,
        Email,
        Category,
        salt
      };
      modifyUserInfoApi(userInfo,id)
      .then(()=>alert("성공적으로 저장되었습니다."))
      .catch((err)=>{
        if(err.response.status ===400){
          alert("변경 중 오류발생");
        }
      })
      closeModal();
      window.location.reload();
    };

    return(
    <>
        <ModalWrapper>
            <div>
            <p className="title">아이디</p>
            <input
              value={userID}
              onChange={_userUserIDHandler}
              className="form"
              type="text"
            />
            {type&&<p className="title">비밀번호</p>}
            {type&&<input
              value={userPW}
              onChange={_userUserPWHandler}
              className="form"
              type="text"
            />}
            <p className="title">전화번호</p>
            <input
              value={Tel}
              onChange={_userTelHandler}
              className="form"
              type="text"
            />
            <p className="title">직책</p>
            <input
              value={Position}
              onChange={_userPositionHandler}
              className="form"
              type="text"
            />
            <p className="title">이름</p>
            <input
              value={Name}
              onChange={_userNameHandler}
              className="form"
              type="text"
            />
            <p className="title">Email</p>
            <input
              value={Email}
              onChange={_userEmailHandler}
              className="form"
              type="text"
            />
            <p className="title">Category</p>
            <input
              value={Category}
              onChange={_userCategoryHandler}
              className="form"
              type="text"
            />
            </div>
            <Button onClick={type?_addUser:_modifyUser}>전송</Button>
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

export default UserInfoModal;