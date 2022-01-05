import React from "react";
import styled from "styled-components";
function WorkStatCard() {
  return (
    <CardWrapper>
      <div className="title">
        <div className="title-main">작업량 통계</div>
        <div className="toggle-button">
          <input
            type="radio"
            name="date-type"
            id="all"
            value="all"
            checked={true}
          />
          <label htmlFor="all">전체</label>
          <input type="radio" name="date-type" id="today" value="today" />
          <label htmlFor="today">오늘</label>
        </div>
      </div>
      <div className="content">
        <StatContainer>
          <div className="stat-name">수집</div>
          <div className="stat-count">100000</div>
        </StatContainer>
        <StatContainer>
          <div className="stat-name">스크리닝</div>
          <div className="stat-count">10000</div>
        </StatContainer>
        <StatContainer>
          <div className="stat-name">정제</div>
          <div className="stat-count">1000</div>
        </StatContainer>
        <StatContainer>
          <div className="stat-name">등록(아카이브)</div>
          <div className="stat-count">100</div>
        </StatContainer>
        <StatContainer>
          <div className="stat-name">큐레이션</div>
          <div className="stat-count">10</div>
        </StatContainer>
      </div>
    </CardWrapper>
  );
}
const CardWrapper = styled.div`
  margin: 1rem 0.5rem 1rem 0.5rem;
  border-radius: 4px;
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
  background-color: white;
  .title {
    border-bottom: 1px solid #e6e9ed;
    padding: 1rem;
  }
  .title-main {
    font-size: 18px;
    color: rgb(59, 59, 59);
    padding-bottom: 0.25rem;
  }
  .toggle-button {
    display: inline-block;
    padding: 8px;
    background-color: #eee;
    font-size: 12px;
    border-radius: 0.5rem;

    label {
      padding: 0.25rem 0.5rem 0.25rem 0.5rem;
      cursor:pointer;
    }
    input[type="radio"] {
      display: none;
    }
    input[type="radio"]:checked + label {
      transition: ease-in-out 0.2s;
      background-color: rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
      color: white;
      border-radius: 0.5rem;
    }
  }
  .content {
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;
const StatContainer = styled.div`
  margin: 0.5rem;
  width: 8rem;
  padding: 1rem;
  border-right: solid 1px #eee;
  &:nth-child(1) {
    border-left: solid 1px #eee;
  }
  .stat-name {
    color: rgb(59, 59, 59);
    font-size: 14px;
    font-weight: bold;
  }
  .stat-count {
    font-size: 20px;
    font-weight: bold;
    color: #435269;
  }
`;
export default WorkStatCard;
