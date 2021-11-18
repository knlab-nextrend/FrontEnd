import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FetchUsersApi, getUserInfoApi } from "../../Utils/api";

function UserModifyModal({closeModal, executeModal}) {
    const [userID,setUserID] = useState("");
    const [userPW,setUserPW] = useState("");
    const [Tel,setTel] = useState("");
    const [Position,setPosition] = useState("");
    const [Name,setName] = useState("");
    const [Email,setEmail] = useState("");
    const [Category,setCategory] = useState("");

    const userInfo = useSelector((state)=> state.modal.modalData.modal_user);

    const _userIdHandler = (e) => {
        setUserID(e.target.value);
      };
      const _userTelHandler = (e) => {
        setTel(e.target.value);
      };
      const _userNameHandler = (e) => {
        setName(e.target.value);
      };
    useEffect(()=>{
        setUserID(userInfo.userID);
        setUserPW(userInfo.userPW);
        setTel(userInfo.Tel);
        setPosition(userInfo.Position);
        setName(userInfo.Name);
        setEmail(userInfo.Email);
        setCategory(userInfo.Category);
    },[])

    return(
    <>
        <ModalWrapper>
            <div>
            <input
              value={userID}
              onChange={_userIdHandler}
              className="form"
              type="text"
            />
            <div>{userPW}</div>
            <input
              value={Tel}
              onChange={_userTelHandler}
              className="form"
              type="text"
            />
            <div>{Position}</div>
            <input
              value={Name}
              onChange={_userNameHandler}
              className="form"
              type="text"
            />
            <div>{Email}</div>
            <div>{Category}</div>
            </div>
      </ModalWrapper>
    </>
    );
}

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.25rem;
  padding: 1.5rem;
`;

export default UserModifyModal;