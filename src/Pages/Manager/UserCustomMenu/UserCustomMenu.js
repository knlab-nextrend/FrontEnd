import React from "react";
import styled from "styled-components";
import FormHeader from "../../../Components/FormHeader";
function UserCustomMenu({USER_DATA,currentUserId,setCurrentUserId}) {
  return (
    <>
      <FormHeader type={"view"} title={"맞춤형 화면 생성"} />
      <Wrapper>
        <UserListCard>
          <div className="title">
            <div className="title-main">사용자 목록</div>
            <div className="title-sub">
              사용자 맞춤형 화면을 생성 또는 수정하시려면 사용자 목록에서
              사용자를 클릭하세요.
            </div>
          </div>
          <div className="content">
            {USER_DATA.map((user,index)=>{
              return ( <UserCard key={index} active={user.uid === currentUserId} onClick={()=>{setCurrentUserId(user.uid)}}>
                <div className="name-and-id">
                  <div className="name">{user.name}</div>
                  <div className="id">{user.id}</div>
                </div>
                <div className="company">{user.company} / {user.role}</div>
              </UserCard>)
            })}
          </div>
        </UserListCard>
        <MenuCustomCard>
          <div className="title">
            <div className="title-main">사용자 맞춤형 X축 및 Y축 설정</div>
            <div className="title-sub">
              사용자 맞춤형 X축 및 Y축 메뉴 설정
            </div>
          </div>
          <div className="content"></div>
        </MenuCustomCard>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 1rem;
  font-size: 14px;
  min-height: 1280px;
  background-color: #eee;
  color: rgb(59, 59, 59);
`;

const CardWrapper = styled.div`
  margin: 1rem 0.5rem 1rem 0.5rem;
  border-radius: 4px;
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
  background-color: white;
  height: 100%;
  .title {
    font-weight: bold;
    border-bottom: 1px solid #e6e9ed;
    padding: 1rem;
  }
  .title-main {
    font-size: 18px;
    color: rgb(59, 59, 59);
    padding-bottom: 0.25rem;
  }
  .title-sub {
    font-size: 12px;
    color: #939ba2;
  }
  .content {
    padding: 1rem;
    height: 100%;
  }
`;

const MenuCustomCard = styled(CardWrapper)`
  width: 80%;
  .content {
    height: 35rem;
  }
`;
const UserListCard = styled(CardWrapper)`
  width: 20%;
  .content {
    background-color: #f6f6f6;
    height: 35rem;
    overflow: scroll;
  }
`;
const UserCard = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-left: ${(props) => (props.active ? "solid 5px #435269" : null)};
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  .name-and-id {
    display: flex;
  }
  .name {
    color: #009999;
    font-weight: bold;
    font-size: 16px;
    margin-right: 1rem;
  }
  .id {
    color: #939ba2;
  }
  .company {
    font-size: 12px;
    margin-top: 0.25rem;
  }
`;
export default UserCustomMenu;
