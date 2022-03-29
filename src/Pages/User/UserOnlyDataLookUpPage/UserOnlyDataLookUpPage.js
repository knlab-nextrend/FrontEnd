import React,{useEffect} from "react";
import styled, { css } from "styled-components";
import CurationDataListContainer from "../../Common/CurationDataList/CurationDataListContainer";
function UserOnlyDataLookUpPage({ axisMenu,menuClickHandler,axisObj }) {
  useEffect(()=>{
    console.log(axisObj)
  },[axisObj])
  return (
    <Wrapper>
      <AxisTitle>사용자메뉴</AxisTitle>
      <AxisMenuBar axis="X">
        {axisMenu.X.map((category, index) => {
          return <div key={index} onClick={()=>{menuClickHandler("X",category)}}>{category.ct_nm}</div>;
        })}
      </AxisMenuBar>
      <AxisMenuBar axis="Y">
        {axisMenu.Y.map((category, index) => {
          return <div key={index} onClick={()=>{menuClickHandler("Y",category)}}>{category.ct_nm}</div>;
        })}
      </AxisMenuBar>
      <ContentBody>
        <CurationDataListContainer className="list" key={axisObj} axisObj={axisObj}/>
      </ContentBody>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
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
  justify-content: center;
  margin: 0 5rem 0 5rem;

`;


export default UserOnlyDataLookUpPage;
