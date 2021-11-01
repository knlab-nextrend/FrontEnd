import React from "react";
import styled from "styled-components";

function AsideMenuBar() {
  return (
    <>
      <AsideMenuBarContainer>
        <AsideMenuBarWrapper>
          <AsideMenuBarItem>대쉬보드</AsideMenuBarItem>
          <AsideMenuBarItem>사용자 관리</AsideMenuBarItem>
          <AsideMenuBarItem>데이터 조회</AsideMenuBarItem>
          <AsideMenuBarItem>데이터 등록</AsideMenuBarItem>
          <AsideMenuBarItem>크롤 데이터 관리</AsideMenuBarItem>
          <AsideMenuBarItem>크롤 데이터 조회(큐레이션)</AsideMenuBarItem>
        </AsideMenuBarWrapper>
      </AsideMenuBarContainer>
    </>
  );
}

const AsideMenuBarContainer = styled.aside`
  width: 100%;
`;
const AsideMenuBarWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #eee;
  height: 100%;
`;
const AsideMenuBarItem = styled.li`
  background-color: #bfbfbf;
  padding: 1.5rem 1rem 1.5rem 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  color: black;
  border-bottom: solid 1px #eee;
  transition: all 0.2s;
  &:hover {
    background-color: #d6d6d6;
  }
`;
export default AsideMenuBar;
