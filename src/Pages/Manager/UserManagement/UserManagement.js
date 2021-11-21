import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled from "styled-components";


function UserManagement({
    userData,
    openUserModifyModal,
    deleteUser,
    openUserAddModal
}){
  

    return(
    <>
        <TableWrapper>
          <CustomTable>
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>

            <thead>
              <tr>
                <th>선택</th>
                <th>itemID</th>
                <th>요약</th>
                <th>발행자/발행기관</th>
                <th>언어</th>
                <th>수집일</th>
                <th>페이지수</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>
                    </td>
                    <td>{user.userID}</td>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Company}</td>
                    <td>{user.CreateAt}</td>
                    <td>{user.Category}</td>
                    <td>
                      <Button onClick={()=>{openUserModifyModal(user)}}>수정</Button>
                      <Button onClick={()=>{deleteUser(user.id)}}>삭제</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </CustomTable>
        </TableWrapper>
        <Button onClick={()=>{openUserAddModal()}}>추가</Button>
    </>
    );
}

const Button = styled.button`
  background-color: ${(props) => props.color || "grey"};
  cursor: pointer;
  min-width: 5rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  margin: 0 0.5rem 0 0.5rem;
`;
const TableWrapper = styled.div`
  width: 100%;
  max-height: 65rem;
  overflow: auto;
  box-shadow : rgb(9 30 66 / 25%) 0px 1px 1px;
`;
const CustomTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  thead {
    border-bottom: solid 1px #d6d6d6;
    position: sticky;
    top: 0px;
    background-color: white;
  }
  tr {
    height: 2.5rem;
  }
  tr:nth-child(2n) {
    background-color: #eee;
  }
  input[type="checkbox"] {
    width: 20px; /*Desired width*/
    height: 20px; /*Desired height*/
  }
`;


export default UserManagement;