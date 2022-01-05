import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

function ProcessMenu() {
  /* 
    all : 전체
    collect : 수집
    screening : 스크리닝
    refine : 정제
    archive : 등록(아카이브)
    curation : 큐레이션

  */
  const [process, setProcess] = useState("all");
  const _processHandler = (value) => {
    console.log(value);
    setProcess(value, process);
  };

  useEffect(() => {
    console.log(process);
  }, [process]);
  return (
    <CardWrapper>
      <div className="title">
        <div className="title-main">단계 선택</div>
        <div className="title-sub">통계를 확인할 단계를 선택하세요.</div>
      </div>
      <ul>
        <MenuItem
          onClick={() => {
            _processHandler("all");
          }}
          active={process === "all"}
        >
          전체
        </MenuItem>
        <MenuItem
          onClick={() => {
            _processHandler("collect");
          }}
          active={process === "collect"}
        >
          수집
        </MenuItem>
        <MenuItem
          onClick={() => {
            _processHandler("screening");
          }}
          active={process === "screening"}
        >
          스크리닝
        </MenuItem>
        <MenuItem
          onClick={() => {
            _processHandler("refine");
          }}
          active={process === "refine"}
        >
          정제
        </MenuItem>
        <MenuItem
          onClick={() => {
            _processHandler("register");
          }}
          active={process === "register"}
        >
          등록(아카이브)
        </MenuItem>
        <MenuItem
          onClick={() => {
            _processHandler("curation");
          }}
          active={process === "curation"}
        >
          큐레이션
        </MenuItem>
      </ul>
    </CardWrapper>
  );
}
const CardWrapper = styled.div`
  margin: 1rem 0.5rem 0 0.5rem;
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
  ul {
    display: flex;
    margin: 0;
    padding: 0;
  }
`;
const MenuItem = styled.li`
  height: 100%;
  text-align: center;
  min-width: 150px;
  list-style-type: none;
  padding: 1rem 1.5rem 1rem 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #435269;
    color: white;
    font-weight: bold;
  }
  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => (props.active ? "#435269" : "white")};
      color: white;
      font-weight: bold;
    `};
`;

export default ProcessMenu;
