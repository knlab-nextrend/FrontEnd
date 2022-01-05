import React from "react";
import TitleCard from "./TitleCard";
import styled from "styled-components";

function TableCard({ title, subtitle }) {
  return (
    <CardWrapper>
      <div className="title">
        <div className="title-main">{title}</div>
        <div className="title-sub">{subtitle}</div>
      </div>
      <div className="content">
          <table>
              <tr className="table-header">
                  <th>작업자 ID</th>
                  <th>이름</th>
                  <th>권한</th>
                  <th>소속</th>
                  <th>직책</th>
                  <th>작업 ITEM ID</th>
                  <th>작업 단계</th>
                  <th>작업 일시</th>
              </tr>
          </table>
      </div>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  margin: 1rem 0.5rem 1rem 0.5rem;
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
  .content {
    height: 100%;
    padding:1rem;
    table{
        width:100%;
    }
    .table-header{
        

    }
  }
`;
export default TableCard;
