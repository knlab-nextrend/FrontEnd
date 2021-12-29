import React from "react";
import styled from "styled-components";

function Menu() {
  return (
    <CardWrapper>
      <div className="title">
        <div className="title-main">국가별 문서 현황</div>
        <div className="title-sub">
          국가를 클릭하면 해당 국가에 대한 문서 작업 현황을 확인할 수 있습니다.
        </div>
      </div>
      <div className="content">
        <ul>
          <li>전체</li>
          <li>스크리닝</li>
          <li>정제</li>
          <li>아카이빙(등록)</li>
          <li>큐레이션</li>
        </ul>
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
  .title-sub {
    font-size: 12px;
    color: #939ba2;
  }
  .content {
    height: 100%;
  }
`;

export default Menu;
