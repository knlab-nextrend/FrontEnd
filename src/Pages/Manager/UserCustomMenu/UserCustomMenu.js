import React from "react";
import styled from "styled-components";
import FormHeader from "../../../Components/FormHeader";
function UserCustomMenu() {
  return (
    <>
      <FormHeader type={"view"} title={"맞춤형 화면 생성"} />
      <Wrapper>
        <CardWrapper>
          <div className="title">
            <div className="title-main">사용자 목록</div>
            <div className="title-sub">
              사용자 맞춤형 화면을 생성 또는 수정하시려면 사용자 목록에서
              사용자를 클릭하세요.
            </div>
          </div>
          <div className="content">
            <UserListTable>
              <thead>
                <tr>
                  <th>사용자 ID</th>
                  <th>사용자 이름</th>
                  <th>이메일</th>
                  <th>연락처</th>
                  <th>소속</th>
                  <th>직책</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>jhy901</td>
                  <td>전하영</td>
                  <td>jhy901@naver.com</td>
                  <td>01054274189</td>
                  <td>null</td>
                  <td>null</td>
                </tr>
              </tbody>
            </UserListTable>
          </div>
        </CardWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  font-size: 14px;
  min-height: 50rem;
  background-color: #eee;
  color: rgb(59, 59, 59);
`;

const CardWrapper = styled.div`
  margin: 1rem 0.5rem 1rem 0.5rem;
  border-radius: 4px;
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
  background-color: white;
  .title {
    font-weight: bold;
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
    padding: 1rem;
  }
`;

const UserListTable = styled.table`
  width: 100%;
  text-align: left;
  border: 1px solid #e6e9ed;
  border-radius:4px;
  border-collapse: collapse;
  thead {
    background-color: #d8dee6;
    color: #323d4d;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    padding:0.5rem 1rem 0.5rem 1rem;
  }
  tr {
    height: 2rem;
  }
  th,td{
    padding:0.5rem 1rem 0.5rem 1rem;
  }
`;
export default UserCustomMenu;
