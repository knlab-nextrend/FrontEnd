import React from "react";
import styled from "styled-components";
import { GrDocumentText } from "react-icons/gr";

function DocumentStatCard() {
  return (
    <CardWrapper>
      <div className="title">
        <div className="title-main">한국</div>
        <div className="title-sub">위 국가의 문서 작업 현황입니다.</div>
      </div>
      <div className="stat-list">
        <div className="stat">
            <div className="stat-title">스크리닝 문서 수</div>
            <div className="stat-count">14870</div>
        </div>
        <div className="stat">
            <div className="stat-title">정제 문서 수</div>
            <div className="stat-count">1480</div>
        </div>
        <div className="stat">
            <div className="stat-title">등록 문서 수</div>
            <div className="stat-count">140</div>
        </div>
        <div className="stat">
            <div className="stat-title">큐레이션 문서 수</div>
            <div className="stat-count">14</div>
        </div>
      </div>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  border-radius: 4px;
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
  background-color: white;
  color: rgb(59, 59, 59);
  .title {
    border-bottom: 1px solid #e6e9ed;
    padding: 1rem;
  }
  .title-main {
    font-size: 18px;
    padding-bottom: 0.25rem;
  }
  .title-sub {
    font-size: 12px;
    color: #939ba2;
  }
  .stat {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .stat-title {
      font-size: 14px;
    }
    .stat-count {
      font-size: 20px;
      font-weight: bold;
      color: #435269;
    }
  }
  .stat-list {
    padding: 1rem;
  }
`;
export default DocumentStatCard;
