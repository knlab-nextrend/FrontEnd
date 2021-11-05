import React from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { RiUserSettingsFill, RiLogoutBoxRLine,RiDashboardFill } from "react-icons/ri";
import {
  MdOutlineCategory,
  MdWebAsset,
  MdCalendarViewDay,
  MdOutlineAdd,
  MdSettings,
} from "react-icons/md";
import { FaBook } from "react-icons/fa";
function AsideMenuBar() {
  let history = useHistory();

  const _goDashboard = () => {
    history.push("/dashborad");
  };
  const _goUserManagement = () => {
    history.push("/userManagement");
  };
  const _goSingleDataRegister = () => {
    history.push("/dataRegister/single");
  };
  const _goExcelDataRegister = () => {
    history.push("/dataRegister/excel");
  };
  const _goDocumentList = () => {
    history.push("/docs/list");
  };
  const _goCrawlDataList = () => {
    history.push("/crawl/list/0");
  };
  const _goCrawlCurationDataList = () => {
    history.push("/crawl/list/0");
  }; // ... 라우터 이름을 뭘로하지 ...

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
          <AsideMenuBarItem>
            <MdCalendarViewDay className="icon" size="18" />
            크롤 데이터 조회
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdSettings className="icon" size="18" />
            크롤 데이터 정제
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdOutlineAdd className="icon" size="18" />
            크롤 데이터 등록
          </AsideMenuBarItem>
          <AsideMenuBarItem>
            <MdCalendarViewDay className="icon" size="18" />
            데이터 조회
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
  border-bottom: solid 1px #eee;
  transition: all 0.2s;
  .icon {
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: #d6d6d6;
  }
`;
const AsideMenuBarSubWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: center;
  cursor: pointer;
  .icon {
    margin-right: 0.5rem;
  }
  .subWrapperTitle {
    margin: 0;
    background-color: #bfbfbf;
    padding: 1.5rem 1rem 1.5rem 1rem;
    font-weight: bold;
    font-size: 14px;
    border-bottom: solid 1px #eee;
    transition: all 0.2s;
    &:hover {
      background-color: #d6d6d6;
    }
  }
`;
const AsideMenuBarSubItem = styled.li`
  background-color: #eee;
  padding: 1.5rem 1rem 1.5rem 1rem;
  font-weight: bold;
  font-size: 14px;
  border-bottom: solid 1px #f9f9f9;
  transition: all 0.2s;
  ${(props) =>
    props.active
      ? css`
          display: block;
        `
      : css`
          display: none;
        `};
  &:hover {
    transition: all 0.2s;
    background-color: #ffffff;
  }
`;
export default AsideMenuBar;
