import React from "react";
import styled, { css } from "styled-components";
import CurationLookUp from "./CurationLookUp";
function UserOnlyDataLookUpPage({ axisMenu }) {
  return (
    <Wrapper>
      <AxisTitle>사용자메뉴</AxisTitle>
      <AxisMenuBar axis="X">
        {axisMenu.X.map((category, index) => {
          return <div key={index}>{category.ct_nm}</div>;
        })}
      </AxisMenuBar>
      <AxisMenuBar axis="Y">
        {axisMenu.Y.map((category, index) => {
          return <div key={index}>{category.ct_nm}</div>;
        })}
      </AxisMenuBar>
      <ContentBody>
        <CurationLookUp />
      </ContentBody>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 8fr;
  grid-template-rows: 50px minmax(1280px, auto);
`;
const AxisTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  color: #009999;
  font-weight: bold;
`;
const AxisMenuBar = styled.div`
  ${(props) =>
    props.axis === "X" &&
    css`
      display: flex;
      align-items: center;
      flex-direction: row;
      color: white;
      background-color: #435269;
      grid-column: 2 / 3;
      grid-row: 1 / 2;
      div {
        display: flex;
        align-items: center;
        height: 100%;
        padding-left: 2rem;
        padding-right: 2rem;
        text-align: center;
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    `}
  ${(props) =>
    props.axis === "Y" &&
    css`
      display: flex;
      flex-direction: column;
      background-color: #eee;
      grid-column: 1 / 2;
      grid-row: 2 / 3;
      div {
        padding: 1rem 0.5rem 1rem 0.5rem;
        text-align: center;
        &:hover {
          background-color: #d6d6d6;
        }
      }
    `}
`;

const ContentBody = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  width: 100%;
  justify-content: center;
`;
export default UserOnlyDataLookUpPage;
