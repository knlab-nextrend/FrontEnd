import React, { useState } from "react";
import styled from "styled-components";
import { RiUserSettingsFill, RiLogoutBoxRLine } from "react-icons/ri";
import {
  MdOutlineDashboard,
  MdOutlineCategory,
  MdWebAsset,
  MdCalendarViewDay,
  MdOutlineAdd,
  MdSettings,
  MdUpload,
} from "react-icons/md";
import { useHistory, NavLink } from "react-router-dom";
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
  const go엑셀데이터등록 = () => {
    history.push("/excel/register");
  };

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setLogout("NORMAL_LOGOUT"));
  };
  return (
    <>
      <AsideMenuBarContainer>
        <AsideMenuBarWrapper>
          <AsideMenuGroup>
            <div className="group-title">DASH BOARD</div>
            <div className="group-menu">
              {PERMISSON_DATA[permission] === "관리자" && (
                <li>
                  <AsideMenuBarItem to="/">
                    <div className="icon-container">
                      <MdOutlineDashboard color="#435269" size="16" />
                    </div>
                    대시보드
                  </AsideMenuBarItem>
                </li>
              )}
            </div>
          </AsideMenuGroup>
          <AsideMenuGroup>
            <div className="group-title">DATA UPLOAD</div>
            <div className="group-menu">
              {PERMISSON_DATA[permission] === "관리자" && (
                <li>
                  <AsideMenuBarItem to="/excel/register">
                    <div className="icon-container">
                      <MdUpload className="icon" size="16" color="#435269" />
                    </div>
                    엑셀 데이터 등록
                  </AsideMenuBarItem>
                </li>
              )}
            </div>
          </AsideMenuGroup>
          <AsideMenuGroup>
            <div className="group-title">CRAWL DATA WORK</div>
            <div className="group-menu">
              {PERMISSON_DATA[permission] !== "사용자" &&
                PERMISSON_DATA[permission] !== "정제 작업자" && (
                  <li>
                    <AsideMenuBarItem to="/crawl/screening">
                      <div className="icon-container">
                        <GrFormView color="#435269" size="16" />
                      </div>
                      크롤 데이터 스크리닝
                    </AsideMenuBarItem>
                  </li>
                )}
              {PERMISSON_DATA[permission] !== "사용자" && (
                <li>
                  <AsideMenuBarItem onClick={go크롤데이터정제}>
                    <div className="icon-container">
                      <MdSettings color="#435269" size="16" />
                    </div>
                    크롤 데이터 정제
                  </AsideMenuBarItem>
                </li>
              )}
              {PERMISSON_DATA[permission] !== "사용자" &&
                PERMISSON_DATA[permission] !== "정제 작업자" && (
                  <li>
                    <AsideMenuBarItem onClick={go크롤데이터등록}>
                      <div className="icon-container">
                        <MdOutlineAdd color="#435269" size="16" />
                      </div>
                      크롤 데이터 등록 (아카이빙)
                    </AsideMenuBarItem>
                  </li>
                )}
              {(PERMISSON_DATA[permission] === "관리자" ||
                PERMISSON_DATA[permission] === "큐레이션 작업자") && (
                <li>
                  <AsideMenuBarItem onClick={go아카이브데이터조회}>
                    <div className="icon-container">
                      <MdCalendarViewDay size="16" color="#435269" />
                    </div>
                    큐레이션 데이터 등록 (아카이브 데이터 조회)
                  </AsideMenuBarItem>
                </li>
              )}
              {(PERMISSON_DATA[permission] === "관리자" ||
                PERMISSON_DATA[permission] === "큐레이션 작업자") && (
                <li>
                  <AsideMenuBarItem onClick={go큐레이션조회}>
                    <div className="icon-container">
                      <MdOutlineAdd size="16" color="#435269" />
                    </div>
                    큐레이션
                  </AsideMenuBarItem>
                </li>
              )}
            </div>
          </AsideMenuGroup>
          <AsideMenuGroup>
            <div className="group-title">CATEGORY MANAGE</div>
            <div className="group-menu">
              {PERMISSON_DATA[permission] === "관리자" && (
                <li>
                  <AsideMenuBarItem>
                    <div className="icon-container">
                      <MdOutlineCategory color="#435269" size="16" />
                    </div>
                    카테고리 관리
                  </AsideMenuBarItem>
                </li>
              )}
              {PERMISSON_DATA[permission] === "관리자" && (
                <li>
                  <AsideMenuBarItem>
                    <div className="icon-container">
                      <MdWebAsset color="#435269" size="16" />
                    </div>
                    사이트 목록 관리
                  </AsideMenuBarItem>
                </li>
              )}
              {PERMISSON_DATA[permission] === "관리자" && (
                <li>
                  <AsideMenuBarItem>
                    <div className="icon-container">
                      <FaBook size="16" color="#435269" />
                    </div>
                    다국어 사전 관리
                  </AsideMenuBarItem>
                </li>
              )}
            </div>
          </AsideMenuGroup>
          <AsideMenuGroup>
            <div className="group-title">SETTING</div>
            <div className="group-menu">
              {PERMISSON_DATA[permission] === "관리자" && (
                <li>
                  <AsideMenuBarItem onClick={go사용자수정}>
                    <div className="icon-container">
                      <RiUserSettingsFill color="#435269" size="16" />
                    </div>
                    사용자 관리
                  </AsideMenuBarItem>
                </li>
              )}

              {PERMISSON_DATA[permission] === "관리자" && (
                <li>
                  <AsideMenuBarItem>
                    <div className="icon-container">
                      <MdSettings size="16" color="#435269" />
                    </div>
                    맟춤형 화면 생성
                  </AsideMenuBarItem>
                </li>
              )}
            </div>
          </AsideMenuGroup>

          {PERMISSON_DATA[permission] === "사용자" && (
            <li>
              <AsideMenuBarItem onClick={go큐레이션조회}>
                <div className="icon-container">
                  <MdOutlineAdd size="16" color="#435269" />
                </div>
                큐레이션
              </AsideMenuBarItem>
            </li>
          )}
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
const AsideMenuGroup = styled.div`
  background-color: #435269;
  padding: 1rem;

  .group-title {
    padding: 0 1rem 1rem 1rem;
    color: white;
    font-size: 12px;
  }
  .group-menu {
    color: white;
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  }
`;

const AsideMenuBarItem = styled(NavLink)`
  cursor: pointer;
  display: flex;

  align-items: center;
  padding: 1rem;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.2s;
  color: #eee;
  word-break: keep-all;

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    min-height: 32px;
    border-radius: 32px;
    background-color: white;
    margin-right: 1rem;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

/*
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

*/
export default AsideMenuBar;
