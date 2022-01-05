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
  MdUpload
} from "react-icons/md";
import { useHistory } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { setLogout } from "../Modules/login";

function AsideMenuBar({ permission }) {
  const PERMISSON_DATA = {
    0: "사용자",
    1: "스크리닝 작업자",
    2: "정제 작업자",
    3: "등록 작업자",
    4: "큐레이션 작업자",
    9: "관리자",
  };
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
  const go엑셀데이터등록 = ()=>{
    history.push("/excel/register");
  }

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setLogout("NORMAL_LOGOUT"));
  };
  return (
    <>
      <AsideMenuBarContainer>
        <AsideMenuBarWrapper>
          {PERMISSON_DATA[permission] === "관리자" && (
            <AsideMenuBarItem>
              <RiDashboardFill className="icon" size="18" />
              대시보드
            </AsideMenuBarItem>
          )}
          {PERMISSON_DATA[permission] === "관리자" && (
            <AsideMenuBarItem onClick={go사용자수정}>
              <RiUserSettingsFill className="icon" size="18" />
              사용자 관리
            </AsideMenuBarItem>
          )}
          {PERMISSON_DATA[permission] === "관리자" && (
            <AsideMenuBarItem>
              <MdOutlineCategory className="icon" size="18" />
              카테고리 관리
            </AsideMenuBarItem>
          )}
          {PERMISSON_DATA[permission] === "관리자" && (
            <AsideMenuBarItem>
              <MdWebAsset className="icon" size="18" />
              사이트 목록 관리
            </AsideMenuBarItem>
          )}
          {PERMISSON_DATA[permission] !== "사용자" &&
            PERMISSON_DATA[permission] !== "정제 작업자" && (
              <AsideMenuBarItem onClick={go크롤데이터스크리닝}>
                <GrFormView className="icon" size="18" />
                크롤 데이터 스크리닝
              </AsideMenuBarItem>
            )}
          {PERMISSON_DATA[permission] !== "사용자" && (
            <AsideMenuBarItem onClick={go크롤데이터정제}>
              <MdSettings className="icon" size="18" />
              크롤 데이터 정제
            </AsideMenuBarItem>
          )}
          {PERMISSON_DATA[permission] !== "사용자" &&
            PERMISSON_DATA[permission] !== "정제 작업자" && (
              <AsideMenuBarItem onClick={go크롤데이터등록}>
                <MdOutlineAdd className="icon" size="18" />
                크롤 데이터 등록 (아카이빙)
              </AsideMenuBarItem>
            )}
          {(PERMISSON_DATA[permission] === "관리자" ||
            PERMISSON_DATA[permission] === "큐레이션 작업자") && (
            <AsideMenuBarItem onClick={go아카이브데이터조회}>
              <MdCalendarViewDay className="icon" size="18" />
                큐레이션 데이터 등록 (아카이브 데이터 조회)
            </AsideMenuBarItem>
          )}
          {(PERMISSON_DATA[permission] === "관리자" ||
            PERMISSON_DATA[permission] === "큐레이션 작업자") && (
            <AsideMenuBarItem onClick={go큐레이션조회}>
              <MdCalendarViewDay className="icon" size="18" />
              큐레이션 데이터 조회
            </AsideMenuBarItem>
          )}
          {PERMISSON_DATA[permission] === "관리자" && (
            <AsideMenuBarItem onClick={go엑셀데이터등록}>
              <MdUpload className="icon" size="18" />
              엑셀 데이터 등록
            </AsideMenuBarItem>
          )}
          {PERMISSON_DATA[permission] === "관리자" && (
            <AsideMenuBarItem>
              <FaBook className="icon" size="18" />
              다국어 사전 관리
            </AsideMenuBarItem>
          )}
          {PERMISSON_DATA[permission] === "관리자" && (
            <AsideMenuBarItem>
              <MdSettings className="icon" size="18" />
              맟춤형 화면 생성
            </AsideMenuBarItem>
          )}
          {PERMISSON_DATA[permission] === "사용자" && (
            <AsideMenuBarItem onClick={go큐레이션조회}>
              <MdOutlineAdd className="icon" size="18" />
              큐레이션
            </AsideMenuBarItem>
          )}
          <AsideMenuBarItem onClick={logout}>
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
