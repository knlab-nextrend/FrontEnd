import React from "react";
import styled from "styled-components";
import {
  RiUserSettingsFill,
  RiLogoutBoxRLine,
  RiDashboardFill,
} from "react-icons/ri";
import {
  MdOutlineCategory,
  MdWebAsset,
  MdCalendarViewDay,
  MdOutlineAdd,
  MdSettings,
} from "react-icons/md";
import { useHistory } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
function AsideMenuBar() {
  const history = useHistory();
  const go크롤데이터스크리닝 = () => {
    history.push("/crawl/screening");
  };
  const go크롤데이터정제 = ()=>{
    history.push("/crawl/list/2") // statusCode === 2 
  }
  const go크롤데이터등록 = ()=>{
    history.push("/crawl/list/4") // statusCode === 2 
  }
  return (
    <>
      <AsideMenuBarContainer>
        <AsideMenuBarWrapper>
          <AsideMenuBarItem>
            <RiDashboardFill className="icon" size="18" />
            대시보드
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <RiUserSettingsFill className="icon" size="18" />
            사용자 관리
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdOutlineCategory className="icon" size="18" />
            카테고리 관리
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdWebAsset className="icon" size="18" />
            사이트 목록 관리
          </AsideMenuBarItem>
          <AsideMenuBarItem onClick={go크롤데이터스크리닝}>
            <GrFormView className="icon" size="18" />
            크롤 데이터 스크리닝
          </AsideMenuBarItem>
          <AsideMenuBarItem onClick={go크롤데이터정제}>
            <MdSettings className="icon" size="18" />
            크롤 데이터 정제
          </AsideMenuBarItem>
          <AsideMenuBarItem onClick={go크롤데이터등록}>
            <MdOutlineAdd className="icon" size="18" />
            크롤 데이터 등록
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdCalendarViewDay className="icon" size="18" />
            아카이브 데이터 조회
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdCalendarViewDay className="icon" size="18" />
            큐레이션 데이터 조회
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdOutlineAdd className="icon" size="18" />
            단일 데이터 등록
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdOutlineAdd className="icon" size="18" />
            대량 데이터 등록
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <FaBook className="icon" size="18" />
            다국어 사전 관리
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdSettings className="icon" size="18" />
            맟춤형 화면 생성
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <RiLogoutBoxRLine className="icon" size="18" />
            로그아웃
          </AsideMenuBarItem>
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
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #bfbfbf;
  padding: 1.5rem 1rem 1.5rem 1rem;
  font-weight: bold;
  font-size: 14px;
  border-bottom: dotted 1px #eee;
  transition: all 0.2s;
  .icon {
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: #d6d6d6;
  }
`;

export default AsideMenuBar;
