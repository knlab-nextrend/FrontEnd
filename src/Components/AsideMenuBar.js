import React, { useState } from "react";
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
function AsideMenuBar({ permission }) {
  const history = useHistory();
  const go사용자수정 = () => {
    history.push("/user/");
  };
  const go크롤데이터스크리닝 = () => {
    history.push("/crawl/screening");
  };
  const go크롤데이터정제 = () => {
    history.push("/crawl/list/2");
  };
  const go크롤데이터등록 = () => {
    history.push("/crawl/list/4");
  };
  const go아카이브데이터조회 = () => {
    history.push("/archive/list");
  };
  const go큐레이션조회 = () => {
    history.push("/curation/list");
  };
  return (
    <>
      <AsideMenuBarContainer>
        <AsideMenuBarWrapper>
          {permission === 9 && (
            <AsideMenuBarItem>
              <RiDashboardFill className="icon" size="18" />
              대시보드
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem onClick={go사용자수정}>
              <RiUserSettingsFill className="icon" size="18" />
              사용자 관리
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem>
              <MdOutlineCategory className="icon" size="18" />
              카테고리 관리
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem>
              <MdWebAsset className="icon" size="18" />
              사이트 목록 관리
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem onClick={go크롤데이터스크리닝}>
              <GrFormView className="icon" size="18" />
              크롤 데이터 스크리닝
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem onClick={go크롤데이터정제}>
              <MdSettings className="icon" size="18" />
              크롤 데이터 정제
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem onClick={go크롤데이터등록}>
              <MdOutlineAdd className="icon" size="18" />
              크롤 데이터 등록
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem onClick={go아카이브데이터조회}>
              <MdCalendarViewDay className="icon" size="18" />
              아카이브 데이터 조회
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem onClick={go큐레이션조회}>
              <MdCalendarViewDay className="icon" size="18" />
              큐레이션 데이터 조회
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem>
              <MdOutlineAdd className="icon" size="18" />
              단일 데이터 등록
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem>
              <MdOutlineAdd className="icon" size="18" />
              대량 데이터 등록
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem>
              <FaBook className="icon" size="18" />
              다국어 사전 관리
            </AsideMenuBarItem>
          )}
          {permission === 9 && (
            <AsideMenuBarItem>
              <MdSettings className="icon" size="18" />
              맟춤형 화면 생성
            </AsideMenuBarItem>
          )}
          {permission === 0 && (
            <AsideMenuBarItem onClick={go큐레이션조회}>
              <MdOutlineAdd className="icon" size="18" />
              큐레이션
            </AsideMenuBarItem>
          )}
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
