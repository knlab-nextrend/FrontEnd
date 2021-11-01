import React from "react";
import styled from "styled-components";
import { RiUserSettingsFill, RiDashboardFill } from "react-icons/ri";
import { MdViewHeadline,MdOutlineAdd,MdSettings } from "react-icons/md";

function AsideMenuBar() {
  return (
    <>
      <AsideMenuBarContainer>
        <AsideMenuBarWrapper>
          <AsideMenuBarItem>
            <RiDashboardFill className="icon" size="18" />
            대쉬보드
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <RiUserSettingsFill className="icon" size="18" />
            사용자 관리
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdViewHeadline className="icon" size="18"/>
            데이터 조회
          </AsideMenuBarItem>
          <AsideMenuBarItem><MdOutlineAdd className="icon" size="18"/>데이터 등록</AsideMenuBarItem>
          <AsideMenuBarItem><MdSettings className="icon" size="18"/>크롤 데이터 관리</AsideMenuBarItem>
          <AsideMenuBarItem><MdViewHeadline className="icon" size="18"/>크롤 데이터 조회<br/>(큐레이션)</AsideMenuBarItem>
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #bfbfbf;
  padding: 1.5rem 1rem 1.5rem 1rem;
  font-weight: bold;
  font-size: 14px;
  color: black;
  border-bottom: solid 1px #eee;
  transition: all 0.2s;
  .icon{
    margin-right:0.5rem;
  }
  &:hover {
    background-color: #d6d6d6;
  }
`;
export default AsideMenuBar;
