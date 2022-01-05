import React from "react";
import styled from "styled-components";

function UserSelectCard() {
  return (
    <CardWrapper>
      <div className="title">
        <select className="user-select">
          <option>전체</option>
          <option>스크리닝 작업자</option>
          <option>정제 작업자</option>
          <option>작업자 2</option>
        </select>
        <div className="sub">의 통계를 나타낸 대시보드 입니다.</div>
      </div>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  margin: 1rem 0.5rem 1rem 0.5rem;
  border-radius: 4px;
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
  background-color: white;
  color: rgb(59, 59, 59);
  display: flex;
  padding: 1rem;
  .title {
    display: flex;
    align-items: center;
  }
  .user-select {
    font-size: 18px;
    color: rgb(59, 59, 59);
    margin-right: 0.5rem;
    border: none;
    &:focus {
      outline: none;
    }
    & option{
        font-size:12px;
    }
  }
  .sub {
    font-size: 14px;
    color: #939ba2;
  }
  .content {
    height: 100%;
  }
  ul {
    display: flex;
    margin: 0;
    padding: 0;
  }
`;

export default UserSelectCard;
